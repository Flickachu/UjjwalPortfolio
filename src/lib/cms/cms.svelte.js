import initialData from './data.json';

class CMS {
  data = $state(initialData);

  constructor() {
    // Initial loading could happen here if needed
  }

  async save() {
    try {
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data)
      });
      return response.ok;
    } catch (error) {
      console.error('CMS Save Error:', error);
      return false;
    }
  }


}

export const cms = new CMS();
