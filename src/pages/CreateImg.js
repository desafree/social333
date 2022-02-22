import { addDoc } from "firebase/firestore";
import { colRef } from "../firebaseConfig/firebaseConfig";
import { auth } from "../firebaseConfig/firebaseConfig";
import { storage } from "../firebaseConfig/firebaseConfig";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";

const CreateImg = () => {

    const navigate = useNavigate()
    
    async function createPost(url) {

        const formRef = document.querySelector('form')

        if(auth.currentUser) {

            const title = formRef.title.value
            const content = formRef.content.value
            const date = new Date();
            let dateText = date.toString()
    
            addDoc(colRef,{
                title:title,
                content: content,
                time: dateText,
                upvote:1,
                user:auth.currentUser.displayName,
                url:url,
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


    const storageFile = (e) => {
        //
        e.preventDefault()
        const formRef = document.querySelector('form')
        let file = formRef.image.files[0]
        console.log(file)

        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL)
                createPost(downloadURL.toString())

            });
          }
        );
      };
    
    return ( 
        <div>
            <Link to={'/create'}>Create post</Link>
            <form action="" onSubmit={(e)=>{
                storageFile(e)
            }}>
                <input type="text" name="title"/>
                <input type="text" name="content"/>
                <input type="file" name="image"/>
                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default CreateImg;