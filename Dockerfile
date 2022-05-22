# Pull base image, using minimal image to speed up deployment
FROM gcr.io/distroless/nodejs

# Create and change to the app directory.
WORKDIR /app

COPY package.json ./

COPY node_modules ./node_modules

# Copy local codebase into the container image
COPY . .

# Set environment variable that will used by App
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the api server
CMD [ "node", "index.js" ]
