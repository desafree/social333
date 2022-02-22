import {onSnapshot} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { colRef } from '../firebaseConfig/firebaseConfig'
import PostSummary from '../component/PostSummary';
import { Link } from 'react-router-dom';

const Home = () => {

    const [posts, setPosts] = useState()
    // const [order,setOrder] = useState(1)


    useEffect(()=>{
        let unsubscribe = onSnapshot(colRef,(snapshot)=>{
            let postsContainer = []
            snapshot.docs.forEach(doc=>{
                postsContainer.push({...doc.data(),id:doc.id})
            })
            setPosts(postsContainer)
        });
        return ()=> unsubscribe();
    },[]);

    

    function changeOrder(e) {
        if(e.target.textContent==='Top') {
            // setOrder(1)
            let newArray = [...posts]
            newArray.sort((a,b)=>{
                if(a.upvote<b.upvote) {
                    return 1
                }
                else{
                    return -1
                }
            })

            setPosts(newArray)
        }
        else if(e.target.textContent==='New') {
            // setOrder(2)
            let newArray = [...posts]
            newArray.sort((a,b)=>{
                if(Date.parse(a.time)<Date.parse(b.time)) {
                    return 1
                }
                else{
                    return -1
                }
            })

            setPosts(newArray)
        }
        else if(e.target.textContent==='Old') {
            // setOrder(3)
            let newArray = [...posts]
            newArray.sort((a,b)=>{
                if(Date.parse(a.time)<Date.parse(b.time)) {
                    return -1
                }
                else{
                    return 1
                }
            })

            setPosts(newArray)
        }
    }

    return ( 
        <div>
            <div>
                <button onClick={(e)=>{
                    changeOrder(e)
                }}>Top</button>
                <button onClick={(e)=>{
                    changeOrder(e)
                }}>New</button>
                <button onClick={(e)=>{
                    changeOrder(e)
                }}>Old</button>
                
            </div>
            <div>
                {posts && posts.map((post,index)=>{
                    return <PostSummary post={post} key={post.id} index={index}/>

                })}
            </div>
        </div>
        
    );
}
 
export default Home;