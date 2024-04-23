import {
  LOGIN_STATUS,
  CLIENT,
  ACTIONS,
  CATEGORIES
} from './constants';

export const initialState = {
  error: '',
  username: '',
  loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
  isPostPending: false,
  lastAddedPostId: '',
  category: CATEGORIES.RECOMMEND,
  posts: [],
  myPosts: [],
  isAddingNewPost: false,
  isInUserProfile: false,
  inContentPage: false,
  togglePost: null
};

function reducer(state, action) {
  switch(action.type) {

    case ACTIONS.LOG_IN:   // actions are the change in state, not how that change happened
      return {
        ...state,
        error: '',
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
        myPosts: action.myPosts,
        isAddingNewPost: false,
        inLoginPage: false,
      };

    case ACTIONS.TOGGLE_LOGIN:
      return {
        ...state,
        inLoginPage: true,
        isAddingNewPost: false,
        error: '',
      }

    case ACTIONS.START_LOADING:
      return {
        ...state,
        error: '',
        isPostPending: true, 
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        isPostPending: false,
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: '',
        category: CATEGORIES.RECOMMEND,
        myPosts: [],
        isAddingNewPost: false,
        inLoginPage: false,
        inMyProfile: false,
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.error || 'ERROR', 
      };

    case ACTIONS.TOGGLE_CATEGORY:
      return {
        ...state,
        error: '',
        category: action.category,
        isAddingNewPost: false,
        inLoginPage: false,
      };

    case ACTIONS.REPLACE_POSTS:
      return {
        ...state,
        error: '',
        posts: action.posts,
        isAddingNewPost: false,
        inLoginPage: false,
      };
    
    case ACTIONS.TOGGLE_NEW_POST:
      return {
        ...state,
        error: '',
        isAddingNewPost: true,
        inLoginPage: false,
      }

    case ACTIONS.ADD_POST:
      return {
        ...state,
        error: '',
        lastAddedPostId: action.postId,
        isAddingNewPost: false,
        inLoginPage: false,
      };

    case ACTIONS.REPLACE_MY_POSTS:
      return {
        ...state,
        error: '',
        myPosts: action.myPosts
      }

    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: ''
      }
    
    case ACTIONS.TOGGLE_POST:
      return {
        ...state,
        inContentPage: true,
        togglePost: action.post
      }
    
    case ACTIONS.CLOSE_POST:
      return {
        ...state,
        inContentPage: false,
        togglePost: ''
      }

    case ACTIONS.CLEAR_LASTADD:
      return {
        ...state,
        lastAddedPostId: ''
      }

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action }); // reporting detail for debugging aid, not shown to user
  }
}

export default reducer;
