DOCKER_COMPOSE_FILE="./.docker-compose/docker-compose.dev.yml"
ENV_FILE="./env/.env.development"

# Run docker-compose with the specified options

docker build -t indoor_dependencies:latest -f ./.docker/Dockerfile.dependencies .

docker compose -f $DOCKER_COMPOSE_FILE --env-file $ENV_FILE up --build