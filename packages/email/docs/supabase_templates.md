# Templates de Email — Zona Sur Tech

Para activar el branding profesional en tu instancia de Supabase, copia y pega el siguiente código HTML en las secciones correspondientes de **Authentication > Email Templates** en tu Dashboard de Supabase.

---

## 1. Confirmación de Registro (Confirm signup)

**Asunto:** [Zona Sur Tech] Confirma tu identidad

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background-color: #0b0f17; font-family: sans-serif; margin: 0; padding: 0; color: #94a3b8; }
    .container { max-width: 600px; margin: 40px auto; background-color: #0b0f17; border: 1px solid #1e293b; border-radius: 24px; padding: 40px; text-align: center; }
    .title { color: #ffffff; font-size: 24px; font-weight: 900; text-transform: uppercase; margin-bottom: 24px; }
    .highlight { color: #0075FF; }
    .button { display: inline-block; padding: 16px 32px; background-color: #0075FF; color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: 800; text-transform: uppercase; margin: 32px 0; }
    .footer { font-size: 12px; color: #475569; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">ZONA SUR <span class="highlight">TECH</span></div>
    <p>Bienvenido al ecosistema. Para finalizar la inicialización de tu nodo y activar tu cuenta, confirma tu dirección de correo:</p>
    <a href="{{ .ConfirmationURL }}" class="button">Confirmar Identidad</a>
    <div class="footer italic">Zona Sur Tech Protocol — 2026</div>
  </div>
</body>
</html>
```

---

## 2. Restablecer Contraseña (Reset password)

**Asunto:** [Zona Sur Tech] Recuperación de Clave de Acceso

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background-color: #0b0f17; font-family: sans-serif; margin: 0; padding: 0; color: #94a3b8; }
    .container { max-width: 600px; margin: 40px auto; background-color: #0b0f17; border: 1px solid #1e293b; border-radius: 24px; padding: 40px; text-align: center; }
    .title { color: #ffffff; font-size: 24px; font-weight: 900; text-transform: uppercase; margin-bottom: 24px; }
    .highlight { color: #bb86fc; }
    .button { display: inline-block; padding: 16px 32px; background-color: #bb86fc; color: #0b0f17 !important; text-decoration: none; border-radius: 12px; font-weight: 800; text-transform: uppercase; margin: 32px 0; }
    .footer { font-size: 12px; color: #475569; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">RESET <span class="highlight">PROTOCOL</span></div>
    <p>Se ha solicitado la revocación y cambio de tu clave de acceso. Haz clic en el botón inferior para establecer una nueva credencial:</p>
    <a href="{{ .ConfirmationURL }}" class="button">Cambiar Clave</a>
    <p style="font-size: 12px;">Si no solicitaste este cambio, ignora este mensaje.</p>
    <div class="footer italic">Zona Sur Tech Security Layer</div>
  </div>
</body>
</html>
```

---

## 3. Enlace Mágico (Magic Link)

**Asunto:** [Zona Sur Tech] Acceso Temporal Autorizado

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background-color: #0b0f17; font-family: sans-serif; margin: 0; padding: 0; color: #94a3b8; }
    .container { max-width: 600px; margin: 40px auto; background-color: #0b0f17; border: 1px solid #1e293b; border-radius: 24px; padding: 40px; text-align: center; }
    .title { color: #ffffff; font-size: 24px; font-weight: 900; text-transform: uppercase; margin-bottom: 24px; }
    .highlight { color: #00f2fe; }
    .button { display: inline-block; padding: 16px 32px; background-color: #00f2fe; color: #0b0f17 !important; text-decoration: none; border-radius: 12px; font-weight: 800; text-transform: uppercase; margin: 32px 0; }
    .footer { font-size: 12px; color: #475569; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">MAGIC <span class="highlight">LINK</span></div>
    <p>Has solicitado un acceso rápido al Kernel. Haz clic para autenticarte sin contraseña:</p>
    <a href="{{ .ConfirmationURL }}" class="button">Entrar ahora</a>
    <div class="footer italic">Sincronización de Identidad — Zona Sur Tech</div>
  </div>
</body>
</html>
```

---

> [!TIP]
> **Nota de Implementación:** Para incluir la mascota halcón en el header, puedes añadir un tag `<img>` apuntando a la URL pública de tu logo después de configurarlo en un bucket de Supabase Storage o similar.
