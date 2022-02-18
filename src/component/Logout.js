import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";

const Logout = () => {
    function logOut() {
        signOut(auth).then(()=>{
            console.log('siugned out')
        }).catch((err)=>{
            console.log(err)
        })
    }

    return ( 
        <button onClick={logOut}>Log out</button>
     );
}
 
export default Logout;