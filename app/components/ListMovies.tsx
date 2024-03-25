"use client";


import styled from "styled-components";
import { IListMovie, IMovie } from "../types";
import CardMovie from "./CardMovie";
import { useEffect, useState } from "react";
import api from "../services/api";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";



const ListStyled = styled.section`
    padding: 4rem 1rem;
    margin-top: 3rem;
    

    .list {
        display: flex;
        justify-content: center;
        align-items; center;
        flex-wrap: wrap;
    }

    h2 {
        color: #d6d6d6;
        margin-bottom: 2rem;
        padding-left: 1.4rem;
        border-left: 8px solid #5C0099;
    }

    .navigation-pages {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 6rem;
    }

    .navigation-pages h6, .navigation-pages p {
        color: #D6D6D6;
        margin: 0 1.5rem;
    }

    .navigation-pages p {
        font-size: .5rem;
    }

    .navigation-pages button {
        padding: .8rem 1rem;
        border: none;
        color: #5C0099;
        background-color: transparent;
        font-weight: 800;
        border-radius: .6rem;
        cursor: pointer;
        margin: 0 .5rem;
    }

    .navigation-pages button:hover {
        background-color: #5C0099;
        border-radius: 2rem;
        color: #000814;
    }

    .navigation-pages button svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    .navigation-pages .page-number {
        border: none;
        font-weight: 800;
        color: #3D0066;
    }

    .navigation-pages .page-number-active {
        background-color: #5C0099;
        border-radius: 2rem;
        color: #000814;
    }
`


export default function ListMovies({ nameList } : IListMovie ) {
    const [moviesList, setMoviesList] = useState<IMovie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const maxPageNumbersToShow = 7;

    console.log(moviesList)


    useEffect(() => {
        api.get(`movie/popular?page=${page}`)
            .then(res => {
                setMoviesList(res.data.results)
                setTotalPages(res.data.total_pages)
            }).catch(err => {
                console.log(err?.response.data)
            })
    },[page])

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        } 
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage = 1;
        let endPage = maxPageNumbersToShow;

        if (page > Math.floor(maxPageNumbersToShow / 2)) {
            startPage = page - Math.floor(maxPageNumbersToShow / 2);
            endPage = page + Math.floor(maxPageNumbersToShow / 2);
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === page ? 'page-number-active' : 'page-number'}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };


    return (
        <ListStyled>
            <h2>{nameList}</h2>
            <main className="list">
            {moviesList.map(movie => (
                <CardMovie id={movie.id} key={movie.id} title={movie.title} poster={movie.poster_path} date_release={movie.release_date} vote_average={movie.vote_average} />
              ))}
            </main>
            <nav className="navigation-pages">
                {page > 1 && <button onClick={handlePrevPage}><MdKeyboardArrowLeft/></button>}
                    {renderPageNumbers()}
                <button onClick={handleNextPage}><MdKeyboardArrowRight/></button>
            </nav>
        </ListStyled>
    )
} 
