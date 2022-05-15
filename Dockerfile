FROM node:lts
COPY . /covidExposureFrontend
WORKDIR /covidExposureFrontend
RUN npm i 
ENTRYPOINT ["npm"]
CMD ["start"]
