FROM node:16-alpine

ARG VERSION

ENV VERSION=$VERSION

WORKDIR /app
COPY . /app

RUN set -x \
    && apk --no-cache add git \
    && yarn \
    && yarn test \
    && yarn build

FROM node:16-alpine

ARG VERSION

ENV VERSION=$VERSION

WORKDIR /app

COPY --from=0 /app/bin /app/bin
COPY --from=0 /app/package.json /app
COPY --from=0 /app/yarn.lock /app

RUN set -x \
    && apk --no-cache add tzdata git \
	&& cp /usr/share/zoneinfo/Brazil/East /etc/localtime \
    && echo Brazil/East > /etc/timezone \
    && yarn install --prod \
    && yarn cache clean \
	&& apk del tzdata git

CMD node /app/bin/index.js