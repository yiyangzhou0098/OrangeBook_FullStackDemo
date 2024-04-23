import './Sidebar.css';

function Sidebar( {onToggleCategory, onLoginPage, onToggleAddPost} ) {

    function onClickToggleCategory(e) {        
        e.preventDefault(); 
        onToggleCategory('Recommend');
      }

    function onClickToLogin(e) {        
        e.preventDefault(); 
        onLoginPage();
      }
    
    function onClickToAddPost(e) {
        e.preventDefault(); 
        onToggleAddPost();
    }

    return (
        <div className='sidebar__container'>
            <ul className='channer__list'>
                <li className='explore__btn'>
                    <a href='' onClick={e=> onClickToggleCategory(e)}>
                        <img src="./home.jpg" className='channel__img'></img>
                        <span className='channel'>Explore</span>
                    </a>
                </li>
                <li className='post__btn'>
                    <a href='' onClick={e=> onClickToAddPost(e)}>
                        <img src="./post.jpg" className='channel__img'></img>
                        <span className='channel'>Post</span>
                    </a>
                </li>
                <li className='notification__btn'>
                    <a href=''>
                        <img src="./note.jpg" className='channel__img'></img>
                        <span className='channel'>Notification</span>
                    </a>
                </li>
                {/* <li className='me__btn'>
                    <a href='' onClick={e=> onClickToLogin(e)}>
                        <img className='channel__img'></img>
                        <span className='channel'>Me</span>
                    </a>
                </li> */}
                <li className='more__btn'>
                    <a href=''>
                        <img src="./more.jpg" className='channel__img'></img>
                        <span className='channel'>More</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;