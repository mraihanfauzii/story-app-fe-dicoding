import { showFormattedDate } from '../utils/date-helper';

class StoryCard extends HTMLElement {
  #story = null;

  constructor() {
    super();
  }

  set story(value) {
    this.#story = value;
    this.render();
  }

  get story() {
    return this.#story;
  }

  connectedCallback() {
    this.addEventListener('click', () => {
      if (this.#story) {
        window.location.hash = `#/stories/${this.#story.id}`;
      }
    });
    
    this.style.cursor = 'pointer';
  }

  render() {
    if (!this.#story) return;

    const { id, name, photoUrl, description, createdAt } = this.#story;

    this.innerHTML = `
      <div class="card h-100">
        <div class="card-img-wrapper">
          <img 
            src="${photoUrl}" 
            alt="Foto cerita dari ${name}" 
            loading="lazy" 
            class="card-img"
          >
        </div>
        <div class="card-body">
          <h3 class="card-title">
            ${name}
          </h3>
          <p class="card-date">${showFormattedDate(createdAt)}</p>
          <p class="card-description">${description.substring(0, 100)}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('story-card', StoryCard);