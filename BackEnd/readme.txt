##資料夾
    前端(Front)
    後端(BackEnd/project.zip)
    資料庫(SQL/project_110_2.sql)

1.資料庫設定檔 (BackEnd/project/.env)
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=project_110_2
    DB_USERNAME=root
    DB_PASSWORD=

2.本機設虛擬網域，前端Api網址會需要修改到
    後端網址：http://htdocs.vhost/project/public/
                   htdocs.vhost需更改

------------------------------------------------------------------------------
xampp設定
    1. httpd設定檔(C:\xampp\apache\conf\httpd.conf)
    ```
    <Directory "D:\htdocs">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    ```

    2.vhost設定檔 (C:\xampp\apache\conf\extra\httpd-vhosts.conf)
    ```
    <VirtualHost htdocs.vhost:80>
        ##ServerAdmin webmaster@dummy-host.example.com
        DocumentRoot "D:\htdocs"
        ServerName htdocs.vhost
        ##ServerAlias www.dummy-host.example.com
        ##ErrorLog "logs/dummy-host.example.com-error.log"
        ##CustomLog "logs/dummy-host.example.com-access.log" common
    </VirtualHost>
    ```

    3.hosts設定檔 (C:\Windows\System32\drivers\etc\hosts)
    ```
    127.0.0.1 htdocs.vhost
    ```
