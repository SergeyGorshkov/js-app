import { Component } from '../core/component';

export class SectionComponent extends Component {
  constructor(id) {
    super(id);
  }

  init() {
    if (localStorage.getItem('visited')) {
      this.show();
    }
  };
}