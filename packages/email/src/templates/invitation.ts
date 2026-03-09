export interface InvitationTemplateProps {
  organizationName: string;
  inviterName?: string | null;
  role: string;
  acceptUrl: string;
  expiresInDays: number;
}

export function renderInvitationEmailHtml(props: InvitationTemplateProps): string {
  const inviterText = props.inviterName 
    ? `<strong style="color: #ffffff;">${props.inviterName}</strong> te ha invitado` 
    : "Has sido invitado";

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          background-color: #0b0f17; 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
          margin: 0; 
          padding: 0; 
          color: #94a3b8;
        }
        .wrapper {
          width: 100%;
          table-layout: fixed;
          background-color: #0b0f17;
          padding-bottom: 40px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #0b0f17;
          border: 1px solid #1e293b;
          border-radius: 24px;
          overflow: hidden;
          margin-top: 40px;
        }
        .header {
          padding: 40px;
          text-align: center;
          border-bottom: 1px solid #1e293b;
          background: linear-gradient(to bottom, #111827, #0b0f17);
        }
        .content {
          padding: 40px;
        }
        .title {
          color: #ffffff;
          font-size: 24px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .highlight {
          color: #0075FF;
        }
        .button {
          display: inline-block;
          padding: 16px 32px;
          background-color: #0075FF;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 14px;
          margin: 32px 0;
          box-shadow: 0 4px 20px rgba(0, 117, 255, 0.3);
        }
        .footer {
          padding: 32px 40px;
          background-color: #020617;
          font-size: 12px;
          color: #475569;
          text-align: center;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(0, 117, 255, 0.1);
          border: 1px solid rgba(0, 117, 255, 0.2);
          color: #0075FF;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <div class="badge">Kernel Protocol</div>
            <div class="title">ZONA SUR <span class="highlight">TECH</span></div>
          </div>
          <div class="content">
            <p style="margin-top: 0;">Hola,</p>
            <p>${inviterText} a unirte a la organización <b style="color: #ffffff;">${props.organizationName}</b> con el rol de <b style="color: #ffffff;">${props.role}</b>.</p>
            <p>Tu acceso a la infraestructura está listo. Haz clic en el botón inferior para inicializar tu nodo y sincronizar tu identidad:</p>
            <div style="text-align: center;">
              <a href="${props.acceptUrl}" class="button">Sincronizar Nodo</a>
            </div>
            <p style="font-size: 13px;">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
            <p style="font-size: 12px; color: #0075FF; word-break: break-all;">${props.acceptUrl}</p>
            <p style="font-size: 12px; margin-top: 32px; border-top: 1px solid #1e293b; pt: 24px;">
              Este protocolo de invitación expira en <b>${props.expiresInDays} días</b>.
            </p>
          </div>
          <div class="footer">
            <p>© 2026 Zona Sur Tech Infrastructure. Todos los derechos reservados.</p>
            <p>Si no esperabas esta invitación, puedes ignorar este mensaje de forma segura.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function renderInvitationEmailText(props: InvitationTemplateProps): string {
  const inviterText = props.inviterName 
    ? `${props.inviterName} te ha invitado` 
    : "Has sido invitado";

  return `
ZONA SUR TECH
Protocolo de Invitación

Hola,

${inviterText} a unirte a la organización ${props.organizationName} con el rol de ${props.role}.

Para aceptar la invitación e inicializar tu nodo, sigue este enlace:
${props.acceptUrl}

Esta invitación expira en ${props.expiresInDays} días.

Si no esperabas esto, puedes ignorar este correo.
© 2026 Zona Sur Tech Systems.
`;
}

