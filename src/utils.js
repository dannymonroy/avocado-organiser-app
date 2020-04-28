const fs = require('fs');

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

// Move this to a recursive function
 moveFile: function (path, destination, file, date) {
    const source = `${path}/${file}`
    const destinationPath = `${destination}/${date[0]}/${date[1]}/${date[2]}/${file}`;
    fs.renameSync(source, destinationPath)
  }
}