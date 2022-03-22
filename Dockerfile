# Pull in the official lightweight version of Node 16.
FROM node:latest

# Create and change to the app directory.
WORKDIR /app

COPY package.json .

# Install production dependencies.
RUN npm install

# Copy local codebase into the container image
COPY . .

# Set environment variable that will used by App
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the api server
CMD [ "npm", "run", "start" ]
