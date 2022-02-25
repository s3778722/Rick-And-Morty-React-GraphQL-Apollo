import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Container, Typography } from "@mui/material";
import CharacterDetails from "./components/CharacterDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CharacterListPage from "./pages/CharacterListPage";
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
});

const PressStart2P = "'Press Start 2P', cursive";
const BebasNeue = "'Bebas Neue', cursive";
const RubikMono = "'Rubik Mono One', sans-serif";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ACE1AF",
        dark: "#1CAC78",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<CharacterListPage />} />
          <Route path="/page/:pageNumber/" element={<CharacterListPage />} />
          <Route path="/search=:searchText/" element={<CharacterListPage />} />
          <Route path="/gender=:genderParam/" element={<CharacterListPage />} />
          <Route path="/status=:statusParam/" element={<CharacterListPage />} />
          <Route path="/species=:speciesParam/" element={<CharacterListPage />} />
          <Route path="/type=:typeParam/" element={<CharacterListPage />} />

          <Route
            path="/page/:pageNumber/search=:searchText"
            element={<CharacterListPage />}
          />
      
          <Route
            path="/character/:characterId"
            element={
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
                        >
                          Rick and Morty
                        </Typography>
                      </a>
                      <Typography
                        color="white"
                        align="center"
                        variant="overline"
                      >
                        A simple site for you to view infomation about Rick and
                        Morty built using Rick and Morty GraphQL API, React.js
                        and Apollo Client.
                      </Typography>
                      <CharacterDetails />
                    </Container>
                  </div>
                </div>
              </ApolloProvider>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
