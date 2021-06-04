FROM node


WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev:server"]

# To create container on Docker
# => docker build -t rentx .

# To run container
# => docker run -p 3333:3333 rentx

