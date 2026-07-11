FROM node:24-alpine AS build
WORKDIR /app

COPY ./package-lock.json ./package.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:24-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE ${PORT}

COPY --from=build /app/dist ./dist
COPY --from=build /app/package-lock.json /app/package.json ./
RUN npm ci --omit=dev 

CMD ["node", "./dist/server/entry.mjs"]
