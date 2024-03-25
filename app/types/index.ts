


export type IMovie =  {
    id?: string;
    title?: string;
    vote_average?: string;
    vote_count?: string;
    release_date?: string;
    backdrop_path?: string;
    poster_path?: string;
    overview?: string;
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