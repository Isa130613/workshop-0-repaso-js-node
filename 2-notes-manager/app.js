class Note {
  static notes = [];
  constructor(id, description, important = false) {
    this.id = id;
    this.description = description;
    this.important = important;
  }

  changeImportance() {
    this.important = !this.important;
  }
}

class NoteManager {
  constructor() {
    this.notes = [];
  }

  addNote(description) {
    this.notes.push(
      new Note(
        this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1,
        description
      )
    );

    this.saveNotes();
    this.renderNotes();
  }

  editNote(note, newDescription) {
    this.notes[this.notes.indexOf(note)].description = newDescription;

    this.saveNotes();
    this.renderNotes();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotes();
    this.renderNotes();
  }

  setImportantNote(id) {
    const note = this.notes.find((note) => note.id == id);

    if (note) {
      note.changeImportance();
      this.saveNotes();

      return `note with description ${note.description} has been set with importance ${note.important}`;
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
    const container = document.getElementById('container');

    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    this.notes.forEach((note) => {
      const liItem = document.createElement('li');

      const aItem = document.createElement('a');
      aItem.textContent = note.description;

      const banner = document.createElement('div');
      banner.textContent = this.setImportantNote(note.id);
      const okayButton = document.createElement('button');
      okayButton.textContent = 'okay';
      banner.appendChild(okayButton);

      aItem.addEventListener('click', () => {
        container.appendChild(banner);
      });

      okayButton.addEventListener('click', () => {
        banner.remove();
      });

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit task description';
      editButton.addEventListener('click', () => {
        editButton.remove();
        const newDescription = document.createElement('input');
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';

        liItem.appendChild(newDescription);
        liItem.appendChild(updateButton);

        updateButton.addEventListener('click', () => {
          if (newDescription.value) {
            this.editNote(note, newDescription.value);
          }

          newDescription.remove();
          updateButton.remove();
        });
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete note';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteNote(note.id);
      });

      liItem.appendChild(aItem);
      liItem.appendChild(deleteButton);
      liItem.appendChild(editButton);
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
      if (newNote.value) {
        noteManager.addNote(newNote.value);
      } else {
        alert('Note description empty, please try again');
      }
      newNote.remove();
      sendButton.remove();
    });
  });
});
