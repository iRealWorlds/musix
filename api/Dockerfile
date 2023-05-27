# Specify Node Version and Image
FROM node:lts AS build

# Set Working Directory
WORKDIR /api/src/app

# Install Dependencies
COPY package*.json ./
RUN npm ci

# Copy Source Code
COPY . .

# Build
RUN npm run build

# Expose Port
EXPOSE 3000

# Run
FROM node:lts AS production

# Set Environment Variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set Working Directory
WORKDIR /api/src/app

# Get built files from build stage
COPY --from=build /api/src/app/dist .

# Copy node_modules from build stage
COPY --from=build /api/src/app/node_modules ./node_modules

# Run the application
CMD ["node", "main.js"]