"use strict";
//=======================================================================
const specSelect = document.getElementById("selectSpec");
const allSpecDiv = document.querySelectorAll(".spec");
const driverDiv = document.querySelectorAll(".driver");
const cookDiv = document.querySelectorAll(".cook");
//=======================================================================
//=======================================================================
specSelect.addEventListener("change", () => {
  allSpecDiv.forEach((item) => {
    item.classList.add("d-none");
    if (item.classList.contains(specSelect.value)) {
      item.classList.remove("d-none");
    }
  });
});
//=======================================================================
