export async function POST({ request }) {
  const data = await request.json();
  const FORMSPREE_URL = process.env.FORMSPREE_URL;
  if (FORMSPREE_URL) {
    const resp = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!resp.ok) {
      return new Response(JSON.stringify({ error: 'Forward failed' }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  console.log('Contact form submission:', data);
  return new Response(JSON.stringify({ success: true, note: 'No FORMSPREE_URL configured' }), { status: 200 });
}
