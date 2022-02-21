This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Instructions
For the technical round of the interview we would like you to create a ReactJS application that
displays characters from the Rick and Morty GraphQL API.

https://rickandmortyapi.com/documentation/#graphql

This project was bootstrapped using create-react-app and has Apollo Client already configured. A basic
example of how to use @apollo/react-hooks can be found in containers/Characters.js

When you are done send us back a link to your git repository.

If you have any questions please reach out to david@mojocrowe.com

### Minimum requirements

Create the following pages:

- Characters
  - List characters and display their name and image
  - Allowing searching for characters based on their name
  - Link each character to their details page
- Character Details
  - Display all of the characters information
  - List the episodes that the character appears in

### Advanced

- Add pagination to the Characters page
- Allowing filtering of characters based on gender, species, status, and type
- Write a unit test for one of your presentational components

## Resources

Apollo Hooks: https://www.apollographql.com/docs/react/api/react-hooks

GraphQL Playground is a great way to interact with a GraphQL endpoint before implementing it
into you own apllication. The Rick and Morty playground can be found here:

https://rickandmortyapi.com/graphql
