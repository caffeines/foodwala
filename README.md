# Manush AI Backend Task

Live demo \
API Documentation: [https://manushai-apidoc.surge.sh/](https://manushai-apidoc.surge.sh/) \
Server: [http://34.227.90.204:4123/api](http://34.227.90.204:4123/api)

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
