import { productList } from "./product.js";

let productDisplay = productList && productList.map((val, id) => {
  console.log(val.productDesc);
  return `<div class="shadow-lg shadow-blue-10 flex flex-col group p-4">
    <img src="${val.productImg}" alt="product" />
    <div class="pt-4 pb-8">
      <h2 class="text-2xl text-blue-950 font-semibold">${val.productName}</h2>
      <p class="text-blue-900">
        ${val.productDesc}
      </p>
    </div>
    <div class="mt-auto">
    <a href="src/product.html?name=${val.productName}&id=${val.id}" class="pt-8 float-right">Detail</a>
    </div>
    </div>`;
});
document.getElementById("prodLi").innerHTML = productDisplay ? productDisplay.join("") : "";