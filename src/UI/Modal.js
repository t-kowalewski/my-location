export class Modal {
  constructor(constentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.modalTemplateEl = document.querySelector('#modal-template');
    this.contentTemplateEl = document.querySelector(constentId);
  }

  show() {
    if ('content' in document.createElement('template')) {
      const modalElements = this.modalTemplateEl.content.cloneNode(true);
      const backdropElement = modalElements.querySelector('.backdrop');
      const modalElement = modalElements.querySelector('.modal');

      const contentElement = this.contentTemplateEl.content.cloneNode(true);

      modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement('afterbegin', modalElement);
      document.body.insertAdjacentElement('afterbegin', backdropElement);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {}
}
