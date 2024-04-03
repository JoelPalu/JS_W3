import {getMenu, restorauntRow} from './components.js';

async function getRestaurants() {
  const response = await fetch('https://10.120.32.94/restaurant/api/v1/restaurants');
  const restaurants = await response.json();
  restaurants.sort((a, b) => a.name.localeCompare(b.name));

  const list = document.getElementById('list');
  restaurants.forEach((restaurant) => {
    const tr = restorauntRow(restaurant);
    tr.addEventListener('click', () => {
      getMenu(restaurant, 'en', tr);
    });
    list.appendChild(tr);
  });
}

getRestaurants();
