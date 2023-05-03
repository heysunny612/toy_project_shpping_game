const $items = document.querySelector('.items');
const $btns = document.querySelector('.btns');
const $logo = document.querySelector('.logo');

const displayItems = (items) => {
  $items.innerHTML = '';
  const elements = [];
  items.forEach((item) => {
    const { brand, name, color, image } = item;
    const $item = document.createElement('li');
    $item.dataset.brand = `${brand}`;
    $item.dataset.color = `${color}`;
    $item.className = `item show ${color.toLowerCase()}`;
    $item.innerHTML = `
      <span class="item_thumbnail">
        <img src="${image}" alt="${brand}" />
      </span>
      <span class="item_description"> ${brand} ,${name} ,${color} Lipstick</span>
    `;
    elements.push($item);
  });
  return elements;
};

const updateItems = (items, key, value) => {
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.add('show');
    } else {
      item.classList.remove('show');
    }
  });
};

const onButtonClick = (event, items) => {
  const { key, value } = event.target.dataset;
  if (key == null || value == null) return;
  updateItems(items, key, value);
};

const getItems = async () => {
  const response = await fetch('./data/data.json');
  const data = await response.json();
  return data.items;
};

const init = async () => {
  try {
    const items = await getItems();
    const elements = displayItems(items);
    $items.append(...elements);
    $btns.addEventListener('click', (event) => onButtonClick(event, elements));
    $logo.addEventListener('click', () => init());
  } catch {
    console.log;
  }
};

init();
