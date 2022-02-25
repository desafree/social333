import { useParams,useLocation,useNavigate } from "react-router";
import { auth,db } from "../firebaseConfig/firebaseConfig";
import { deleteDoc,doc,getDoc,onSnapshot,updateDoc} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import PostComment from "../component/PostComment";







const Post = () => {

    const navigate = useNavigate()
    // const location = useLocation()
    // const {post} = location.state
    const [user,setUser] = useState()
    const [post,setPost] = useState()
    
    const {id} = useParams()

    const location = useLocation()

    const upvoteNumber = location.state.upvote
    const downvoteNumber = location.state.downvote

    console.log(upvoteNumber,downvoteNumber)
    // const docRef = doc(db,'posts',id)
    // getDoc(docRef)
    

    // const unsub = onSnapshot(doc(db, "posts", id), (doc) => {
    //     setPost(doc.data())
    //     console.log(doc.data(),post)
    // });

    useEffect(()=>{
        let unsub = onSnapshot(doc(db, "posts", id),(doc)=>{
            let postsContainer = doc.data()
            if(post!==postsContainer){
                setPost(postsContainer)
            }
        });
        return ()=> unsub();
    },[]);

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    // console.log(post)

    function deletePost() {
        const docRef = doc(db,'posts',id)
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
        console.log(commentForm.comment.value, user.displayName, dateString)
        const newComment = {content:commentForm.comment.value, user:user.displayName, time:dateString}
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

    const [like,setLike] = useState(upvoteNumber)
    const [unlike,setUnlike] = useState(downvoteNumber)






    useEffect(()=>{
        if(post) {
            if(like==1) {
                let buttonLike = document.querySelector('.upvote')
                buttonLike.style.backgroundColor = 'green'
                let buttonUnlike = document.querySelector('.downvote')
                buttonUnlike.style.backgroundColor = 'white'
            }
        
            if(unlike==1) {
                let buttonLike = document.querySelector('.upvote')
                buttonLike.style.backgroundColor = 'white'
                let buttonUnlike = document.querySelector('.downvote')
                buttonUnlike.style.backgroundColor = 'red'
            }
        }
    })

    function upvote() {
        const docRef = doc(db,'posts',id)
        const newUpvote = post.upvote + 1

        if(auth.currentUser){
            if(like==0 && unlike==0) {
                updateDoc(docRef,{
                    upvote:newUpvote
                }).then(()=>{
                    setLike(1)
                })
            }
            else if(like==0 && unlike==1) {
                updateDoc(docRef,{
                    upvote:newUpvote + 1
                }).then(()=>{
                    setLike(1)
                    setUnlike(0)
                })
            }
    
            const upvoteElement = document.querySelector('.upvote')
            upvoteElement.style.backgroundColor = 'green'
            const downvoteElement = document.querySelector('.downvote')
            downvoteElement.style.backgroundColor = 'white'
        }


    }

    function downvote() {

        const docRef = doc(db,'posts',id)
        const newUpvote = post.upvote - 1

        if(auth.currentUser){
            if(like==0 && unlike==0) {
                updateDoc(docRef,{
                    upvote:newUpvote
                }).then(()=>{
                    setUnlike(1)
                })
            }
            else if(like==1 && unlike==0) {
                updateDoc(docRef,{
                    upvote:newUpvote - 1
                }).then(()=>{
                    setLike(0)
                    setUnlike(1)
                })
            }
    
            const upvoteElement = document.querySelector('.upvote')
            upvoteElement.style.backgroundColor = 'white'
            const downvoteElement = document.querySelector('.downvote')
            downvoteElement.style.backgroundColor = 'red'
        }

    }


    return ( 
        <div>
            {(post)?
            <div>
                <h1>{post.title}</h1>
                <h2>{post.user}</h2>
                <p>{post.content}</p>
                {(post.url)? <img src={post.url}></img> : <div>not image</div>}
                <h6>{post.time}</h6>
                <h6>{post.upvote}</h6>
                {(!user)? <div></div> : (post.user === user.displayName)? <button onClick={deletePost}>delete post</button> : <button>invalid user</button>}
                {(!user)? <div></div> : (post.user === user.displayName)? <Link to='/update' state={{post:post,id:id}}><button>Edit post</button></Link> : <button>invalid user, cant edit</button>}
            
                <button onClick={upvote} className="upvote">Upvote</button>
                <button onClick={downvote} className="downvote">downvote</button>

                <div>
                    {post.comments.map((comment,index)=>{
                    return (<PostComment comment={comment} index={index} id={id} post={post} key={index}></PostComment>)
                    })}
                </div>
                {(user)?<form action="#" onSubmit={commentPost}>
                    <label htmlFor="comment">Comment as {user.displayName}</label>
                    <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                    <button>Comment</button>
                </form>:<p>Log in to comment</p>}</div>:<div>prova2</div>}
            
            </div>
     );
}
 
export default Post;