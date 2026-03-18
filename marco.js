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

function updateIngredients() {
  let portions = parseInt(portionInput.value, 10);

  if (isNaN(portions) || portions < 1) {
    portions = 1;
    portionInput.value = 1;
  }

  amountElements.forEach((element) => {
    const baseAmount = parseFloat(element.dataset.base);
    const unit = element.dataset.unit || "";
    const newAmount = (baseAmount / defaultPortions) * portions;

    element.textContent = `${formatNumber(newAmount)}${unit ? " " + unit : ""}`;
  });
}

calculateBtn.addEventListener("click", updateIngredients);

portionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    updateIngredients();
  }
});

updateIngredients();
