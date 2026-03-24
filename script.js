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
    return value.toFixed(2).replace(/\.00$/, "").replace(".", ",");
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

    amountElements.forEach((el) => {
      const base = parseFloat(el.dataset.base);
      const unit = el.dataset.unit || "";

      if (isNaN(base)) {
        return;
      }

      const result = (base / basePortions) * portions;
      el.textContent = unit
        ? `${formatNumber(result)}`
        : `${formatNumber(result)}`;
    });
  }

  calculateBtn.addEventListener("click", updateIngredients);
  portionInput.addEventListener("input", updateIngredients);

  updateIngredients();
});