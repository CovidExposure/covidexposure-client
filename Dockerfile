FROM node:lts

COPY . /covidExposureFrontend

WORKDIR /covidExposureFrontend

RUN npm ci

ENTRYPOINT ["npm"]

CMD ["start"]
