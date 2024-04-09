FROM node
WORKDIR /app
RUN npm init -y
RUN npm install mongodb mongoose redis express cors socket.io socket.io-client typescript
RUN npm install @types/express @types/node nodemon ts-node tsc typescript
#RUN npm install --save-dev typescript

#RUN npm init -y
#RUN npm install mongodb mongoose redis express cors socket.io socket.io-client typescript
#RUN npm install react-hook-form yup @mui/material 
#RUN npm install @emotion/react
#RUN npm install @hookform/resolvers
#RUN npm install @emotion/styled
#RUN npm install next
#RUN npm install mini-css-extract-plugin
#RUN npm install stripe body-parser bcrypt jsonwebtoken
#RUN npm install net tls

#RUN npm install ioredis
#RUN npm install dns

#RUN mkdir application && cd application && npx create-react-app application --template typescript

#WORKDIR /app/script/application
#WORKDIR /app/script/next_app


#RUN npm install# this should be can after the file system is mounted # enable tail the manually install application

#ENTRYPOINT ["npm", "run", "dev"]
#ENTRYPOINT ["npm", "start"]

ENTRYPOINT ["tail", "-f", "/dev/null"]
ENTRYPOINT ["node", "--watch", "/app/script/mern/server/server.js"]


#node --watch /app/script/mern/server/server.tsx

#pm", "start

#node --watch server.ts
#node --watch server.js