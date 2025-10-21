// /js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isCatalog = path.includes('catalogue.html') || path.includes('catalog.html');
  const isFiche = document.body.hasAttribute('data-product-id');
  const isFR = path.includes('/fr/');
  const dataUrl = isFR ? '../data/data_fr.json' : '../data/data_en.json';

  let products = [];

  async function loadData() {
    try {
      const response = await fetch(dataUrl);
      products = await response.json();
      if (isCatalog) renderProducts(products);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  function renderProducts(items) {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <h3><a href="${isFR ? '/fr/' : '/en/'}${item.slug}.html">${item.nom || item.name}</a></h3>
        <p>Catégorie: ${item.categorie || item.category}</p>
        <p>Score: ${item.score}/10</p>
        <p>Prix: ${item.prix}€</p>
        <button class="favorite-btn" data-id="${item.id}" aria-label="${isFR ? 'Ajouter aux favoris' : 'Add to favorites'}">⭐</button>
      `;
      list.appendChild(card);
    });
    attachFavoriteListeners();
  }

  function applyFilters() {
    const search = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category').value;
    const priceMin = parseFloat(document.getElementById('price-min').value) || 0;
    const priceMax = parseFloat(document.getElementById('price-max').value) || Infinity;
    const scoreMin = parseFloat(document.getElementById('score-min').value) || 0;
    const size = document.getElementById('size').value.toLowerCase();
    const seller = document.getElementById('seller').value.toLowerCase();
    const batch = document.getElementById('batch').value.toLowerCase();
    const sort = document.getElementById('sort').value;

    let filtered = products.filter(item => {
      const nameMatch = (item.nom || item.name).toLowerCase().includes(search);
      const catMatch = !category || (item.categorie || item.category) === category;
      const priceMatch = item.prix >= priceMin && item.prix <= priceMax;
      const scoreMatch = item.score >= scoreMin;
      const sizeMatch = !size || (item.tailles || item.sizes).toLowerCase().includes(size);
      const sellerMatch = !seller || (item.vendeur || item.seller).toLowerCase().includes(seller);
      const batchMatch = !batch || (item.batch || '').toLowerCase().includes(batch);
      return nameMatch && catMatch && priceMatch && scoreMatch && sizeMatch && sellerMatch && batchMatch;
    });

    if (sort === 'score-desc') filtered.sort((a, b) => b.score - a.score);
    else if (sort === 'date-desc') filtered.sort((a, b) => new Date(b.dateMaj) - new Date(a.dateMaj));
    else if (sort === 'price-asc') filtered.sort((a, b) => a.prix - b.prix);

    renderProducts(filtered);
  }

  function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(id)) {
      favorites = favorites.filter(f => f !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
  }

  function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    document.querySelectorAll('.favorite-btn, #favorite-btn').forEach(btn => {
      const id = parseInt(btn.dataset.id || document.body.dataset.productId);
      btn.textContent = favorites.includes(id) ? '★' : '⭐';
    });
  }

  function attachFavoriteListeners() {
    document.querySelectorAll('.favorite-btn, #favorite-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleFavorite(parseInt(btn.dataset.id || document.body.dataset.productId)));
    });
  }

  function sharePage() {
    const title = document.title;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title, url }).catch(console.error);
    } else {
      // Fallback links
      alert(`Share via: Twitter: https://twitter.com/intent/tweet?url=${url}&text=${title}`);
    }
  }

  if (isCatalog) {
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
  }

  if (isFiche) {
    document.getElementById('share-btn').addEventListener('click', sharePage);
  }

  loadData();
  updateFavoriteButtons();
  attachFavoriteListeners();
});