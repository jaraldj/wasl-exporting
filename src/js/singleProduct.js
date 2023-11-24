import { productList } from "./product.js";

console.log("222", productList);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nameurl = urlParams.get("name");
const urlId = urlParams.get("id");

let singleProdimg = productList.map((val, id) => {
  if (urlId == val.id) {
    return `
        <img src="${val.productImg}" alt="singleProduct" />
        `;
  }
});

let singleList = productList.map((val, id) => {
  if (urlId == val.id) {
    return val.singleProduct
      .map((value, id) => {
        return `<li class="pb-4">${value}</li>`;
      })
      .join("");
  }
});

let whatsapp = `<a href="https://api.whatsapp.com/send?phone=+919659434344&text=Can%20I%20know%20detail%20about%20${nameurl}" class="flex items-start justify-center text-xl" target="_blank">
<i class="fa-brands fa-whatsapp text-3xl lg:text-4xl mr-2"></i>
For Inquiries
</a>`;


document.getElementById("singleProductImage").innerHTML = singleProdimg.join("")
document.getElementById("prodName").innerText = nameurl;
document.getElementById("prodTitle").innerText = nameurl;
document.getElementById("cocoLi").innerHTML = singleList.join("");
document.getElementById("whatsap").innerHTML = whatsapp;
