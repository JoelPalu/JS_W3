export function restorauntRow(restaurant) {
  const tr = document.createElement('tr');
  tr.innerHTML = '<td>' + restaurant.name + '</td>' + '<td>' + restaurant.company + '</td>';
  return tr;
}

const restaurantModal = (restaurant, menu) => {
  let menuHtml = '';
  try {
    menu.forEach((course) => {
      const {name: courseName, price, diets} = course;
      menuHtml += `<tr><td>${courseName}</td><td>${price}</td><td>${diets}</td></tr>`;
    });
  } catch (error) {
    console.log(error);
    menuHtml += `<tr><td>Failed</td><td>to load</td><td>menu</td></tr>`;
  }
  const htmlContent = `
    <h2>${restaurant.name}</h2>
    <p>${restaurant.address}</p>
    <p>${restaurant.postalCode} ${restaurant.city}</p>
    <p>${restaurant.phone}</p>
    <p>${restaurant.company}</p>
    <button id="close">Close</button>
    <table>${menuHtml}</table>
  `;
  return htmlContent;
};

export async function getMenu(restaurant, lang, tr) {
  const dialog = document.getElementById('dialog');
  const trs = document.querySelectorAll('tr');
  trs.forEach((tr) => {
    tr.classList.remove('highlight');
  });
  tr.classList.add('highlight');

  try {
    const response = await fetch(`https://10.120.32.94/restaurant/api/v1/restaurants/daily/${restaurant._id}/${lang}`);
    const data = await response.json();
    const menu = data['courses'];
    dialog.innerHTML = restaurantModal(restaurant, menu);
    const close = document.getElementById('close');
    close.addEventListener('click', () => {
      dialog.close();
    });
    dialog.showModal();
  } catch (error) {
    console.error(error);
    dialog.showModal();
  }
}

