import {
  db,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
} from "./firestore.js";
const FORM = document.getElementById("form");
let label = document.getElementById("label");
let input = document.getElementById("input");
const table = document.getElementById("table");
const feedback = document.getElementById("greeting");

{
  const names = await getNames(db);
  names.forEach((name) => {
    table.innerHTML += `<tr>${name}<tr>`;
  });
}
async function getNames(db) {
  const NAMES = collection(db, "Names");
  const NAMES_SNAPSHOT = await getDocs(NAMES);
  return NAMES_SNAPSHOT.docs.map((doc) => doc.data().name);
}

FORM.addEventListener("submit", async (e) => {
  e.preventDefault();

  const DOC_REF = await addDoc(collection(db, "Names"), {
    name: input.value,
  });
  const names = await getNames(db);
  names.forEach((name) => {
    table.innerHTML += `<tr>${name}<tr>`;
  });

  feedback.textContent = `Thank you for joining the server ${input.value}`;
  input.value = "";
});

const luckyForm = document.getElementById("lucky");
const luckyInput = document.getElementById("luckyNumber");
const luckyField = document.getElementById("luckyField");

const RANDOM = Math.round(Math.random() * 10);

luckyField.textContent = RANDOM;

const setBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
};

const RANDOM_AFTER = Math.round(Math.random() * 10);

luckyForm.addEventListener("submit", e => {
  e.preventDefault();
  if (luckyInput.value == RANDOM_AFTER) {
    setBg();
  }else{
      return;
  }
});



console.log(RANDOM);
console.log(RANDOM_AFTER);

