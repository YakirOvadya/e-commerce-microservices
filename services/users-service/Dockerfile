# Use official Node.js image
FROM node:slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose the application port
EXPOSE 3001

# Run as non-root (for OpenShift compatibility)
USER node

# Command to run the application
CMD ["npm", "start"]
