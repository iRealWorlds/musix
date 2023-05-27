FROM node:lts as build

# Create app directory
WORKDIR /app/src

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli

# Bundle app source
COPY . .

# Build app
RUN ng build

# Run app
FROM nginx:alpine as run

# Create app directory
WORKDIR /app/src

# Copy build from build stage
COPY --from=build /app/src/dist/webapp /usr/share/nginx/html

EXPOSE 80

