import { useParams } from "react-router";
import { useLocation } from "react-router";
import { auth } from "../firebaseConfig/firebaseConfig";
import { deleteDoc,doc} from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";



const Post = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const {post} = location.state

    console.log(post)

    function deletePost() {
        const docRef = doc(db,'posts',post.post.id)
        deleteDoc(docRef).then(()=>{
            console.log('deleted')
            navigate('/')
        })

    }


    return ( 
        <div>
            prova {post.post.title}
            <h1>{post.post.title}</h1>
            <h2>{post.post.user}</h2>
            <p>{post.post.content}</p>
            <h6>{post.post.time}</h6>
            <h6>{post.post.upvote}</h6>
            {(!auth.currentUser)? <div></div> : (post.post.user === auth.currentUser.email)? <button onClick={deletePost}>right user</button> : <button>invalid user</button>}
            {(!auth.currentUser)? <div></div> : (post.post.user === auth.currentUser.email)? <Link to='/update' state={{post:{post}}}><button>Edit post</button></Link> : <button>invalid user, cant edit</button>}
            {/* {(post.post.user === auth.currentUser.email)? <button onClick={deletePost}>right user</button> : <button>invalid user</button>}
            {(post.post.user === auth.currentUser.email)? <Link to='/update' state={{post:{post}}}><button>Edit post</button></Link> : <button>invalid user, cant edit</button>} */}
            <div>
                {post.post.comments.map((comment)=>{
                    return <p >{comment}</p>
                })}
            </div>
        </div>
     );
}
 
export default Post;