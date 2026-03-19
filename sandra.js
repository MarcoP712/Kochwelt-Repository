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

function getValidatedPortions() {
  let portions = parseInt(portionInput.value, 10);

  if (isNaN(portions) || portions < 1) {
    portions = 1;
  }

  if (portions > 40) {
    portions = 40;
  }

  portionInput.value = portions;
  return portions;
}

function updateIngredients() {
  const portions = getValidatedPortions();

  amountElements.forEach((element) => {
    const baseAmount = parseFloat(element.dataset.base);
    const unit = element.dataset.unit || "";
    const calculatedAmount = (baseAmount / defaultPortions) * portions;

    element.textContent = `${formatNumber(calculatedAmount)}${unit ? " " + unit : ""}`;
  });
}

if (portionInput && calculateBtn && amountElements.length > 0) {
  calculateBtn.addEventListener("click", updateIngredients);

  portionInput.addEventListener("input", () => {
    let value = portionInput.value;

    if (value === "") {
      return;
    }

    value = value.replace(/[^0-9]/g, "");

    if (value === "") {
      portionInput.value = "";
      return;
    }

    let numberValue = parseInt(value, 10);

    if (numberValue < 1) {
      numberValue = 1;
    }

    if (numberValue > 40) {
      numberValue = 40;
    }

    portionInput.value = numberValue;
    updateIngredients();
  });

  portionInput.addEventListener("blur", () => {
    if (portionInput.value.trim() === "") {
      portionInput.value = 1;
    }

    updateIngredients();
  });

  portionInput.addEventListener("keydown", (event) => {
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
    }
  });

  updateIngredients();
}