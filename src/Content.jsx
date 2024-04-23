import './Content.css';

export default function Content( {post, onClosePost} ) {
    return(
    <>
        <div className="modal-overlay"></div>

        <div className="post-detail">
        <span className="close-button" onClick={()=> onClosePost()}>X</span>
            <div className="post-content">
                <img src={post.image[0]} className="post-image" alt="Post Image"/>

                <div className="right-detail">
                    <div className='user-info'>
                        <img src="https://i.pravatar.cc/50" className="user-avatar" alt="User Avatar"/>
                        <h2 className="username">{post.username}</h2>
                    </div>
                
                    <h1 className="post-title">{post.title}</h1>
                    <p className="post-description">{post.content}</p>
                    <p className="post-category"># {post.category}</p>

                    <div className='comment-area'> 
                        <p># comment area</p>
                        {/* <div className='user-info'>
                            <img src="user-avatar.jpg" className="user-avatar comment-user__avatar" alt="User Avatar"/>
                            <h2 className="username comment-username">Username</h2>

                            <p className="post-description">Post Description</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}