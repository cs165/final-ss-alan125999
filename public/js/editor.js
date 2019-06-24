class Editor {
  constructor(root, id) {
    this.root = root;
    this.id = id;
    this.date = root.querySelector('#date');
    this.prompt = root.querySelector('#prompt');
    this.viewer = root.querySelector('.content-viewer');
    this.editor = root.querySelector('.content-editor');
    this.isEditing = false;
    this.viewer.addEventListener('click', this.switchToEdit.bind(this));
    this.saveContent = this.saveContent.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.setCallback = this.setCallback.bind(this);
  }
  saveContent() {
    this.isEditing = false;
    this.editor.classList.add('hidden');
    this.viewer.classList.remove('hidden');
    this.date.classList.remove('hidden');
    this.viewer.textContent = this.editor.value;
    fetch('/api/diary', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.id,
        prompt: this.prompt.textContent,
        content: this.editor.value,
        date: this.date.textContent,
      })
    })
  }
  switchToEdit() {
    this.isEditing = true;
    this.editor.classList.remove('hidden');
    this.viewer.classList.add('hidden');
    this.date.classList.add('hidden');
    this.showFinishBtn();
  }
  updateContent(prompt, content, date) {
    this.date.textContent = date;
    this.prompt.textContent = prompt;
    this.viewer.textContent = content;
    this.editor.value = content;
  }
  setCallback(showFinishBtn) {
    this.showFinishBtn = showFinishBtn;
  }
}