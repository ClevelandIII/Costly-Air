const container = document.querySelector(".container");

async function fetchProducts() {
  try {
    const {
      data: { products },
    } = await axios.get(url);

    const tempContainerHTML = products
      .map((product) => {
        return `<article class="product">
        <image src="${product.image}" alt="${product.name}" class="img"/>
        <footer>
          <p>${product.name}</p>
          <spam>${product.price}</spam>
        </footer>
      </article>`;
      })
      .join("");
    container.innerHTML = tempContainerHTML;
  } catch (err) {
    console.log(err);
  }
}

fetchProducts()