
import React from 'react'
import { useState } from 'react'
import "./Registor.css"



function Registor() {
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [loggedin,setloggedin]=useState(false)
    const [register,setRegister]=useState(false)


    const handleLogin = async e =>{
        e.preventDefault();
        const userData= {userName,password}
        sessionStorage.setItem("token-info", JSON.stringify(userData));

        setloggedin(true);
        setPassword("");
        setUserName("");
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        const userData= {userName,email,password}
        localStorage.setItem("token-info", JSON.stringify(userData));

       
        setPassword("");
        setUserName("");
        setEmail("")
    }

    const logout = () =>{
        sessionStorage.removeItem("token-info")
        setloggedin(false);
    }

    const  changeHandle = () =>{
        setRegister (true);
        }
     
        const  cancelHandle = () =>{
            setRegister (false);
            }   

    
     if(register===false){

        return (!loggedin  ?  <div className='login'>

            <div className='input-field'>
            
           <input type="text" placeholder='user name' onChange={(e)=>{setUserName(e.target.value)}} value={userName}></input><br/>
           <br/>
           
           <input type="password" placeholder=' password' onChange={(e)=>{setPassword(e.target.value)}} value={password}></input><br/>
       
          <button type="submit" onClick={handleLogin}>Login</button>
     
          <button type="" onClick={changeHandle} >Registor</button>
          </div>
          </div>  :
         <div className='logout'>
             <button onClick={logout}>Log out</button>
         </div>

             
            )
     
     }

     return(
        <div className='login'>

      
            <div className='input-field'>
           <input type="text" placeholder='user name' onChange={(e)=>{setUserName(e.target.value)}} value={userName}></input><br/>
           <br/>
        
           
           <input type="email" placeholder=' email' onChange={(e)=>{setEmail(e.target.value)}} value={email}></input><br/>
       
           <br/>
           
           
           <input type="password" placeholder=' password' onChange={(e)=>{setPassword(e.target.value)}} value={password}></input><br/>
           
          <button type="submit" onClick={handleSubmit}>Submit</button>
     
          <button type="" onClick={cancelHandle} >Cancel</button>
          </div>
         </div>
     )
    
      
  
  
}

export default Registor
