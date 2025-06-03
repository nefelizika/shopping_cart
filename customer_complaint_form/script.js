
function validateForm() {
  const fullName = document.getElementById("full-name");
  const email = document.getElementById("email");
  const orderNo = document.getElementById("order-no");
  const productCode = document.getElementById("product-code");
  const quantity = document.getElementById("quantity");
  const complaintCheckboxes = document.querySelectorAll("#complaints-group input[type='checkbox']");
  const complaintDesc = document.getElementById("complaint-description");
  const solutionRadios = document.querySelectorAll("#solutions-group input[type='radio']");
  const solutionDesc = document.getElementById("solution-description");

  const fullNameValid = fullName.value.trim() !== "";
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  const orderNoValid = /^2024\d{6}$/.test(orderNo.value);
  const productCodeValid = /^[A-Za-z]{2}\d{2}-[A-Za-z]\d{3}-[A-Za-z]{2}\d$/.test(productCode.value);
  const quantityValid = Number.isInteger(Number(quantity.value)) && Number(quantity.value) > 0;

  const complaintsChecked = Array.from(complaintCheckboxes).some(cb => cb.checked);
  const otherComplaintChecked = document.getElementById("other-complaint").checked;
  const complaintDescValid = !otherComplaintChecked || complaintDesc.value.trim().length >= 20;

  const solutionsChecked = Array.from(solutionRadios).some(rb => rb.checked);
  const otherSolutionChecked = document.getElementById("other-solution").checked;
  const solutionDescValid = !otherSolutionChecked || solutionDesc.value.trim().length >= 20;

  return {
    "full-name": fullNameValid,
    "email": emailValid,
    "order-no": orderNoValid,
    "product-code": productCodeValid,
    "quantity": quantityValid,
    "complaints-group": complaintsChecked,
    "complaint-description": complaintDescValid,
    "solutions-group": solutionsChecked,
    "solution-description": solutionDescValid
  };
}


function isValid(result) {
  return Object.values(result).every(val => val === true);
}


function setFieldBorder(id, valid) {
  const el = document.getElementById(id);
  if (el) el.style.borderColor = valid ? "green" : "red";
}

function setFieldsetBorder(id, valid) {
  const fs = document.getElementById(id);
  if (fs) fs.style.borderColor = valid ? "green" : "red";
}

function applyValidation(result) {
  setFieldBorder("full-name", result["full-name"]);
  setFieldBorder("email", result.email);
  setFieldBorder("order-no", result["order-no"]);
  setFieldBorder("product-code", result["product-code"]);
  setFieldBorder("quantity", result.quantity);
  setFieldsetBorder("complaints-group", result["complaints-group"]);
  setFieldBorder("complaint-description", result["complaint-description"]);
  setFieldsetBorder("solutions-group", result["solutions-group"]);
  setFieldBorder("solution-description", result["solution-description"]);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  // Watch all inputs
  [ "full-name", "email", "order-no",
    "product-code", "quantity",
    "complaint-description", "solution-description"
  ].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("change", () => {
      const result = validateForm();
      applyValidation(result);
    });
  });

  // Checkboxes
  document.querySelectorAll("#complaints-group input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", () => {
      const result = validateForm();
      setFieldsetBorder("complaints-group", result["complaints-group"]);
    });
  });

  // Radios
  document.querySelectorAll("#solutions-group input[type='radio']").forEach(rb => {
    rb.addEventListener("change", () => {
      const result = validateForm();
      setFieldsetBorder("solutions-group", result["solutions-group"]);
    });
  });

  // On submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = validateForm();
    applyValidation(result);
    if (isValid(result)) {
      alert("Form submitted successfully!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  });
});


