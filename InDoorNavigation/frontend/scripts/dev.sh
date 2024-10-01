DOCKER_COMPOSE_FILE="./.docker-compose/docker-compose.dev.yml"
ENV_FILE="./env/.env.development"

# Run docker-compose with the specified options
docker compose -f $DOCKER_COMPOSE_FILE --env-file $ENV_FILE up --build