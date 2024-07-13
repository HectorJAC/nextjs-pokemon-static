export interface PokemonListResponseProps {
    count: number;
    next?: string;
    previous?: string;
    results: ResulProps[];
}

export interface ResulProps {
    name: string;
    url: string;
    id: number;
    img: string;
}