import React,{useState, useEffect} from "react";
import styled from 'styled-components'
import Robot from "../assets/robot.gif"


export default function Welcome({currentUser}) {
   const [username, setUsername] = useState("");
    useEffect(() => {
       async function fetchData() {
        setUsername(
            await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            ).username
        );
       }
       fetchData()
    });

    return (
        <Container>
            <img src={Robot} alt=""/>
            <h>
                Welcome, <span>{username}</span>
            </h>
            <h3>Please select a chat to start messaging</h3>
        </Container>
    )
}

const Container = styled.div`
display: flex ;
justify-content: center;
align-items: center;
color:white;
flex-direction: column;
img{height:20rem};
span: {
    color: #4e0eff;
}


`
