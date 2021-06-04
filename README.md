## RentX Server
![Badge](https://img.shields.io/static/v1?label=DH&message=DOSOMETHINGGREAT&color=0070f3&style=<0070f3>&logo=rocket)

### Description

RentX is a fictional car rental application that offers car rental services for a specific city, and in this repository you will find the project's back-end.

### Main Techs

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Multer](https://www.npmjs.com/package/multer)

### Code Standards

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

### Getting Started

Before you begin, you will need to have the following tools installed on your machine:
- [Git](https://git-scm.com)


The project can be built directly with the Docker and Docker Compose, where the server container will be created with all the necessary configurations to start the project.
- [Docker](https://www.docker.com/)
- [Click here to install Docker and Docker Compose](https://www.notion.so/Docker-e-Docker-Compose-16771f2ceefe4a05a8c29df4ca49e97a)

Also, it’s good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/).

### :information_source: How to run

Follow the instructions below to download and use the project from this repository:

```bash
# Clone this repository using SSH
$ git clone git@github.com:daniel21h/rentx-server.git
# or clone using https
$ git clone https://github.com/daniel21h/rentx-server.git

# Go into the repository
$ cd rentx-server

# Create container and install dependencies
$ docker build -t rentx .

# Run project in real-time
$ docker-compose up

# or run project in background
$ docker-compose up -d
# To see logs
$ docker logs rentx -f
```

### Documentation

- [Swagger](https://swagger.io/)

```bash
# To access the documentation
$ http://localhost:3333/api-docs
```

### :computer: How to connect

This project is still under development

---

Made with :blue_heart: by Daniel Hessel :wave:
