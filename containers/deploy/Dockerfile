FROM nginx:latest
MAINTAINER gurgul.grzegorz@gmail.com

ARG ARTIFACT
ENV ARTIFACT=${ARTIFACT:-/artifacts/jmclient.tar}

ADD ${ARTIFACT} /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g daemon off;"]
