import { useState, useEffect, useReducer, useRef } from 'react'
import reducer, { initialState } from './reducer';

import './App.css'
import Header from './header/Header';
import Login from './login/Login';
import Error from './Error';
import Sidebar from './header/Sidebar';
import Feed from './Feed';
import Category from './Category';
import Content from './Content';
import AddPost from './AddPost';

import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  ACTIONS,
  POLLING_DELAY
} from './constants';

import {
  fetchLogin,
  fetchLogout,
  fetchCurrentUser,
  fetchNewPost,
  fetchPostsByCategory,
  fetchCurrentUserPosts
} from './services'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);  
  const [refresh, setRefresh] = useState(false);
  const pollingRef = useRef(); 

  const onLoginPage = () => {
    dispatch({type: ACTIONS.TOGGLE_LOGIN});
  }

  const onLogin = ( username ) => {
    fetchLogin(username)
    .then( postsList => {
      dispatch({type: ACTIONS.LOG_IN, username: username, myPosts: postsList});
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout()
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onRefresh() {
    fetchPostsByCategory(state.category)
    .then( postsList => {
      dispatch({ type: ACTIONS.TOGGLE_CATEGORY, category: state.category, posts: postsList});
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onToggleCategory(category) {
    fetchPostsByCategory(category)
    .then( posts => {
      dispatch({ type: ACTIONS.TOGGLE_CATEGORY, category: category});
      dispatch({ type: ACTIONS.REPLACE_POSTS, posts: posts});
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
    })
  }

  function onToggleAddPost() {
    fetchCurrentUser()
    .then( () => {
      dispatch({ type: ACTIONS.TOGGLE_NEW_POST });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
    })
  }

  function onAddPost(newPost) {
    fetchNewPost(newPost)
    .then(lastPostId => {
      dispatch({type: ACTIONS.ADD_POST, lastPostId: lastPostId});
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function refreshForFeeds() {
    fetchPostsByCategory(state.category)
    .then( posts => {
      dispatch({ type: ACTIONS.REPLACE_POSTS, posts: posts});
      return 
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      return Promise.reject(err);
    })
    .then( () => {
      dispatch({ type: ACTIONS.CLEAR_LASTADD});
      setRefresh(false);
    })
  }

  function onClearError() {
    dispatch( {type: ACTIONS.CLEAR_ERROR})
  }

  function checkForSession() {
    fetchCurrentUser()
    .then( session => { 
      dispatch({ type: ACTIONS.LOG_IN, username: session.username });
      return fetchCurrentUserPosts();
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      return Promise.reject(err);
    })
    .then( myPosts => {
      dispatch({ type: ACTIONS.REPLACE_MY_POSTS, myPosts: myPosts});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { 
        dispatch({ type: ACTIONS.LOG_OUT });
        return;
      }
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onTogglePost(post) {
    console.log(post);
    dispatch({type: ACTIONS.TOGGLE_POST, post: post})
    console.log(state.togglePost);

  }

  function onClosePost() {
    dispatch({type: ACTIONS.CLOSE_POST})
  }

  const pollTodos = () => {
    fetchPostsByCategory(state.category)
    .then( posts => {
      if(posts.length !== state.posts.length && !refresh) {
        setRefresh(true);
      };
    })
    .then( () => {
      pollingRef.current = setTimeout(pollTodos, POLLING_DELAY);
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      pollingRef.current = setTimeout(pollTodos, POLLING_DELAY); 
      return Promise.reject(err);
    })
  };

    useEffect(
    () => {
      refreshForFeeds();
      checkForSession();
    },
    [] // Only run on initial render
  );

  useEffect(
    () => {
        pollingRef.current = setTimeout( pollTodos, POLLING_DELAY );
        return () => {
          clearTimeout(pollingRef.current); 
        };
    },
    [,pollTodos]
  );

  return (
    <>
      <Header
      loginStatus={state.loginStatus}
      username={state.username}
      onLogout={onLogout}
      onLoginPage={onLoginPage}
      />

      {state.inContentPage && <Content post={state.togglePost} onClosePost={onClosePost}/>}
      
      <div className='body__container'>
        <Sidebar onToggleCategory={onToggleCategory} onLoginPage={onLoginPage} onToggleAddPost={onToggleAddPost}/>
        { state.inLoginPage && !state.isAddingNewPost && state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login onLogin={onLogin}/>}
        { state.isAddingNewPost && <AddPost onAddPost={onAddPost} onToggleCategory={onToggleCategory}/>}
        { !state.inLoginPage && !state.isAddingNewPost &&
          <div className='content__container'>
            <Category onToggleCategory={onToggleCategory} />

            {refresh && <button className='refreshBtn' onClick={() => refreshForFeeds()}>🔥 New Post!</button>}

            <Feed
              posts={state.posts}
              onTogglePost={onTogglePost}
            />
          </div>
          }
      </div>

      {state.error && <Error errorStatus={state.error}/>}
    </>
  )
}

export default App
