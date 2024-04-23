
function loginCheck(username) {
    if(!username) {
        return 'Error! Username can not be empty'
    }
    else if(username === 'dog' || !username.match(/^[A-Za-z0-9_]+$/)) {
        return 'Error! Not a valid user'
    }
    return '';
} 

export default loginCheck;