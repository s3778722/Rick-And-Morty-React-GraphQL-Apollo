import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_CHARACTERS } from "../graphql/Queries";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Grid,
  Pagination,
  PaginationItem,
  TextField,

  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Characters = () => {
  const RubikMono = "'Rubik Mono One', sans-serif";
  const BebasNeue = "'Bebas Neue', cursive";
  const {
    pageNumber = 1,
    searchText,
    statusParam = null,
    speciesParam = null,
    typeParam = null,
    genderParam = null,
  } = useParams();
  let navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(Number(pageNumber));
  const [searchTerm, setSearchTerm] = useState(searchText);
  const [status, setStatus] = useState(localStorage.getItem("status") || "");
  const [species, setSpecies] = useState(localStorage.getItem("species") || "");
  const [type, setType] = useState(localStorage.getItem("type") || "");
  const [gender, setGender] = useState(localStorage.getItem("gender") || "");

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
  console.log(data);
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
    return <Spinner />;
  } else if (error) {
    return (
      <div>
        <p>No characters found...</p>
      </div>
    );
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
    navigate(`/gender=${event.target.value}/status=${statusParam}/species=${speciesParam}/type=${typeParam}`);
    localStorage.setItem("gender", event.target.value);
  };

  const handleStatusChange = (event) => {
    window.scrollTo(0, 0);
    setStatus(event.target.value);
    setCurrentPage(1);
    navigate(`/gender=${genderParam}/status=${event.target.value}/species=${speciesParam}/type=${typeParam}`);
    localStorage.setItem("status", event.target.value);
  };

  const handleSpeciesChange = (event) => {
    window.scrollTo(0, 0);
    setSpecies(event.target.value);
    setCurrentPage(1);
    navigate(`/gender=${genderParam}/status=${statusParam}/species=${event.target.value}/type=${typeParam}`);
    localStorage.setItem("species", event.target.value);
  };

  const handleTypeChange = (event) => {
    window.scrollTo(0, 0);
    setType(event.target.value);
    setCurrentPage(1);
    navigate(`/gender=${genderParam}/status=${statusParam}/species=${speciesParam}/type=${event.target.value}`);
    localStorage.setItem("type", event.target.value);
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

  const resetEvent = () => {
    localStorage.clear();
    setStatus("");
    setSpecies("");
    setType("");
    setGender("");
    navigate("/");
  };

  return (
    <div>
      {" "}
      <Grid
        container
        pt={5}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography
            color="primary"
            align="left"
            variant="h5"
            fontFamily={RubikMono}
          >
            Characters
          </Typography>
        </Grid>
        <Grid item xs="12" md="auto">
          <TextField
            id="standard-basic"
            variant="standard"
            placeholder="Search character"
            defaultValue={searchTerm}
            onChange={searchCharacterEvent}
            style={{ marginLeft: "50" }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        py={2}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
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
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              {statusList.map((s, index) => (
                <MenuItem value={s} key={index}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Species</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              value={species}
              label="Species"
              onChange={handleSpeciesChange}
            >
              {speciesList.map((s, index) => (
                <MenuItem value={s} key={index}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              value={type}
              label="Type"
              onChange={handleTypeChange}
            >
              {typeList.map((t, index) => (
                <MenuItem value={t} key={index}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button onClick={resetEvent} style={{marginBottom: 20}}>Reset Filters</Button>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className="animate__animated animate__zoomIn"
      >
        {characters &&
          characters?.map((character) => (
            <Grid item xs={6} md={3} className="card-fx" key={character.id}>
              <Link
                to={`/character/${character.id}`}
                style={{ textDecoration: "None" }}
              >
                <Card sx={{ maxWidth: 345, backgroundColor: "#202020" }}>
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
