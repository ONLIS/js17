"use strict";
//=======================================================================
const staffArray = [];

const dataForm = document.getElementById("dataForm");
const sernameInput = document.getElementById("inputSername");
const nameInput = document.getElementById("inputName");
const bDateInput = document.getElementById("inputBDate");
const phoneInput = document.getElementById("inputPhone");
const officialCheck = document.getElementById("checkOfficial");
const specSelect = document.getElementById("selectSpec");
const tableBody = document.getElementById("tableBody");

const inputDriverExperience = document.getElementById("inputExperience");
const inputCookSpeciality = document.getElementById("inputCookSpeciality");

const saveButton = document.getElementById("saveButton");

const allSpecDiv = document.querySelectorAll(".spec");
const driverDiv = document.querySelectorAll(".driver");
const cookDiv = document.querySelectorAll(".cook");

let selectedSpec = "";

class Staff {
  constructor(sername, name, bDate, phone, official, profession) {
    this._sername = sername;
    this._name = name;
    this._bDate = bDate;
    this._phone = phone;
    this._official = official;
    this._profession = profession;
  }
  get sername() {
    return this._sername;
  }
  set sername(val) {
    this._sername = val;
  }
  get name() {
    return this._name;
  }
  set name(val) {
    this._name = val;
  }
  get bDate() {
    return this._bDate;
  }
  set bDate(val) {
    this._bDate = val;
  }
  get phone() {
    return this._phone;
  }
  set phone(val) {
    this._phone = val;
  }
  get official() {
    if (this._official === 1) {
      return "официально";
    } else {
      return "нет";
    }
  }
  set official(val) {
    this._official = val;
  }
  get profession() {
    if (this._profession == "driver") {
      return "водитель";
    } else if (this._profession == "cook") {
      return "повар";
    }
  }
  set profession(val) {
    this._profession = val;
  }
}
class Driver extends Staff {
  constructor(
    sername,
    name,
    bDate,
    phone,
    official,
    profession,
    category,
    experience
  ) {
    super(sername, name, bDate, phone, official, (profession = "driver"));
    this._category = category;
    this._experience = experience;
  }
  set category(val) {
    this._category = val;
  }
  get category() {
    return this._category;
  }
  set experience(val) {
    this._experience = val;
  }
  get experience() {
    return this._experience;
  }
}

class Cook extends Staff {
  constructor(
    sername,
    name,
    bDate,
    phone,
    official,
    profession,
    speciality,
    rang
  ) {
    super(sername, name, bDate, phone, official, (profession = "cook"));
    this._speciality = speciality;
    this._rang = rang;
  }
  set speciality(val) {
    this._speciality = val;
  }
  get speciality() {
    return this._speciality;
  }
  set rang(val) {
    this._rang = val;
  }
  get rang() {
    return this._rang;
  }
}

//=======================================================================
const allDataTest = () => {
  let good = true;
  if (sernameInput.value.length >= 2) {
    sernameInput.classList.remove("is-invalid");
    sernameInput.classList.add("is-valid");
  } else {
    good = false;
    sernameInput.classList.remove("is-valid");
    sernameInput.classList.add("is-invalid");
  }
  if (nameInput.value.length >= 2) {
    nameInput.classList.remove("is-invalid");
    nameInput.classList.add("is-valid");
  } else {
    good = false;
    nameInput.classList.remove("is-valid");
    nameInput.classList.add("is-invalid");
  }
  if (bDateInput.value.length == 10) {
    bDateInput.classList.remove("is-invalid");
    bDateInput.classList.add("is-valid");
  } else {
    good = false;
    bDateInput.classList.remove("is-valid");
    bDateInput.classList.add("is-invalid");
  }
  if (phoneInput.value.length == 10) {
    phoneInput.classList.remove("is-invalid");
    phoneInput.classList.add("is-valid");
  } else {
    good = false;
    phoneInput.classList.remove("is-valid");
    phoneInput.classList.add("is-invalid");
  }
  if (selectedSpec === "driver") {
    if (inputDriverExperience.value.length > 0) {
      inputDriverExperience.classList.remove("is-invalid");
      inputDriverExperience.classList.add("is-valid");
    } else {
      good = false;
      inputDriverExperience.classList.remove("is-valid");
      inputDriverExperience.classList.add("is-invalid");
    }
  } else if (selectedSpec === "cook") {
    if (inputCookSpeciality.value.length >= 2) {
      inputCookSpeciality.classList.remove("is-invalid");
      inputCookSpeciality.classList.add("is-valid");
    } else {
      good = false;
      inputCookSpeciality.classList.remove("is-valid");
      inputCookSpeciality.classList.add("is-invalid");
    }
  }
  return good;
};

const render = () => {
  localStorage.setItem("staff", JSON.stringify(staffArray));
  staffArray.forEach((item, index) => {
    const tr = document.createElement("tr");
    const button = `<button type="button" class="btn btn-outline-danger">удалить</button>`;
    tr.classList.add("text-center");
    tr.innerHTML = `<td>${item.sername}</td><td>${item.name}</td><td>${item.bDate}</td><td>${item.phone}</td><td>${item.official}</td><td>${item.profession}</td>`;
    tableBody.append(tr);
  });
};
//=======================================================================
if (localStorage.getItem("staff") !== null) {
  JSON.parse(localStorage.getItem("staff")).forEach(function (item) {
    if (item._profession == "driver") {
      const driver = new Driver(
        item._sername,
        item._name,
        item._bDate,
        item._phone,
        item._official,
        item._profession,
        item._category,
        item._experience
      );
      staffArray.push(driver);
    } else if (item._profession == "cook") {
      const cook = new Cook(
        item._sername,
        item._name,
        item._bDate,
        item._phone,
        item._official,
        item._profession,
        item._speciality,
        item._rang
      );
      staffArray.push(cook);
    }
  });
  render();
}
specSelect.addEventListener("change", () => {
  allSpecDiv.forEach((item) => {
    item.classList.add("d-none");
    if (item.classList.contains(specSelect.value)) {
      item.classList.remove("d-none");
    }
  });
  selectedSpec = specSelect.value;
  if (selectedSpec === "") {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
});

phoneInput.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.keyCode >= 48 && event.keyCode <= 58) {
    if (phoneInput.value.length < 10) phoneInput.value += event.key;
  } else if (event.keyCode === 8) {
    phoneInput.value = "";
  }
});

dataForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (allDataTest()) {
    const sername = inputSername.value;
    const name = inputName.value;
    const bDate = inputBDate.value;
    const phone = "+7" + inputPhone.value;
    const official = officialCheck.checked ? 1 : 0;

    if (selectedSpec === "driver") {
      const driverCategory = document.querySelector(
        "input[name=inputDriverCategory]:checked"
      ).value;
      const exp = inputDriverExperience.value;
      const driver = new Driver(sername, name, bDate, phone, official);
      driver.category = driverCategory;
      driver.experience = exp;
      staffArray.push(driver);
    } else if (selectedSpec === "cook") {
      const cookRang = document.querySelector(
        "input[name=inputCookRang]:checked"
      ).value;
      const spec = inputCookSpeciality.value;
      const cook = new Cook(sername, name, bDate, phone, official);
      cook.rang = cookRang;
      cook.speciality = spec;
      staffArray.push(cook);
    }
    render();
  } else alert("Пожалуйста, заполните все поля.");
});
//=======================================================================
