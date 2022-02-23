import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Container, Typography } from "@mui/material";
import Characters from "./components/Characters";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
});

const PressStart2P = "'Press Start 2P', cursive";
const BebasNeue = "'Bebas Neue', cursive";
const RubikMono = "'Rubik Mono One', sans-serif";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ApolloProvider client={client}>
                <div className="App">
                  <div className="background-image">
                    <Container>
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
                      <Typography
                        color="white"
                        align="center"
                        style={{ fontSize: 13 }}
                      >
                        A simple site for you to view infomation about Rick and
                        Morty built using Rick and Morty GraphQL API, React.js
                        and Apollo Client.
                      </Typography>
                      <Typography
                        color="#ACE1AF"
                        align="left"
                        variant="h5"
                        pt={5}
                        pb={2}
                        fontFamily={RubikMono}
                      >
                        Characters
                      </Typography>
                      <Characters />
                    </Container>
                  </div>
                </div>
              </ApolloProvider>
            }
          />
          <Route
            path="/page/:pageNumber"
            element={
              <ApolloProvider client={client}>
                <div className="App">
                  <div className="background-image">
                    <Container>
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
                      <Typography
                        color="white"
                        align="center"
                        style={{ fontSize: 13 }}
                      >
                        A simple site for you to view infomation about Rick and
                        Morty built using Rick and Morty GraphQL API, React.js
                        and Apollo Client.
                      </Typography>
                      <Typography
                        color="#ACE1AF"
                        align="left"
                        variant="h5"
                        pt={5}
                        pb={2}
                        fontFamily={RubikMono}
                      >
                        Characters
                      </Typography>
                      <Characters />
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
