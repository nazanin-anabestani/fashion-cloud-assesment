# fashion-cloud-nazanin-anabestani

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html)

## Running project local

This project is build with Node 14 and npm 8.5.0
### Install dependencies

run the following command to install the dependencies:

```sh
npm install
```

### Run the tests

```sh
npm test
```

### Run the application

```sh
npm start
```

Open http://127.0.0.1:8080 in your browser.

You can see the two links down there. 
you can access the open api documents using http://127.0.0.1:8080/openapi.json 
you also can access the swagger gui using http://127.0.0.1:8080/explorer 


## Run project in a container (No need to install mongoDB or fix the Node version)

for this purpose you should have docker installed on your machine.


by run the following command, a docker image will be created for your project and another one for mongodb.
the first time the project docker image is getting build, it will install the dependencies. so it's gonna take some time.
after building to images they are gonna start running in a docker container.
if you want to run the process in the background use the command bellow.

```sh
docker-compose up -d
```

Otherwise, if you want to check the process you can use the command bellow.

```sh
docker-compose up
```

You can stop the container using the command bellow. 
```sh
docker-compose down
```
