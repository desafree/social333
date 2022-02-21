import { useParams,useLocation,useNavigate } from "react-router";
import { auth,db } from "../firebaseConfig/firebaseConfig";
import { deleteDoc,doc,getDoc,onSnapshot,updateDoc} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";






const Post = () => {

    const navigate = useNavigate()
    // const location = useLocation()
    // const {post} = location.state
    const [user,setUser] = useState()
    const [post,setPost] = useState()
    
    const {id} = useParams()
    // const docRef = doc(db,'posts',id)
    // getDoc(docRef)
    

    // const unsub = onSnapshot(doc(db, "posts", id), (doc) => {
    //     setPost(doc.data())
    //     console.log(doc.data(),post)
    // });

    useEffect(()=>{
        let unsub = onSnapshot(doc(db, "posts", id),(doc)=>{
            let postsContainer = doc.data()
            console.log(postsContainer)
            if(post!==postsContainer){
                setPost(postsContainer)
                console.log(post)
            }
        });
        return ()=> unsub();
    },[]);

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    // console.log(post)

    function deletePost() {
        const docRef = doc(db,'posts',post.id)
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
        console.log(commentForm.comment.value, user.email, dateString)
        const newComment = {content:commentForm.comment.value, user:user.email, time:dateString}
        console.log(newComment)

        const newComments = post.comments.concat(newComment)
        
        if(user) {
            console.log(post)
            const docRef = doc(db,'posts',id)

            updateDoc(docRef,{comments:newComments}).then(()=>{
                console.log('added comment')
                commentForm.reset()
            })
        }
    }


    return ( 
        <div>
            {(post)?<div><h1>{post.title}</h1>
            <h2>{post.user}</h2>
            <p>{post.content}</p>
            <h6>{post.time}</h6>
            <h6>{post.upvote}</h6>
            {(!user)? <div></div> : (post.user === user.email)? <button onClick={deletePost}>right user</button> : <button>invalid user</button>}
            {(!user)? <div></div> : (post.user === user.email)? <Link to='/update' state={{post:{post}}}><button>Edit post</button></Link> : <button>invalid user, cant edit</button>}
            
            <div>
                {post.comments.map((comment)=>{
                    return (<div>
                            <h4 >{comment.user}</h4>
                            <p>{comment.content}</p>
                            <p>{comment.time}</p>
                        </div>)
                    
                })}
            </div>
            {(user)?<form action="#" onSubmit={commentPost}>
                <label htmlFor="comment">Comment as {user.email}</label>
                <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                <button>Comment</button>
            </form>:<p>Log in to comment</p>}</div>:<div>prova2</div>}
            
        </div>
     );
}
 
export default Post;