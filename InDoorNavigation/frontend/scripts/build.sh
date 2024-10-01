docker build -t indoor_client:latest -f ./.docker/Dockerfile.client .

# docker run -it --rm -p 8081:8081 indoor_client:latest