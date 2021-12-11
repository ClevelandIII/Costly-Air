const purchase = [
  { id: "1", name: "bottle", price: 30000, qty: 1 },
  { id: "2", name: "large bottle", price: 100000, qty: 1 },
];

const totalAmount = 150000;
const shippingFee = 20000;

const stripe = Stripe(
  "pk_test_51K4ZIBEmWRskxVFxMBrw7rdNlSWk1vob5TN1xX7Gjg7eshJa73r8gnZGZt5X5Vt4uBThtx0VakHBA5sM7MxwDtKk00GLDkCtP4"
);

document.querySelector("button").disabled = true;

fetch("/stripe", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ purchase, totalAmount, shippingFee }),
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const elements = stripe.elements();

    const style = {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };

    const card = elements.create("card", { style });

    card.mount("#card-element");

    card.on("change", (e) => {
      document.querySelector("button").disabled = e.empty;
      document.querySelector("#card-error").textContent = e.error
        ? e.error.message
        : "";
    });

    const form = document.querySelector("#payment-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      payWithCard(stripe, card, data.clientSecret);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const payWithCard = (stripe, card, clientSecret) => {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: { card },
    })
    .then((response) => {
      if (response.error) {
        showError(response.error.message);
      } else {
        orderComplete(response.paymentIntent.id);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const showError = (errorMsgText) => {
  loading(false);
  const errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(() => {
    errorMsg.textContent = "";
  }, 4000);
};

const orderComplete = (paymentIntentId) => {
  loading(false);
  document
    .querySelector(".result-message a")
    .setAttribute(
      "href",
      `https://dashboard.stripe.com/test/payments/${paymentIntentId}`
    );
  document.querySelector(".result-message").classList.remove("hidden");
  document.querySelector("button").disabled = true;
};

const loading = (isLoading) => {
  if (isLoading) {
    document.querySelector("button").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("button").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};
