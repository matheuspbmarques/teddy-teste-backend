# Build
FROM node:22-alpine AS build

# Define Working Directory
WORKDIR /app

# Copy Package Files
COPY package*.json ./

# Install Dependecies
RUN npm install

# Copy Project Files
COPY . .

# Compile Project
RUN npm run build

# Deploy
FROM node:22-alpine AS deploy

# Defined Working Directory
WORKDIR /app

# Copy Package Files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy Prisma Contents
COPY --from=build /app/prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy Project Build
COPY --from=build /app/dist ./