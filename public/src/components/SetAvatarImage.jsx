import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import axios from 'axios'
import { Buffer } from "buffer";
import wedges from '../assets/wedges.gif'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'
import {setAvatar} from '../utils/route.js'



export default function SetAvatarImage() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedavatar, setSelectedAvatar ] = useState(undefined)


    const toastOptions = {
        position:'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
    };

    useEffect( () => {
        if (!localStorage.getItem("chat-app-current-user"))
          navigate("/login")
        

    });

    useEffect(() => {
        const fetchAvatar = async () => {
         const data = [];
         for (let i = 0; i<4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
            console.log("image",image)
            const buffer = new Buffer(image.data)
            console.log(buffer)
            data.push(buffer.toString("base64"))
         }
         setAvatars(data)
          setLoading(false)
        }
        fetchAvatar()
    },[])
  

    const setProfilePicture = async () => {
        if (selectedavatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        }else {
            const user = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );

            const {data} = await axios.post(`${setAvatar}/${user._id}`, {
                image: avatars[selectedavatar]
            });
            console.log(data)
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    "chat-app-user",
                    JSON.stringify(user)
                );
                // navigate("/")
                
            } else {
                toast.error("Error setting avatar. Please try again ",toastOptions);
            }

        }
    };

    return(
       <>
        {loading ? (
            <Container>
                <img src={wedges} alt="loader" className="loader"/>
            </Container>
        ): (
            <Container>
                <div className="title-container">
                    <h1>Pick any avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {avatars.map((avatar, index) => {
                        return (
                            <div className={`avatar ${selectedavatar === index? 'selected': ""}`}key={index}>
                                <img
                                src={`data:image/svg+xml;base64,${avatar}`}
                                alt="avatar"
                                onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        );
                    })}
                </div>
                <button onClick={setProfilePicture} className="submit-btn">Set as Profile Picture</button> 
                 <ToastContainer/>
            </Container>

            
        )}
       </>

    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
