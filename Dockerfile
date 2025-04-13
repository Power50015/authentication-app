# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies in the container
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then npm install --only=production; else npm install; fi

# Copy the rest of your application's source code to the container
COPY . .

# Expose the port that your application will run on
EXPOSE 3000

# Specify the command to run your app using npm's start script
CMD ["node", "./src/app.js"]
