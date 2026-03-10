# GitHub Actions Deploy Workflow

El archivo `github-actions-deploy.yml` ubicado en este directorio (`infra/ci/`) funciona **exclusivamente como una plantilla**.

Debido a cómo funciona GitHub Actions, los workflows sólo son detectados y ejecutados si se encuentran ubicados directamente en la carpeta `.github/workflows/` en la raíz de tu repositorio.

## Cómo activarlo para que corra:

1. Crea el directorio en la raíz si no existe:
```bash
mkdir -p .github/workflows
```

2. Copia la plantilla ahí:
```bash
cp infra/ci/github-actions-deploy.yml .github/workflows/deploy.yml
```

3. Agrega, comitea y pushea:
```bash
git add .github/workflows/deploy.yml
git commit -m "Activa CI/CD de github actions a VPS"
git push origin main
```

4. Asegúrate que en la tab "Settings > Secrets and variables > Actions" de Github tienes guardados estos secretos:
- `VPS_HOST`
- `VPS_USER`
- `VPS_PORT`
- `VPS_SSH_KEY`
