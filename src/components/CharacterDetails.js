import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GET_CHARACTER } from "../graphql/Queries";
import { useQuery } from "@apollo/react-hooks";

const CharacterDetails = () => {
  const { characterId } = useParams();
  console.log(characterId);
  const { loading, error, data } = useQuery(GET_CHARACTER, {
   variables: {id: characterId}}
  );

  if (loading) {
    return "loading...";
  }
  console.log(data);
  return <div>CharacterDetails</div>;
};

export default CharacterDetails;
