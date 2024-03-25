"use client"

import GraphicCircle from "@/app/components/GraphicCircle"
import api from "@/app/services/api"
import { ICredits, IMovie } from "@/app/types"
import { useEffect, useState } from "react"
import styled from "styled-components"



const MovieStyled = styled.section`
    padding-top: 80px;

    #banner {
        height: 40rem;
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
        font-size: .6rem;
      }

    
      .infos {
        color: #D6D6D6;
      }
    
      .infos h6 {
        margin-top: .3rem;
        font-size: .7rem;
        font-weight: 300;
        font-style: italic;
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


      .company-container {
        display: flex;
      }

      .company-container p {
        font-size: .8rem;
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
        padding: .6rem 1rem;
        border: 1px solid #fff;
        border-radius: 1.2rem;
        margin-right: 1rem;
      }

      .cast-crew {
        margin: 5rem 0;
      }

      .cast-crew h2 {
        color: #fff;
        text-align: center;
        margin-bottom: 2rem;

      }

      .cast-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        color: #fff;
      }

      .cast-container .cast {
        paddind: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 1rem;
        max-width: 6rem;
      }

      .cast-container .cast h3, .cast-container .cast p {
        font-size: .5rem;
      }

      .cast-container .cast img {
        width: 5rem;
        margin-bottom: .6rem;
      }
`


export default function Movie({ params } : {params : { slug: string }}){
    const [movie, setMovie] = useState<IMovie>();
    const [credits, setCredits] = useState<ICredits[]>([])
    const [providers, setProviders] = useState([]);

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
        api.get(`movie/${params.slug}`)
            .then(res => {
                setMovie(res?.data)
            }).catch(err => {
                console.log(err?.response?.data)
            })

        api.get(`movie/${params.slug}/credits`)
            .then(res => {
              setCredits(res?.data.cast)
              console.log(res.data)
            }).catch(err => {
              console.log(err?.response?.data)
            })
    },[params.slug])

    return (
        <MovieStyled>
            <div className="movie-info">
          <img src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}/>
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
                <div >
                  <strong>Companhias:</strong>
                  <div className="company-container">
                    {movie?.production_companies?.map(company => (
                        <p key={company.id}>{company.name}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <strong>Gêneros:</strong>
                <div className="genres">
                {movie?.genres?.map(genre => (
                  <p key={genre.id}>{genre.name}</p>
                ))}
                </div>
              </div>
              <strong>Avaliações:</strong>
              <div className="avaibles">
                <GraphicCircle percent={movie?.vote_average || "100"}/>
                <p><strong>Total de Votos: </strong>{movie?.vote_count}</p> 
              </div>
            </div> 
          </div>
            <img id="banner" src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}/>
            <div className="providers">
              <h2>Onde você pode assistir?</h2>

            </div>
              <section className="cast-crew">
                <h2>Elenco</h2>
              <div className="cast-container">
              {credits.map(credit => (
                <div className="cast">
                  <img src={`https://image.tmdb.org/t/p/original${credit.profile_path}`}/>
                  <h3>{credit.name}</h3>
                  <p>{credit.character}</p>
                </div>
              ))}
            </div>
              </section>
        </MovieStyled>
    )
}