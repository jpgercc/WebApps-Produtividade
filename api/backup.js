import { kv } from '@vercel/kv';

const ENTRIES_KEY = 'diary_entries';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get entries from Vercel KV
    const entries = await kv.get(ENTRIES_KEY) || [];
    
    const backup = {
      entries: entries,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const fileName = `diario-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(backup, null, 2));
  } catch (error) {
    console.error('Erro ao criar backup:', error);
    res.status(500).json({ error: 'Erro ao criar backup' });
  }
}
