export default async function handler(req, res) {
  // CORS 设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const requestBody = req.body;
    console.log('💬 聊天请求内容:', JSON.stringify(requestBody, null, 2));
    
    // 流式响应支持
    if (requestBody.stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      
      const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      };
      
      // 模拟流式响应
      const message = "这是一个流式聊天响应的模拟。响应被分成多个块发送。";
      const words = message.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        sendEvent({
          id: `chatcmpl-${Date.now()}`,
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: requestBody.model || "gpt-3.5-turbo",
          choices: [{
            index: 0,
            delta: { content: words[i] + (i < words.length - 1 ? ' ' : '') },
            finish_reason: i === words.length - 1 ? "stop" : null
          }]
        });
        
        // 添加延迟模拟真实流
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      sendEvent({ data: "[DONE]" });
      return res.end();
    }
    
    // 非流式响应
    const mockResponse = {
      id: "chatcmpl-" + Date.now(),
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: requestBody.model || "gpt-3.5-turbo",
      choices: [{
        index: 0,
        message: { 
          role: "assistant", 
          content: "这是一个OpenAI API兼容的模拟响应。您的请求已被记录。" 
        },
        finish_reason: "stop"
      }],
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
    };

    res.status(200).json(mockResponse);
  } catch (error) {
    console.error('聊天请求失败:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}