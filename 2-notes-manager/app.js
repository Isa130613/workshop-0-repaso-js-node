class Note {
  static notes = [];
  constructor(id, description, important = false) {
    this.id = id;
    this.description = description;
    this.important = important;
  }

  setImportantNote() {
    this.important = true;
  }
}

class NoteManager {
  constructor() {
    this.notes = [];
  }

  addNote(description) {
    alert('note added', description);
    this.notes.push(
      new Note(
        this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1,
        description
      )
    );

    this.saveNotes();
    this.renderNotes();
  }

  editNote(newDescription, id) {
    this.notes[this.notes.indexOf((el) => el.id === id)].description =
      newDescription;
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotes();
    this.renderNotes();
  }

  setImportantNote(id) {
    const note = this.notes.find((note) => note.id == id);
    if (note) {
      note.setImportantNote();
      alert(
        `note with description ${note.description} has been set as important`
      );
      this.saveNotes();
      this.renderNotes();
    }
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    return notes.map((note) => {
      new Note(note.id, note.description, note.important);
    });
  }

  renderNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    this.notes.forEach((note) => {
      const liItem = document.createElement('li');
      liItem.textContent = note.description;
      liItem.addEventListener('click', () => {
        this.setImportantNote(note.id);
      });

      const deleteButton = document.createElement('button');

      deleteButton.textContent = 'Delete note';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteNote(note.id);
      });

      liItem.appendChild(deleteButton);
      notesList.appendChild(liItem);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const noteManager = new NoteManager();

  document.getElementById('add-note').addEventListener('click', () => {
    const newNote = document.createElement('input');
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Create task';
    const container = document.getElementById('container');
    container.appendChild(newNote);
    container.appendChild(sendButton);

    sendButton.addEventListener('click', () => {
      if (newNote) {
        noteManager.addNote(newNote.value);
      }
      newNote.remove();
      sendButton.remove();
    });
  });
});
