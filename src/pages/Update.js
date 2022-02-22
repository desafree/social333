import { useLocation } from "react-router";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";
import { useNavigate } from "react-router";

const Update = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const post = location.state.post
    const id = location.state.id
    console.log(post,id)

    function updatePost(e) {
        e.preventDefault()
        const formRef = document.querySelector('form')

        const titleNew = formRef.title.value
        const contentNew = formRef.content.value
        const date = new Date();
        let dateTextNew = date.toString()

        const docRef = doc(db, 'posts', id)
        updateDoc(docRef,{
            title:titleNew,
            content:contentNew,
            time:dateTextNew
        }).then(()=>{
            console.log('update doc')
            navigate('/')
        })
    }

    return ( 
        <div>
            <form onSubmit={(e)=>{
                updatePost(e)
            }}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" defaultValue={post.title} name="title"/>
                <h2>{post.user}</h2>
                <label htmlFor="content">content</label>
                <textarea name="content" id="content" cols="30" rows="10" defaultValue={post.content}></textarea>
                <p>{post.time}</p>
                <p>{post.upvote}</p>
                <button>Update post</button>
            </form>
        </div>
     );
}
 
export default Update;