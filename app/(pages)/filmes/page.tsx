"use client";

import CardMovie from "@/app/components/CardMovie";
import InputSearch from "@/app/components/InputSearch";
import api from "@/app/services/api";
import { IGenres, IMovie } from "@/app/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components"



const MoviesStyled = styled.section`
    padding: 80px 0;

    #banner {
        height: 30rem;
        width: 100vw;
        object-fit: cover;
        filter: brightness(20%);
    }

    .search-bar-container {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 30rem;
        z-index: 10000;
        width: 100vw;
    }

    .search-bar-container h1 {
        color: #fff;
        margin-bottom: 2rem;
        font-size: 2.4rem;
    }

    .nav-genres {
        padding: 3rem 8rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.5rem;
    }

    .nav-genres a {
        text-decoration: none;
        padding: .6rem .8rem;
        color: #5C0099;
        background-color: #d6d6d6;
        border-radius: 1.1rem;
        font-size: .8rem;
        font-weight: 600; 
    }

    .nav-genres a:hover {
        transform: scale(108%);
        transition: .4s;
    }

    .results-search-container {
        text-align: center;
        padding: 5rem 0;
    }

    .results-search-container h1 {
        color: #fff;
        margin: 2rem 0;
    }
    
    .movies-container {
        display: flex;
        text-align: left;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }
`


export default function Movies() {
    const [search, setSearch] = useState("");
    const [genres, setGenres] = useState<IGenres[]>([]);
    const [movies, setMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        api.get("genre/movie/list").then(res => {
            setGenres(res.data.genres)
        }).catch(err => {
            console.log(err?.response.data)
        })
    },[]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        api.get(`search/movie?query=${search}`)
            .then(res => {
                setMovies(res.data.results)
            }).catch(err => {
                console.log(err?.response.data)
            })
    }

    return (
        <MoviesStyled>
            <main className="search-bar-container">
                <h1>Buscar Filmes</h1>
                <form onSubmit={handleSubmit}>
                    <InputSearch 
                    placeholder="Ex: Harry Potter e o Prisioneiro de Azkaban"
                    value={search}
                    onchange={setSearch}
                    />
                </form>
                <nav className="nav-genres">
                    {genres.map(genre => (
                        <Link key={genre.id} href={`/filmes/${genre.name}`}>{genre.name}</Link>
                    ))}
                </nav>
            </main>
            <img id="banner" src="https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmlsbWVzfGVufDB8fDB8fHww"
            />
            {movies.length > 0 ? 
            <div className="results-search-container">
                <h1>Resultados para: {search}</h1>
                <div className="movies-container">
                    {movies.map(movie => (
                        <CardMovie title={movie.title} key={movie.id} id={movie.id} poster={movie.poster_path} date_release={movie.release_date}
                        vote_average={movie.vote_average}/>
                    ))}
                </div>
            </div> 
            :
            <div className="results-search-container">
                <h1>Nenhum resultado encontrado para: {search}</h1>
            </div>
            }
        </MoviesStyled>
    )
}