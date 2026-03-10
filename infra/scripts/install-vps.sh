#!/bin/bash
# ==========================================================
# install-vps.sh
# Purpose: Prepare a fresh Ubuntu 22.04/24.04 VM for deployment
# ==========================================================
set -Eeuo pipefail

echo "==========================================="
echo " Starting VPS Initialization... "
echo "==========================================="

echo "[1/4] Updating packages and installing dependencies..."
sudo apt-get update
sudo apt-get install -y \
  ca-certificates \
  curl \
  gnupg \
  lsb-release \
  git \
  nginx \
  certbot \
  python3-certbot-nginx \
  ufw

echo "[2/4] Installing Docker Engine & Compose plugin..."
# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl enable docker
sudo systemctl start docker

echo "[3/4] Configuring UFW Firewall..."
# Nota para AWS EC2: 
# Debes asegurarte tambien de que tu 'Security Group' en AWS EC2 
# permite el trafico Inbound para estos tres puertos: 22, 80, 443.
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo "[4/4] Setting up deployment directory..."
sudo mkdir -p /opt/vm-platform
sudo chown -R $USER:$USER /opt/vm-platform

echo "==========================================="
echo " Setup complete! "
echo "==========================================="
echo ""
echo "Next steps:"
echo "1. Clone your repository into /opt/vm-platform"
echo "2. Create your /opt/vm-platform/.env file"
echo "3. Follow instructions in /opt/vm-platform/infra/docs/DEPLOY.md"
