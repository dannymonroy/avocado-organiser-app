// Core Module Imports
const fs = require('fs');
//Electron Imports
const { dialog } = require('electron').remote;

// Dom Elements
const btnSource = document.getElementById('source');
const btnDestination = document.getElementById('destination');
const btnStart = document.getElementById('start');

//App Imports
const utils = require('./utils.js');

//Global Variables
let sourcePath;
let destinationPath;

//event handlers

btnSource.addEventListener('click', () => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then((data) =>{
    sourcePath = data.filePaths[0];
  });
})

btnDestination.addEventListener('click', () => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then((data) =>{
    destinationPath = data.filePaths[0];
  });
})

btnStart.addEventListener('click', () => {
  try{
    getAllFiles(sourcePath, destinationPath);
    console.log('All done!');
  } catch (err) {
    console.log('No folder with that name in this location', err);
  }

})

//Main Script

function getAllFiles(path, destination){
  const arrFiles = fs.readdirSync(path, {withFileTypes: true});
  for(const file of arrFiles){
    let date = utils.getDate(`${path}/${file.name}`);
    if(file.isDirectory()){
      getAllFiles(`${path}/${file.name}`, destination);
    } else {
      utils.createFolderStructure(date, destination)
      utils.moveFile(path, destination, file.name, date);
    }
  }
}