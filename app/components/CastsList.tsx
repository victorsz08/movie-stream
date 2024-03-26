"use client";

import { useEffect, useState } from "react";
import api from "../services/api";
import { ICredits } from "../types";



export default function CastsList({ params } : { params: string}) {
    const [casts, setCasts] = useState<ICredits[]>([]);

    useEffect(() => {
        api.get(`movie/${params}/credits`).then((res)=> {
            const renderCasts = [];

            for(let i = 0; i < 10; i++) {
                renderCasts.push(res.data.cast[i])
            }

            setCasts(renderCasts)
        }).catch(err => {
            console.log(err?.response.data)
        })
    },[params]);

  
    return (
        <div className="cast-crew">
            <h2>Elenco</h2>
            <div className="cast-container">
            {casts.map(cast => (
                    <div className="cast" key={cast.id}>
                    <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}/>
                    <h3>{cast.name}</h3>
                    <p>{cast.character}</p>
                    </div>
            ))}
            </div>
        </div>
    )
   
}