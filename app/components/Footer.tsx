"use client";

import styled from "styled-components"




const FooterStyled = styled.footer`
    display: grid;
    align-items: center;
    justify-content: center;
    height: 15rem;
    background-color: #000;

    .title {
        display: flex;
        justify-content: center;
    }

    .title h2 {
        color: #D6D6D6;
        font-size: 1rem;
    }

    .title h2 + h2 {
        color: #FFD60A;
    } 

    .copyright {
        text-align: center;
    }

    .copyright {
        color: #8d99ae;
        font-size: .7rem;
        font-weight: 200;
        margin-top: .8rem;
    }

`




export default function Footer() {
    return (
        <FooterStyled>
            <div className="copyright">
                <div className="title">
                    <h2>Movie</h2>
                    <h2>Stream</h2>
                </div>
                 <p>Todos direitos reservados 2024</p>
            </div>
        </FooterStyled>
    )
}