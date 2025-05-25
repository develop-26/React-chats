import React, { useState,useEffect} from "react";
import userdata from './userdata.json'
// import fs from 'fs'

function Login({setloggedin}){

    const [logindata,setlogindata]=useState({
        name:"",
        password:"",
    })

    const [registerdata,setregisterdata]=useState({
        name:"",
        password:"",
        age:16
    })

    // const fs=require('fs')

    const [toggle,settoggle]= useState(false)

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const localUsers = localStorage.getItem("users");
        if (localUsers) {
          setUsers(JSON.parse(localUsers));
        } else {
          // initialize from JSON file
          setUsers([userdata]);
          localStorage.setItem("users", JSON.stringify([userdata]));
        }
      }, []);

    const registeruser=(e)=>{
        e.preventDefault()
        settoggle(!toggle)
    }

    const handleregisterchange=(e)=>{

        setregisterdata({...registerdata,[e.target.name]:e.target.value})
    }

    const handleloginchange=(e)=>{

        setlogindata({...logindata,[e.target.name]:e.target.value})
    }

    const handleregister=()=>{
        if(registerdata.age<16){
            alert("your age can't be less than 16")
        }
        else{
            const updatedUsers = [...users, registerdata]
            setUsers(updatedUsers)
            localStorage.setItem("users", JSON.stringify(updatedUsers))
            alert("User registered!")
            settoggle(false)
        }

    }

    const handlelogin=()=>{

        const found = users.find(
            (user) => user.name === logindata.name && user.password === logindata.password
          );
          if (found) {
            alert("Login successful!");
            setloggedin(true);
          } else {
            alert("Invalid credentials.");
          }
    }


    return(<>
    <header className="header">
        <div>BeyondChats</div>
        <div className="headerfeatures">
            <div>about us</div>
            <div>privacy policy</div>
            <div>settings</div>
        </div>
    </header>
    <div className="mainloginpage">
    <form className="loginform">

        <label htmlFor="name">Enter your name</label><br /><br />
        <input name="name" type="text" value={logindata.name} onChange={handleloginchange}></input>
<br /><br />
        <label htmlFor="password">password</label><br /><br />
        <input name="password" type="password" value={logindata.password} onChange={handleloginchange}></input>
<br /><br />
        <button onClick={handlelogin}>submit</button><br /><br />

        not a user?<br /><br />

        <button onClick={registeruser}>register</button><br /> <br />

        {toggle===true?<>
        <label htmlFor="name">Enter your name</label><br />
        <input name="name" type="text" value={registerdata.name} onChange={handleregisterchange}></input>
<br /> <br />
        <label htmlFor="password">password</label><br />
        <input name="password" type="password" value={registerdata.password} onChange={handleregisterchange}></input>
<br /><br />
        <label htmlFor="age">password</label><br />
        <input name="age" type="number" value={registerdata.age} onChange={handleregisterchange}></input>
<br /><br />
        <button onClick={handleregister}>submit</button></>:<></>
        }


    </form>
    </div>
    </>)

}
export default Login