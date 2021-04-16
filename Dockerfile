# Default value, but can be overriten during `docker build` command
FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# This command is similar to npm-install, except it’s meant to be used in automated environments
# such as test platforms, continuous integration, and deployment – or any situation where you want
# to make sure you’re doing a clean install of your dependencies. It can be significantly faster
# than a regular npm install by skipping certain user-oriented features.
# It is also more strict than a regular install, which can help catch errors or inconsistencies caused by
# the incrementally-installed local environments of most npm users.
RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "node", "src/index.js" ]
