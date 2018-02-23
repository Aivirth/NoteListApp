import '../css/style.scss'
import {http} from './httplibrary';
import {ui} from './ui';

//get notes on DOMLOAD
document.addEventListener('DOMContentLoaded', getNotes);

function getNotes(){
    http.get('http://localhost:3000/notes')
        .then(data => ui.showNotes(data))
        .catch(err => console.log(err));
}