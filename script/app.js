const categoriesData = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((deta) => displyCatData(deta.categories));
};

const displyCatData = (CatDatas) => {
  const categoriesLevel = document.getElementById("categories");
  categoriesLevel.innerHTML = "";

  for (let CatData of CatDatas) {
    // console.log(CatData);
    const CatBtn = document.createElement("div");
    CatBtn.innerHTML = `
   <li class="space-y-4 hover:bg-lime-400 cursor-pointer rounded-sm  p-2 transition "> <button onclick="InnrCat(${CatData.id})" class="class="w-full text-left px-3 py-1 rounded bg-green-600 text-white ">${CatData.category_name}</button></li>
    `;

    categoriesLevel.appendChild(CatBtn);
  }
};

categoriesData();

const InnrCat = (id) => {
  // console.log(id);

  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displyInnrCat(data.plants));
};

const displyInnrCat = (InnrCats) => {
  // console.log(InnrCats);
  const categoriesContainer = document.getElementById("allplants");
  categoriesContainer.innerHTML = "";

  for (let InnrCat of InnrCats) {
    // console.log(InnrCat);
    const categoriCard = document.createElement("div");
    categoriCard.innerHTML = `
      <div class="bg-white h-full rounded-xl shadow  hover:shadow-lg transition">
                                <div class=" bg-gray-200 rounded flex items-center justify-center">
                                    <img loading="lazy" class="w-full h-64 object-cover rounded-t-lg" src="${InnrCat.image}" alt="">
                                </div>
                                <button class="font-semibold px-3 mt-2">${InnrCat.name}</button>

                                <p class="text-sm p-3 text-gray-600">${InnrCat.description}</p>
                                <div class="flex justify-between items-center px-3 mt-2">
                                    <span
                                        class="text-xs  px-3 py-1 bg-green-100 text-green-700 rounded">${InnrCat.category}</span>
                                    <span class="font-semibold">${InnrCat.price}</span>
                                </div>
                                <div class="p-3">
                                    <button onclick="cartBtn"
                                        class="w-full mt-3 mx-auto py-2 rounded-full bg-green-600 text-white hover:bg-green-700">
                                        Add to Cart</button>
                                </div>
                            </div>
    `;
    categoriesContainer.appendChild(categoriCard);
  }
};

let total = 0;

const plantsData = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => allPlantsDisply(data.plants));
};

const allPlantsDisply = (allPlants) => {
  const allPlantslevel = document.getElementById("allplants");
  allPlantslevel.innerHTML = "";

  for (let allPlant of allPlants) {
    const plantsCard = document.createElement("div");
    plantsCard.innerHTML = `
      <div class="bg-white h-full rounded-xl shadow hover:shadow-lg transition">
        <div class="bg-gray-200 rounded flex items-center justify-center">
          <img loading="lazy" class="w-full h-64 object-cover rounded-t-lg" src="${allPlant.image}" alt="">
        </div>
        <button class="openModal font-semibold px-3 mt-2">${allPlant.name}</button>
        <p class="text-sm p-3 text-gray-600">${allPlant.description}</p>
        <div class="flex justify-between items-center px-3 mt-2">
          <span class="text-xs px-3 py-1 bg-green-100 text-green-700 rounded">${allPlant.category}</span>
          <span class="font-semibold">৳${allPlant.price}</span>
        </div>
        <div class="p-3">
          <button
            class="addBtn w-full mt-3 mx-auto py-2 rounded-full bg-green-600 text-white hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    const addBtn = plantsCard.querySelector(".addBtn");
    addBtn.addEventListener("click", () => {
      const cartDisplay = document.getElementById("cartsBtn");
      const cartContainer = document.createElement("div");
      cartContainer.classList.add(
        "flex",
        "items-center",
        "justify-between",
        "p-2"
      );

      cartContainer.innerHTML = `
        <div>
          <h2 class="font-semibold">${allPlant.name}</h2>
          <p class="text-sm text-gray-600">৳${allPlant.price}</p>
        </div>
        <div>
          <i class="fa-solid fa-x cursor-pointer text-red-500 removeBtn"></i>
        </div>
      `;

      cartDisplay.appendChild(cartContainer);

      total += parseFloat(allPlant.price);
      document.getElementById("totalPrice").innerText = total;

      const removeBtn = cartContainer.querySelector(".removeBtn");
      removeBtn.addEventListener("click", () => {
        cartContainer.remove();

        total -= parseFloat(allPlant.price);
        document.getElementById("totalPrice").innerText = total;
      });
    });

    allPlantslevel.appendChild(plantsCard);
  }
};

plantsData();
