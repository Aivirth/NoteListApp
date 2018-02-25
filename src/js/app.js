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
//listen for submit changes
document.querySelector('#notes-container').addEventListener('click', submitEdit);
//listen for delete note
document.querySelector('#notes-container').addEventListener('click', deleteNote);
//listen for delete All notes
document.querySelector(".delete-all").addEventListener('click', deleteAllNotes);


function deleteAllNotes(e){
    let cards = document.querySelectorAll('.note-card');
    cards = Array.from(cards);
    
    if(confirm('Are you Sure?')){
        cards.forEach(card => {
            let cardID = card.id;
            cardID = cardID.split('-');
            cardID = cardID[1];

            http.delete(`http://localhost:3000/notes/${cardID}`)
                .then((res) => { console.log(res) })
                .catch(err => console.log(err));
        });     
        
    }
    
    location.reload();
    ui.showAlert('Notes deleted successfully', 'notification is-danger');
    

    e.preventDefault();
}


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


function submitEdit(e){
    e.preventDefault();
    if(e.target.parentElement.parentElement.classList.contains('confirm-operation')){

        const idContainer = e.target.parentElement.parentElement;
        const titleContainer = idContainer.previousElementSibling;
        const bodyContainer = idContainer.parentElement.nextElementSibling.children[0];
        const authorContainer = idContainer.parentElement.nextElementSibling.nextElementSibling.children[0];
        const authorName = authorContainer.children[0];

        const dataContainers = {
            idContainer,
            titleContainer,
            bodyContainer,
            authorContainer
        }

        
        
        const id = idContainer.dataset.id;
        const title = titleContainer.firstElementChild.value;
        const body = bodyContainer.firstElementChild.value;
        const author = authorName.textContent;

        const data = {
            id, title, body, author
        }

        //const currentCard = document.getElementById(`note-${idContainer.dataset.id}`);       
        
        http.put(`http://localhost:3000/notes/${id}`, data)
            .then(() => {
                ui.showAlert('Note edited successfully', 'notification is-success');
                getNotes();
            })
            .catch(err => console.log(err));  
    }
}


function deleteNote(e){
    if(e.target.parentElement.parentElement.classList.contains('delete-note')){

        const idContainer = e.target.parentElement.parentElement;
        const id = idContainer.dataset.id;

        if(confirm('Are you sure?')){

            http.delete(`http://localhost:3000/notes/${id}`)
            .then(() => {
                ui.showAlert('Note deleted successfully', 'notification is-danger');
                getNotes();
            })
            .catch(err => console.log(err));  
        }

        e.preventDefault();
    }
}