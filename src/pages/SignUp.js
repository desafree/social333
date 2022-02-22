import { useState } from "react";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";

const SignUp = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [username, setUsername] = useState("");

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
          updateProfile(auth.currentUser,{
            displayName:username
          })
          navigate('/')
        });
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
                <h3> Username </h3>
                <input
                placeholder="Username..."
                onChange={(event) => {
                    setUsername(event.target.value);
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
            {user?.displayName}
        </div>
     );
}
 
export default SignUp;