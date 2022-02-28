import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Container, Typography } from "@mui/material";
import Characters from "../components/Characters";
import ApolloClient from "apollo-boost";

const CharacterListPage = () => {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
  });
  const PressStart2P = "'Press Start 2P', cursive";

  const resetEvent = () => {
    localStorage.clear();
  
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="background-image">
          <Container>
            <a href={"/"} style={{ textDecoration: "None" }}>
              <Typography
                color="#32de84"
                align="center"
                variant="h2"
                fontFamily={PressStart2P}
                className="text-shadow-black"
                pt={5}
                onClick={resetEvent}
              >
                Rick and Morty
              </Typography>
            </a>
            <Typography color="text.secondary" align="center" variant="subtitle2">
              A simple site for you to view infomation about Rick and Morty
              built using Rick and Morty GraphQL API, React.js and Apollo
              Client.
            </Typography>

            <Characters />
          </Container>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default CharacterListPage;
