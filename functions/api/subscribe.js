export async function onRequestPost(context) {
  try {
    // 获取请求体中的邮箱
    const { email } = await context.request.json();
    
    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: '请提供有效的电子邮箱地址' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // 检查邮箱是否已存在
    const { results } = await context.env.DB.prepare(
      'SELECT email FROM subscribers WHERE email = ?'
    ).bind(email).all();
    
    if (results.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: '该邮箱已经订阅' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // 将邮箱保存到D1数据库
    const timestamp = new Date().toISOString();
    await context.env.DB.prepare(
      'INSERT INTO subscribers (email, subscribed_at) VALUES (?, ?)'
    ).bind(email, timestamp).run();
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: '订阅成功' 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('订阅处理错误:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: '服务器处理请求时出错' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}