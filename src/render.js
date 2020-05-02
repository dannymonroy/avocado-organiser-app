// Core Module Imports
const fs = require('fs');
const path = require('path');

//Electron Imports
const { dialog } = require('electron').remote;
const shell = require('electron').shell;

// DOM Elements
const btnSource = document.getElementById('source');
const btnDestination = document.getElementById('destination');
const btnStart = document.getElementById('start');
const spanSource = document.getElementById('input');
const spanDestination = document.getElementById('output');
const link = document.getElementById("link");

//App Imports
const utils = require('./utils.js');

//Global Variables
let sourcePath;
let destinationPath;

//Event Handlers

btnSource.addEventListener('click', () => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then((data) =>{
    const sourcePathObj = path.parse(data.filePaths[0]);
    sourcePath = path.format(sourcePathObj); //path str
    utils.displayFolder(spanSource, sourcePathObj.name);
  })
});

btnDestination.addEventListener('click', () => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then((data) =>{
    const destinationPathObj = path.parse(data.filePaths[0]);
    destinationPath = path.format(destinationPathObj);
    utils.displayFolder(spanDestination, destinationPathObj.name);
  });
});

btnStart.addEventListener('click', () => {
  try{
    getAllFiles(sourcePath, destinationPath);
    utils.updateUponSuccess(spanSource, spanDestination, btnStart);
    sourcePath = '';
    destinationPath = '';
  } catch (err) {
    new Notification('Title', {
      body: 'You have to pick a folder from to'
    })
  }
});

link.addEventListener('click', (event) => {
  event.preventDefault();
  shell.openExternal("https://github.com/dannymonroy/avocado-organiser-app")
});

//Main Script

function getAllFiles(sourcePath, destinationPath){
  const arrFiles = fs.readdirSync(sourcePath, {withFileTypes: true});
  for(const fileObj of arrFiles){
    let sourcePathPlusFile = path.join(sourcePath, fileObj.name);
    let date = utils.getDate(sourcePathPlusFile);
    if(fileObj.isDirectory()){
      getAllFiles(sourcePathPlusFile, destinationPath);
    } else {
      utils.createFolderStructure(date, destinationPath)
      utils.moveFile(sourcePath, destinationPath, fileObj.name, date);
    }
  }
}

