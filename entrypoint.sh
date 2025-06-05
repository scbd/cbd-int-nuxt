#!/bin/sh

# Wait for .env file to be available
while [ ! -f /usr/src/app/.env ]; do
    echo "Waiting for .env file..."
    sleep 1
done

echo ".env file found, starting application..."
exec node -r dotenv/config .output/server/index.mjs