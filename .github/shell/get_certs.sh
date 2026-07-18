#!/bin/bash

echo ${DOMAIN} >> test.txt
echo ${EMAIL} >> test.txt
echo ${USER} >> test.txt

if [ ! -f /etc/letsencrypt/live/${DOMAIN}/fullchain.pem ]; then
    sudo certbot certonly --webroot \
        --non-interactive --agree-tos \
        --no-eff-email --email ${EMAIL} \
        -w /home/${USER}/certbot/www \
        -d ${DOMAIN} 
else
    sudo certbot renew
fi

