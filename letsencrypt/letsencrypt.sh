# renew our let's encrypt certificates
/opt/letsencrypt/letsencrypt-auto certonly -a webroot --webroot-path=/home/dole/html/bryndole.com -d bryndole.com -d www.bryndole.com
/opt/letsencrypt/letsencrypt-auto certonly -a webroot --webroot-path=/home/dole/html/bikelane.com -d bikelane.com -d www.bikelane.com -d archive.bikelane.com
/opt/letsencrypt/letsencrypt-auto certonly -a webroot --webroot-path=/home/dole/html/lesdole.com -d lesdole.com -d www.lesdole.com
/opt/letsencrypt/letsencrypt-auto certonly -a webroot --webroot-path=/home/dole/html/redir_domains -d alexdole.com -d www.alexdole.com
