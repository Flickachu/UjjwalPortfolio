FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=development

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --prefer-offline || npm install

# Copy source
COPY . .

EXPOSE 3000
ENV HOST=0.0.0.0 PORT=3000

# Dev-friendly entry; for production consider adapter-node and a production CMD
CMD ["npm", "run", "dev"]
