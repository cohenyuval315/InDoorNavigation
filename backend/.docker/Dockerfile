# Stage 1: Build Stage
FROM node:20.9.0-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all project files to the container
COPY . .

# Build the project
RUN npm run build

# Stage 2: Development Stage
FROM node:20.9.0-alpine AS dev

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app .

# Install development dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app with nodemon for hot-reloading
CMD ["npm", "run", "dev"]
