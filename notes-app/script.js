var addBtn = document.querySelector(".add");
var notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach(function loopEachNote(note) {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", function handleClick() {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="notes">
        <div class="tools">
            <button class="edit"><i class="far fa-edit"></i></button>
            <button class="delete"><i class="far fa-trash-alt"></i></button>
        </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    </div>
    `;

  var editBtn = note.querySelector(".edit");
  var deleteBtn = note.querySelector(".delete");
  var main = note.querySelector(".main");
  var textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);

  editBtn.addEventListener("click", function handleClick() {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", function handleClick() {
    note.remove();
    updateLocalStorage();
  });

  textArea.addEventListener("input", function handleInput(e) {
    var { value } = e.target;
    main.innerHTML = marked(value);
    updateLocalStorage();
  });

  document.body.appendChild(note);
}

function updateLocalStorage() {
  var allNotesText = document.querySelectorAll("textarea");
  var allNotes = [];
  allNotesText.forEach(function pushNoteText(note) {
    allNotes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(allNotes));
}
