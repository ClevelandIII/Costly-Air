// // const url = "/api/v1/products";
// const container = document.querySelector(".container");
// // const cart = document.querySelector('#cart')

// async function fetchProducts() {
//     try {
//       const {
//         data: { products },
//       } = await axios.get(url);
//       const tempContainerHTML = products
//         .map((product) => {
//           return `<article class='product'>
//         <img src= '${product.image}' alt='${product.name}' class='img' />
//         <footer class='footer'>
//         <p>${product.name}</p>
//         <span>${product.price}</span>
//         <p> | </p>
//         <button id='cart'>Add to Cart</button>
//         </footer>
//         </article>`;
//         })
//         .join("");
//         container.innerHTML = tempContainerHTML
//     } catch (err) {
//       console.log(err);
//     }
//   }

// fetchProducts()

// // document.getElementById('cart').addEventListener('onclick', function(){
// //   console.log('hey');
// // })