# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "index.js"]
