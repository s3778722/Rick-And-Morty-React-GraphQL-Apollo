import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import GET_ALL_CHARACTERS from "../graphql/Queries";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Pagination, PaginationItem } from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link, useParams } from "react-router-dom";



const Characters = () => {
  const { pageNumber = 1} = useParams()
  const [currentPage, setCurrentPage] = useState(pageNumber);

  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
    variables: { page: Number(currentPage) },
  });
  const [characters, setCharacters] = useState(data?.characters?.results);
  const [pages, setPages] = useState(data?.characters?.info?.pages);

  console.log(pageNumber)

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
    window.scrollTo(0, 0)
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
          page={Number(pageNumber)}
          color="primary"
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
               type={"start-ellipsis"}
               component={Link}
               selected
               to={`/page/${item.page}`}
               {...item}
            />
          )}
        />
        <Typography>Developed by Han Chien Leow</Typography>
      </Grid>
      <br />
    </div>
  );
};

export default Characters;
