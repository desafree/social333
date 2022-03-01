import { useState } from "react";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";

const SignUp = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const navigate = useNavigate()

    const [user, setUser] = useState({});
  
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  
    const register = async () => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        ).then(()=>{
          navigate('/')
        });
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
    };

    return ( 
        <div>
            <div>
                <h3> Register User </h3>
                <input
                placeholder="Email..."
                onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }}
                />
                <input
                placeholder="Password..."
                onChange={(event) => {
                    setRegisterPassword(event.target.value);
                }}
                />

                <button onClick={register}> Create User</button>
            </div>

            <h4> User Logged In: </h4>
            {user?.email}
        </div>
     );
}
 
export default SignUp;