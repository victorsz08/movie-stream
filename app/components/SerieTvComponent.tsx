"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { ISerieTv } from "../types";
import api from "../services/api";
import GraphicCircle from "./GraphicCircle";
import CardSeason from "./CardSeason";


const SerieTvComponentStyled = styled.section`
padding-top: 80px;

#banner {
  height: 40rem;
  width: 100vw;
  object-fit: cover;
  filter: brightness(20%);
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
  border-radius: 0.5rem;
  margin-right: 2.2rem;
}

.more-infos {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.more-infos div {
  margin-right: 1.6rem;
}

.more-infos p {
  font-size: 0.6rem;
}

.infos {
  color: #d6d6d6;
}

.infos h6 {
  margin-top: 0.3rem;
  font-size: 0.7rem;
  font-weight: 300;
  font-style: italic;
  margin-bottom: 3rem;
}

.infos p {
  font-size: 0.8rem;
  margin-bottom: 2rem;
  margin-top: 0.5rem;
}

.infos strong {
  font-size: 0.7rem;
}

.company-container {
  display: flex;
}

.company-container p {
  font-size: 0.8rem;
  margin-right: 1rem;
}

.avaibles {
  display: flex;
  align-items: flex-end;
}

.genres {
  display: flex;
}

.genres p {
  padding: 0.6rem 1rem;
  border: 1px solid #fff;
  border-radius: 1.2rem;
  margin-right: 1rem;
}

.seasons-container h1 {
    text-align: center;
    color: #fff;
    margin-bottom: 4rem;
    font-size: 2rem;
}

.seasons-container {
    padding: 3rem 0;
}

.seasons-container .cards-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
`



export default function SerieTvComponent({ params } : { params: string }) {
    const [serie, setSerie] = useState<ISerieTv>();

useEffect(() => {
    api.get(`tv/${params}`).then(res => {
        console.log(res?.data)
        setSerie(res.data) 
    }).catch(err => console.log(err?.response.data))
},[]);



  function formatDate(date: string) {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const partsDate = date.split("-");
    const day = partsDate[2];
    const month = partsDate[1];
    const year = partsDate[0];

    const monthName = months[parseInt(month) - 1];

    return `${day} de ${monthName} de ${year}`;
  }

    return (
        <SerieTvComponentStyled>
            <div
        className="movie-info">
        <img src={`https://image.tmdb.org/t/p/original${serie?.poster_path}`} />
        <div className="infos">
            <h1>{serie?.name}</h1>
            <h6>"{serie?.tagline}"</h6>
            <strong>Sinopse:</strong>
            <p>{serie?.overview}</p>
            <div className="more-infos">
            <div>
                <strong>Temporadas:</strong>
                <p>{serie?.number_of_seasons} temporadas</p>
            </div>
            <div>
                <strong>Episódios:</strong>
                <p>{serie?.number_of_episodes} episódios</p>
            </div>
            <div>
                <strong>Data de Lançamento:</strong>
                <p>{formatDate(serie?.first_air_date || "")}</p>
            </div>
            </div>
            <div>
            <strong>Gêneros:</strong>
            <div className="genres">
                {serie?.genres?.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
                ))}
            </div>
            </div>
            <strong>Avaliações:</strong>
            <div className="avaibles">
            <GraphicCircle percent={serie?.vote_average || "100"} />
            <p>
                <strong>Total de Votos: </strong>
                {serie?.vote_count}
            </p>
            </div>
        </div>
        </div>
        <img src={`https://image.tmdb.org/t/p/original${serie?.backdrop_path}`} alt={serie?.name} id="banner"/>
        <div className="seasons-container">
            <h1>Temporadas</h1>
            <div className="cards-container">
            {serie?.seasons?.map((season) => (
                <CardSeason air_date={season.air_date} episode_count={season.episode_count} key={season.id} 
                name={season.name} poster_path={season.poster_path} id={season.id} serie_id={serie.id} season_number={season.season_number}/>
            ))}
            </div>
        </div>
        </SerieTvComponentStyled>
    )
}