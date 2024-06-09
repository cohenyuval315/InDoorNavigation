FROM rn-android:latest

COPY ./Client /app

WORKDIR /app

RUN yarn install

CMD ["sh", "-c", "npx react-native run-android --no-packager"]