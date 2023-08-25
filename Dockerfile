FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Generate requirements.txt from Poetry
COPY pyproject.toml poetry.lock /app/
RUN pip install poetry && \
    poetry export --without-hashes -f requirements.txt > requirements.txt

# Install dependencies
RUN pip install -r requirements.txt

# Install npm packages
COPY . /app/

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN npm install
RUN npm run build
RUN rm -rf node_modules

# Copy the content of dist folder to the working directory


# Run server
CMD ["gunicorn", "app.main:app", "--workers=4", "--bind=0.0.0.0:80", "--timeout=60"]