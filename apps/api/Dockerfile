# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Copy lockfile and manifests first for layer caching
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy source
COPY . .

# Build the api app with the oxc toolchain (tsdown) and prune the lockfile.
# The prune target depends on build, so this produces main.cjs plus a pruned
# package.json + package-lock.json + workspace_modules in the output directory.
RUN npx nx run api:prune --configuration=production

# Install production-only packages against the pruned lockfile
WORKDIR /app/dist/apps/api
RUN npm ci --omit=dev --ignore-scripts

# ---- Runtime Stage ----
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy built output + production node_modules
COPY --from=builder /app/dist/apps/api ./

EXPOSE 3000

CMD ["node", "main.cjs"]
