export default async function handler(req, res) {
  // 允许跨域请求（前端可直接调用）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 仅处理 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const requestBody = req.body;
    console.log('捕获到请求内容:', JSON.stringify(requestBody, null, 2));

    // 这里可扩展：存储到数据库/发送到Webhook等
    // 例如发送到远程服务器：await fetch('https://your-log-server.com', { method: 'POST', body: JSON.stringify(requestBody) })

    // 返回模拟的 OpenAI 响应（保持结构兼容）
    const mockResponse = {
      id: "chatcmpl-" + Date.now(),
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: requestBody.model || "gpt-3.5-turbo",
      choices: [{
        index: 0,
        message: { role: "assistant", content: "This is a mock response from your proxy." },
        finish_reason: "stop"
      }],
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
    };

    res.status(200).json(mockResponse);
  } catch (error) {
    console.error('捕获请求失败:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}