"use client";

import styled from "styled-components";
import { ISeasons } from "../types";
import Link from "next/link";



const CardSeasonStyled = styled.section`
padding: 1.2rem;
margin: .5rem;
cursor: pointer;
border-radius: 1.1rem;
background-color: #000;
max-width: 12rem;

a {
    text-decoration: none;
}

h3 {
    color: #D6D6D6;
    font-size: .8rem;
    margin-bottom: .8rem;
}

img:hover {
    transform: scale(110%);
    object-fit: cover;
    filter: brightness(80%);
    transition: .3s;
}


img {
    width: 9rem;
    border-radius: .9rem;
    margin-bottom: 1.3rem;
    transition: .3s;
}


p {
    color: #d6d6d6;
    font-size: .5rem;
}
`

export default function CardSeason({ air_date, episode_count, name, poster_path, season_number, serie_id } : ISeasons){
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

    return (
        <CardSeasonStyled>
            <Link href={`${serie_id}/season/${season_number}`}>
            <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={name}/>
            <h3>{name}</h3>
            <p>{episode_count} Episodios</p>
            <p>{formatDate(air_date || "")}</p>
            </Link>
        </CardSeasonStyled>
    )
}