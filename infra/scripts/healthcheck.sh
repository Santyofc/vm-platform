#!/bin/bash
# ==========================================================
# healthcheck.sh
# Purpose: Validates the application is responding locally
# ==========================================================
set -Eeuo pipefail

URL="http://127.0.0.1:3000/"
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" "$URL")

if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ] || [ "$HTTP_STATUS" = "307" ] || [ "$HTTP_STATUS" = "308" ]; then
    echo "Healthcheck OK: HTTP $HTTP_STATUS ($URL)"
    exit 0
else
    echo "Healthcheck Failed: HTTP $HTTP_STATUS ($URL)"
    exit 1
fi
