FROM node:20 AS base
WORKDIR /app
# RUN npm i -g pnpm
COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine3.19 AS release
WORKDIR /app
# RUN npm i -g pnpm

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next

EXPOSE 80

CMD ["npm", "run", "start:docker"]