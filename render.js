const fs = require("fs");
const path = require("path");

const galleryPath = "/home/tomek/Pictures";
let currentFileName = null;

window.addEventListener("DOMContentLoaded", () => {
  const files = fs
    .readdirSync(galleryPath)
    .filter((item) => item.endsWith(".jpg"));
  if (files.length == 0) {
    return;
  }

  currentFileName = files[0];

  const fileAsBase64 = fs.readFileSync(
    path.join(galleryPath, currentFileName),
    { encoding: "base64" }
  );
  document.getElementById("imagePreview").src =
    "data:image/png;base64," + fileAsBase64;

  files.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    document.getElementById("fs-list").appendChild(li);
  });
});

// prosta przeglądarka do zdjęć
// jeden skrót na dalej / wcześniej,
// odczytanie zdjęcia z dysku
