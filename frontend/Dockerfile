FROM nginx:1.20.1
# Inspiration:
# https://hub.docker.com/r/gaafar/cron/
# https://devanswers.co/install-lets-encrypt-ssl-cert-nginx-ubuntu-20-04/#id-3-test-ssl
# https://www.ssllabs.com/ssltest/analyze.html?d=www.firulais.net.ar&latest

# Install cron, certbot, bash, plus any other dependencies

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    cron bash curl certbot python3-certbot-nginx

# /webroots/DOMAIN.TLD/.well-known/... files go here
VOLUME /webroots

RUN mkdir -p /webroots/firulais.net.ar/assets

#COPY ./src/assets/images /webroots/images
COPY ./dist/frontend/*.* /webroots/firulais.net.ar/*.*
COPY ./dist/frontend/assets/font* /webroots/firulais.net.ar/assets/*
COPY ./dist/frontend/assets/j* /webroots/firulais.net.ar/assets/*

# This handles book-keeping files for Letsencrypt
VOLUME /etc/letsencrypt
# This lets folks inject Nginx config files
VOLUME /etc/nginx/conf.d

VOLUME /scripts
WORKDIR /scripts

COPY *.sh .
#
RUN chmod +x *.sh

# Make the directories for the domains to manage
# /webroots/DOMAIN.TLD will be mounted
# into each proxy as http://DOMAIN.TLD/.well-known


# This installs a Crontab entry which
# runs "certbot renew" on several days a week at 03:22 AM
RUN echo "22 3 * * 0,2,4,6 root /usr/bin/certbot renew" >/etc/cron.d/certbot-renew

#RUN echo "PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin" > /etc/cron.d/www_firulais_v6
#RUN echo "4,9,14,19,24,29,34,39,44,49,54,59 * * * * sleep 38 ; curl -s http://v6.sync.afraid.org/u/vQeQHJuLxDhe3E3gyYbhdFkg/ >> /tmp/freedns_www_firulais_net_ar.log 2>/dev/null" >> /etc/cron.d/www_firulais_v6
#
#RUN echo "PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin" > /etc/cron.d/datasrv_firulais_v6
#RUN echo "2,7,12,17,22,27,32,37,42,47,52,57 * * * * sleep 21 ; curl -s http://v6.sync.afraid.org/u/RrLHScZVn7qDB7z9LwxGCpWb/ >> /tmp/freedns_datasrv_firulais_net_ar.log 2>/dev/null" >> /etc/cron.d/datasrv_firulais_v6
#
#RUN echo "PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin" > /etc/cron.d/firulais_v6
#RUN echo "2,7,12,17,22,27,32,37,42,47,52,57 * * * * sleep 22 ; curl -s http://v6.sync.afraid.org/u/Z2svWMV7oCKaG5k8MCqtRybY/ >> /tmp/freedns_firulais_net_ar.log 2>/dev/null" >> /etc/cron.d/firulais_v6
#
RUN echo "PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin" > /etc/cron.d/firulais_v4
RUN echo "3,8,13,18,23,28,33,38,43,48,53,58 * * * * sleep 31 ; curl -s http://sync.afraid.org/u/uJcwYwSSVyJyLhZykspohwSp/ >> /tmp/freedns_firulais_net_ar.log 2>/dev/null" >> /etc/cron.d/firulais_v4
#
RUN echo "PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin" > /etc/cron.d/www_firulais_v4
RUN echo "2,7,12,17,22,27,32,37,42,47,52,57 * * * * sleep 6 ; curl -s http://sync.afraid.org/u/uTfvQnUxg59ud9qn7eRWHSKZ/ >> /tmp/freedns_www_firulais_net_ar.log 2>/dev/null" >> /etc/cron.d/www_firulais_v4
#
RUN echo "PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin" > /etc/cron.d/datasrv_firulais_v4
RUN echo "2,7,12,17,22,27,32,37,42,47,52,57 * * * * sleep 10 ; curl -s http://sync.afraid.org/u/nXN2oGBpS2GubkEYNsyqDuTM/ >> /tmp/freedns_datasrv_firulais_net_ar.log 2>/dev/null" >> /etc/cron.d/datasrv_firulais_v4
#
#RUN echo "* * * * * root /scripts/fixpermisos.sh" >/etc/cron.d/permisos

#RUN echo "22 03 * * 2,4,6,7 root /scripts/register.sh test.geekwisdom.net" >/etc/cron.d/certbot-test-geekwisdom-net


COPY ./conf.d/* /etc/nginx/conf.d/*

#/usr/share/nginx/html
#COPY ./dist/frontend/ /webroots/admin.firulais.net.ar/
#COPY ./dist/frontend/ /webroots/firulais.net.ar/


## Run both nginx and cron together
#CMD [ "sh", "-c", "cron && nginx -g 'daemon off;'" ]

CMD [ "sh", "-c", "cron && nginx -g 'daemon off;'" ]
