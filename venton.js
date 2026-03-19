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

function sanitizePortions(value) {
  let portions = parseInt(value, 10);

  if (isNaN(portions) || portions < 1) {
    portions = 1;
  }

  if (portions > 40) {
    portions = 40;
  }

  return portions;
}

function updateIngredients() {
  const portions = sanitizePortions(portionInput.value);
  portionInput.value = portions;

  amountElements.forEach((element) => {
    const baseAmount = parseFloat(element.dataset.base);
    const unit = element.dataset.unit || "";
    const newAmount = (baseAmount / defaultPortions) * portions;

    element.textContent = `${formatNumber(newAmount)}${unit ? " " + unit : ""}`;
  });
}

calculateBtn.addEventListener("click", updateIngredients);

portionInput.addEventListener("input", () => {
  if (portionInput.value === "") {
    return;
  }

  let value = parseInt(portionInput.value, 10);

  if (isNaN(value)) {
    portionInput.value = 1;
    updateIngredients();
    return;
  }

  if (value < 1) {
    portionInput.value = 1;
  }

  if (value > 40) {
    portionInput.value = 40;
  }

  updateIngredients();
});

portionInput.addEventListener("blur", () => {
  if (portionInput.value === "") {
    portionInput.value = 1;
  }

  updateIngredients();
});

portionInput.addEventListener("keydown", (event) => {
  if (event.key === "-" || event.key === "e" || event.key === "+" || event.key === ",") {
    event.preventDefault();
  }

  if (event.key === "Enter") {
    event.preventDefault();
    updateIngredients();
  }
});

updateIngredients();