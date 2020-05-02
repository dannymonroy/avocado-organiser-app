const fs = require('fs');
const path = require('path');
//Global Variable to keep track of name repeated files moved.
let count = 0;


module.exports = {

  getDate: function (file) {
    const date = [];
    const arrDate = fs.statSync(file).birthtime.toString().split(' ');
    const [__, month, day, year] = [...arrDate];
    date.push(year, month, day);
    return date;
  },

  createYearFolder: function (destination, year) {
    const yearDir = path.join(destination, year);
    if (!fs.existsSync(yearDir)) {
      fs.mkdirSync(yearDir);
    }
  },
  createMonthFolder: function (destination, year, month) {
    const monthDir = path.join(destination, year, month);
    if (!fs.existsSync(monthDir)) {
      fs.mkdirSync(monthDir);
    }
  },
  createDayFolder: function (destination, year, month, day) {
    const dayDir = path.join(destination, year, month, day);
    if (!fs.existsSync(dayDir)) {
      fs.mkdirSync(dayDir);
    }
  },

  createFolderStructure: function (date, destination) {
    this.createYearFolder(destination, date[0])
    this.createMonthFolder(destination, date[0], date[1])
    this.createDayFolder(destination, date[0], date[1], date[2])
  },

  moveFile: function(sourcePath, destinationPath, file, date){
    const moveFrom = path.join(sourcePath, file)
    let moveTo = path.join(destinationPath, date[0], date[1], date[2], file);

    if(!fs.existsSync(moveTo)){
      fs.renameSync(moveFrom, moveTo);
    } else {
      const [fileName, ext] = [...file.split('.')];
      moveTo = path.join(destinationPath, date[0], date[1], date[2] ,`${fileName}${count}.${ext}`);
      fs.renameSync(moveFrom, moveTo)
      count = count + 1;
    }
  },

  displayFolder: function(elem, str){
    const arr = str.split('/');
    elem.innerHTML = arr.pop();
  },

  updateUponSuccess: function(inputElem, outputElem, btnStart){
    count = 0;
    const successNotification = new Notification('Title', {
      body: 'All done!'
    })
    
    successNotification.onclick = () => {
      btnStart.innerHTML = "Organise It"
      btnStart.style.backgroundColor = "#603217"
      btnStart.disabled = false;
    }
    
    inputElem.innerHTML = "";
    outputElem.innerHTML = "";
    btnStart.innerHTML = "ALL DONE"
    btnStart.style.backgroundColor = "green"
    btnStart.disabled = true;

    setInterval(() =>{
      btnStart.innerHTML = "Organise It"
      btnStart.style.backgroundColor = "#603217"
      btnStart.disabled = false;
    }, 4000)
  },

  getPaths: function(data) {
   return data.filePaths[0].split(path.sep);
  }

}