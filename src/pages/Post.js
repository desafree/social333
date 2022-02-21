import { useParams } from "react-router";
import { useLocation } from "react-router";
import { auth } from "../firebaseConfig/firebaseConfig";
import { deleteDoc,doc} from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { updateDoc } from "firebase/firestore";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";



const Post = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const {post} = location.state
    const [user,setUser] = useState()

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    // console.log(post)

    function deletePost() {
        const docRef = doc(db,'posts',post.post.id)
        deleteDoc(docRef).then(()=>{
            console.log('deleted')
            navigate('/')
        })

    }

    function commentPost(e) {
        e.preventDefault()
        let date = new Date()
        let dateString = date.toString()

        const commentForm = document.querySelector('form')
        const newComment = {content:commentForm.comment.value, user:user.email, time:dateString}

        console.log(post.post.comments,newComment)

        const newComments = post.post.comments.concat(newComment)

        console.log(newComments)
        
        if(user) {
            const docRef = doc(db,'posts',post.post.id)

            updateDoc(docRef,{comments:newComments}).then(()=>{
                console.log('added comment')
                commentForm.reset()
            })
        }
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
                    return (<div>
                            <h4 >{comment.user}</h4>
                            <p>{comment.content}</p>
                            <p>{comment.time}</p>
                        </div>)
                    
                })}
            </div>
            {(auth.currentUser)?<form action="#" onSubmit={commentPost}>
                <label htmlFor="comment">Comment as {auth.currentUser.email}</label>
                <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                <button>Comment</button>
            </form>:<p>Log in to comment</p>}
            
        </div>
     );
}
 
export default Post;