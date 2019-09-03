import { Component } from '../core/component';

export class HeaderComponent extends Component {
  constructor(id, { section }) {
    super(id);
    this.next = section;
  }

  init() {
    if (localStorage.getItem('visited')) {
      this.hide();
    }
    const btn = this.$el.querySelector('.js-header-start');
    btn.addEventListener('click', buttonHandler.bind(this));
  };
}

function buttonHandler() {
  localStorage.setItem('visited', JSON.stringify(true));
  this.hide();
  this.next.show();
};

