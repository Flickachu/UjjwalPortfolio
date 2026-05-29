export async function POST({ request }) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO; // format: owner/repo
  const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return new Response(JSON.stringify({ error: 'GITHUB_TOKEN or GITHUB_REPO not configured' }), { status: 500 });
  }

  const post = await request.json();
  const path = 'static/data/posts.json';
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;

  // helper to make authenticated requests
  const ghFetch = (url, opts = {}) => fetch(url, {
    ...opts,
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      ...(opts.headers || {})
    }
  });

  // Get existing file if present
  const getRes = await ghFetch(`${apiUrl}?ref=${GITHUB_BRANCH}`);
  let posts = [];
  let sha;

  if (getRes.status === 200) {
    const body = await getRes.json();
    sha = body.sha;
    try {
      const raw = Buffer.from(body.content, 'base64').toString('utf8');
      posts = JSON.parse(raw);
    } catch (e) {
      posts = [];
    }
  } else if (getRes.status === 404) {
    posts = [];
  } else {
    const err = await getRes.text();
    return new Response(JSON.stringify({ error: 'GitHub read failed', detail: err }), { status: 502 });
  }

  // add or replace post
  const idx = posts.findIndex(p => p.slug === post.slug);
  if (idx >= 0) posts[idx] = post;
  else posts.push(post);

  const contentBase64 = Buffer.from(JSON.stringify(posts, null, 2)).toString('base64');

  const commitBody = {
    message: `Add/update post ${post.slug}`,
    content: contentBase64,
    branch: GITHUB_BRANCH
  };
  if (sha) commitBody.sha = sha;

  const putRes = await ghFetch(apiUrl, {
    method: 'PUT',
    body: JSON.stringify(commitBody)
  });

  if (!putRes.ok) {
    const txt = await putRes.text();
    return new Response(JSON.stringify({ error: 'GitHub update failed', detail: txt }), { status: 502 });
  }

  const resBody = await putRes.json();
  return new Response(JSON.stringify({ ok: true, commit: resBody.commit }), { status: 200 });
}
