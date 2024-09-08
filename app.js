const noteCreatorScreen = document.querySelector(".note-creation-screen");
const noteContainer = document.querySelector(".notes-container");
const notePreviewContainer = document.querySelector(".note-creation-preview");

// buttons
const darkModeButton = document.querySelector("#dark-mode-button");
const exitCreatorButton = document.querySelector("#leave-note-creation-button");
const enterCreatorButton = document.querySelector(".create-button");
const addNoteButton = document.querySelector("#add-note-button");
const reloadPreviewButton = document.querySelector("#reload-preview");
// getting input from user through input tags
const noteTitle = document.querySelector("#note-title");
const noteParagraph = document.querySelector("#note-paragraph");
// preview note setup
const previewNoteTitle = document.querySelector("#preview-title");
const previewNoteParagraph = document.querySelector("#preview-paragraph");

// rendering saved notes
class Note {
    constructor(id, title, text) {
        this._id = id;
        this._title = title;
        this._text = text;
    }
}

function renderNotes(){
    for (let i = 0; i < localStorage.length; i++) {
        let currentNoteRendering = JSON.parse(localStorage.getItem(i));
        addNote(currentNoteRendering._id, currentNoteRendering._title, currentNoteRendering._text);
    }
}
renderNotes();

// creating new notes
function addNote(id, title, text) {
    if(title == "" || text == ""){
        alert("Please fill the input boxes.")
    } else {
        let note = new Note(id, title, text);
        let serializedNote = JSON.stringify(note);
        
        let newNote = 
        `<div class="note" id="${note._id}">
            <div class="note-title-container">
                <h1>${note._title}</h1>
                <button id="delete-note-button" onclick="deleteNote(this.parentElement)"><i class="fas fa-close"></i></button>
            </div>
            <p>${note._text}</p>
            </div>`

        // creating HTML elements
        noteContainer.insertAdjacentHTML("afterbegin", newNote);
        console.log(`New note created, its ID is:${id}`);
        
        return serializedNote;
    }
}

function handleNoteCreation() {
    localStorage.setItem(localStorage.length, addNote(localStorage.length, noteTitle.value, noteParagraph.value));
    noteTitle.value = "";
    noteParagraph.value = "";
    noteCreatorScreen.style.display = "none";

        //Creation animation
    noteContainer.style.opacity = 0.5;
    noteContainer.style.marginInline = "4rem";
    setTimeout(() => {
        noteContainer.style.opacity = 1;
        noteContainer.style.margin = "0";
    }, 200);
}

// deleting notes
function deleteNote(note){
    let noteId = note.parentElement.id;
    localStorage.removeItem(noteId);
    note.parentElement.remove();
    console.log(`Note deleted, its ID was: ${noteId}`);
}

// enter and exit creator screen
exitCreatorButton.addEventListener("click", () => {
    noteCreatorScreen.style.display = "none";
    noteTitle.value = "";
    noteParagraph.value = "";
});

enterCreatorButton.addEventListener("click", () => {
    noteCreatorScreen.style.display = "block";
});

addNoteButton.addEventListener("click", handleNoteCreation);

// creation screen note preview rendering
function renderPreview() {
    previewNoteTitle.innerText = noteTitle.value;
    previewNoteParagraph.innerText = noteParagraph.value;
}
document.querySelector("#reload-preview").addEventListener("click", renderPreview);

darkModeButton.addEventListener("click", () => {
    document.querySelector("*").classList.toggle("dark-mode")
});