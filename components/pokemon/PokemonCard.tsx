import { FC } from "react";
import { ResulProps } from "../../interfaces"
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

interface PokemonCardProps {
  pokemon: ResulProps;
}

export const PokemonCard: FC<PokemonCardProps> = ({pokemon}) => {

  const router = useRouter(); 
  const onPokemonClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Grid xs={6} sm={3} xl={1} key={pokemon.id}>
      <Card 
        horevable 
        clickable
        onClick={onPokemonClick}
      >
        <Card.Body>
          <Card.Image 
            src={pokemon.img}
            alt={pokemon.name}
            width={200}
            height={200}
          />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  )
}
