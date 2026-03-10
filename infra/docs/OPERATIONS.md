# Guía de Operaciones (OPERATIONS)

A continuación, una lista de comandos comunes para la operativa diaria en el servidor VPS.
Asumimos que el repositorio está en `/opt/vm-platform`.

## 1. Desplegar Nuevos Cambios (Actualizar)
Si hiciste merge a `main` y quieres descargar y desplegar (el build puede tardar un poco):
```bash
cd /opt/vm-platform
bash infra/scripts/deploy.sh
```

*(Si utilizas GitHub Actions con la plantilla incluida en `/ci`, esto se hará automáticamente.)*

## 2. Realizar un Rollback (Volver atrás)
Si acabas de desplegar y se rompió algo (y falló el auto-rollback por alguna razón externa aislada), vuelve al estado estable anterior garantizado:
```bash
cd /opt/vm-platform
bash infra/scripts/rollback.sh
```

## 3. Ver Estado del Contenedor
Ver todos los contenedores corriendo (debe verse `vm-platform-web`):
```bash
cd /opt/vm-platform
docker compose -p vm-platform -f infra/docker/docker-compose.prod.yml ps
```

## 4. Revisar Logs del Sistema Next.js
Revisar las últimas líneas en tiempo real y no dejar que la consola se bloquee:
```bash
cd /opt/vm-platform
docker compose -p vm-platform -f infra/docker/docker-compose.prod.yml logs -f --tail 100 web
```

## 5. Reiniciar el Stack
Útil si cambiaste variables dentro de tu archivo `.env`:
```bash
# Reiniciando con systemd que reiniciará el wrapper de Docker:
sudo systemctl restart vm-platform.service
```

## 6. Validar Estado de Healthcheck
Corre el script manual para confirmar que el servidor devuelve un 2xx o 3xx en localhost:3000:
```bash
cd /opt/vm-platform
bash infra/scripts/healthcheck.sh
```

## 7. Mantenimiento y Certificados
Renovar Certbot de forma manual (suele ser automático por cron):
```bash
sudo certbot renew --dry-run
```

Revisar si Nginx tiene errores de sintaxis en tus configs:
```bash
sudo nginx -t
sudo systemctl reload nginx
```
