# Use the official image as a parent image.
FROM node:current-buster

# Set the working directory.
WORKDIR /opt/consolebox

# Copy the file from your host to your current location.
COPY package.json .
COPY app.js .

# Run the command inside your image filesystem.
RUN apt update
#RUN apt install -y nodejs npm
RUN npm install npm@latest -g
RUN npm install
COPY . .

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 28000-28501

ENV BOT_TOKEN="1265844502:AAEOj4tn15jAEjzDLrpR_wVoQfDUKaRzDz4"

# Run the specified command within the container.

CMD [ "npm", "start" ]