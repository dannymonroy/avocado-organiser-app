// Core Module Imports

//Electron Imports
const { dialog } = require('electron').remote;

// Dom Handlers
const btnSource = document.getElementById('source');
const btnDestination = document.getElementById('destination');
const btnStart = document.getElementById('start');

//Global Variables
let sourcePath;
let destinationPath;


console.log('Avocado Organiser');

//event handlers

btnSource.addEventListener('click', () => {
  console.log("Source clicked");
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then((data) =>{
    sourcePath = data.filePaths;
  });
})

btnDestination.addEventListener('click', () => {
  console.log("Destination clicked");
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then((data) =>{
    destinationPath = data.filePaths;
  });
})

btnStart.addEventListener('click', () => {
  console.log("Start clicked");
  console.log(`Source: ${sourcePath} | Destination: ${destinationPath}`);

})