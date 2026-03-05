root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# nano /etc/nginx/sites-available/laundryin
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# ln -s /etc/nginx/sites-available/laundryin /etc/nginx/sites-enabled/
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# certbot --nginx -d laundryin.kelingstudio.web.id
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for laundryin.kelingstudio.web.id

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/laundryin.kelingstudio.web.id/fullchain.pem
Key is saved at: /etc/letsencrypt/live/laundryin.kelingstudio.web.id/privkey.pem
This certificate expires on 2026-05-30.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for laundryin.kelingstudio.web.id to /etc/nginx/sites-enabled/laundryin
Congratulations! You have successfully enabled HTTPS on https://laundryin.kelingstudio.web.id

---

If you like Certbot, please consider supporting our work by:

- Donating to ISRG / Let's Encrypt: https://letsencrypt.org/donate
- Donating to EFF: https://eff.org/donate-le

---

root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# systemctl restart nginx.conf
Failed to restart nginx.conf.service: Unit nginx.conf.service not found.
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# systemctl nginx -t
systemctl: option requires an argument -- 't'
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# systemctl restart nginx
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# docker-compose logs app
Attaching to
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# docker-compose logs app
Attaching to
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# cat /etc/nginx/sites-available/laundryin
server {
server_name laundryin.kelingstudio.web.id;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Header tambahan untuk keamanan dan real IP
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Optimasi untuk static files Next.js (opsional jika ingin dilayani langsung oleh Nginx)
    # location /_next/static {
    #     alias /var/www/html/aplikasi-manajemen-laundry/.next/static;
    #     expires 365d;
    #     access_log off;
    # }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/laundryin.kelingstudio.web.id/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/laundryin.kelingstudio.web.id/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
if ($host = laundryin.kelingstudio.web.id) {
        return 301 https://$host$request_uri;
} # managed by Certbot

    listen 80;
    server_name laundryin.kelingstudio.web.id;
    return 404; # managed by Certbot

}root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# ls -l
total 304
-rw-r--r-- 1 root root 719 Mar 1 11:53 Dockerfile
-rw-r--r-- 1 root root 1450 Mar 1 11:53 README.md
-rw-r--r-- 1 root root 848 Mar 1 11:53 adafail.md
-rw-r--r-- 1 root root 864 Mar 1 11:53 docker-compose.yml
-rw-r--r-- 1 root root 465 Mar 1 11:53 eslint.config.mjs
-rw-r--r-- 1 root root 925 Mar 1 13:51 kondisi.md
-rw-r--r-- 1 root root 129 Mar 1 11:53 next.config.ts
-rw-r--r-- 1 root root 823 Mar 1 13:51 nginx.conf
-rw-r--r-- 1 root root 244959 Mar 1 11:53 package-lock.json
-rw-r--r-- 1 root root 685 Mar 1 11:53 package.json
-rw-r--r-- 1 root root 94 Mar 1 11:53 postcss.config.mjs
drwxr-xr-x 3 root root 4096 Mar 1 11:53 prisma
-rw-r--r-- 1 root root 392 Mar 1 11:53 prisma.config.ts.bak
drwxr-xr-x 2 root root 4096 Mar 1 11:53 public
drwxr-xr-x 2 root root 4096 Mar 1 11:53 reference
drwxr-xr-x 6 root root 4096 Mar 1 11:53 src
-rw-r--r-- 1 root root 670 Mar 1 11:53 tsconfig.json
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry#
