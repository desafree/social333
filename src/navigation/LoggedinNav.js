import { Link } from "react-router-dom";
import Logout from '../component/Logout'

const LoggedinNav = () => {
    return ( 
        <ul>
            <Link to='/create'>Create Post</Link>
            <Logout/>
        </ul>
     );
}
 
export default LoggedinNav;