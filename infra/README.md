# Infraestructura de VMs (vm-platform)

Esta carpeta `/infra` es una **capa de infraestructura paralela** para el repositorio.
**No modifica en absoluto el proyecto base (`/apps`, `/packages`, variables, configuración, etc).**

Todo queda confinado en sus scripts para desplegar *solo* la aplicación `apps/web` usando **Docker Compose**, **Nginx** (Reverse Proxy) y **Systemd** sobre una VM limpia de Ubuntu 22/24. La arquitectura asume que dependencias externas están manejadas por Supabase Cloud y Upstash Redis.

## Archivos Principales
- **`/docker/docker-compose.prod.yml`**: Stack Docker para construir y ejecutar Next.js.
- **`/nginx/vm-platform.conf`**: Proxy config para el servidor web público en puerto 80. Listos para Certbot.
- **`/systemd/vm-platform.service`**: Systemd unit que registra el stack `docker compose`.
- **`/scripts/`**: Mantenimiento del ciclo de vida del stack (install, deploy, rollback, check).
- **`/ci/github-actions-deploy.yml`**: Plantilla de CI/CD para deploy seguro en VPS (requires move to .github/workflows).
- **`/docs/`**: Pasos para instalación y operaciones diarias.

## Consideraciones
La instalación debe generarse íntegramente bajo `/opt/vm-platform`. El dominio público no accederá nunca a la app web directamente si no es a través de Nginx.
