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
                <div id="note-${note.id}" class="card">
                    <header class="card-header">
                        <p class="card-header-title">${note.title}</p>
                        <a href="#" class="edit-note card-header-icon" aria-label="edit note">
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
}


export const ui = new UI();