FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache postgresql-client
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN mkdir -p /app/data/uploads && chown -R node:node /app
USER node
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5000/api/health/ready || exit 1
CMD ["node", "server.js"]
