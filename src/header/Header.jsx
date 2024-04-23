import './Header.css';
import {LOGIN_STATUS} from '../constants'

function Header({ loginStatus, username, onLogout, onLoginPage }) {
    function onClickToLogin(e) {        
        e.preventDefault(); 
        onLoginPage();
      }

    return (
        <header>
                <div className="header">
                    <p className="header__title">Orange Book</p>                        
                            { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN ?
                                <nav className="nav--content">
                                    <p className="nav__para"> Hello! Welcome to Home Page</p>
                                    <button className="nav__btn" onClick={e=>onClickToLogin(e)}>Login</button>
                                </nav>
                                :
                                <nav className="nav--content">
                                    <p className="nav__para"> Hello {username}! Welcome to Home Page</p>
                                    <button className="nav__btn" onClick={()=>onLogout()}>Logout</button>
                                </nav>
                            }
                </div>   
        </header>
    )
}

export default Header;