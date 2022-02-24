import {onSnapshot} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { colRef } from '../firebaseConfig/firebaseConfig'
import PostSummary from '../component/PostSummary';
// import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig/firebaseConfig';


const Home = () => {

    const [posts, setPosts] = useState()
    const [order,setOrder] = useState(2)


    useEffect(()=>{

        async function asyncCall() {
            const querySnapshot = await getDocs(collection(db, "posts"));
            let postsContainer = []
            querySnapshot.forEach((doc) => {
                postsContainer.push({...doc.data(),id:doc.id})
            });
    
            console.log(order)
    
                // if(order==1) {
                //     console.log(order)
                //     let orderedarray = postsContainer.sort((a,b)=>{
                //         if(a.upvote<b.upvote) {
                //             return 1
                //         }
                //         else{
                //             return -1
                //         }
                //     })
        
                //     let buttons = document.querySelectorAll('.orderButton')
                //     buttons[0].style.backgroundColor = 'green'
                //     buttons[1].style.backgroundColor = 'white'
                //     buttons[2].style.backgroundColor = 'white'
                //     setPosts(orderedarray)
                // }
    

                console.log(order)
                let orderedarray = postsContainer.sort((a,b)=>{
                    if(Date.parse(a.time)<Date.parse(b.time)) {
                        return 1
                    }
                    else{
                        return -1
                    }
                })
        
                let buttons = document.querySelectorAll('.orderButton')
                buttons[0].style.backgroundColor = 'white'
                buttons[1].style.backgroundColor = 'green'
                buttons[2].style.backgroundColor = 'white'
                setPosts(orderedarray)
                
    
                // else if(order==3) {
                //     console.log(order)
                //     let orderedarray = postsContainer.sort((a,b)=>{
                //         if(Date.parse(a.time)<Date.parse(b.time)) {
                //             return -1
                //         }
                //         else{
                //             return 1
                //         }
                //     })
        
                //     let buttons = document.querySelectorAll('.orderButton')
                //     buttons[0].style.backgroundColor = 'white'
                //     buttons[1].style.backgroundColor = 'white'
                //     buttons[2].style.backgroundColor = 'green'
                //     setPosts(orderedarray)
                // }
    
        }
        asyncCall()
        
    },[])


    // useEffect(()=>{
    //     let unsubscribe = onSnapshot(colRef,(snapshot)=>{
    //         let postsContainer = []
    //         snapshot.docs.forEach(doc=>{
    //             postsContainer.push({...doc.data(),id:doc.id})
    //         })
    //         console.log(order)

    //         if(order==1) {
    //             console.log(order)
    //             let orderedarray = postsContainer.sort((a,b)=>{
    //                 if(a.upvote<b.upvote) {
    //                     return 1
    //                 }
    //                 else{
    //                     return -1
    //                 }
    //             })
    
    //             let buttons = document.querySelectorAll('.orderButton')
    //             buttons[0].style.backgroundColor = 'green'
    //             buttons[1].style.backgroundColor = 'white'
    //             buttons[2].style.backgroundColor = 'white'
    //             setPosts(orderedarray)
    //         }

    //         else if(order==2) {
    //             console.log(order)
    //             let orderedarray = postsContainer.sort((a,b)=>{
    //                 if(Date.parse(a.time)<Date.parse(b.time)) {
    //                     return 1
    //                 }
    //                 else{
    //                     return -1
    //                 }
    //             })
    
    //             let buttons = document.querySelectorAll('.orderButton')
    //             buttons[0].style.backgroundColor = 'white'
    //             buttons[1].style.backgroundColor = 'green'
    //             buttons[2].style.backgroundColor = 'white'
    //             setPosts(orderedarray)
    //         }

    //         else if(order==3) {
    //             console.log(order)
    //             let orderedarray = postsContainer.sort((a,b)=>{
    //                 if(Date.parse(a.time)<Date.parse(b.time)) {
    //                     return -1
    //                 }
    //                 else{
    //                     return 1
    //                 }
    //             })
    
    //             let buttons = document.querySelectorAll('.orderButton')
    //             buttons[0].style.backgroundColor = 'white'
    //             buttons[1].style.backgroundColor = 'white'
    //             buttons[2].style.backgroundColor = 'green'
    //             setPosts(orderedarray)
    //         }

            
    //     });
    //     return ()=> unsubscribe();
    // },[]);



    

    function changeOrder(e) {
        console.log(e,posts)
        if(e==='Top') {
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

            let buttons = document.querySelectorAll('.orderButton')
            buttons[0].style.backgroundColor = 'green'
            buttons[1].style.backgroundColor = 'white'
            buttons[2].style.backgroundColor = 'white'

            setPosts(newArray)
        }
        else if(e==='New') {
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

            let buttons = document.querySelectorAll('.orderButton')
            buttons[0].style.backgroundColor = 'white'
            buttons[1].style.backgroundColor = 'green'
            buttons[2].style.backgroundColor = 'white'

            setPosts(newArray)
        }
        else if(e==='Old') {
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

            let buttons = document.querySelectorAll('.orderButton')
            buttons[0].style.backgroundColor = 'white'
            buttons[1].style.backgroundColor = 'white'
            buttons[2].style.backgroundColor = 'green'

            setPosts(newArray)
        }
    }

    return ( 
        <div>
            <div>
                <button className='orderButton' onClick={(e)=>{
                    changeOrder(e.target.textContent)
                }}>Top</button>
                <button className='orderButton' onClick={(e)=>{
                    changeOrder(e.target.textContent)
                }}>New</button>
                <button className='orderButton' onClick={(e)=>{
                    changeOrder(e.target.textContent)
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