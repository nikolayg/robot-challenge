# Stage 1: Use separate small container to build
FROM node:18.18.0-slim as builder

WORKDIR /app

# Copy only the dependency definitions
COPY package.json yarn.lock ./

# Only re-install if package.json or yarn.lock change
RUN yarn install --ignore-engines

# Copy the code after installing dependencies - Note! .dockerignore
COPY . .

# Compile and optimise dependencies
RUN yarn run build

# Prepare the bundle folder
RUN sh ./bundle.sh

# Stage 2: Build the actual container from the builder's output
FROM node:18.18.0-slim

# Run as a non-root user "node" (created in base image)
USER node
WORKDIR /home/node/app

# Default env vars
ENV NODE_ENV=production

# Copy build bundle from the builder container
COPY --from=builder /app/bundle .

# Use CMD instead of ENTRYPOINT, so we can debug via "docker run -it [container] /bin/sh"
CMD ["npm", "start"]