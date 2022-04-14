const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");  // toggle button for income and adding expenses
const btn2 = document.getElementById("myBtn2") // boost button
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  expName.value = "";
  expNumber.value = "";
  expenseForm.style.display = "block";
  financialgform.style.display = "none"
  editForm.style.display = "none";
  modal.style.display = "block";
};

// When the user clicks the button2, open the modal 
btn2.onclick = function () {
  editForm.style.display = "none";
  modal.style.display = "none";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const amountInput = document.getElementById("number");
const selectionInput = document.getElementById("selections");

const addForm = document.getElementById("addForm");

const addfinancialg = document.getElementById("addfinancialg");

const budgetAmount = document.getElementById("budgetAmount");
const balanceAmount = document.getElementById("balanceAmount");

const editForm = document.getElementById("editForm");
const saveEdit = document.getElementById("saveEdit");
const editExpValue = document.getElementById("editExpValue");
const editExpNumber = document.getElementById("editExpNumber");

const expForm = document.getElementById("expForm");
const expensesAmount = document.getElementById("expensesAmount");
const expValue = document.getElementById("expValue");
const displayExpenses = document.getElementById("displayExpenses");
const expenseForm = document.getElementById("expense-form");
const budgetform = document.getElementById("budgetform");

const financialgform = document.getElementById("financialgform");

let expName = document.getElementById("expName");
let expNumber = document.getElementById("expNumber");
let id = 0;
let details = [];

function getfinancialgoal(selections) {  
  if (selections) {
    selectionInput.value = "";
    financialgform.style.display="none";
    expenseForm.style.display = "block";
    budgetform.style.display = "none";
    editForm.style.display = "none";
  }
}

function getBudgetAmount(amount) {  //Get Income from user
  if (!amount) {
    amountInput.style.border = "1px solid #b80c09";
    amountInput.placeholder = "Income Amount is required";
    amountInput.style.color = "#b80c09";
    setTimeout(() => {
      amountInput.style.color = "#495057";
      amountInput.style.border = "1px solid gray";
    }, 3000);
  } else {
    budgetAmount.innerText = amount;
    balanceAmount.innerText = amount;
    expenseForm.style.display = "none";
    financialgform.style.display = "block"
    budgetform.style.display = "none";
    editForm.style.display = "none";
    amountInput.value = "";
  }
}


function addExpenses(name, number) {
  
  if (!name.length || !number.length) {
    expName.style.border = "1px solid #b80c09";
    expName.placeholder = "Please enter expense type";
    expName.style.color = "#b80c09";

    expNumber.style.border = "1px solid #b80c09";
    expNumber.placeholder = "Please enter expense amount";
    expNumber.style.color = "#b80c09";

    setTimeout(() => {
      expName.style.color = "#495057";
      expName.style.border = "1px solid gray";
      expName.placeholder = "This field can not be empty";

      expNumber.placeholder = "This field can not be empty";
      expNumber.style.border = "1px solid gray";
      expNumber.style.color = "#495057";
    }, 3000);
  }
  
  else {
    const userExp = {
      id: id,
      name: name,
      number: parseInt(number),
    };
    details.push(userExp);
    displayExp(details);
    id++;
    expName.value = "";
    expNumber.value = "";
    financialgform.style.display = "none"
  }
}

function displayExp(details) {
  expValue.innerHTML = null;
  for (i = 0; i < details.length; i++) {
    expValue.innerHTML += `
    <div class="expValue" id="${details[i].id}">
      <div id="expTitleName" class="exp"><p>${details[i].name}</p></div>
      <div id="expValueAmount" class="exp"><p> <span>$ </span> ${details[i].number}</p></div>
      <div id="edite_delete">
        <p>
          <button id="${details[i].id}" onclick="editExpDetails(${details[i].id})"><img src="images/Update_Icon.png" width="30" alt=""  /></button> 
          <button id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})"><img src="images/Delete_Icon.png" width="60" alt="" /></button>
        </p>
      </div>
    </div>
  `;
  }
  calcExpenses();
  displayExpenses.style.display = "block";
}

function calcExpenses() {
  let totalExp = 0;
  for (i = 0; i < details.length; i++) {
    totalExp = details[i].number + totalExp;
  }
  expensesAmount.innerText = totalExp;
  updateBalance();
}

function updateBalance() {   //Updated remaining balance = income - expenses
  balanceAmount.innerText =
    parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText);
}

function delExpenseDetails(id) {
  let index = details.findIndex((item) => item.id === id);
  details.splice(index, 1);
  displayExp(details);
}

function editExpDetails(id) { //Update Expenses
  expenseForm.style.display = "none";
  budgetform.style.display = "none";
  editForm.style.display = "block";
  details.findIndex((item) => {
    if (item.id === id) {
      editExpName.value = item.name;
      editExpNumber.value = item.number;
      saveEdit.children[2].id = item.id;
      modal.style.display = "block"; //modal to update expenses
    }
  });
}

function getExpValue(editExpName, editExpNumber, id) {
  edited = details.findIndex((obj) => obj.id == id);
  details[edited].name = editExpName;
  details[edited].number = parseInt(editExpNumber);
  displayExp(details);
}

function callBudget() {  // go back to enter income
  budgetform.style.display = "block";
  financialgform.style.display="none";
  expenseForm.style.display = "none";
}

saveEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  getExpValue(editExpName.value, editExpNumber.value, saveEdit.children[2].id);
});

expForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addExpenses(expName.value, expNumber.value);
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getBudgetAmount(amountInput.value);
});

addfinancialg.addEventListener("submit", (e) => {
  e.preventDefault();
  getfinancialgoal(selectionInput.value);
});

function getCategories() {
  var obj = document.getElementById("categoriesSelect");
  document.getElementById("displayCategories").innerHTML = obj.options[obj.selectedIndex].text;
}