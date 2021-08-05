#!/bin/bash

wget -o /tmp/firulais.dns --no-check-certificate https://freedns.afraid.org/dynamic/update.php?b2FOaUtlTjdQZjNiZjdiR2J3MWNGYjdXOjE5NDA3OTU1 >> /tmp/freedns_firulais_net_ar.log 2>&1 &
cat /tmp/firulais.dns

wget -o /tmp/www.firulais.dns --no-check-certificate https://freedns.afraid.org/dynamic/update.php?b2FOaUtlTjdQZjNiZjdiR2J3MWNGYjdXOjE5NDA3OTUy >> /tmp/freedns_www_firulais_net_ar.log 2>&1 &
cat /tmp/www.firulais.dns

wget -o /tmp/firulais.dns http://v6.sync.afraid.org/u/Z2svWMV7oCKaG5k8MCqtRybY/
cat /tmp/firulais.dns

wget -o /tmp/datasrv.firulais.dns http://v6.sync.afraid.org/u/RrLHScZVn7qDB7z9LwxGCpWb/
cat /tmp/datasrv.firulais.dns

wget -o /tmp/www.firulais.dns http://v6.sync.afraid.org/u/vQeQHJuLxDhe3E3gyYbhdFkg/
cat /tmp/www.firulais.dns

rm /tmp/*.dns
