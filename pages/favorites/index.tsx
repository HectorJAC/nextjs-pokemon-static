import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Layout } from '../../components/layouts';
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../..//utils";
import { FavoritesPokemons } from "../../components/pokemon";

const FavoritesPage:NextPage = () => {

    const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritesPokemons(localFavorites.pokemons());
    }, []);


    return (
        <Layout title="Favoritos">
            {
                favoritesPokemons.length === 0 
                    ? (<NoFavorites />) 
                    : (<FavoritesPokemons favoritesPokemons={favoritesPokemons} />)
            }
        </Layout>
    )
};

export default FavoritesPage;