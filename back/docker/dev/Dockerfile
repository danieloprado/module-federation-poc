FROM node:16-alpine

WORKDIR /app

RUN apk update && apk add bash
RUN set -x \
    && chmod 775 /usr/local/bin/* \
    && chmod +x /usr/local/bin/*.sh \
    && apk --no-cache add tzdata git \
	&& cp /usr/share/zoneinfo/Brazil/East /etc/localtime \
    && echo Brazil/East > /etc/timezone \
	&& apk del tzdata 

CMD (cd ./back && yarn start:docker)