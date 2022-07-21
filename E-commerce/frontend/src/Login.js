import React,{useEffect} from 'react';
import './login.css'
import {  useNavigate } from 'react-router-dom';
import axios from './axios';
import { useStateValue } from './StateProvider'



const Login = () => {

    const navigate = useNavigate();
    const[,dispatch]=useStateValue()

    // the user just logged in / the user was logged in
    // useEffect(()=>{
    //
    // },[])

    useEffect(() => {
        register();
    }, []);

    const signInCall = async (e) =>{
        e.preventDefault();

        const signInEmail = document.getElementById("loginEmail").value;
        const signInPassword = document.getElementById("loginPassword").value;

        await axios.post('/account/login',{
            email : signInEmail,
            password:signInPassword
        }).then((data)=>{
            if(data.status===200){
                alert("Successfully login")
            }
            dispatch({
                type: "SET_USER",
                user: {
                  "email":document.getElementById("loginEmail").value,
                },
              });

            navigate('/')


        }).catch((err)=>{
            alert(" Please first register yourself !")
        })
    }


    const registerCall = async (e) =>{
        e.preventDefault();

            const regName= document.getElementById("regName").value
            const regEmail= document.getElementById("regEmail").value
            const regPassword= document.getElementById("regPassword").value

            if(regName==="" || regEmail==="" || regPassword===""){
               return alert("Please fill all input data");
            }

            await axios.post("/account/auth",{
                name: regName,
                email: regEmail,
                password: regPassword,
            }).then((data)=>{
                if(data.status===200){
                    dispatch({
                        type: "SET_USER",
                        user: {
                          "email": document.getElementById("regEmail").value,
                          "name":document.getElementById("regName").value
                        },
                      });

                    document.getElementById("regName").value =""
                    document.getElementById("regEmail").value = ""
                    document.getElementById("regPassword").value = ""
                }


                navigate('/')
            }).catch((err)=>{
                alert(" Registration failed!")
            })


    }

    const register = () => {
        document.getElementById("login").style.left = "-400px";
        document.getElementById("register").style.left = "50px";
        document.getElementById("btn").style.left = "110px";
    }
    const login = () => {
        document.getElementById("login").style.left = "50px";
        document.getElementById("register").style.left = "450px";
        document.getElementById("btn").style.left = "0px";
    }

    return (
        <div className="hero">
            <div className="fire-box">

                <div className="title">
                    Welcome to Fsb E-commerce
                </div>
                <div className="button-box">
                    <div id="btn"></div>
                    <button type="button" className="toggle-btn" onClick={login}>Log In</button>
                    <button type="button" className="toggle-btn" onClick={register}>Register</button>

                </div>

                <form id="login" className="input-group">
                    <input type="email" id='loginEmail' className="input-field" placeholder="email Id" required />
                    <div className="admin-password-field-login">
                        <input type="password" id="loginPassword" class="input-field" autoComplete='password' placeholder="Enter Password" />
                    </div>                    <br />
                             <button type="submit" id='loginSub' className="submit-btn" onClick={signInCall}>Log In</button>

                </form>
                <form id="register" className="input-group">
                    <input type="text"  id='regName' className="input-field" placeholder="User Name" required />
                    <input type="email"  id='regEmail' className="input-field" placeholder="email Id" required />
                    <div class="admin-password-field">
                        <input type="password" id="regPassword" class="input-field"  autoComplete='password' placeholder="Enter Password" />
                    </div>
                    <button  type="submit" style={{marginBottom:"15px"}}  className="submit-btn" onClick={registerCall}>Register</button>

                </form>
            </div>

        </div>
    );
}

export default Login;
