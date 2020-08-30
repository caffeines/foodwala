#!/bin/bash
echo "Starting setup server..."
echo ""

docker-compose up --build -d

echo "Finding foodwala-task docker container..."

containers=$(docker ps | grep foodwala)
containerInfo=' ' read -r -a array <<<"$containers"
containerID="${array[0]}"

echo "Running production migration..."
docker exec "$containerID" npm run migrate-prod
echo "Initializing data..."
docker exec "$containerID" npm run seed-prod

echo "Health check"
echo ""
curl -s localhost:4123 | json_pp
echo ""
echo ""
echo "Server is ready..."