# Foodwala

Live demo \
Base URL: http://localhost:4123/api \
API Documentation: [https://foodwala-apidoc.surge.sh/](https://foodwala-apidoc.surge.sh/) \
Server: [http://52.90.30.101:4123/api](http://52.90.30.101:4123/api)

---

## Installation

### Prerequisites:

+ NodeJS
+ NPM
+ PostgreSQL
+ Redis
+ RabbitMQ

### Installation steps:

#### Option 01: docker-compose
> If you get any error regarding PostgreSQL. Please, set up a PostgreSQL database.

+ cp .env.example prod.env
+ fill the .env file in with proper credentials for docker environment
+ chmod +x setup.sh
+ ./setup.sh

#### Option 02: Regular installation
+ npm install
+ cp .env.example .env
+ fill the .env file in with proper credentials
+ npm run migrate-prod-manual
+ npm run seed-prod-manual
+ npm run dev
+ npm run worker
