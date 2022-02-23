import { addDoc } from "firebase/firestore";
import { colRef } from "../firebaseConfig/firebaseConfig";
import { auth } from "../firebaseConfig/firebaseConfig";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Create = () => {

    const navigate = useNavigate()
    
    async function createPost(e) {
        e.preventDefault()
        const formRef = document.querySelector('form')

        if(auth.currentUser) {

            const title = formRef.title.value
            const content = formRef.content.value
            const date = new Date();
            let dateText = date.toString()
            console.log(auth.currentUser.displayName)
    
            addDoc(colRef,{
                title:title,
                content: content,
                time: dateText,
                upvote:1,
                user:auth.currentUser.displayName,
                url:'', 
                comments:[]
            }).then(()=>{
                formRef.reset()
                console.log('added')
                navigate('/')
            })
        }
        else{
            console.log('not logged in')
        }

    }


    return ( 
        <div>
            <Link to={'/create-img'}>Create image</Link>
            <form action="" onSubmit={(e)=>{
                createPost(e)
            }}>
                <input type="text" name="title" required/>
                <input type="text" name="content"required/>
                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default Create;