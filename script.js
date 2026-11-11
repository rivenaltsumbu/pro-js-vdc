"use strict";

const form = document.querySelector("#registration-form");
const status = document.querySelector("#form-status");
const aadhaarInput = document.querySelector("#aadhaar-number");
const recordsBody = document.querySelector("#records-body");
const recordCount = document.querySelector("#record-count");

const fieldNames = [
  "fullName",
  "fatherName",
  "motherName",
  "birthDate",
  "aadhaarNumber",
  "email",
  "mobile",
  "gender",
  "address",
];
let savedRecordCount = 0;

aadhaarInput.addEventListener("input", () => {
  const digits = aadhaarInput.value.replace(/\D/g, "");
  aadhaarInput.setCustomValidity(
    digits.length === 0 || digits.length === 12
      ? ""
      : "Aadhaar number must contain exactly 12 digits."
  );
  status.textContent = "";
});

form.addEventListener("input", () => {
  status.textContent = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const row = document.createElement("tr");

  fieldNames.forEach((fieldName) => {
    const cell = document.createElement("td");
    const field = form.elements.namedItem(fieldName);
    const value =
      fieldName === "gender" && field instanceof HTMLSelectElement
        ? field.selectedOptions[0].textContent
        : formData.get(fieldName);

    cell.textContent = value?.toString().trim() || "—";
    row.append(cell);
  });

  recordsBody.querySelector(".empty-row")?.remove();
  recordsBody.append(row);
  savedRecordCount += 1;
  recordCount.textContent = `${savedRecordCount} ${
    savedRecordCount === 1 ? "registration" : "registrations"
  }`;
  form.reset();
  aadhaarInput.setCustomValidity("");
  status.textContent = "Registration added to the table.";
});