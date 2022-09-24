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

# Expose the PORT
EXPOSE 4200

# Start the client application
CMD ["yarn", "start:public"]