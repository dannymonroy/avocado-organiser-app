const fs = require('fs');
//Global Variable to keep track of name repeated files moved.
let count = 1;

module.exports = {

  getDate: function (file) {
    const date = [];
    const arrDate = fs.statSync(file).birthtime.toString().split(' ');
    const [__, month, day, year] = [...arrDate];
    date.push(year, month, day);
    return date;
  },

  createYearFolder: function (destination, year) {
    console.log('Create year: ', destination, year)
    if (!fs.existsSync(`${destination}/${year}`)) {
      fs.mkdirSync(`${destination}/${year}`);
      console.log(`${year} created!`)
    }
  },
  createMonthFolder: function (destination, year, month) {
    if (!fs.existsSync(`${destination}/${year}/${month}`)) {
      fs.mkdirSync(`${destination}/${year}/${month}`);
      console.log(`${month} created!`)
    }
  },
  createDayFolder: function (destination, year, month, day) {
    if (!fs.existsSync(`${destination}/${year}/${month}/${day}`)) {
      fs.mkdirSync(`${destination}/${year}/${month}/${day}`);
    }
  },

  createFolderStructure: function (date, destination) {
    this.createYearFolder(destination, date[0])
    this.createMonthFolder(destination, date[0], date[1])
    this.createDayFolder(destination, date[0], date[1], date[2])
  },

 moveFile: function (path, destination, file, date) {
    const source = `${path}/${file}`
    let destinationPath = `${destination}/${date[0]}/${date[1]}/${date[2]}/${file}`;
    if(!fs.existsSync(destinationPath)){
      fs.renameSync(source, destinationPath)
    } else {
      const [fileName, ext] = [...file.split('.')]
      destinationPath = `${destination}/${date[0]}/${date[1]}/${date[2]}/${fileName}${count}.${ext}`;
      fs.renameSync(source, destinationPath)
      count = count + 1;
    }
  },

  displayFolder: function(elem, str){
    const arr = str.split('/');
    elem.innerHTML = arr.pop();
  },

  updateUponSuccess: function(inputElem, outputElem, successElem){
    inputElem.innerHTML = "";
    outputElem.innerHTML = "";
    successElem.style.visibility = 'visible';
  }

}