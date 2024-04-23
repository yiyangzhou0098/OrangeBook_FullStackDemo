const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const sessions = require('./sessions');
const users = require('./users');
const posts = require('./posts');
const uuid = require('uuid').v4;

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());
app.use(fileUpload());

posts.makeDefaultPostData();

/* ----- session operations ----- */
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid
    const username = sid? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing'});
        return
    }
    res.json({ username });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if(!users.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username'});
        return
    }

    if(username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);

    if(!existingUserData) {
        users.addUserData(username, '');
    }

    res.cookie('sid', sid);
    res.json(posts.getPostsListByUser(username))
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
  
    if(sid) {
      res.clearCookie('sid');
    }
  
    if(username) {
      sessions.deleteSession(sid);
    }
  
    res.json({ wasLoggedIn: !!username });
});

/* ----- category operations ----- */
app.get('/api/category/:category', (req, res) => {
  const { category } = req.params;
  if(!category) {
    res.status(400).json({ error: 'networkError'});
    return;
  }
  res.json(posts.getPostsListByCategory(category));
});

/* ----- posts operations ----- */
app.post('/api/post', (req, res) =>{
  const sid = req.cookies.sid;
  const username = sid? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing'});
      return
  }

  const newPost = req.body.newPost;
  if(!posts.isValidNewPost( {title: newPost.title, content: newPost.content, category: newPost.category} )) {
    res.status(400).json({ error: 'post-invalid'});
    return
  }
  const id = posts.addPost({username, title: newPost.title, content: newPost.content, category: newPost.category});
  res.status(200).json({ lastPostId: id});
})

app.get('/api/post/:username', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing'});
      return
  }

  const {searchUsername} = req.params;
  const postList = posts.getPostsListByUser(searchUsername);
  res.status(200).json({ postList });
})

app.get('/api/post/current-user', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing'});
      return
  }

  const postList = posts.getPostsListByUser(username);
  res.status(200).json({ postList });
})

app.post('/api/upload', function(req, res) {
  const sid = req.cookies.sid;
  const username = sid? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing'});
      return
  }
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'file-missing'});
  }

  const uploadImage = req.files.sampleFile;
  const fileId = uuid();
  // Use the mv() method to place the file somewhere on your server
  uploadImage.mv(`./public/${fileId}.jpg`, function(err) {
    if (err)
      return res.status(500).json({ error: err});
  });

  res.status(200).json({ status: 'upload success'});
});

/* --------------------- */

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
