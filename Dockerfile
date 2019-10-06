FROM neo4j:3.5

WORKDIR /opt/bible-verse

# Copying requirements
add . .

RUN DEBIAN_FRONTEND=noninteractive apt update && apt-get -y upgrade
RUN apt install -y gnupg2
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update \
    && apt install -y nodejs yarn
RUN yarn && yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
