const url = "/api/v1";
const container = document.querySelector(".container");

async function addToCart(name) {
  try {
    const {data : {product: productData}} = await axios.get(`${url}/products/${name}`);
    console.log(productData)
    await axios.post(`${url}/cart`, { ...productData, quantity: 1 });
  } catch (err) {
    console.log(err);
  }
}

async function fetchProducts() {
  try {
    const {
      data: { products },
    } = await axios.get(`${url}/products`);

    const tempContainerHTML = products
      .map((product) => {
        return `<article class="product">
        <image src="${product.image}" alt="${product.name}" class="img"/>
        <footer>
          <p>${product.name}</p>
          <span>${product.price}</span>
          <button onclick="addToCart('${product.name}')">add to cart</button>
        </footer>
      </article>`;
      })
      .join("");
    container.innerHTML = tempContainerHTML;
  } catch (err) {
    console.log(err);
  }
}

fetchProducts();
