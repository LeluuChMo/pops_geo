window.PROJECT_ID = "156rdx1d";
window.DATASET = "production";
var query = encodeURIComponent(`*[_type == "catalogProduct"]{
  title,
  volume,
  powerLevel,
  price,
  description,
  isStock,
  "imageUrl": image.asset->url
}`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;

fetch(URL)
  .then(res => res.json())
  .then(({ result }) => {
    const container = document.getElementById('catalog-container');
    container.innerHTML = result.map(product => `
      <div class="product-item">
        <div class="product-image">
          <img src="${product.imageUrl}" alt="${product.title}">
        </div>
        <div class="product-info">
          <h3>${product.title}</h3>
          <p>მოცულობა: ${product.volume}</p>
          <br>
          <div class="bar">
            <div class="fill ${product.powerLevel || 'l1'}"></div>
          </div>
          <span class="price">₾${product.price}</span>
          <p>${product.description}</p>
          ${product.isStock !== false ? `
            <a href="https://wa.me/995568905673?text=გამარჯობა, მინდა შევიძინო: ${product.title}" 
               target="_blank" class="buy-btn">შეძენა</a>
          ` : '<span class="out-of-stock-msg">არ არის მარაგში</span>'}
        </div>
      </div>
    `).join('');
  });