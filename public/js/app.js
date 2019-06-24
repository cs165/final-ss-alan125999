//
// TODO(you): Add the JavaScript necessary to complete your final project.
//
class App {
  constructor() {
    const pathArray = window.location.pathname.split('/');
    const idIndex = pathArray.findIndex(path => path === 'id');
    if (idIndex === -1) return;

    this.id = pathArray[pathArray.findIndex(path => path === 'id') + 1];
    this.dateSwitcher = new DateSwitcher(document.querySelector('.date-switcher'), this.id);
    this.editor = new Editor(document.querySelector('#editor'), this.id);
    this.dateSwitcher.setCallBack(this.editor.updateContent, this.editor.saveContent);
    this.editor.setCallback(this.dateSwitcher.showFinishBtn);
    this.dateSwitcher.getTodayDiary();
  }
}
