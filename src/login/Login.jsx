import './Login.css';
import { useState } from 'react';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');

    function onSubmit(e) {
        e.preventDefault(); 
        onLogin(username);
      }

    return (
            <div className="login__container">

                <p className='login__title'>Login</p>
                <form className="login__form" onSubmit={onSubmit}>
                    <div className="form__username">      
                        <label className="label__username" htmlFor="username">Username</label>
                        <input name="username" className="username__input" placeholder="Enter username"
                        onInput={(e) => setUsername(e.target.value)}/> 
                    </div>
                    <button className="submit__username" type="submit">Login</button>
                </form>
            </div>
    )
}


export default Login;