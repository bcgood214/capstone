const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");  // toggle button for adding income and expenses
const span = document.getElementsByClassName("close")[0];
const optimizebtn = document.getElementById("optimizebtn") // boost button

function getPercentages(ind) {
    return ind[0];
}

// When the user clicks the button, open the modal 
btn.onclick = function () {
  expName.value = "";
  expNumber.value = "";
  expenseForm.style.display = "block";
  financialgform.style.display = "none"
  editForm.style.display = "none";
  modal.style.display = "block";
};

 
// When the user clicks the boost button, call main()  
optimizebtn.onclick = function(){
    var poolSize = 20;
    var gens     = 1000;
    var savings = true;
    var debt = true;
    var subGroupSize = 2;
    var income = document.getElementById("budgetAmount").value;
     
    //var costs  = document.getElementById("expensesAmount").innerText;  //total costs
    //var costs= [3000, 1000, 0, 0];
    var costs = [];
    if (expType.value = "Needs"){
        costs[0] = document.getElementById("expNumber").value;}
    else if (expType.value = "Wants"){
        costs[1] = document.getElementById("expNumber").value;}
    else if (expType.value = "Savings"){
        costs[2] = document.getElementById("expNumber").value;}
    else if (expType.value = "Debt"){
        costs[3] = document.getElementById("expNumber").value;}

    var months = 1;
    var priority = [4, 1, 1, 1];
    
    var result = main(poolSize, gens, savings, debt, subGroupSize, income, costs, months, priority);
    alert(getPercentages(result));
    
    // 1. get id of the expense list
    // 2. check expense type and multiply the expense amount with the percentage of
    // the suggested boost algorithm  
    
    console.log("Result", result);
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

let expType = document.getElementById("categoriesSelect");
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

function addExpenses(type, name, number) {
  
  if (!name.length || !number.length ) {
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
      type: type,
      name: name,
      number: parseInt(number),
    };
    details.push(userExp);
    displayExp(details);
    id++;
    expType.value = "";
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
      <div id="expType" class="exp"><p>${details[i].type}</p></div>
      <div id="expTitleName" class="exp"><p>${details[i].name}</p></div>
      <div id="expValueAmount" class="exp"><p> <span>$ </span> ${details[i].number}</p></div>
      <div id="edite_delete">
        <p>
          <button id="${details[i].id}" onclick="editExpDetails(${details[i].id})"><img src="images/Update_Icon.png" width="30" alt="" title="Update" /></button> 
          <button id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})"><img src="images/Delete_Icon.png" width="60" alt="" title="Delete" /></button>
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
  console.log(expType.value);
  addExpenses(expType.value, expName.value, expNumber.value);
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
}


// Algorithm for Automated Optimized Budget

function checkFullness(ind) {
    let total = 0;
    for (let i = 0; i < ind.length; i++) {
        total += ind[i];
    }

    return 100 - total
}

// taken from Mozilla's page on generating random values in JS
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }  

function fillPlan(ind, missing, savings=true, debt=true) {
    let rem = missing;
    let i = 0;
    while (rem > 0) {
        // logic for individuals where savings and debt are ignored
        if (i == 2 && !savings) {
            i += 1;
            continue;
        }
        if (i == 3 && !debt) {
            i = 0;
            continue;
        }

        let val = getRandomInt(1, rem+1);

        ind[i] += val;
        rem -= val;

        if (i==3) {
            i = 0;
        } else {
            i++;
        }

    }

    return ind;

}

function fill(ind) {
    overflow = checkFullness(ind);
    let i = 0;

    while (overflow > 0) {
        if (ind[i] != 0 || ind[i] != 100) {
            ind[i] += 1;
            overflow--;
        }

        if (i == 3) {
            i = 0;
        } else {
            i++;
        }

    }

    return ind;
}

function normalizePlan(ind, exclude=4) {
    let overflow = Math.abs(checkFullness(ind));
    if (exclude < 4) {
        if (ind[exclude] > 100) {
            let rem = ind[exclude] - 100;
            for (let i = 0; i < ind.length; i++) {
                ind[i] = 0;
            }
            ind[exclude] = 100;
            return ind;
        }

    }

    return distrOverflow(ind, exclude, overflow);
}

