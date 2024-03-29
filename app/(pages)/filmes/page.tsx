"use client";

import CardMovie from "@/app/components/CardMovie";
import InputSearch from "@/app/components/InputSearch";
import api from "@/app/services/api";
import { IGenres, IMovie } from "@/app/types";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
    z-index: 1000;
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

  .nav-genres button {
    text-decoration: none;
    padding: 0.6rem 0.8rem;
    color: #5c0099;
    background-color: #d6d6d6;
    border-radius: 1.1rem;
    font-size: 0.8rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }

  .nav-genres button:hover {
    transform: scale(108%);
    transition: 0.4s;
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

  .search-filter button {
    text-decoration: none;
    padding: 0.6rem 0.8rem;
    color: #3d0066;
    background-color: #fdc500;
    border-radius: 1.1rem;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    margin: 0 1rem;
  }
`;

export default function Movies() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<IGenres[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    api
      .get("genre/movie/list")
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => {
        console.log(err?.response.data);
      });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    api
      .get(`search/movie?query=${search}`)
      .then((res) => {
        setMovies(res.data.results);
        setSearch("");
      })
      .catch((err) => {
        console.log(err?.response.data);
      });
  }

  function selectFilter(id: string) {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  }

  function handleSubmitFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    api
      .get(
        `discover/movie?page=1&sort_by=popularity.desc&with_genres=${selectedGenres.map(
          (genre) => `${genre},`
        )}`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err?.response.data);
      });
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
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => selectFilter(genre.id.toString())}
              style={{
                backgroundColor: selectedGenres.includes(genre.id.toString())
                  ? "#5C0099"
                  : "#d6d6d6",
                color: selectedGenres.includes(genre.id.toString())
                  ? "#d6d6d6"
                  : "#5C0099",
              }}
            >
              {genre.name}
            </button>
          ))}
        </nav>
        <form className="search-filter" onSubmit={handleSubmitFilter}>
          <button>Filtrar</button>
          {setSelectedGenres && <button type="reset" onClick={() => setSelectedGenres([])}>Limpar Filtro</button>}
        </form>
      </main>
      <img
        id="banner"
        src="https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmlsbWVzfGVufDB8fDB8fHww"
      />
      <div className="results-search-container">
        <h1>Principais Resultados</h1>
        <div className="movies-container">
          {movies.map((movie) => (
            <CardMovie
              title={movie.title}
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              date_release={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </div>
    </MoviesStyled>
  );
}
