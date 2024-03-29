"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { ISeasons } from "../types";
import api from "../services/api";

const SeasonStyled = styled.section`
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
`;

export default function SeasonComponent({
  serie_id,
  season_number,
}: {
  serie_id: string;
  season_number: string;
}) {
  const [season, setSeason] = useState<ISeasons>();

  useEffect(() => {
    api
      .get(`tv/${serie_id}/season/${season_number}`)
      .then((res) => {
        console.log(res.data);
        setSeason(res?.data);
      })
      .catch((err) => {
        console.log(err?.response.data);
      });
  }, [serie_id, season_number]);

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
    <SeasonStyled>
      <div className="movie-info">
        <img
          src={`https://image.tmdb.org/t/p/original${season?.poster_path}`}
        />
        <div className="infos">
          <h1>{season?.name}</h1>
          <strong>Sinopse:</strong>
          <p>{season?.overview}</p>
          <div className="more-infos">
            <div>
              <strong>Episódios:</strong>
              <p>{season?.episodes?.length} episódios</p>
            </div>
            <div>
              <strong>Data de Lançamento:</strong>
              <p>{formatDate(season?.air_date || "")}</p>
            </div>
          </div>
        </div>
      </div>
      <img src={`https://image.tmdb.org/t/p/original${season?.poster_path}`} alt={season?.name} id="banner"/>
    </SeasonStyled>
  );
}
