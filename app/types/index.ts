


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
    name?: string;
    profile_path?: string;
    character?: string;
}

export type IListMovie = {
    nameList?: string;
};

export type ICardMovie = {
    id?: string;
    title?: string;
    vote_average?: string;
    date_release?: string;
    poster?: string;
}