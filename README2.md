docker exec -it <container id> /bin/bash

adb kill-server - // on host
adb reverse tcp:8081 tcp:8081  



Go To Indoor Backend Folder /indoor/backend

1. ./scripts/start-services.sh:
starting all the services required in the server
mongo db

2. starting the server
- ./scripts/dev.sh: starting dev server 
- ./scripts/debug.sh: starting dev server in debug mode 

Go To Indoor Frontend Folder /indoor/frontend
unfortunatly i did not have enough time to implemet the docker so you can run the client in emulator 
today is the 7/8/2024 and tomrow is the due date
so u will have to install infrastracture for react native for android whichs includes android studio and the relevant packages.
platform tools 34.0.0

or you can try to get this working with the docker
first use build_android.sh to build the infrastracture of android then use  

2. starting the client
- npm install
- cd ./frontend/Client
- npm start 

in config
check the server host is pointing to the correct host of the server, needs an IP address.


more time is needed for a huge project like this.




PLEASE NOTICE THAT THE MOCK IS IMPLEMENTED IN THE WEBSOCKET WHICH IS NOT A GREAT IDEA.



