import {
  addDoc,
  collection,
  db,
  doc,
  getDocs,
  onSnapshot,
} from "./firestore.js";
const FORM = document.getElementById("form");
let label = document.getElementById("label");
let input = document.getElementById("input");
const table = document.getElementById("table");
const feedback = document.getElementById("greeting");

async function getNames(db) {
  const NAMES = collection(db, "Names");
  const NAMES_SNAPSHOT = await getDocs(NAMES);
  return NAMES_SNAPSHOT.docs.map((doc) => doc.data().name);
}

const names = await getNames(db);
names.forEach((name) => {
  table.innerHTML += `<td>${name}<td>`;
});

FORM.addEventListener("submit", async (e) => {
  e.preventDefault();

  const DOC_REF = await addDoc(collection(db, "Names"), {
    name: input.value,
  });

  feedback.textContent = `Thank you for joining the server ${input.value}`;
  input.value = "";
});

const luckyForm = document.getElementById("lucky");
const luckyInput = document.getElementById("luckyNumber");
const luckyField = document.getElementById("luckyField");

const RANDOM = Math.ceil(Math.random() * 49);

luckyField.textContent = RANDOM;

const setBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
};

let userInput = "";

luckyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userInput = luckyInput.value;
  luckyInput.value = "";
});

setTimeout(() => {
  setInterval(() => {
    const RANDOM_AFTER = Math.ceil(Math.random() * 49);

    if (userInput == RANDOM_AFTER) {
      setBg();
    } else {
    }
    luckyField.textContent = RANDOM_AFTER;
    userInput = "";
    luckyInput.value = "";
  }, 60 * 1000);
}, 60 - new Date().getSeconds() * 1000);
