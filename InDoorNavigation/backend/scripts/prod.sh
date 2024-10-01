DOCKER_COMPOSE_FILE="./docker-compose.prod.yml"
ENV_FILE="./.env.production"

# Run docker-compose with the specified options
docker compose -f $DOCKER_COMPOSE_FILE --env-file $ENV_FILE up --build