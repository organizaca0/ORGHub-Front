# Stage 1: Build the Angular app
FROM node:16-bullseye-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Remove npm cache to reduce image size
RUN npm cache clean --force

# Copy the rest of the application code
COPY . .

# Build the Angular app in production mode
RUN npm run build

# Stage 2: Serve the app using NGINX
FROM nginx:alpine

# Remove the default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
