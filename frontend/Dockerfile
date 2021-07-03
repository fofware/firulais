FROM nginx:1.20.1
# Inspiration:
# https://hub.docker.com/r/gaafar/cron/

# Install cron, certbot, bash, plus any other dependencies

RUN apt-get update \
    && apt-get install -y cron bash wget certbot \
    && mkdir -p /webroots /scripts

# /webroots/DOMAIN.TLD/.well-known/... files go here
VOLUME /webroots
# This handles book-keeping files for Letsencrypt
VOLUME /etc/letsencrypt
# This lets folks inject Nginx config files
VOLUME /etc/nginx/conf.d

VOLUME /scripts

#COPY *.sh /scripts/
#
#RUN chmod +x /scripts/*.sh

# Make the directories for the domains to manage
# /webroots/DOMAIN.TLD will be mounted
# into each proxy as http://DOMAIN.TLD/.well-known

#WORKDIR /scripts
#
## This installs a Crontab entry which
## runs "certbot renew" on several days a week at 03:22 AM
#
#RUN echo "22 3 * * 0,2,4,6 root /usr/bin/certbot renew" >/etc/cron.d/certbot-renew
#
#RUN echo "0,5,10,15,20,25,30,35,40,45,50,55 * * * * root /scripts/dnsrenew.sh" >/etc/cron.d/dnsrenew
#
#RUN echo "* * * * * root /scripts/fixpermisos.sh" >/etc/cron.d/permisos
#
## RUN echo "22 03 * * 2,4,6,7 root /scripts/register.sh test.geekwisdom.net" >/etc/cron.d/certbot-test-geekwisdom-net
#
#
COPY ./conf.d/admin* /etc/nginx/conf.d/

#/usr/share/nginx/html
#RUN mkdir -p /webroots/admin.firulais.net.ar/assets/
#COPY ./dist/frontend/assets/images /webroots/images
#COPY ./dist/frontend/assets/font* /webroots/admin.firulais.net.ar/assets/
#COPY ./dist/frontend/assets/js /webroots/admin.firulais.net.ar/assets/
COPY ./dist/frontend /webroots/admin.firulais.net.ar

## Run both nginx and cron together
#CMD [ "sh", "-c", "cron && nginx -g 'daemon off;'" ]

CMD [ "sh", "-c", "cron && nginx -g 'daemon off;'" ]
