import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/login.css"
const Login=()=>{
    const [user,setUser]=useState({
        username:"",
        password:""
    })
    const [errmsg,setErrmsg]=useState({
            usernameerr:"",
            username_pass:""
    });
    const handlechange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const setcookie=(cname,cvalue,exdays)=>{
        var d=new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires="expires="+d.toUTCString();
        document.cookie=cname+"="+cvalue+";"+expires+";path=/";
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_BASE_URL}/login`,user)
        .then((res)=>{
            console.log(res.data.token);
            setcookie("Athentication",res.data.token,1);
            document.location.href="/";
        })
        .catch((err)=>{
            console.log(err);
            const error=err.response.data;
            if(error==="username not registered!"){
                setErrmsg({
                    usernameerr:<p><span>&#9888;</span>{`${" "+error}`}</p>,
                    username_pass:""
                })
            }
            else if(error==="Incorrect password!"){
                setErrmsg({
                    usernameerr:"",
                    username_pass:<p><span>&#9888;</span>{`${" "+error}`}</p>
                })
            }
            else if(error==="Enter both the fields"){
                setErrmsg({
                    usernameerr:"",
                    username_pass:<p><span>&#9888;</span>{`${" "+error}`}</p>
                })
            }
            else{
                setErrmsg({
                    usernameerr:"",
                    username_pass:<p><span>&#9888;</span>{`${" "+"Something went wrong!"}`}</p>
                })
            }
        })
    }
  return (
    <div className="signup_full">
      <div className="signup_left"></div>
      <form className="signupform" onSubmit={handleSubmit}>
        <h1 className="signup_heading">
          <strong>Welcome back! Login here</strong>
        </h1>
        <div>
          <p>Username</p>
          <input
            type={"text"}
            placeholder="eg: blogger"
            name="username"
            value={user.username}
            onChange={handlechange}
          />
          <p>{errmsg.usernameerr}</p>
        </div>
        <div>
          <p>Password</p>
          <input
            type={"password"}
            placeholder="eg: Blogstar@123"
            name="password"
            value={user.password}
            onChange={handlechange}
          />
          <p>{errmsg.username_pass}</p>
        </div>
        <button type="submit">Login</button>
        <p>
          Dont have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;