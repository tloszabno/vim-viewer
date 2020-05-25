const fs = require("fs");
const path = require("path");
const { ipcRenderer } = require("electron");

const galleryPath = "/home/tomek/Pictures";
let currentFileName = null;

window.addEventListener("DOMContentLoaded", () => {
  const files = readImagesInDir();
  if (files.length == 0) {
    return;
  }

  currentFileName = files[0];
  paintImage();
});

ipcRenderer.on("img-next", () => {
  changeCurrentImage("next");
});
ipcRenderer.on("img-prev", () => {
  changeCurrentImage("prev");
});

const paintImage = () => {
  console.log("painting " + currentFileName);
  const fileAsBase64 = fs.readFileSync(
    path.join(galleryPath, currentFileName),
    { encoding: "base64" }
  );
  document.getElementById("imagePreview").src =
    "data:image/png;base64," + fileAsBase64;
};

const changeCurrentImage = (direction) => {
  const images = readImagesInDir();
  let idx = images.findIndex((img) => img == currentFileName);
  console.log({idx, direction, images})
  if (images.length == 0) {
    return;
  }

  idx = direction === "prev" ? idx - 1 : idx + 1;

  if (idx >= images.length) {
    idx = 0;
  }
  if (idx < 0) {
    idx = images.length - 1;
  }

  currentFileName = images[idx];
  paintImage();
};

const readImagesInDir = () => {
  return fs.readdirSync(galleryPath).filter((item) => item.endsWith(".jpg"));
};
