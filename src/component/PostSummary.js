const PostSummary = ({post}) => {
    return ( 
        <div>
            <h2>{post.title}</h2>
            <p>{post.user}</p>
            <p>{post.content}</p>
            <h6>{post.time}</h6>
            <h6>{post.upvote}</h6>
        </div>
     );
}
 
export default PostSummary;