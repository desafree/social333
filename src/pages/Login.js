import { useState } from "react";
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebaseConfig/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate()


    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const login = async () => {
        try {
          const divSpin = document.querySelector('.spin')
          const spinner = "<div class='spinner-border' role='status'><span class='visually-hidden'>Loading...</span></div>"
          divSpin.innerHTML=spinner
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          ).then(()=>{
            navigate('/')
          });
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      };

      return (
        <div className="App">
    
          <div>
            <h3> Login </h3>
            <input
              placeholder="Email..."
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <input
              type='password'
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
    
            <button onClick={login}> Login</button>
          </div>
    
          <h4> User Logged In: </h4>
          {user?.email}
              
          <div className="spin"></div>
        </div>
      );
}
 
export default Login;