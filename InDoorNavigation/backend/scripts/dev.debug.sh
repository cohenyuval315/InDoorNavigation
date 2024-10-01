DOCKER_COMPOSE_FILE="./.docker-compose/docker-compose.dev.debug.yml"
ENV_FILE="./env/.env.development"


docker build -t indoor_dependencies:latest -f ./.docker/Dockerfile.dependencies .
# Run docker-compose with the specified options

docker compose -f $DOCKER_COMPOSE_FILE --env-file $ENV_FILE up --build