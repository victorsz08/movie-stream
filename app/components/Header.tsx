"use client";

import Link from "next/link";
import styled from "styled-components";



const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3rem;
    background-color: #000814;
    box-shadow: 0 0 3px #001D3D;
    position: fixed;
    width: 100vw;
    z-index: 10000;

    a {
        text-decoration: none;
    }

    .title a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .title h1 {
        color: #d6d6d6;
        font-weight: 700;
        font-size: 1.2rem;
    }

    .title h1 + h1 {
        color: #FFD60A;
    }

    nav a {
        font-size: .7rem;
        font-weight: 600;
        color: #d6d6d6;
        margin: 0 1rem;
        padding: .5rem 0;
    }

    nav a + a {
        color: #FFD60A;
    }

    nav a + a + a {
        color: #d6d6d6;
    }

    nav a:hover {
        border-bottom: 3px solid #ffd60a;
        transition: .1s;
    }
`

export default function Header() {
    return (
        <HeaderStyled>
            <div className="title">
                <Link href="/">
                    <h1>Movie</h1>
                    <h1>Stream</h1>
                </Link>
            </div>
            <nav>
                <Link href="/">HOME</Link>
                <Link href="/">LANÇAMENTOS</Link>
                <Link href="/">FILMES</Link>
                <Link href="/">SERIES/TV</Link>
                <Link href="/">SOBRE</Link>
            </nav>
        </HeaderStyled>
    )
}