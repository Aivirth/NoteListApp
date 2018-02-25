import '../css/style.scss'
import {http} from './httplibrary';
import {ui} from './ui';

//get notes on DOMLOAD
document.addEventListener('DOMContentLoaded', getNotes);
//listen for add note
document.querySelector('.add-note').addEventListener('click', addNote);
//listen for edit state
document.querySelector('#notes-container').addEventListener('click', enableEdit);
//listen for cancel edit state
document.querySelector('#notes-container').addEventListener('click', cancelEdit);


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
            ui.showAlert('Note Added Successfully', "notification is-success");
            ui.clearFields();
            getNotes();
        })
        .catch(err => console.log(err));
}


//Enable edit state
function enableEdit(e){
    
    if(e.target.parentElement.parentElement.classList.contains('edit-note')){
        /*
        const id = parseInt(e.target.parentElement.parentElement.dataset.id);
        const title = e.target.parentElement.parentElement.previousElementSibling.textContent;
        const body = e.target.parentElement.parentElement.parentElement.nextElementSibling.children[0].textContent;
        const author = e.target.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.children[0].textContent;

        const data = {
            id, title, body, author
        }
        */

        //Tests
        const idContainer = e.target.parentElement.parentElement;
        const titleContainer = idContainer.previousElementSibling;
        const bodyContainer = idContainer.parentElement.nextElementSibling.children[0];
        const authorContainer = idContainer.parentElement.nextElementSibling.nextElementSibling.children[0];

        const dataContainers = {
            idContainer,
            titleContainer,
            bodyContainer,
            authorContainer
        }

        ui.editState(dataContainers);
    }
    
    e.preventDefault();
}

function cancelEdit(e){
    if(e.target.parentElement.parentElement.classList.contains('cancel-operation')){



        const idContainer = e.target.parentElement.parentElement;
        const titleContainer = idContainer.previousElementSibling.previousElementSibling;
        const bodyContainer = idContainer.parentElement.nextElementSibling.children[0];
        const authorContainer = idContainer.parentElement.nextElementSibling.nextElementSibling.children[0];

        const dataContainers = {
            idContainer,
            titleContainer,
            bodyContainer,
            authorContainer
        }

        http.get(`http://localhost:3000/notes/${idContainer.dataset.id}`)
            .then(data => ui.cancelEditState(dataContainers, data))
            .catch(err => console.log(err));

        
    }

    e.preventDefault();
}