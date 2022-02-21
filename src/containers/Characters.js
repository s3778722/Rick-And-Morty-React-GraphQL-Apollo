import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

const GET_CHARACTERS = gql`
  query {

  }
`

export default function Characters() {
  const { data } = useQuery(GET_CHARACTERS);

  return null;
}
