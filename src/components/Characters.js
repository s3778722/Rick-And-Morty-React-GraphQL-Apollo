import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import GET_ALL_CHARACTERS from "../graphql/Queries";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Pagination } from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const Characters = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
    variables: { page: currentPage },
  });
  const [characters, setCharacters] = useState(data?.characters?.results);
  const [pages, setPages] = useState(data?.characters?.info?.pages);

  useEffect(() => {
    if (data) {
      setCharacters(data?.characters?.results);
      setPages(data?.characters?.info?.pages);
    }
  }, [data]);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    console.log(error);
  }

  console.log(data);
  console.log(characters);
  console.log(pages);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {characters?.map((character) => (
          <Grid item xs={6} md={3} >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={character.image}
                  alt={character.name}
                />
                <ImageListItemBar title={character.name} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        style={{ backgroundColor: "#87A96B", marginTop: 30, padding: 5 }}
      >
        <Pagination
          count={pages}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
        <Typography>Developed by Han Chien Leow</Typography>
      </Grid>
      <br />
    </div>
  );
};

export default Characters;
