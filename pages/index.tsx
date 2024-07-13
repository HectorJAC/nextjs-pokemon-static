import { NextPage, GetStaticProps } from "next";
import { Layout } from "../components/layouts";
import { pokeApi } from "../api";
import { PokemonListResponseProps, ResulProps } from "@/interfaces";
import { PokemonCard } from "../components/pokemon";
import { Grid } from "@nextui-org/react";

interface Props {
  pokemons: ResulProps[];
}

const HomePage:NextPage<Props> = (props) => {
  return (
    <Layout title="Listado de Pokemons" >
      <Grid.Container gap={2} justify='flex-start'>
        {props.pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async() => {
  const { data } = await pokeApi.get<PokemonListResponseProps>("/pokemon?limit=151");
  
  const pokemons = data.results.map((pokemon, id) => {
    return {
      ...pokemon,
      id: id + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id + 1}.svg`
    }
  
  })

  return {
    props: {
      pokemons: pokemons,
    },
 }
}

export default HomePage;
