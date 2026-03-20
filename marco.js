<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
  const portionInput = document.getElementById("portionInput");
  const calculateBtn = document.getElementById("calculateBtn");
  const amountElements = document.querySelectorAll(".amount");

  if (!portionInput || !calculateBtn || amountElements.length === 0) {
    return;
  }

  const basePortions = 4;

  function formatNumber(value) {
    if (Number.isInteger(value)) {
      return value.toString();
    }

    return value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d*[1-9])0$/, "$1");
  }

  function updateIngredients() {
    let portions = parseInt(portionInput.value, 10);

    if (isNaN(portions) || portions < 1) {
      portions = 1;
    }

    if (portions > 40) {
      portions = 40;
    }

    portionInput.value = portions;

    amountElements.forEach((element) => {
      const base = parseFloat(element.dataset.base);
      const unit = element.dataset.unit || "";

      if (isNaN(base)) {
        return;
      }

      const newAmount = (base / basePortions) * portions;
      const formattedAmount = formatNumber(newAmount);

      element.textContent = unit ? `${formattedAmount} ${unit}` : formattedAmount;
    });
  }

  calculateBtn.addEventListener("click", updateIngredients);

  portionInput.addEventListener("input", () => {
    let value = parseInt(portionInput.value, 10);

    if (isNaN(value) || value < 1) {
      portionInput.value = 1;
    } else if (value > 40) {
      portionInput.value = 40;
=======
const defaultPortions = 4;
const portionInput = document.getElementById("portionInput");
const calculateBtn = document.getElementById("calculateBtn");
const amountElements = document.querySelectorAll(".amount");

function formatNumber(value) {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  return value.toFixed(2).replace(".", ",").replace(/,00$/, "");
}

function getValidPortions() {
  let value = parseInt(portionInput.value, 10);

  if (isNaN(value)) {
    value = 1;
  }

  if (value < 1) {
    value = 1;
  }

  if (value > 40) {
    value = 40;
  }

  portionInput.value = value;
  return value;
}

function updateIngredients() {
  const portions = getValidPortions();

  amountElements.forEach((element) => {
    const baseAmount = parseFloat(element.dataset.base);
    const unit = element.dataset.unit || "";
    const result = (baseAmount / defaultPortions) * portions;

    element.textContent = `${formatNumber(result)}${unit ? " " + unit : ""}`;
  });
}

if (portionInput && calculateBtn && amountElements.length > 0) {
  portionInput.setAttribute("min", "1");
  portionInput.setAttribute("max", "40");

  calculateBtn.addEventListener("click", function () {
    updateIngredients();
  });

  portionInput.addEventListener("input", function () {
    let rawValue = portionInput.value;

    if (rawValue === "") {
      return;
    }

    rawValue = rawValue.replace(/[^0-9]/g, "");

    if (rawValue === "") {
      portionInput.value = "";
      return;
    }

    let numberValue = parseInt(rawValue, 10);

    if (numberValue < 1) {
      numberValue = 1;
    }

    if (numberValue > 40) {
      numberValue = 40;
    }

    portionInput.value = numberValue;
    updateIngredients();
  });

  portionInput.addEventListener("blur", function () {
    if (portionInput.value.trim() === "") {
      portionInput.value = 1;
    }

    updateIngredients();
  });

  portionInput.addEventListener("keydown", function (event) {
    if (
      event.key === "-" ||
      event.key === "+" ||
      event.key === "e" ||
      event.key === "E" ||
      event.key === "," ||
      event.key === "."
    ) {
      event.preventDefault();
    }

    if (event.key === "Enter") {
      event.preventDefault();
      updateIngredients();
>>>>>>> master
    }
  });

  updateIngredients();
<<<<<<< HEAD
});
=======
}
>>>>>>> master
