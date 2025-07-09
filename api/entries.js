import { kv } from '@vercel/kv';

const ENTRIES_KEY = 'diary_entries';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get entries from Vercel KV
      const entries = await kv.get(ENTRIES_KEY) || [];
      console.log('Entradas carregadas:', entries.length);
      return res.json(entries);
    }

    if (req.method === 'POST') {
      // Save entries to Vercel KV
      const entries = req.body;
      console.log('Recebendo dados para salvar:', entries.length, 'entradas');
      
      // Save to KV store
      await kv.set(ENTRIES_KEY, entries);
      console.log('Dados salvos com sucesso no Vercel KV!');
      
      return res.json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor', 
      details: error.message 
    });
  }
}
