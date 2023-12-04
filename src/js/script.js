let productList;

//product api
const apiUrl = "http://34.202.161.249:7575/wasl/products";

// contact api
const contactApi = "http://34.202.161.249:7575/wasl/contact_us";

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelector(".nav-links");
  if (window.scrollY > 50) {
    navbar.classList.remove("bg-transparent");
    navbar.classList.add("bg-blue-950");
  } else {
    navbar.classList.remove("bg-blue-950");
    navbar.classList.add("bg-transparent");
    navLinks.classList.add("bg-transparent");
  }
});

const onToggleMenu = (icon) => {
  const navbar = document.getElementById("navbar");
  const menuIcon = icon;
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("hidden");

  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  } else {
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
    // navLinks.classList.add("hidden");
  }
  if (menuIcon.classList.contains("fa-xmark")) {
    menuIcon.classList.remove("bg-transparent");
    menuIcon.classList.add("bg-blue-950");
    navLinks.classList.remove("bg-transparent");
    navLinks.classList.add("bg-blue-950");
  } else {
    navLinks.classList.remove("bg-blue-950");
    navLinks.classList.add("bg-transparent");
    menuIcon.classList.remove("bg-blue-950");
    menuIcon.classList.add("bg-transparent");
  }

  navLinks.addEventListener("click", function () {
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
    navLinks.classList.add("hidden");
  });
};

const postData = async () => {
  try {
    const name = document.getElementById("nameInput").value;
    const phone = document.getElementById("phoneInput").value;
    const email = document.getElementById("emailInput").value;
    const message = document.getElementById("messageInput").value;

    const contactData = {
      name: name,
      phone: phone,
      email: email,
      message: message,
    };

    console.log(contactData);

    const response = await fetch(contactApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();
    // Handle the response from the API
    console.log("API Response:", data);
    if (data.status == true) {
      document.getElementById("nameInput").value = ""
      document.getElementById("phoneInput").value = ""
      document.getElementById("emailInput").value = ""
      document.getElementById("messageInput").value = ""
    }
  } catch (error) {
    console.error("Error during API call:", error);
  }
};

async function fetchData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  productList = data;
  let productDisplay =
    productList &&
    productList.map((val, id) => {
      return `<div class="shadow-lg shadow-blue-10 flex flex-col group p-4">
      <img src="${val.productImg}" alt="product" />
      <div class="pt-4 pb-8">
        <h2 class="text-2xl text-blue-950 font-semibold">${val.productName}</h2>
        <p class="text-blue-900">
          ${val.productDesc}
        </p>
      </div>
      <div class="mt-auto">
      <a href="src/product.html?name=${val.productName}&id=${val.id}" class="float-right text-blue-600">Detail</a>
      </div>
      </div>`;
    });
  document.getElementById("prodLi").innerHTML = productDisplay
    ? productDisplay.join("")
    : "";
}

fetchData();
