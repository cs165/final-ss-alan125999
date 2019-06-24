const { charset, idLength, prompts } = require('./const');
function genId() {
  let id = new Array(idLength).fill(null);
  id = id.map(() => {
    const randi = Math.floor(Math.random() * charset.length);
    return charset[randi];
  });
  return id.join('');
}

function validateId(id) {
  const re = new RegExp(`^[a-zA-Z0-9]{${idLength}}$`);
  return re.test(id);
}

function genPrompt() {
  const randi = Math.floor(Math.random() * prompts.length);
  return prompts[randi];
}

function getSheetData(sheet) {
  const result = await sheet.getRows();
  const { rows } = result;
  return [rows[0], rows.slice(1)];
}
function rowToObject(titles, row) {
  const entity = {};
  titles.forEach((title, index) => {
    entity[title] = row[index];
  });
  return entity;
}

function findKeyCol(titles, key) {
  return titles.findIndex(title => title === key);
}
function findFirstRow(titles, contents, key, value) {
  const colIndex = findKeyCol(titles, key);
  const rowIndex = contents.findIndex(row => row[colIndex] === value);
  return contents[rowIndex];
}

function isIdExist(sheet, id) {
  const [titles, contents] = getSheetData(sheet);
  const row = findFirstRow(titles, contents, 'id', id);
  return row !== -1;
}

module.exports = {
  genId, validateId, genPrompt, isIdExist
}