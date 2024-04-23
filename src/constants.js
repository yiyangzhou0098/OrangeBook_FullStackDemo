
export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_TASK: 'required-task',
  TASK_MISSING: 'noSuchId', 
  INVALID_POST: 'post-invalid',

};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
  UNKNOWN_ACTION: 'unknownAction',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
  [SERVER.REQUIRED_TASK]: 'Please enter the task to do',
  default: 'Something went wrong.  Please try again',
};

export const POLLING_DELAY = 2000;

export const CATEGORIES = {
  RECOMMEND: 'Recommend',
  STYLE: 'Style',
  SPORTS: 'Sports',
  TRIP: 'Trip',
  COOK: 'Cook'
}

export const ACTIONS = {
  LOG_IN: 'logIn',
  LOG_OUT: 'logOut',
  TOGGLE_LOGIN: 'toggle_login',
  START_LOADING: 'startLoading',
  REPORT_ERROR: 'reportError',
  TOGGLE_POST: 'togglePost',
  DELETE_POST: 'deletePost',
  ADD_POST: 'addPost',
  TOGGLE_ME: 'toggleMe',
  TOGGLE_CATEGORY: 'toggleCategory',
  TOGGLE_NEW_POST: 'toggleNewPost',
  REPLACE_MY_POSTS: 'replace_my_posts',
  REPLACE_POSTS: 'replace_posts',
  CLEAR_ERROR: 'clear_error',
  CLOSE_POST: 'close_post',
  CLEAR_LASTADD: 'clear_lastadd'
};
