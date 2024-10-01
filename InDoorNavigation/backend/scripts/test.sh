DOCKER_COMPOSE_FILE="../docker-compose.yml"
ENV_FILE="../.env.testing"

# Run docker-compose with the specified options
docker compose -f $DOCKER_COMPOSE_FILE --env-file $ENV_FILE up --build