function normalize(ind) {
    var overflow = Math.abs(checkFullness(ind));
    var i = 0;
    while (overflow > 0) {
        if (ind[i] > 0) {
            var ceiling = overflow;
            if (ind[i] < overflow) {
                ceiling = ind[i];
            }

            var val = getRandomInt(0, ceiling);

            if (overflow == 1 && ind[i] > 1) {
                val = 1;
            }

            ind[i] -= val;
            overflow -= val;
        }

        if (i == 3) {
            i = 0;
        } else {
            i++;
        }


    }

    return ind;
}

function normalizeInd(ind) {
    let overflow = checkFullness(ind);

    if (overflow < 0) {
        for (let i = 0; i < ind.length; i++) {
            if (ind[i] > 100) {
                let val = ind[i] - 100;
                ind[i] = 100;
                overflow += val
            }
        }

        let i = 0;

        while (overflow < 0) {
            if (ind[i] > 1) {
                ind[i] -= 1;
                overflow += 1
            }

            if (i == 3) {
                i = 0;
            } else {
                i++;
            }

        }

    }

    let i = 0;

    while (overflow > 0) {
        if (ind[i] > 0 && ind[i] < 100) {
            ind[i] += 1;
            overflow -= 1;
        }

        if (i == 3) {
            i = 0;
        } else {
            i++;
        }
    }

    return ind;
}

function mutateBudget(ind, mutLim=60) {
    while (true) {
        let i = getRandomInt(0, 4);
        if (i == 2 && ind[i] == 0) {
            continue;
        }
        if (i == 3 && ind[i] == 0) {
            continue;
        }

        let val = getRandomInt(1, mutLim);

        ind[i] += val;

        return normalizeInd(ind);

    }
}

/* function recombine(p1, p2) {
    let child = [];

    for (let i = 0; i < p1.length; i++) {
        child.push(p1[i]);
    }

    let elInd = 0;
    while (true) {
        let elInd = getRandomInt(0, 4);
        if (p1[elInd] == 0 || p2[elInd] == 0 || p1[elInd] == p2[elInd]) {
            continue;
        } else {
            break;
        }
    }

    let val = p2[elInd] - p1[elInd];
    let new_val = getRandomInt(1, Math.abs(val));

    if (getRandomInt(1, 3) == 1) {
        child[elInd] += new_val
        if (child[elInd] > 100) {
            child[elInd] = 100
        }
    } else {
        child[elInd] -= new_val
        if (child[elInd] < 1) {
            child[elInd] = 1
        }
    }

    console.log(p1[0], p2[0], child[0]);

    return child;


} */

function recombine(p1, p2, mutProb = 0.01) {
    let child = [];
    let total = 0;

    for (let i = 0; i < p1.length; i++) {
        let floor = p1[i];
        let ceiling = p2[i];
        if (p1[i] > p2[i]) {
            floor = p2[i];
            ceiling = p1[i];
        } else if (floor == ceiling) {
            child.push(floor);
            total += floor;
            continue;
        }

        /* if (Math.random() < mutProb) {
            ceiling += getRandomInt(1, 50);
        } */

        let val = getRandomInt(floor, ceiling+1);
        child.push(val);
        total += val;
    }

    if (total != 100) {
        child = normalizeInd(child);
    }

    return child;
}

function genInd(savings=true, debt=true) {
    // initialize a new individual based on the 50/30/20 plan
    // array stores valus for needs, wants, savings, and debt (in that order).
    let new_ind = [50, 30, 10, 10];
    if (!debt) {
        new_ind = [50, 30, 20, 0];
    }

    if (!savings) {
        new_ind[2] = 0;
        new_ind = normalizeInd(new_ind);
    }

    return mutateBudget(new_ind);
}

function genPool(size, savings=true, debt=true) {
    let pool = [];
    for (let i = 0; i < size; i++) {
        pool.push(genInd(savings, debt));
    }

    return pool;
}

function getRandomGroup(poolSize, groupSize) {
    let group = [];
    while (group.length < groupSize) {
        let val = Math.floor(Math.random() * poolSize);
        if (group.includes(val)) {
            continue;
        } else {
            group.push(val);
        }
    }

    return group;
}

