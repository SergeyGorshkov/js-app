import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';
import { renderPost } from '../templates/post.template';

export class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
    this.posts =[];
  }

  init() {
    this.$el.addEventListener('click', buttonHandler.bind(this));
  }
  
  async onShow() {
    this.loader.show();
    const fbData = await apiService.fetchPosts();
    this.posts = TransformService.fbObjectToArray(fbData);
    const html = this.posts.map(post => renderPost(post, {withButton: true}));
    this.loader.hide();
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
  }

  onHide() {
    this.$el.innerHTML = '';
  }
}

function buttonHandler(event) {
  const $el = event.target;
  const { id, title } = $el.dataset;
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const candidate = favorites.find(p => p.id === id);

  if($el.id) {
    if (!confirm(`Вы действительно хотите удалить пост "${title}"?`)) {
      return;
    }
    favorites = favorites.filter(p => p.id !== id);
    apiService.fetchDeleteById(id);
    this.posts = this.posts.filter(p => p.id !== id);
    const html = this.posts.map(post => renderPost(post, {withButton: true}));
    this.$el.innerHTML = '';
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else if (id) {
    if (candidate) {
      // удалить элемент
      // $el.textContent = 'Сохранить';
      $el.classList.add('button-primary');
      $el.classList.remove('button-info');
      favorites = favorites.filter(p => p.id !== id);
    } else {
      // добавить элемент
      $el.classList.remove('button-primary');
      $el.classList.add('button-info');
      // $el.textContent = 'Удалить';
      favorites.push({id, title});
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}