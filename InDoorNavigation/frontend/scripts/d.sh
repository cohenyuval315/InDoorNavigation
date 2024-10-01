docker run --rm -it --privileged --device=/dev/bus/usb -p 5037:5037 -v /dev/bus/usb:/dev/bus/usb my-react-native-android-app


docker run -it -v .:/app  reactnativecommunity/react-native-android  

docker run --rm -it --env "ANDROID_ADB_SERVER_ADDRESS=host.docker.internal" --add-host=host.docker.internal:host-gateway -v .:/app  reactnativecommunity/react-native-android  

apt-get update -y -qq
apt-get install -y -qq curl unzip
curl -OLs https://dl.google.com/android/repository/platform-tools-latest-linux.zip
unzip -q platform-tools-latest-linux.zip
./platform-tools/adb version
./platform-tools/adb devices