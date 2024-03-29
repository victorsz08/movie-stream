"use client";

import CastsList from "@/app/components/CastsList";
import SerieTvComponent from "@/app/components/SerieTvComponent";
import styled from "styled-components";


const SerieTvPageStyled = styled.section`
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

`


export default function SerieTvPage({ params } : { params: { slug: string }}){
    return (
        <SerieTvPageStyled>
            <SerieTvComponent params={params.slug}/>
            <CastsList params={`tv/${params.slug}`}/>
        </SerieTvPageStyled>
    )
}