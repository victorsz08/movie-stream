


export type IMovie =  {
    id?: string;
    title?: string;
    vote_average?: string;
    vote_count?: string;
    release_date?: string;
    backdrop_path?: string;
    poster_path?: string;
    overview?: string;
    production_companies?: IProductionCompanies[];
    runtime?: string | number;
    status?: boolean;
    genres?: IGenres[]
    tagline?: string;
}  

export type IProductionCompanies = {
    id?: string;
    logo_path?: string;
    name?: string;
    origin_country?: string;
}
export type IGenres = {
    id?: string | number;
    name?: string;
}

export type ICredits = {
    id?: string;
    name?: string;
    profile_path?: string;
    character?: string;
}

export type IInputSearch = {
    placeholder: string;
    value?: string;
    onchange: (e: string) => void;
    onclick?: () => void;  
}

export type IProvider = {
    provider_id?: string;
    provider_name?: string;
    logo_path?: string;
}

export type IListMovie = {
    nameList?: string;
    children?: React.ReactNode;
};

export type ICardMovie = {
    id?: string;
    title?: string;
    vote_average?: string;
    date_release?: string;
    poster?: string;
}