"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { IMovie } from "./types";
import api from "./services/api";
import { format } from "date-fns";
import GraphicCircle from "./components/GraphicCircle";
import ListMovies from "./components/ListMovies";
import CardMovie from "./components/CardMovie";
import Link from "next/link";



const HomeStyled = styled.main`
  padding: 60px 0;


  #banner {
    height: 32rem;
    width: 100vw;
    object-fit: cover;
    filter: brightness(10%) blur(1px);
  }

  .movie-info {
    position: absolute;
    display: flex;
    z-index: 1000;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 8rem;
  }

  .movie-info img {
    width: 18rem;
    border-radius: .5rem;
    margin-right: 2.2rem;
    transition: .3s;
    cursor: pointer;
  }

  .movie-info img:hover {
    transform: scale(110%);
    filter:  brightness(80%);
    object-fit: cover;
    transition: .3s;
  }

  .infos {
    color: #D6D6D6;
  }

  .infos h1 {
    margin-bottom: 3rem;
  }

  .infos p {
    font-size: .8rem;
    margin-bottom: 2rem;
    margin-top: .5rem;
  }

  .infos strong {
    font-size: .7rem;
  }

`

//https://image.tmdb.org/t/p/original

export default function Home() {
  const [movieBanner, setMovieBanner] = useState<IMovie>();

  function formatDate(date: string) {
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
      "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const partsDate = date.split("-");
    const day = partsDate[2];
    const month = partsDate[1];
    const year = partsDate[0];

    const monthName = months[parseInt(month) -1];

    return `${day} de ${monthName} de ${year}`; 
  }

  useEffect(() => {
    api.get("movie/upcoming")
      .then(res => {
        setMovieBanner(res?.data.results[0])
      }).catch(err => {
        console.log(err?.response?.data)
      });
  },[]);

  return (
    <HomeStyled>
        <section className="banner-container">
          <div className="movie-info">
          <Link href={`movie/${movieBanner?.id}`}><img src={`https://image.tmdb.org/t/p/original${movieBanner?.poster_path}`}/></Link>
            <div className="infos">
              <h1>{movieBanner?.title}</h1>
              <strong>Sinopse:</strong>
              <p>{movieBanner?.overview}</p>
              <strong>Data de Lançamento:</strong>
              <p>{formatDate(movieBanner?.release_date || "")}</p>
              <strong>Avaliações:</strong>
                <GraphicCircle percent={movieBanner?.vote_average || "100"}/>
            </div>
          </div>
            <img id="banner" src={`https://image.tmdb.org/t/p/original${movieBanner?.backdrop_path}`}/>
            <ListMovies nameList="Filmes Mais Populares"/>
        </section>
    </HomeStyled>
  );
}
