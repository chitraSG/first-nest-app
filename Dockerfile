# Start from a Node.js version 16 (LTS) image.
FROM node:16

# Set the working directory in the Docker container to /app.
WORKDIR /app

# Copy package.json and package-lock.json to the Docker container.
COPY package*.json ./

# Install dependencies in the Docker container.
RUN npm install

# Copy the rest of the code to the Docker container.
COPY . .

# Expose port 3000 to the outside.
EXPOSE 3000

# Start the application.
CMD ["npm", "run", "start"]