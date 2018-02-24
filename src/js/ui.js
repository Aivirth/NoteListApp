class UI{
    constructor(){
        this._notes = document.querySelector('#notes-container');
        this._titleInput = document.querySelector('#noteTitle');
        this._authorInput = document.querySelector('#noteAuthor');
        this._bodyInput = document.querySelector('#noteBody');
        this._idInput = document.querySelector('#id');
        this._formState = 'add';
    }

    showNotes(notes){
        let output = '';
        notes.forEach((note)=>{
            output += `
            <li>
                <div id="note-${note.id}" class="card note-card">
                    <header class="card-header">
                        <p class="card-header-title">${note.title}</p>
                        <a href="#" data-id="${note.id}" class="edit-note card-header-icon" aria-label="edit note">
                            <span class="icon"><i class="far fa-edit"></i></span>
                        </a>  
                        <a href="#" class="delete-note card-header-icon" aria-label="delete note">
                            <span class="icon"><i class="fas fa-trash"></i></span>
                        </a>
                    </header>
                    <div class="card-content">
                        <div class="content">${note.body}</div>
                    </div>
                    <footer class="card-footer has-text-grey has-text-left">
                        <p class="note-author card-footer-item">By: ${note.author}</p>
                    </footer>
                </div>
            </li>
            `;
        });
        this._notes.innerHTML = output;
    }

    //showAlerts
    showAlert(msg, className){

        this.clearAlert();

        //create alert box
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));

        const btn = document.createElement('button');
        btn.className = 'delete';
        div.appendChild(btn);

        //get parent
        const container = document.querySelector('.notes-container');

        //get notes
        const notes = document.querySelector('#notes-container');

        //insert alert div
        container.insertBefore(div, notes);

        //timeout
        setTimeout(()=>{
            this.clearAlert();
        }, 3000);

    }

    clearAlert(){
        const currentAlert = document.querySelector('.notification');

        if(currentAlert){
            currentAlert.remove();
        }
    }

    //clear all fields
    clearFields(){
        this._titleInput.value = '';
        this._authorInput.value = '';
        this._bodyInput.value = '';
    }

    editState(data){
        //get all notes 
        let noteList = document.querySelectorAll('.note-card');
        //convert noteList to array
        noteList = Array.from(noteList);

        console.log(data);

        //look for the post with the id equal to data.id
        noteList.forEach((currentNote)=>{
            //get note id
            let currentNoteID = currentNote.id;
            //filter id number from id name
            currentNoteID = parseInt(currentNoteID.split('-')[1]);
            
            //match current node id with data id
            if(currentNoteID === parseInt(data.idContainer.dataset.id)){

                //change title into a input field
                data.titleContainer.innerHTML = `
                <input class="input title-edit-state" type="text" value="${data.titleContainer.textContent}">
                `;

                //change body into a textarea field
                data.bodyContainer.innerHTML = `
                <textarea class="textarea body-edit-state">${data.bodyContainer.textContent}</textarea>
                `;
            }
            
            
            
            
        });
    }
}


export const ui = new UI();