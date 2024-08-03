export interface PokemonModel {
    id: number;
    hashID: string;
    name: string;
    selectedImage: string;
    images: string[];
    type: string;
    weight: string;
    height: string;
}

export interface PokemonListModel {
    id: number;
    hashID: string;
    name: string;
    image: string;
}