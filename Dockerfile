FROM node:12-alpine

WORKDIR /actions/compatibility-table-updater

# copy the package* files
COPY package*.json ./

# Install the dependencies
RUN npm i

# Copy the rest of the files

COPY . .

CMD [ "node", "/actions/compatibility-table-updater/main.js" ]
