class FavoriteView {
  getTemplate() {
    return `
      <div class="content-container">
        <h1 class="content-title">Cerita Tersimpan (Offline)</h1>
        <div id="favorite-list" class="stories-grid"></div>
      </div>
    `;
  }

  showFavoriteStories(stories) {
    const storiesContainer = document.querySelector('#favorite-list');
    storiesContainer.innerHTML = '';

    // Tampilkan pesan jika belum ada data yang disimpan
    if (!stories || stories.length === 0) {
      storiesContainer.innerHTML = `
        <div class="no-data-message" style="grid-column: 1/-1; text-align: center; padding: 40px;">
          <p>Belum ada cerita yang disimpan.</p>
          <a href="#/" class="btn btn-primary" style="margin-top: 10px; display: inline-block;">Jelajahi Cerita</a>
        </div>
      `;
      return;
    }

    // Render Story Card
    stories.forEach((story) => {
      const storyElement = document.createElement('story-card');
      storyElement.story = story;
      storiesContainer.appendChild(storyElement);
    });
  }
}

export default FavoriteView;