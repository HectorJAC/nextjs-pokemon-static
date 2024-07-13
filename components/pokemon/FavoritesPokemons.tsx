import { FC } from "react";
import { Grid } from "@nextui-org/react";
import { FavoriteCardPokemon } from "./FavoriteCardPokemon";

interface FavoritesPokemonsProps {
    favoritesPokemons: number[];
}

export const FavoritesPokemons:FC<FavoritesPokemonsProps> = ({favoritesPokemons}) => {
    return (
        <Grid.Container gap={2} direction='row' justify='flex-start'>
            {
                favoritesPokemons.map((id) => (
                    <FavoriteCardPokemon key={id} id={id} />
                )) 
            }
        </Grid.Container>
    )
}
