# covidexposure-client

## Getting Started
Before moving on in this section, please install the latest LTS version of Node.js and npm. It is recommended to follow the tutorial [here](https://www.youtube.com/watch?v=ohBFbA0O6hs).

1. Enter the `covidexposure-client` in terminal and execute `npm i`
2. Run `npm start`

## Deployment
1. Enter the `covidexposure-client` in terminal and execute `npm i`
2. Run `npm run build`
3. Move the `build` folder to somewhere you want to serve static files

## Docker
### Build
```
docker build -f Dockerfile -t covidexposurefrontend ./
```
### Run
```
docker run -ti -p 3000:3000 covidexposurefrontend
```
