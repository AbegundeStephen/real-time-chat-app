import React, { useEffect, useRef, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {io} from 'socket.io-client'
import styled from "styled-components";
import { allUsers,host } from "../utils/route";
import ChatContainer from "../components/ChatContainer";
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'



export default function Chat() {
    const socket = useRef()
    const navigate = useNavigate()

    const [contacts, setContacts] = useState([])
    const [currentChat, setCurrentChat] = useState(undefined)
    const [currentUser, setCurrentUser] = useState(undefined)
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        async function fetchCurrentUser() {
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
                setLoaded(true)
            }
        }
        
        fetchCurrentUser()
    },[])

    
    useEffect( () => {
        if(currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])

    useEffect(() => {
        async function fetchContacts() {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                  const data = await axios.get(`${allUsers}/${currentUser._id}`);
                  console.log(data)
                  setContacts(data.data);
                
                } else {
                  navigate("/setAvatar");
                }
              }
        }
        fetchContacts()
      },[currentUser]);
 
      const handleChatChange = (chat) => {
        setCurrentChat(chat);
        console.log(currentChat)
      };

    return (
        <>
        <Container>
          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {loaded && currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
            )}
          </div>
        </Container>
      </>  
    )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #87879f;
  .container {
    height: 85 vh;
    width: 85vw;
    background-color: #031b4fdc;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
