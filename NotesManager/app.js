class Note {
  constructor(id, description, isImportant = false) {
    this.id = id;
    this.description = description;
    this.isImportant = isImportant;
  }

  toggleIsImportant() {
    this.important = !this.important;
  }
}

class NotesManager {
  constructor() {
    localStorage.getItem('notes') === '' && localStorage.removeItem('notes');
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
  }

  // Add a note
  addNote() {
    const newDescription = document.getElementById('add-note-input').value;
    document.getElementById('add-note-input').value = '';
    const newid = this.notes.length
      ? this.notes[this.notes.length - 1].id + 1
      : 1;
    console.log('newid: ', newid);
    const newNote = new Note(newid, newDescription, false);
    this.notes.push(newNote);
    this.saveNotes();
    this.renderNotes();
  }

  editNote(id) {
    const newDescription = prompt('Please enter a new description: ');
    while (!newDescription) {
      newDescription = prompt('Please enter a new description: ');
      if (!newDescription) {
        alert('Description must be provided');
      } else {
        break;
      }
    }
    this.notes.forEach((note) => {
      note.description = note.id === id ? newDescription : note.description;
    });
    this.saveNotes();
    this.renderNotes();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotes();
    this.renderNotes();
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  toggleImportant(id) {
    this.notes.forEach(
      (note) =>
        (note.isImportant =
          note.id === id ? !note.isImportant : note.isImportant)
    );
    this.saveNotes();
    this.renderNotes();
  }

  renderNotes() {
    const $notesList = document.getElementById('notes-list');
    $notesList.innerHTML = ``;
    this.notes.forEach((note) => {
      const $li = document.createElement('li');
      $li.innerText = note.description;
      $li.className = note.isImportant ? 'important-note' : '';
      $li.addEventListener('click', () => {
        console.log('You clicked the list');
        this.toggleImportant(note.id);
      });
      console.log('note.isImportant: ', note.isImportant);

      const $editButton = document.createElement('button');
      $editButton.innerText = 'Edit';
      $editButton.addEventListener('click', () => {
        this.editNote(note.id);
      });
      $li.appendChild($editButton);

      const $deleteButton = document.createElement('button');
      $deleteButton.innerText = 'Delete';
      $deleteButton.addEventListener('click', () => {
        this.deleteNote(note.id);
      });
      $li.appendChild($deleteButton);

      $notesList.appendChild($li);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const notesManager = new NotesManager();
  const $addNoteButton = document.getElementById('add-note-button');
  notesManager.renderNotes();
  $addNoteButton.addEventListener('click', () => {
    notesManager.addNote();
  });
});
