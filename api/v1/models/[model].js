export default async function handler(req, res) {
  // CORS 设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { model } = req.query;
    console.log(`🔍 获取模型详情请求 | 模型: ${model} | 来源: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
    
    // 模拟模型详情响应
    const mockModel = {
      id: model,
      object: "model",
      created: 1677610602,
      owned_by: "openai",
      permission: [],
      root: model,
      parent: null
    };

    res.status(200).json(mockModel);
  } catch (error) {
    console.error('模型详情请求失败:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}