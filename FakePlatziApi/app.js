document.addEventListener('DOMContentLoaded', () => {
  fetchItems();
});

const fetchItems = () => {
  fetch('https://api.escuelajs.co/api/v1/products')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network failed ' + response.statusText);
      }
      return response.json();
    })
    .then((items) => {
      const categories = getCategories(items);
      filterItemsButton(items);
      displayCategories(categories);
      displayItems(items);
    })
    .catch((error) => {
      displayError(error);
    });
};

const filterItemsButton = (items) => {
  document.getElementById('search-button').addEventListener('click', (e) => {
    e.preventDefault();
    const $selected = document.getElementById('category-filter').value;
    const categories = getCategories(items);
    displayCategories(categories, (selected = $selected));
    const filteredItems =
      $selected === 'all'
        ? items
        : items.filter((item) => item.category.name === $selected);
    displayItems(filteredItems);
  });
};

const getCategories = (items) => {
  const categories = [];
  items.forEach((item) => {
    if (!categories.includes(item.category.name)) {
      categories.push(item.category.name);
    }
  });
  categories.unshift('all');
  return categories;
};

const displayCategories = (categories, selected = 'all') => {
  const $categoryFilter = document.getElementById('category-filter');
  $categoryFilter.innerHTML = '';
  $categoryFilter.innerHTML = `
        ${categories
          .map((category) => {
            return `<option value=${category} ${
              category === selected && 'selected'
            }>
                ${category}
            </option>`;
          })
          .join('\n')}
    `;
};

const displayItems = (items) => {
  const $cardContainer = document.getElementById('card-container');
  $cardContainer.innerHTML = '';
  items.forEach((item) => {
    const $cardContainerElement = document.createElement('div');
    $cardContainerElement.className = 'card-container-element';

    $cardContainerElement.innerHTML = `
            <figure class="card-figure-container">
                <img src=${'./assets/still-life-say-no-fast-fashion.jpg'} alt=${
      item.title
    }>
            </figure>
            <div class="card-text-content">
                <div>
                    <h4>${item.title}</h4>
                </div>
                <div>
                    Price: ${item.price}$
                </div>
                    
                <div>
                    ${item.description}
                </div>

                <div>
                    Category: ${item.category.name}
                </div>
            </div>
        `;
    $cardContainer.appendChild($cardContainerElement);
  });
};

const displayError = (error) => {
  const $errorMessage = document.getElementById('error-message');
  $errorMessage.textContent = `Error: ${error.message}`;
};
