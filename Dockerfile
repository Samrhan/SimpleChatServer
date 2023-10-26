FROM node:16-alpine3.14 as build

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

RUN yarn build

############################################################
#                          RUN                             #
############################################################
FROM node:16-alpine3.14


WORKDIR /usr/src/app

COPY package.json yarn.lock .env* ./

RUN yarn install --frozen-lockfile --production

# Copy the built assets of the api app
COPY --from=build /usr/src/app/dist /usr/src/app/dist


CMD node dist/main.js