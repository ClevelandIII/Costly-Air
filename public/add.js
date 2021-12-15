const url = "/api/v1/products";
const fileForm = document.querySelector(".file-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const imageInput = document.querySelector("#image");
const container = document.querySelector(".container");
const button = document.querySelector(".btn");

let imageValue; //saves the path to the image on upload

imageInput.addEventListener("change", async (e) => {
  //grabs the files form the input type file
  const imageFile = e.target.files[0];

  const formData = new FormData();
  formData.append("image", imageFile);

  //console.log([...formData.values()])

  try {
    const {
      data: {
        image: { src },
      },
    } = await axios.post(`${url}/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    imageValue = src;
  } catch (err) {
    imageValue = null;
    console.log(err);
  }
});

fileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameValue = nameInput.value;
  const priceValue = priceInput.value;
  try {
    const product = { price: priceValue, image: imageValue, name: nameValue };
    await axios.post(url, product);
  } catch (err) {
    console.log(err);
  }
});