import { productList } from "./product.js";
// let productList;

const apiUrl = 'https://34.202.161.249:7575/wasl/products';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nameurl = urlParams.get("name");
const urlId = urlParams.get("id");

let singleProdimg = productList
.filter((val) => urlId == val.id)
.map((val) => `<img src="${val.productImg}" alt="singleProduct" />`)
.join("");

let singleList = productList
.filter((val) => urlId == val.id)
.map((val) =>
  val.singleProduct
    .map((value) => `<li class="pb-4">${value}</li>`)
    .join("")
)
.join("");

document.getElementById("singleProductImage").innerHTML = singleProdimg;
document.getElementById("cocoLi").innerHTML = singleList;

// async function fetchData() {
//   try {
//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     productList = data;

//     let singleProdimg = productList
//       .filter((val) => urlId == val.id)
//       .map((val) => `<img src="${val.productImg}" alt="singleProduct" />`)
//       .join("");

//     let singleList = productList
//       .filter((val) => urlId == val.id)
//       .map((val) =>
//         val.singleProduct
//           .map((value) => `<li class="pb-4">${value}</li>`)
//           .join("")
//       )
//       .join("");

//     document.getElementById("singleProductImage").innerHTML = singleProdimg;
//     document.getElementById("cocoLi").innerHTML = singleList;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// fetchData();

let whatsapp = `<a href="https://api.whatsapp.com/send?phone=+918015529966&text=Can%20I%20know%20detail%20about%20${nameurl}" class="flex items-start justify-center text-xl" target="_blank">
<i class="fa-brands fa-whatsapp text-3xl lg:text-4xl"></i>
&nbsp;For Inquiries
</a>`;

document.getElementById("prodName").innerText = nameurl;
document.getElementById("prodTitle").innerText = nameurl;
document.getElementById("whatsap").innerHTML = whatsapp;
