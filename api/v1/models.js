export default async function handler(req, res) {
  // CORS 设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    console.log(`📋 获取模型列表请求 | 来源: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
    
    // 模拟 OpenAI 模型列表响应
    const mockModels = {
      object: "list",
      data: [
        { id: "gpt-4", object: "model", owned_by: "openai", permission: [] },
        { id: "gpt-3.5-turbo", object: "model", owned_by: "openai", permission: [] },
        { id: "text-davinci-003", object: "model", owned_by: "openai", permission: [] },
        { id: "text-embedding-ada-002", object: "model", owned_by: "openai", permission: [] },
        { id: "whisper-1", object: "model", owned_by: "openai", permission: [] }
      ]
    };

    res.status(200).json(mockModels);
  } catch (error) {
    console.error('模型列表请求失败:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}