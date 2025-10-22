From node:20 

RUN npm install -g pnpm
WORKDIR /app 

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run db:generate

EXPOSE 3000

CMD ["pnpm", "run", "dev"]