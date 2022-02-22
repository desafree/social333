import { auth, db } from "../firebaseConfig/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

const PostComment = ({comment,index,id, post}) => {


    function deleteComment(index) {
        const docRef = doc(db, 'posts', id)
        const commentArray = post.comments
        let newCommentArray = commentArray.slice(0,index)
        let newCommentArray2 = commentArray.slice(index+1)
        let finalNewArray = newCommentArray.concat(newCommentArray2)
        // console.log(newCommentArray,newCommentArray2)
        // console.log(commentArray,finalNewArray)
        updateDoc(docRef,{
            comments:finalNewArray
        }).then(()=>{
            console.log('updated comment')
        })
    }

    return ( 
        <div>
            <h4 >{comment.user}</h4>
            <p>{comment.content}</p>
            <p>{comment.time}</p>
            <p>{index}</p>
            <p>{id}</p>
            {(auth.currentUser && auth.currentUser.displayName==comment.user)?<button onClick={()=>{deleteComment(index)}}>delete comment</button> : <div></div>}
        </div>
     );
}
 
export default PostComment;