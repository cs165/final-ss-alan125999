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

async function getSheetData(sheet) {
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

async function findDiary(sheet, id, date) {
  const [titles, contents] = await getSheetData(sheet);
  const idCol = findKeyCol(titles, 'id');
  const dateCol = findKeyCol(titles, 'date');
  const rowIndex = contents.findIndex(row => {
    return row[idCol] === id && row[dateCol] === date;
  });
  if (rowIndex === -1) return null;
  return {
    index: rowIndex + 1,
    diary: rowToObject(titles, contents[rowIndex]),
  }
}
async function updateDiary(sheet, index, diary) {
  const row = [diary.id, diary.date, diary.prompt, diary.content];
  await sheet.setRow(index, row);
}
async function storeDiary(sheet, diary) {
  const row = [diary.id, diary.date, diary.prompt, diary.content];
  await sheet.appendRow(row);
}

module.exports = {
  genId, validateId, genPrompt, updateDiary, findDiary, storeDiary,
}