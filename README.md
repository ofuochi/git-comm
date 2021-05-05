# GIT-COMMS

Github is largest version control platform there is today. It is extensively used by both technical and non-technical people around the world to version-control their work or project. This application (Git-Comms) explores the information about github commits made by a users. It is an a well-documented and well-tested RESTful API application that is intuitively easy to use.

## How to Run the App

To successfully run the app, you will need download and install **Node** (runtime environment for executing JavaScript code) and **NPM** (Node Package Manager). Head over to the website <https://nodejs.org/> to download the latest version.

> Note: If you already have Node and NPM installed on your computer you can continue to the following steps.

 Download or clone the app and navigate to the project folder. Open your terminal and install the app's dependencies using the command ```npm install```. After all the dependencies have been successfully installed. You may then proceed to run the app in either development or production mode. Instructions to run the app's unit and end-to-end test is also outlined.

### Development

To run the app in development mode, use the command ```npm run start```. When the app starts, navigate to <http://localhost:3000> to see the app running. The API follows the **OpenAPI** specification format for describing its endpoints. Navigate to <http://localhost:3000/api> to view the swagger documentation.

### Watch Mode

For watch mode, you can run the app in either of the the following steps.;

* To run the app in watch mode only, use the command ```npm run start:dev```
* To run the app in debug and watch mode, use the command ```npm run start:debug```

### Incremental Rebuild (Webpack)

To run the app using HMR (Hot Module Replacement), use the command ```npm run start:hmr```

### Production

For production build, follow these steps;

1. Build the app using the command ```npm run build```. The app is compiled into the **dist** folder in the root path of the project.
2. After building, use the command ```npm run start:prod``` to run the app in production mode.

## Architecture and API Design

 The top level architecture of the application is as described below.

1. The application collects valid query parameters (which requires the repository's owner name and the repository) from a client to query git commits
2. The application in-turn, calls the github API, passing the query parameters to fetch the git commit of a repository.
3. It then sanitizes this information into a DTO and passes it back to the requesting client.

The application is designed in a modularized manner, heavily using dependency injection to make the application loosely coupled. See below an overview of the application design

![Application Design](https://i.ibb.co/2qG5R4g/App-Overview.png)

The app is broken down into two main modules

1. The top level module (AppModule)
2. The lower level module (GithubModule)

The GithubModules contains the Github services, controllers, DTOs and models. This module is then injected in the top-level module (AppModule). This is in an effort to have a truly modularized application, which makes it easy to test each modules and it's dependencies independently.

The application has both unit and e2e test files. The unit tests, tests all the individual services without external dependencies while the e2e test all the application parts majorly via the endpoints. Below is a the applications folder structure which is important to separating business logic.

![Application folder structure](https://i.ibb.co/4SNzj9g/Folder-structure.png)

## Potential Improvements

There're a lot of potential improvements that could be implemented on the application. The most important ones being authentication, auditing, caching and data persistence. The app will be faster if the data query made to Github server is cached within the application to prevent multiple http call. Moreover, authentication would be a great feature to have in other to have in other to manage user access but this will not be possible if a the application does not have a database. Therefore, a database will be an important feature to have.