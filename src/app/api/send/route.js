import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("=== DEBUG API ROUTE ===");
  
  try {
    // Log básico
    console.log("1. API route chamada com sucesso");
    
    // Testar parse do JSON
    let body;
    try {
      body = await req.json();
      console.log("2. JSON parsed com sucesso:", body);
    } catch (jsonError) {
      console.error("2. ERRO no parse JSON:", jsonError);
      return NextResponse.json({ error: "Erro no parse JSON", details: jsonError.message }, { status: 400 });
    }
    
    // Verificar variáveis de ambiente
    const hasResendKey = !!process.env.RESEND_API_KEY;
    const hasFromEmail = !!process.env.FROM_EMAIL;
    
    console.log("3. Variáveis de ambiente:");
    console.log("   - RESEND_API_KEY:", hasResendKey);
    console.log("   - FROM_EMAIL:", hasFromEmail);
    console.log("   - FROM_EMAIL value:", process.env.FROM_EMAIL);
    
    if (!hasResendKey) {
      return NextResponse.json({ 
        error: "RESEND_API_KEY não encontrada",
        envVars: { hasResendKey, hasFromEmail }
      }, { status: 500 });
    }
    
    if (!hasFromEmail) {
      return NextResponse.json({ 
        error: "FROM_EMAIL não encontrada",
        envVars: { hasResendKey, hasFromEmail }
      }, { status: 500 });
    }
    
    // Testar importação do Resend
    let Resend;
    try {
      const resendModule = await import("resend");
      Resend = resendModule.Resend;
      console.log("4. Resend importado com sucesso");
    } catch (importError) {
      console.error("4. ERRO ao importar Resend:", importError);
      return NextResponse.json({ 
        error: "Erro ao importar Resend", 
        details: importError.message 
      }, { status: 500 });
    }
    
    // Testar inicialização do Resend
    let resend;
    try {
      resend = new Resend(process.env.RESEND_API_KEY);
      console.log("5. Resend inicializado com sucesso");
    } catch (initError) {
      console.error("5. ERRO ao inicializar Resend:", initError);
      return NextResponse.json({ 
        error: "Erro ao inicializar Resend", 
        details: initError.message 
      }, { status: 500 });
    }
    
    // Testar envio de email simples
    try {
      console.log("6. Tentando enviar email...");
      
      const result = await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: ['itjoicegoncalves@gmail.com'],
        subject: "Teste Debug - " + new Date().toISOString(),
        html: `
          <h1>Email de Teste</h1>
          <p>Este é um email de teste enviado em ${new Date().toLocaleString()}</p>
          <p>Dados recebidos:</p>
          <pre>${JSON.stringify(body, null, 2)}</pre>
        `,
      });
      
      console.log("7. Email enviado com sucesso:", result);
      
      return NextResponse.json({ 
        success: true,
        message: "Email enviado com sucesso!",
        data: body,
        resendResult: result,
        timestamp: new Date().toISOString()
      });
      
    } catch (emailError) {
      console.error("6. ERRO ao enviar email:", emailError);
      console.error("Stack trace:", emailError.stack);
      
      return NextResponse.json({ 
        error: "Erro ao enviar email", 
        details: emailError.message,
        stack: emailError.stack
      }, { status: 500 });
    }
    
  } catch (generalError) {
    console.error("ERRO GERAL:", generalError);
    console.error("Stack trace:", generalError.stack);
    
    return NextResponse.json({ 
      error: "Erro geral na API", 
      details: generalError.message,
      stack: generalError.stack
    }, { status: 500 });
  }
}

// Também adicionar um GET para testar se a rota funciona
export async function GET() {
  console.log("GET request para /api/send");
  
  return NextResponse.json({ 
    message: "API route funcionando!",
    timestamp: new Date().toISOString(),
    env: {
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasFromEmail: !!process.env.FROM_EMAIL,
      fromEmail: process.env.FROM_EMAIL,
      nodeEnv: process.env.NODE_ENV
    }
  });
}