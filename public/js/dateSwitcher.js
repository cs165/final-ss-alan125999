class DateSwitcher {
  constructor(root, id) {
    this.root = root;
    this.id = id;
    this.date = new Date();
    this.btnBack = root.querySelector('#date-back');
    this.btnHome = root.querySelector('#date-today');
    this.btnNext = root.querySelector('#date-next');
    this.finishBtn = root.querySelector('#save');
    this.btnBack.addEventListener('click', this.getPrevDiary.bind(this));
    this.btnHome.addEventListener('click', this.getTodayDiary.bind(this));
    this.btnNext.addEventListener('click', this.getNextDiary.bind(this));
    this.getDiary = this.getDiary.bind(this);
    this.setCallBack = this.setCallBack.bind(this);
    this.showFinishBtn = this.showFinishBtn.bind(this);
    this.rmFinishBtn = this.rmFinishBtn.bind(this);
  }

  getPrevDiary() {
    this.date.setDate(this.date.getDate() - 1);
    this.getDiary();
  }
  getTodayDiary() {
    this.date = new Date();
    this.getDiary();
  }
  getNextDiary() {
    this.date.setDate(this.date.getDate() + 1);
    this.getDiary();
  }
  getDiary() {
    const date = this.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    fetch(`/api/diary/${this.id}/${date}`)
      .then(res => res.json())
      .then(json => {
        this.updateEditor(json.prompt, json.content, date);
      })
  }
  setCallBack(updateEditor, saveContent) {
    this.updateEditor = updateEditor;
    this.saveContent = saveContent;
    this.finishBtn.addEventListener('click', () => {
      this.saveContent();
      this.rmFinishBtn();
    });
  }
  showFinishBtn() {
    this.finishBtn.classList.remove('hidden');
    this.btnBack.classList.add('hidden');
    this.btnHome.classList.add('hidden');
    this.btnNext.classList.add('hidden');
  }
  rmFinishBtn() {
    this.finishBtn.classList.add('hidden');
    this.btnBack.classList.remove('hidden');
    this.btnHome.classList.remove('hidden');
    this.btnNext.classList.remove('hidden');
  }
}