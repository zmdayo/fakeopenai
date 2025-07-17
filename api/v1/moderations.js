export default async function handler(req, res) {
  // CORS 设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const requestBody = req.body;
    console.log('🔎 审核请求内容:', JSON.stringify(requestBody, null, 2));
    
    // 分析文本内容
    const text = Array.isArray(requestBody.input) ? 
      requestBody.input.join(" ") : 
      requestBody.input;
    
    const hasFlaggedContent = /(暴力|色情|仇恨|自残)/i.test(text);
    const confidence = hasFlaggedContent ? 0.9 : 0.01;

    // 模拟审核响应
    const mockResponse = {
      id: "modr-" + Date.now(),
      model: "text-moderation-007",
      results: [{
        flagged: hasFlaggedContent,
        categories: {
          sexual: /色情/i.test(text),
          hate: /仇恨/i.test(text),
          violence: /暴力/i.test(text),
          "self-harm": /自残/i.test(text)
        },
        category_scores: {
          sexual: /色情/i.test(text) ? confidence : 0.01,
          hate: /仇恨/i.test(text) ? confidence : 0.01,
          violence: /暴力/i.test(text) ? confidence : 0.01,
          "self-harm": /自残/i.test(text) ? confidence : 0.01
        }
      }]
    };

    res.status(200).json(mockResponse);
  } catch (error) {
    console.error('审核请求失败:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}