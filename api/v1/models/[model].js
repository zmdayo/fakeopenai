export default async function handler(req, res) {
  // CORS 设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // 从动态路由参数获取模型ID
    const modelId = req.query.model;
    console.log(`🔍 获取模型详情请求 | 模型: ${modelId} | IP: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
    
    // 模拟模型详情响应
    const mockModel = {
      id: modelId,
      object: "model",
      created: 1677610602,
      owned_by: "openai",
      permission: [
        {
          id: "modelperm-" + Math.random().toString(36).substring(2, 15),
          object: "model_permission",
          created: 1677610602,
          allow_create_engine: false,
          allow_sampling: true,
          allow_logprobs: true,
          allow_search_indices: false,
          allow_view: true,
          allow_fine_tuning: false,
          organization: "*",
          group: null,
          is_blocking: false
        }
      ],
      root: modelId,
      parent: null
    };

    res.status(200).json(mockModel);
  } catch (error) {
    console.error('模型详情请求失败:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}