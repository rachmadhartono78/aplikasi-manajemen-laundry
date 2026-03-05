-rw-r--r-- 1 root root 670 Mar 1 11:53 tsconfig.json
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# sudo nano /etc/systemd/system/laundry.service
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# sudo systemctl enable laundry
sudo systemctl start laundry
Created symlink /etc/systemd/system/multi-user.target.wants/laundry.service → /etc/systemd/system/laundry.service.
root@kelingstudio:/var/www/html/aplikasi-manajemen-laundry# sudo tail -n 20 /var/log/nginx/error.log
2026/03/01 15:58:13 [error] 774#774: *301 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET /favicon.ico HTTP/1.1", upstream: "http://localhost/favicon.ico", host: "laundryin.kelingstudio.web.id", referrer: "https://laundryin.kelingstudio.web.id/"
2026/03/01 15:58:16 [error] 774#774: *306 open() "/var/www/html/berkendararia/images/favicon.png" failed (2: No such file or directory), client: 162.142.125.223, server: berkendararia.web.id, request: "GET /images/favicon.png HTTP/1.1", host: "103.127.136.48"
2026/03/01 15:58:20 [error] 774#774: *307 open() "/var/www/html/berkendararia/favicon.ico" failed (2: No such file or directory), client: 162.142.125.223, server: berkendararia.web.id, request: "GET /favicon.ico HTTP/1.1", host: "103.127.136.48"
2026/03/01 15:58:57 [error] 774#774: *314 open() "/var/www/html/berkendararia/favicon.ico" failed (2: No such file or directory), client: 162.142.125.223, server: berkendararia.web.id, request: "GET /favicon.ico HTTP/1.1", host: "103.127.136.48"
2026/03/01 16:03:55 [error] 774#774: *318 connect() failed (111: Connection refused) while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET / HTTP/1.1", upstream: "http://127.0.0.1:3000/", host: "laundryin.kelingstudio.web.id"
2026/03/01 16:03:55 [error] 774#774: *318 connect() failed (111: Connection refused) while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET / HTTP/1.1", upstream: "http://[::1]:3000/", host: "laundryin.kelingstudio.web.id"
2026/03/01 16:03:55 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET /favicon.ico HTTP/1.1", upstream: "http://localhost/favicon.ico", host: "laundryin.kelingstudio.web.id", referrer: "https://laundryin.kelingstudio.web.id/"
2026/03/01 16:03:56 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET / HTTP/1.1", upstream: "http://localhost/", host: "laundryin.kelingstudio.web.id"
2026/03/01 16:03:56 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET /favicon.ico HTTP/1.1", upstream: "http://localhost/favicon.ico", host: "laundryin.kelingstudio.web.id", referrer: "https://laundryin.kelingstudio.web.id/"
2026/03/01 16:03:57 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET / HTTP/1.1", upstream: "http://localhost/", host: "laundryin.kelingstudio.web.id"
2026/03/01 16:03:57 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET /favicon.ico HTTP/1.1", upstream: "http://localhost/favicon.ico", host: "laundryin.kelingstudio.web.id", referrer: "https://laundryin.kelingstudio.web.id/"
2026/03/01 16:03:57 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET / HTTP/1.1", upstream: "http://localhost/", host: "laundryin.kelingstudio.web.id"
2026/03/01 16:03:57 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET /favicon.ico HTTP/1.1", upstream: "http://localhost/favicon.ico", host: "laundryin.kelingstudio.web.id", referrer: "https://laundryin.kelingstudio.web.id/"
2026/03/01 16:03:57 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET / HTTP/1.1", upstream: "http://localhost/", host: "laundryin.kelingstudio.web.id"
2026/03/01 16:03:57 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET /favicon.ico HTTP/1.1", upstream: "http://localhost/favicon.ico", host: "laundryin.kelingstudio.web.id", referrer: "https://laundryin.kelingstudio.web.id/"
2026/03/01 16:03:57 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET / HTTP/1.1", upstream: "http://localhost/", host: "laundryin.kelingstudio.web.id"
2026/03/01 16:03:57 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET /favicon.ico HTTP/1.1", upstream: "http://localhost/favicon.ico", host: "laundryin.kelingstudio.web.id", referrer: "https://laundryin.kelingstudio.web.id/"
2026/03/01 16:04:50 [error] 774#774: *318 connect() failed (111: Connection refused) while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET / HTTP/1.1", upstream: "http://127.0.0.1:3000/", host: "laundryin.kelingstudio.web.id"
2026/03/01 16:04:50 [error] 774#774: *318 connect() failed (111: Connection refused) while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET / HTTP/1.1", upstream: "http://[::1]:3000/", host: "laundryin.kelingstudio.web.id"
2026/03/01 16:04:50 [error] 774#774: *318 no live upstreams while connecting to upstream, client: 103.3.221.179, server: laundryin.kelingstudio.web.id, request: "GET /favicon.ico HTTP/1.1", upstream: "http://localhost/favicon.ico", host: "laundryin.kelingstudio.web.id", referrer: "https://laundryin.kelingstudio.web.id/"

