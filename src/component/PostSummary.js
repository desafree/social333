import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react/cjs/react.development";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { Link } from "react-router-dom";

const PostSummary = ({post,index}) => {
    console.log(post.id)

    const [like,setLike] = useState(0)
    const [unlike,setUnlike] = useState(0)

    function upvote() {
        const docRef = doc(db,'posts',post.id)
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
    
            const upvoteElement = document.querySelectorAll('.upvote')
            upvoteElement[index].style.backgroundColor = 'green'
            const downvoteElement = document.querySelectorAll('.downvote')
            downvoteElement[index].style.backgroundColor = 'white'
        }



    }

    function downvote() {

        const docRef = doc(db,'posts',post.id)
        const newUpvote = post.upvote - 1

        if(auth.currentUser) {
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
    
            const upvoteElement = document.querySelectorAll('.upvote')
            upvoteElement[index].style.backgroundColor = 'white'
            const downvoteElement = document.querySelectorAll('.downvote')
            downvoteElement[index].style.backgroundColor = 'red'
        }

    }

    return ( 
        <div>
            <Link to={`post/${post.id}`} state={{upvote:like,downvote:unlike}}>
                <h2>{post.title}</h2>
                <p>{post.user}</p>
            </Link>

            <p>{post.content}</p>
            <h6>{post.time}</h6>
            <h6>{post.upvote}</h6>
            <button onClick={upvote} className="upvote">Upvote</button>
            <button onClick={downvote} className="downvote">downvote</button>
            {(post.url)? <img src={post.url}></img> : <div>not image</div>}
        </div>
     );
}
 
export default PostSummary;