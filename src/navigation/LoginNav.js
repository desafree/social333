import { Link } from "react-router-dom";

const LoginNav = () => {
    return ( 
        <ul>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign up</Link>
        </ul>
     );
}
 
export default LoginNav;