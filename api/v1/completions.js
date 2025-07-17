export default async function handler(req, res) {
  // CORS 设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const requestBody = req.body;
    console.log('📝 传统补全请求内容:', JSON.stringify(requestBody, null, 2));
    
    // 模拟传统补全响应
    const mockResponse = {
      id: "cmpl-" + Date.now(),
      object: "text_completion",
      created: Math.floor(Date.now() / 1000),
      model: requestBody.model || "text-davinci-003",
      choices: [{
        text: "这是一个传统补全接口的模拟响应。",
        index: 0,
        logprobs: null,
        finish_reason: "length"
      }],
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
    };

    res.status(200).json(mockResponse);
  } catch (error) {
    console.error('传统补全请求失败:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}