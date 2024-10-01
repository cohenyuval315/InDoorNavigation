# #!/bin/sh
# # copy from the image backup location to the volume mount
# cp -a /home/node/app/node_modules/* /home/node/app/node_modules/
# # this next line runs the docker command
# exec "$@"

RUN mkdir ./dist/seed
RUN mkdir ./dist/data
COPY ../src/seeding ./dist/seed
COPY ../src/data ./dist/data