function getTwoGroups(poolSize, groupSize) {
    let groupOne = getRandomGroup(poolSize, groupSize);
    let groupTwo = getRandomGroup(poolSize, groupSize);

    while (true) {
        let overlap = false;
        for (let i = 0; i < groupTwo.length; i++) {
            if (groupOne.includes(groupTwo[i])) {
                overlap = true;
            }
        }

        if (!overlap) {
            break;
        } else {
            groupTwo = getRandomGroup(poolSize, groupSize);
        }
    }

    return [groupOne, groupTwo]
}

/* function getTopTwo(pool) {
    let first;
    let second;
    let firstIndex;
    let secondIndex;

    for (let i = 0; i < pool.length; i++) {
        if (i == 0) {
            first = pool[i];
            firstIndex = i;
        } else if (i == 1) {
            second = pool[i];
            if (second > first) {
                firstIndex = i;
                secondIndex = 0;
                let temp = first;
                first = second;
                second = temp;
            }
            secondIndex = i;
        } else {
            if (pool[i] > first) {
                first = pool[i];
                firstIndex = i;
            } else if (pool[i] > second) {
                second = pool[i];
                secondIndex = i;
            }
        }
    }

    let top = [firstIndex, secondIndex];

    return top;
} */

function getFittest(group) {
    let fittest = group[0];
    // alert(group);

    for (let i = 0; i < group.length; i++) {
        if (group[i][1] > fittest[1]) {
            fittest = group[i];
        }
    }
    return fittest;
}

/* function eval(ind, steps, income, goals, priority) {
    let needs = (ind[0]/100) * income;
    let wants = (ind[1]/100) * income;
    let savings = (ind[2]/100) * income;
    let debt = (ind[3]/100) * income;

    needs *= steps;
    wants *= steps;
    savings *= steps;
    debt *= steps;

    let fitness = 0;

    fitness = (Math.abs(goals[0] - needs) * -1) * priority[0];
    fitness += (Math.abs(goals[1] - wants) * -1) * priority[1];
    if (savings != 0) {
        fitness += (Math.abs(goals[2] - savings) * -1) * priority[2];
    }
    if (debt != 0) {
        fitness += (Math.abs(goals[3] - debt) * -1) * priority[3];
    }


    return fitness

} */

function calculateCost(category, income, steps, goal, priority, fitness=100) {
    let val = (category/100) * income;

    val *= steps;

    if (goal > val) {
        let loss = goal - val;
        fitness -= loss * priority;
    }

    return fitness;
}

function eval(ind, steps, income, goals, priority) {
    let fitness = calculateCost(ind[0], income, steps, goals[0], priority[0]);

    for (let i = 1; i < 4; i++) {
        if (ind[i] == 0) {
            continue;
        }
        fitness = calculateCost(ind[i], income, steps, goals[i], priority[i], fitness);
    }

    return fitness;
}

function main(poolSize, gens, savings, debt, subGroupSize, income, costs, months, priority) {
    let pool = genPool(poolSize, savings, debt);
    let mutProb = 0.05;

    for (let i = 0; i < gens; i++) {
        let generation = [];
        for (let j = 0; j < pool.length; j++) {
            let val = eval(pool[j], months, income, costs, priority);
            generation.push([pool[j], val]);
        }

        let nextGen = [];

        for (let k = 0; k < pool.length - 1; k++) {
            let groups = getTwoGroups(poolSize, subGroupSize);
            let groupOne = []

            // getting the individuals in the generation based on the group of indices taken from getTwoGroups
            for (let ind = 0; ind < groups[0].length; ind++) {
                groupOne.push(generation[groups[0][ind]]);
            }

            let groupTwo = [];
            
            for (let ind = 0; ind < groups[0].length; ind++) {
                groupTwo.push(generation[groups[1][ind]]);
            }

            let parentOne = getFittest(groupOne);
            let parentTwo = getFittest(groupTwo);

            let child = recombine(parentOne[0], parentTwo[0]);

            if (Math.random() < mutProb) {
                child = mutateBudget(child);
            }

            nextGen.push(child)

        }

        // Bring the fittest individual from the current generation into the next generation
        let fittest = getFittest(generation);
        console.log(fittest);

        nextGen.push(fittest[0]);

        pool = nextGen;


    }

    // console.log(pool)

    let generation = [];

    for (let j = 0; j < pool.length; j++) {
        let val = eval(pool[j], months, income, costs, priority);
        generation.push([pool[j], val]);
    }

    return getFittest(generation);
}