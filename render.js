const fs = require("fs");

const path = "/home/tomek";


window.addEventListener("DOMContentLoaded", () => {
    fs.readdir(path, (err, items) => {
        items.forEach(item => {
            const li = document.createElement("li")
            li.innerText = item
            document.getElementById("fs-list").appendChild(li)
        })
    });
});


// prosta przeglądarka do zdjęć
// jeden skrót na dalej / wcześniej,
// odczytanie zdjęcia z dysku
