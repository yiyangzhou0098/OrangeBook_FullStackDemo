const uuid = require('uuid').v4;

const defimages = [
    "https://picsum.photos/640/200/?random",
    "https://picsum.photos/360/640/?random",
    "https://picsum.photos/480/720/?random",
    "https://picsum.photos/480/640/?random",
    "https://picsum.photos/360/?random",
    "https://picsum.photos/360/520/?random",
    "https://picsum.photos/520/360/?random",
    "https://picsum.photos/720/640/?random"
  ];

const categories = ['Style', 'Trip', 'Cook', 'Sports']

const posts = {
    // Data structure like this
    // id1: {
    //     id: id1;
    //     username: username1,
    //     title: 'TitleA',
    //     image: ['./user_1.jpg', './user_2.jpg'],
    //     content: 'contentA',
    //     category: 'Style',
    // },
    // id2: {
    //     id: id2;
    //     username: username1,
    //     title: 'TitleB',
    //     image: ['./user_3.jpg', './user_4.jpg'],
    //     content: 'contentB',
    //     category: 'Trip',
}

// Hardcode images, #TODO not implement image upload function
function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
const addImage = () => {
    const arr = [];
    const imgSrc = `${defimages[random(0, 7)]}=${random(1, 10000)}`;
    arr.push(imgSrc);
    return arr;
}

function addPost( {username, title, content, category} ) {
    const id = uuid();
    posts[id] = 
        {
            id: id,
            username: username,
            title: title,
            image: addImage(),
            content: content,
            category: category,
        }
    return id;
}

function deletePost( postId ) {
    delete posts[postId];
}

function getPostsList() {
    return Object.values(posts);
}

function getPostsListByCategory(category) {
    if(category === 'Recommend' || !category) {
        return getPostsList();
    }

    const ret = Object.values(posts).filter(value => {return value.category === category})

    return ret;
}

function getPostById(id) {
    return posts[id];
}

function getPostsListByUser(username) {
    const ret = Object.values(posts).filter(value => {return value.username === username})

    return ret;
}

function makeDefaultPostData() {
    for(let i = 0; i < 20; i++) {
        let randomID = uuid();
        posts[randomID] = 
            {
                id: randomID,
                username: 'User' + i,
                title: 'This is Demo Title '+ i,
                image: addImage(),
                content: 'This is Demo Post Content Text ' + i,
                category: categories[random(0,3)],
            }
    }
}

function isValidNewPost({title, content, category}) {
    let isValid = true;
    isValid = isValid && title && category && content.trim();
    isValid = isValid && title.match(/^[A-Za-z0-9_]+$/) && content.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}


module.exports = {
    posts,
    addPost,
    deletePost,
    getPostsList,
    getPostsListByCategory,
    makeDefaultPostData,
    isValidNewPost,
    getPostsListByUser,
    getPostById
}