import React, { useEffect, useState } from "react";
import  styled from "styled-components";
import Logo from "../assets/logo.svg"

export default function Contacts({contacts, changeChat}) {
 
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage,setCurrentUserImage] = useState(undefined);
   const [currentSelected, setCurrentSelected] = useState(undefined)
   const currentUser = JSON.parse(localStorage.getItem("chat-app-current-user"))
useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }
  },[])



const changeCurrentChat = (index,contact)=> {
  setCurrentSelected(index)
  changeChat(contact)

 }

   
   return (
    <>
    {currentUserImage && currentUserName && (
        <Container>
            <div className="brand">
                <img src={Logo} alt="logo" />
                <h3>Beep</h3>
             </div>
             <div className="contacts">
                {contacts.map((contact, index) => {
                    return(
                        <div
                        key={index}
                        className={`contact ${index === currentSelected? "selected" : ""}`}
                        onClick={() => changeCurrentChat(index,contact)}>
                             <div className="avatar">
                                 <img src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                alt="avatar"/> 
                                 
                                <div className="username">
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
             </div>
             <div className="current-user">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
                </div>

                <div className="username">
                    <h2>{currentUserName}</h2>

                </div>
             </div>
        </Container>
    ) }
    </>
   )
}

const Container = styled.div`
    display: grid;
    grid-template-rows:10% 75% 15%;
    overflow: hidden;
    background-color: #140b0b;
    height:96vh ;
    .brand{
        display:flex;
        flex-direction:column;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height:1rem;
        }
        h3 {
            color: white;
            text-transform:uppercase;
            margin-top:-12px
        }

    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width:0.1rem;
                border-radius: 1rem;

            }
        }
        .contact {
            background-color: #ffffff34;
            min-height: 4rem;
            display:flex;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
            .avatar {
              img {
                height: 2rem;
              }
            }
            .username {
              h3 {
                color: white;
              }
            }
          }
          .selected {
            background-color: #045f5f;
          }
        }
      
        .current-user {
          background-color: #499a83;
          display: flex;
          justify-content: center;
          align-items: center;
         gap:1rem;
          border-radius:10px 20px;
          margin-top:3px;
          .avatar {
            img {
              height: 3rem;
              max-inline-size: 100%;
            }
          }
          .username {
            h2 {
              color: white;
              text-transform: capitalize;

            }
          }
          @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {
              h2 {
                font-size: 1rem;
              }
            }
          }

    }

`

