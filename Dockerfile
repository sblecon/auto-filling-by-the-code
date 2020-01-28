FROM node:12-alpine

# set the workdir
WORKDIR /app

# copy the package* files
COPY package*.json ./

# Install the dependencies
RUN npm i

# Copy the rest of the files

COPY . .

CMD [ "node", "main.js" ]
