"use client";

import SeasonComponent from "@/app/components/SeasonComponent";
import styled from "styled-components";


const SeasonStyled = styled.section`

`

export default function SeasonPage({ params } : { params: { season_id: string, slug: string }}){
 
    return (
        <SeasonStyled>
            <SeasonComponent season_number={params.season_id} serie_id={params.slug}/>
        </SeasonStyled>
    )
}