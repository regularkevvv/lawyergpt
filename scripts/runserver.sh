#!/bin/bash

# Run npm build
npm run build

# Check if the previous command was successful
if [ $? -eq 0 ]; then
    # Run Flask
    flask --app app/main:app run --reload --port 5000
else
    echo "Error: npm run build failed!"
    exit 1
fi
