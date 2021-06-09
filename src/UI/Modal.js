export class Modal {
  constructor(constentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.modalTemplateEl = document.querySelector('#modal-template');
    this.contentTemplateEl = document.querySelector(constentId);
  }

  show() {
    if ('content' in document.createElement('template')) {
      const modalElements = this.modalTemplateEl.content.cloneNode(true);
      this.backdropElement = modalElements.querySelector('.backdrop');
      this.modalElement = modalElements.querySelector('.modal');

      const contentElement = this.contentTemplateEl.content.cloneNode(true);

      this.modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement('afterbegin', this.modalElement);
      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement);
      document.body.removeChild(this.backdropElement);
      this.modalElement = null;
      this.backdropElement = null;
    }
  }
}
