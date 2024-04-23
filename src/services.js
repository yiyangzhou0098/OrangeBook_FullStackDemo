export function fetchLogin(username) {
    return fetch('/api/session/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json', // set this header when sending JSON in the body of request
      },
      body: JSON.stringify( { username } ),
    })
    .catch( () => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  
export function fetchCurrentUser() {
return fetch('/api/session', {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
    },
})
.catch( err => Promise.reject({ error: 'network-error' }) )
.then( response => {
    if(!response.ok) {
    return response.json().then( err => Promise.reject(err));
    }
    return response.json(); 
})
}

export function fetchLogout() {
return fetch('/api/session', {
    method: 'DELETE',
    headers: {
    'content-type': 'application/json',
    },
})
.catch( err => Promise.reject({ error: 'network-error' }) )
.then( response => {
    if(!response.ok) {
    return response.json().then( err => Promise.reject(err));
    }
    return response.json(); 
})
}

/* ----- fetch posts ----- */
export function fetchPostsByCategory(category) {
  return fetch(`/api/category/${category}`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
    },
})
.catch( err => Promise.reject({ error: 'network-error' }) )
.then( response => {
    if(!response.ok) {
    return response.json().then( err => Promise.reject(err));
    }
    return response.json(); 
})
}

export function fetchNewPost(newPost) {
return fetch('/api/post', {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    },
    body: JSON.stringify( {newPost} )
})
.catch( err => Promise.reject({ error: 'network-error' }) )
.then( response => {
    if(!response.ok) {
    return response.json().then( err => Promise.reject(err));
    }
    return response.json();
})
}

export function fetchCurrentUserPosts() {
  return fetch('/api/post/current-user', {
    method: 'GET',
    'content-type': 'application/json',
    }) 
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {
    return response.json().then( err => Promise.reject(err));
    }
    return response.json();
})
  
}

export function fetchPostsByUser(username) {
  return fetch(`/api/posts/${username}`, {
    method: 'GET',
    'content-type': 'application/json',
    }) 
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {
    return response.json().then( err => Promise.reject(err));
    }
    return response.json();
})
}
  
  
  
  