# Contacts BackEnd API Hapi
---

## Prerequisites

### Node >= 12.0

If this is your fist development. We encourage you to use NVM by following the steps on https://github.com/nvm-sh/nvm.


## Frameworks & 3rd party libraries

|No| Name | Version | Description |
|--|--|--|--|
|1.| [**Hapi.js**](https://hapi.dev/) | `20.2.1` | Primary Back End framework. |
|2.| [**standard**](https://github.com/standard/standard/) | `16.0.4` | Dev-only standalone package. JavaScript style guide, linter, and formatter. |
|3.| [**nodemon**](https://github.com/remy/nodemon) | `2.0.15` | Dev-only standalone package. For enabling hot-reloading in local development. |


## Development Guideline

1. Clone this repository `git clone https://github.com/valdiearsanur/contacts-api-bangkit.git`

1. Install the dependencies `npm install`

1. Run the application `npm run start`


## Deployment (Production) Guideline
---

1. Provide a server, for instance Compute Engine

1. Install required tools:

    ```
    # Install GIT
    sudo apt-get install git

    # Install NVM
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

    # Install Node 15.0.X LTS (via nvm)
    nvm install 15.0.1

    # install PM2 (via npm)
    npm install -g pm2
    ```

1. Clone Repository

    ```
    git clone https://github.com/valdiearsanur/contacts-api-hapi.git
    cd contacts-api-hapi/
    ```

1. In the project, install required packages

    ```
    npm install
    ```

1. Run the server using command below. It will be accessible in `http://INSTANCE_IP:3000`.
Note that in the real cloud VM, it requires you to allow incoming request for port 3000. Next steps we will run the web on standard port 80 so the web will be accessible in `http://INSTANCE_IP` instead of `http://INSTANCE_IP:3000`.
    ```
    HOST=0.0.0.0 PORT=3000 npm run start
    ```

1. We will run the web on standard port 80. Follow steps below : 

    a. Install NGINX `sudo apt install nginx`

    b. setting up the default configuration NGINX `sudo nano /etc/nginx/sites-enabled/default` with configuration below : 

    ```
    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        ...
        location / {
                proxy_pass http://127.0.0.1:3000;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
        }
        ...
    }
    ```
    c. restart NGINX `sudo service NGINX restart`.

    d. run the app, using localhost instead of 0.0.0.0.

    ```
    HOST=localhost PORT=3000 npm run start
    ```

1. In order to keep the application run in the background, we can use Process Manager (PM2)
    ```
    HOST=localhost PORT=3000 pm2 start index.js --name contact
    ```
