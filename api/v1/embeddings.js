export default async function handler(req, res) {
  // CORS 设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const requestBody = req.body;
    console.log('🧩 嵌入请求内容:', JSON.stringify(requestBody, null, 2));
    
    // 生成随机嵌入向量
    const generateRandomEmbedding = () => {
      const embedding = [];
      for (let i = 0; i < 1536; i++) {
        embedding.push(Math.random() * 2 - 1); // -1 到 1 的随机数
      }
      return embedding;
    };

    // 模拟嵌入响应
    const mockResponse = {
      object: "list",
      data: [{
        object: "embedding",
        embedding: generateRandomEmbedding(),
        index: 0
      }],
      model: requestBody.model || "text-embedding-ada-002",
      usage: { prompt_tokens: 0, total_tokens: 0 }
    };

    res.status(200).json(mockResponse);
  } catch (error) {
    console.error('嵌入请求失败:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}