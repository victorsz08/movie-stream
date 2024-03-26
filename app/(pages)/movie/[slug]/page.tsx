"use client"


import styled from "styled-components";
import MovieComponent from "@/app/components/MovieComponent";
import CastsList from "@/app/components/CastsList";
import RecommendList from "@/app/components/RecommendLists";

const MovieStyled = styled.section`
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
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    color: #fff;
    margin-bottom: 6rem;
  }

  .cast-container .cast {
    paddind: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem;
    max-width: 6rem;
  }

  .cast-container .cast h3,
  .cast-container .cast p {
    font-size: 0.5rem;
  }

  .cast-container .cast img {
    width: 5rem;
    margin-bottom: 0.6rem;
  }

  .recommendations {
    padding: 2rem;
    transition: 0.3s;
    text-align: center;
  }

  .recommendations h2 {
    color: #d6d6d6;
  }

  .recommendations .recommendations-container {
    display: flex;
    justify-content: flex-start;
    margin-top: 2rem;
    text-align: left;
    transition: .5s;
  }

  .recommendations  .nav-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .recommendations .nav-container button {
    background-color: transparent;
    border: none;
    color: #5c0099;
    margin: 0 3rem;
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 40%;
    transition: 0.3s;
  }

  .recommendations .nav-container button:hover {
    color: #000814;
    background-color: #5c0099;
    transition: 0.3s;
  }

  .recommendations .nav-container svg {
    width: 2rem;
    height: 2rem;
  }
`;


export default function Movie({ params }: { params: { slug: string } }) {
  return (
    <MovieStyled>
      <MovieComponent params={params.slug}/>
      <CastsList params={params.slug}/>
      <RecommendList params={params.slug}/>
    </MovieStyled>
  );
}
