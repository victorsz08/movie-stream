"use client";

import styled from "styled-components";
import GraphicCircle from "./GraphicCircle";
import { ICardMovie } from "../types";
import Link from "next/link";



const CardStyled = styled.div`
    padding: 1.2rem;
    margin: .5rem;
    cursor: pointer;
    border-radius: 1.1rem;
    border: 2px solid #5C0099;
    max-width: 12rem;
    
    a {
        text-decoration: none;
    }

    h3 {
        color: #D6D6D6;
        font-size: .8rem;
    }

    .card-infos {
        margin-bottom: 1.2rem;
    }

    .card-infos h4 {
        color: #d6d6d6;
        font-size: .4rem;
        position: absolute;
        transform: translateY(-35px) translateX(11px);
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

    .card-infos {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    p {
        color: #d6d6d6;
        font-size: .5rem;
    }
    

`

export default function CardMovie({ poster, title, vote_average, date_release, id} : ICardMovie) {
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

      const percentFormated = (parseInt(vote_average || "") / 10) * 100;
      const percentCalc = percentFormated * 90 / 100;

    return (
        <CardStyled>
            <Link href={`${id}`}>
            <img src={`https://image.tmdb.org/t/p/original${poster}`} alt={title}/> 
            <div className="card-infos">
                <h3>{title}</h3>
                <div className="graphic">
                    <svg width="45px" height="45px">
                        <circle 
                        r="15" 
                        cx="18" 
                        cy="18" 
                        stroke="#5C0099" 
                        strokeWidth="3px" 
                        fill="none" 
                        strokeDasharray="90" 
                        strokeDashoffset={90 - percentCalc}></circle>
                    </svg>
                    <h4>{percentFormated}%</h4>
                </div>
            </div>
                <p>{formatDate(date_release || "")}</p>
                </Link>
        </CardStyled>
    )
}