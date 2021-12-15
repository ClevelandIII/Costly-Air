const url = "/api/v1";
const container = document.querySelector(".container");
const costDisplay = document.querySelector(".cost");

let totalAmount = 0;

async function calcTotal() {
  const {
    data: { cart },
  } = await axios.get(`${url}/cart`);
  cart.forEach((item) => {
    totalAmount += Number(item.price) * Number(item.quantity);
  });
  costDisplay.innerHTML = `The total cart price is: $${(totalAmount + 30000) / 100}`;
}

calcTotal()

async function addOne(name, quant) {
  console.log(name);
  try {
    await axios.post(`${url}/cart/${name}`, {
      quantity: +quant + 1,
    });

    fetchItems();
  } catch (err) {
    console.log(err);
  }
}
async function subOne(name, quant) {
  console.log(name);
  try {
    await axios.post(`${url}/cart/${name}`, {
      quantity: +quant - 1,
    });

    let {
      data: { cart },
    } = await axios.get(`${url}/cart`);

    cart.forEach((item) => {
      if (item.name == name) {
        cart = item;
      }
    });
    console.log(cart);

    if (cart.quantity <= 0) {
      await axios.delete(`${url}/cart/${name}`);
    }

    fetchItems();
  } catch (err) {
    console.log(err);
  }
}

async function fetchItems() {
  try {
    const {
      data: { cart },
    } = await axios.get(`${url}/cart`);

    const tempContainerHTML = cart
      .map((item) => {
        return `<article class="item">
        <image src="${item.image}" alt="${item.name}" class="img"/>
        <div>You have: ${item.quantity}</div>
        <footer>
        <p>${item.name}</p>
        <span>$${item.price / 100}</span>
        <div class="buttons">
          <button onclick="subOne('${item.name}', '${
          item.quantity
        }')" class="cart">-</button>
          <button onclick="addOne('${item.name}', '${
          item.quantity
        }')" class="cart">+</button>
        </div>
        </footer>
      </article>`;
      })
      .join("");
    container.innerHTML = tempContainerHTML;
  } catch (err) {
    console.log(err);
  }
}

fetchItems();

