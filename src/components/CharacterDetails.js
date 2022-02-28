import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GET_CHARACTER } from "../graphql/Queries";
import { useQuery } from "@apollo/react-hooks";
import {
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Card,
  Grid,
  Avatar,
  CardHeader,
  Divider,
  Chip,
  Box,

} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Spinner from "./Spinner";


const CharacterDetails = () => {
  let navigate = useNavigate();
  const BebasNeue = "'Bebas Neue', cursive";
  const RubikMono = "'Rubik Mono One', sans-serif";

  const { characterId } = useParams();
  console.log(characterId);

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: characterId },
  });

  const [characterDetails, setCharacterDetails] = useState(data?.character);
  useEffect(() => {
    setCharacterDetails(data?.character);
  }, [data]);

  if (loading) {
    return <Spinner />;
  }
  console.log(characterDetails);
  const resetEvent = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item my={5}>
          <Card
            sx={{ maxWidth: 500 }}
            className="animate__animated animate__fadeInLeft"
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button onClick={resetEvent}>Close
              <CloseIcon/>
              </Button>
            </Grid>
            <div style={{ paddingTop: 5 }}>
              <Typography
                color="primary.dark"
                variant="body1"
                fontFamily={RubikMono}
                align="center"
              >
                Character Details
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                color="text.secondary"
                align="center"
              >
                Date created: {characterDetails?.created.slice(0, 10)}
              </Typography>
            </div>

            <CardMedia
              component="img"
              image={characterDetails?.image}
              alt={characterDetails?.name}
              style={{
                padding: 30,
                borderRadius: "15%",
              }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                fontFamily={BebasNeue}
                color="primary"
              >
                {characterDetails?.name}
              </Typography>
              <hr />
              <Typography
                variant="overline"
                component="div"
                color="primary.dark"
              >
                ({characterDetails?.gender})
              </Typography>
              <Typography gutterBottom variant="overline" component="div">
                {characterDetails?.status} - {characterDetails?.species}
              </Typography>
              {characterDetails?.type && (
                <Typography
                  gutterBottom
                  variant="overline"
                  component="div"
                  color="text.secondary"
                >
                  {characterDetails?.type}
                </Typography>
              )}
              <hr />
              <Typography
                variant="body1"
                color="text.secondary"
                align="left"
                mt={3}
              >
                Origin:{" "}
                {characterDetails?.origin?.name[0].toUpperCase() +
                  characterDetails?.origin?.name.slice(1)}
              </Typography>
              <Typography variant="body1" color="text.secondary" align="left">
                Last known location:{" "}
                {characterDetails?.location?.name[0].toUpperCase() +
                  characterDetails?.location?.name.slice(1)}
              </Typography>
              <Divider style={{ marginTop: 10, marginBottom: 10 }}>
                <Chip label="Episodes" color="primary" />
              </Divider>
              {characterDetails?.episode?.map((e) => (
                <Typography variant="body2" color="text.secondary" align="left">
                  {e.episode} - {e.name}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </div>
  );
};

export default CharacterDetails;
