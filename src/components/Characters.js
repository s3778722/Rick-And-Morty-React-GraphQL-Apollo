import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_CHARACTERS } from "../graphql/Queries";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Grid,
  Pagination,
  PaginationItem,
  TextField,
  Input,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link, useParams, useNavigate } from "react-router-dom";

const Characters = () => {
  const BebasNeue = "'Bebas Neue', cursive";
  const {
    pageNumber = 1,
    searchText,
    statusParam,
    speciesParam,
    typeParam,
    genderParam,
  } = useParams();
  let navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(Number(pageNumber));
  const [searchTerm, setSearchTerm] = useState(searchText);
  const [status, setStatus] = useState(statusParam);
  const [species, setSpecies] = useState(speciesParam);
  const [type, setType] = useState(typeParam);
  const [gender, setGender] = useState(genderParam);

  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
    variables: {
      page: Number(currentPage),
      name: searchTerm,
      status: status,
      species: species,
      type: type,
      gender: gender,
    },
  });
  const [characters, setCharacters] = useState(data?.characters?.results);
  const [pages, setPages] = useState(data?.characters?.info?.pages);

  console.log(pageNumber);

  const statusList = ["alive", "dead", "unknown"];
  const genderList = ["female", "male", "genderless", "unknown"];

  const speciesSet = new Set();
  const typeSet = new Set();
  for (let index = 0; index < characters?.length; index++) {
    if (characters[index].species) {
      speciesSet.add(characters[index].species);
    }
    if (characters[index].type) {
      typeSet.add(characters[index].type);
    }
  }
  const speciesList = [...speciesSet];
  const typeList = [...typeSet];

  useEffect(() => {
    setCharacters(data?.characters?.results);
    setPages(data?.characters?.info?.pages);
  }, [data]);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if (error) {
    return(
    <div>
    <p>No characters found...</p>
  </div>)
  }

  console.log(data);
  console.log(characters);
  console.log(pages);

  const handlePageChange = (event, value) => {
    window.scrollTo(0, 0);
    setCurrentPage(value);
  };

  const handleGenderChange = (event) => {
    window.scrollTo(0, 0);
    setGender(event.target.value);
    setCurrentPage(1);
    navigate("/page/1");
  };

  const handleStatusChange = (event) => {
    window.scrollTo(0, 0);
    setStatus(event.target.value);
    setCurrentPage(1);
    navigate("/page/1");
  };

  const handleSpeciesChange = (event) => {
    window.scrollTo(0, 0);
    setSpecies(event.target.value);
    setCurrentPage(1);
    navigate("/page/1");
  };

  const handleTypeChange = (event) => {
    window.scrollTo(0, 0);
    setType(event.target.value);
    setCurrentPage(1);
    navigate("/page/1");
  };

  const searchCharacterEvent = (e) => {
    const value = e.target.value;
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(value);
      if (value === "") {
        navigate("/");
      } else {
        navigate(`/search=${value}`);
      }
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  };

  return (
    <div>
      <TextField
        id="standard-basic"
        variant="standard"
        placeholder="Search character"
        style={{ marginBottom: 30 }}
        defaultValue={searchTerm}
        onChange={searchCharacterEvent}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          value={gender}
          label="Gender"
          onChange={handleGenderChange}
        >
          {genderList.map((g, index) => (
            <MenuItem value={g} key={index}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          value={status}
          label="Status"
          onChange={handleStatusChange}
        >
          {statusList.map((s,index) => (
            <MenuItem value={s} key={index}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Species</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          value={species}
          label="Species"
          onChange={handleSpeciesChange}
        >
          {speciesList.map((s,index) => (
            <MenuItem value={s} key={index}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          value={type}
          label="Type"
          onChange={handleTypeChange}
        >
          {typeList.map((t,index) => (
            <MenuItem value={t} key={index}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className="animate__animated animate__zoomIn"
      >
        {characters && characters?.map((character) => (
          <Grid item xs={6} md={3} className="card-fx" key={character.id}>
            <Link
              to={`/character/${character.id}`}
              style={{ textDecoration: "None" }}
            >
              <Card sx={{ maxWidth: 345, backgroundColor: "#008B8B" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="260"
                    image={character.image}
                    alt={character.name}
                  />
                  <Typography
                    fontFamily={BebasNeue}
                    variant="h5"
                    py={1}
                    style={{ textDecoration: "transparent" }}
                  >
                    {character.name}
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        mt={5}
      >
        <Pagination
          color="primary"
          count={pages}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              type={"start-ellipsis"}
              component={Link}
              selected
              to={
                searchTerm
                  ? `/page/${item.page}/search=${searchTerm}`
                  : `/page/${item.page}`
              }
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
