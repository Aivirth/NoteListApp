import '../css/style.scss'
import {http} from './httplibrary';
import {ui} from './ui';

//get notes on DOMLOAD
document.addEventListener('DOMContentLoaded', getNotes);
//listen for add note
document.querySelector('.add-note').addEventListener('click', addNote);


function getNotes(){
    http.get('http://localhost:3000/notes')
        .then(data => ui.showNotes(data))
        .catch(err => console.log(err));
}

function addNote(){
    const title = document.querySelector('#noteTitle').value;
    const author = document.querySelector('#noteAuthor').value;
    const body = document.querySelector('#noteBody').value;

    const data = {
        title,
        body,
        author
    }

    //create note
    http.post('http://localhost:3000/notes', data)
        .then(data => {
            getNotes();
        })
        .catch(err => console.log(err));
}