import LoginNav from "./LoginNav";

import { auth } from "../firebaseConfig/firebaseConfig";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import LoggedinNav from "./LoggedinNav";
import { Link } from "react-router-dom";

const Nav = () => {
    const [user, setUser] = useState();

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return ( 
        <div className="nav">
            <ul>
                <Link to='/'>Home</Link>
                {user ? <LoggedinNav/> : <LoginNav/>}
            </ul>
        </div>
     );
}
 
export default Nav;