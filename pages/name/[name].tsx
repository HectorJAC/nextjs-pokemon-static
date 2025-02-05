import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Layout } from '../../components/layouts';
import { pokeApi } from '../../api';
import { Pokemon, PokemonListResponseProps } from '../../interfaces';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { localFavorites, getPokemonInfo } from '../../utils';
import confetti from 'canvas-confetti';

interface Props {
    pokemon: Pokemon;
}

const PokemonPageByName: NextPage<Props> = ({pokemon}) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

    const onToggleFavorites = () => {
        localFavorites.toggleFavorites(pokemon.id);
        setIsInFavorites(!isInFavorites);

        if (!isInFavorites) {
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: { 
                    x: 1,
                    y: 0
                }
            });
        }
    };

    return (
        <Layout title={`${pokemon.name.toUpperCase()}`}>
            <Grid.Container css={{marginTop: '5px'}} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{padding: '30px'}}>
                        <Card.Body>
                            <Card.Image 
                                src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                                alt={pokemon.name}
                                width='100%'
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button 
                                color='gradient' 
                                ghost={!isInFavorites} 
                                onClick={onToggleFavorites}
                            >
                                {isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>

                            <Container direction='row' display='flex'>
                                <Image 
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />

                                <Image 
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />  

                                <Image 
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />

                                <Image 
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async() => {
    
    const { data } = await pokeApi.get<PokemonListResponseProps>('/pokemon?limit=151');
    const pokemonNames:string[] = data.results.map(pokemon => pokemon.name);

    return {
        paths: pokemonNames.map(name => ({params: {name}})),
        fallback: false
    }
};

export const getStaticProps: GetStaticProps = async({params}) => {
    const { name } = params as {name: string};
  
    return {
        props: {
            pokemon: await getPokemonInfo(name)
        },
    }
}

export default PokemonPageByName;