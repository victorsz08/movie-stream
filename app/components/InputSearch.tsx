"use client";

import styled from "styled-components";
import { IInputSearch } from "../types";
import { MdOutlineSearch } from "react-icons/md";


const InputStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    input {
        padding: .8rem 1rem;
        border: none;
        border-radius: 1.2rem;
        font-weight: 300;
        background-color: #d6d6d6;
        color: #000;
        width: 30vw;
    }

    input:focus {
        outline: 0;
    }

    button {
        position: absolute;
        background-color: transparent;
        border: none;
        transform: translateX(-10px) translateY(2px);
        cursor: pointer;
    }

    button svg {
        width: 1.7rem;
        height: 1.7rem;
        color: #5C0099;
    }
`

export default function InputSearch({ placeholder, value, onchange } : IInputSearch ) {
    return (
        <InputStyled>
            <input type="text" placeholder={placeholder} value={value} onChange={(e)=> onchange(e.target.value)}/>
            <button type="submit"><MdOutlineSearch/></button>
        </InputStyled>
    )
}