import '../css/style.scss'
import {http} from './httplibrary';

/*
http.get('https://jsonplaceholder.typicode.com/users')
    .then(data =>console.log(data))
    .catch(err => console.log(err));
*/

const data = {
    name : 'john doe',
    username : 'johndoe',
    email :'text@test.com'
}

/*
http.post('https://jsonplaceholder.typicode.com/users', data)
    .then(data =>console.log(data))
    .catch(err => console.log(err));
*/

/*
http.put('https://jsonplaceholder.typicode.com/users/1', data)
    .then(data =>console.log(data))
    .catch(err => console.log(err));
*/