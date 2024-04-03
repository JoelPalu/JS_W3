import {getMenu, restorauntRow, filterRestaurants} from './components.js';

async function getRestaurants() {
  const response = await fetch('https://10.120.32.94/restaurant/api/v1/restaurants');
  const restaurants = await response.json();
  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  return restaurants;
}
async function renderRestaurants(restaurants){
  const table = document.getElementById('list');
  table.innerHTML = '';
  restaurants.forEach((restaurant) => {
    const tr = restorauntRow(restaurant);
    tr.addEventListener('click', () => {
      getMenu(restaurant, 'en', tr);
    });
    table.appendChild(tr);
  });
}

const rest = getRestaurants();
rest.then((restaurants) => {
  renderRestaurants(restaurants);
});
filterButtons();

function filterButtons() {
  const buttonAll = document.createElement('button');
  buttonAll.innerText = 'Show all';
  buttonAll.addEventListener('click', () => {
    rest.then((restaurants) => {
      renderRestaurants(restaurants);
    });
  });

  const buttonSud = document.createElement('button');
  buttonSud.innerText = 'Sodexo';
  buttonSud.addEventListener('click', () => {
    rest.then((restaurants) => {
      const filtered = filterRestaurants(restaurants, 'Sodexo');
      renderRestaurants(filtered);
    });
  });

  const buttonComp = document.createElement('button');
  buttonComp.innerText = 'Compass';
  buttonComp.addEventListener('click', () => {
    rest.then((restaurants) => {
      const filtered = filterRestaurants(restaurants, 'Compass');
      renderRestaurants(filtered);
    });
  });
  document.getElementById('filter').appendChild(buttonAll);
  document.getElementById('filter').appendChild(buttonSud);
  document.getElementById('filter').appendChild(buttonComp);
}
