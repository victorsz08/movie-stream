"use client";

import { useEffect, useState } from "react";
import { IMovie } from "../types";
import api from "../services/api";
import CardMovie from "./CardMovie";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";





export default function RecommendList({ params } : { params: string }){
    const [recommendMovies, setRecommendMovies] = useState<IMovie[]>([]);
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        api.get(`movie/${params}/recommendations`).then(res => {
            setRecommendMovies(res.data.results)
            console.log(res.data.results)
        }).catch(err => {
            console.log(err?.response.data)
        })
    },[]);

    function nextSlide() {
        if(slide >= 200){
            setSlide(0);
        } else {
            setSlide(slide + 100)
        }
    };

    function previewSlide() {
        if(slide <= 0){
            setSlide(0)
        } else {
            setSlide(slide - 100)
        }
    }

    return (
        <div className="recommendations">
            <h2>Recomendações</h2>
            <div className="recommendations-container" style={{ transform: `translateX(-${slide}rem)` }}>
                {recommendMovies.map(movie => (
                    <CardMovie
                        key={movie.id}
                        poster={movie.poster_path}
                        title={movie.title}
                        date_release={movie.release_date}
                        vote_average={movie.vote_average}
                        id={movie.id}
                    />
                ))}
            </div>
            <nav className="nav-container">
                <button onClick={previewSlide} ><MdKeyboardArrowLeft/></button>
                <button onClick={nextSlide}><MdKeyboardArrowRight/></button>
            </nav>
        </div>
    )
}