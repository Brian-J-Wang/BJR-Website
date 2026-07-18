#!bin/bash
cat ${DOMAIN} >> test.txt
echo "here"
if [ ! -f /etc/letsencrypt/live/${DOMAIN}/fullchain.pem ]; then
    sudo certbot certonly --webroot \
        --non-interactive --agree-tos \
        --no-eff-email --email ${EMAIL}
        -w /home/${USER}/certbot/www \
        -d ${DOMAIN} 
else
    sudo certbot renew
fi

