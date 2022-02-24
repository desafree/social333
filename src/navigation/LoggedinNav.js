import { Link } from "react-router-dom";
import Logout from '../component/Logout'
import { auth } from "../firebaseConfig/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const LoggedinNav = () => {

    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    useEffect(()=>{
        setUser(auth.currentUser)
    },[])

    return ( 
        <ul>
            <Link to='/create'>Create Post</Link>
            {(user)? user.displayName:null}
            <Logout/>
        </ul>
     );
}
 
export default LoggedinNav;