Mar 01 16:03:47 kelingstudio node[3215]: Error: Cannot find module '/var/www/html/aplikasi-manajemen-laundry/server.js'
Mar 01 16:03:47 kelingstudio node[3215]: at Module.\_resolveFilename (node:internal/modules/cjs/loader:1134:15)
Mar 01 16:03:47 kelingstudio node[3215]: at Module.\_load (node:internal/modules/cjs/loader:975:27)
Mar 01 16:03:47 kelingstudio node[3215]: at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
Mar 01 16:03:47 kelingstudio node[3215]: at node:internal/main/run_main_module:28:49 {
Mar 01 16:03:47 kelingstudio node[3215]: code: 'MODULE_NOT_FOUND',
Mar 01 16:03:47 kelingstudio node[3215]: requireStack: []
Mar 01 16:03:47 kelingstudio node[3215]: }
Mar 01 16:03:47 kelingstudio node[3215]: Node.js v18.19.1
Mar 01 16:03:47 kelingstudio systemd[1]: laundry.service: Main process exited, code=exited, status=1/FAILURE
Mar 01 16:03:47 kelingstudio systemd[1]: laundry.service: Failed with result 'exit-code'.
Mar 01 16:03:48 kelingstudio systemd[1]: laundry.service: Scheduled restart job, restart counter is at 3.
Mar 01 16:03:48 kelingstudio systemd[1]: Started laundry.service - Laundryin.
Mar 01 16:03:48 kelingstudio node[3226]: node:internal/modules/cjs/loader:1137
Mar 01 16:03:48 kelingstudio node[3226]: throw err;
Mar 01 16:03:48 kelingstudio node[3226]: ^
Mar 01 16:03:48 kelingstudio node[3226]: Error: Cannot find module '/var/www/html/aplikasi-manajemen-laundry/server.js'
Mar 01 16:03:48 kelingstudio node[3226]: at Module.\_resolveFilename (node:internal/modules/cjs/loader:1134:15)
Mar 01 16:03:48 kelingstudio node[3226]: at Module.\_load (node:internal/modules/cjs/loader:975:27)
Mar 01 16:03:48 kelingstudio node[3226]: at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
Mar 01 16:03:48 kelingstudio node[3226]: at node:internal/main/run_main_module:28:49 {
Mar 01 16:03:48 kelingstudio node[3226]: code: 'MODULE_NOT_FOUND',
Mar 01 16:03:48 kelingstudio node[3226]: requireStack: []
Mar 01 16:03:48 kelingstudio node[3226]: }
Mar 01 16:03:48 kelingstudio node[3226]: Node.js v18.19.1
Mar 01 16:03:48 kelingstudio systemd[1]: laundry.service: Main process exited, code=exited, status=1/FAILURE
Mar 01 16:03:48 kelingstudio systemd[1]: laundry.service: Failed with result 'exit-code'.
Mar 01 16:03:48 kelingstudio systemd[1]: laundry.service: Scheduled restart job, restart counter is at 4.
Mar 01 16:03:48 kelingstudio systemd[1]: Started laundry.service - Laundryin.
Mar 01 16:03:48 kelingstudio node[3237]: node:internal/modules/cjs/loader:1137
Mar 01 16:03:48 kelingstudio node[3237]: throw err;
Mar 01 16:03:48 kelingstudio node[3237]: ^
Mar 01 16:03:48 kelingstudio node[3237]: Error: Cannot find module '/var/www/html/aplikasi-manajemen-laundry/server.js'
Mar 01 16:03:48 kelingstudio node[3237]: at Module.\_resolveFilename (node:internal/modules/cjs/loader:1134:15)
Mar 01 16:03:48 kelingstudio node[3237]: at Module.\_load (node:internal/modules/cjs/loader:975:27)
Mar 01 16:03:48 kelingstudio node[3237]: at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
Mar 01 16:03:48 kelingstudio node[3237]: at node:internal/main/run_main_module:28:49 {
Mar 01 16:03:48 kelingstudio node[3237]: code: 'MODULE_NOT_FOUND',
Mar 01 16:03:48 kelingstudio node[3237]: requireStack: []
Mar 01 16:03:48 kelingstudio node[3237]: }
Mar 01 16:03:48 kelingstudio node[3237]: Node.js v18.19.1
Mar 01 16:03:48 kelingstudio systemd[1]: laundry.service: Main process exited, code=exited, status=1/FAILURE
Mar 01 16:03:48 kelingstudio systemd[1]: laundry.service: Failed with result 'exit-code'.
Mar 01 16:03:49 kelingstudio systemd[1]: laundry.service: Scheduled restart job, restart counter is at 5.
Mar 01 16:03:49 kelingstudio systemd[1]: laundry.service: Start request repeated too quickly.
Mar 01 16:03:49 kelingstudio systemd[1]: laundry.service: Failed with result 'exit-code'.
Mar 01 16:03:49 kelingstudio systemd[1]: Failed to start laundry.service - Laundryin.
