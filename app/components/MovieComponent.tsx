"use client";

import { useEffect, useState } from "react";
import api from "../services/api";
import { IMovie } from "../types";
import GraphicCircle from "./GraphicCircle";

export default function MovieComponent({ params }: { params: string }) {
const [movie, setMovie] = useState<IMovie>()

useEffect(() => {
    api.get(`movie/${params}`).then(res => {
        setMovie(res.data)
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
    <section>
        <div
        className="movie-info">
        <img src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} />
        <div className="infos">
            <h1>{movie?.title}</h1>
            <h6>"{movie?.tagline}"</h6>
            <strong>Sinopse:</strong>
            <p>{movie?.overview}</p>
            <div className="more-infos">
            <div>
                <strong>Duração:</strong>
                <p>{movie?.runtime}min</p>
            </div>
            <div>
                <strong>Data de Lançamento:</strong>
                <p>{formatDate(movie?.release_date || "")}</p>
            </div>
            <div>
                <strong>Companhias:</strong>
                <div className="company-container">
                {movie?.production_companies?.map((company) => (
                    <p key={company.id}>{company.name}</p>
                ))}
                </div>
            </div>
            </div>
            <div>
            <strong>Gêneros:</strong>
            <div className="genres">
                {movie?.genres?.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
                ))}
            </div>
            </div>
            <strong>Avaliações:</strong>
            <div className="avaibles">
            <GraphicCircle percent={movie?.vote_average || "100"} />
            <p>
                <strong>Total de Votos: </strong>
                {movie?.vote_count}
            </p>
            </div>
        </div>
        </div>
        <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt={movie?.title} id="banner"/>
    </section>
  );
}
