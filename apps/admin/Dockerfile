# Base Image
FROM node

# Set working directory
WORKDIR /app

# Copy package.json to the working directory
COPY package*.json ./

COPY nx.json ./

# Copy yarn.lock to the working directory
COPY yarn.lock ./


# Copy project files to the working directory
COPY . .

# Install dependencies using package.json
RUN yarn install

# Set environment variable PORT which is the PORT the container will run on
ENV PORT=4201
ENV DATABASE_URL="postgresql://gridwatchroot@grid-watch-server:Ntsyug@5@grid-watch-server.postgres.database.azure.com:5432/grid-watch-server"


# Expose the PORT
EXPOSE 4201

# Start the client application
CMD ["yarn", "start:admin"]