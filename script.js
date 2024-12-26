document.addEventListener("DOMContentLoaded", () => {
  const salaryInput = document.getElementById("monthly-salary");
  const updateSalaryBtn = document.getElementById("update-salary-btn");
  const needsAmount = document.getElementById("needs-amount");
  const wantsAmount = document.getElementById("wants-amount");
  const savingsAmount = document.getElementById("savings-amount");
  const expenseForm = document.getElementById("expense-form");
  const expenseTableBody = document.querySelector("#expense-table tbody");
  const dailyExpensesTableBody = document.querySelector("#daily-expenses-table tbody");
  const monthlyExpensesTableBody = document.querySelector("#monthly-expenses-table tbody");

  let monthlySalary = 0;
  let balance = 0;
  const dailyExpenses = {};
  const monthlyExpenses = {};


  // Update Salary and Budget
  updateSalaryBtn.addEventListener("click", () => {
      monthlySalary = parseFloat(salaryInput.value);
      if (isNaN(monthlySalary) || monthlySalary <= 0) {
          alert("Please enter a valid monthly salary.");
          return;
      }

      const needs = (monthlySalary * 0.5).toFixed(2);
      const wants = (monthlySalary * 0.3).toFixed(2);
      const savings = (monthlySalary * 0.2).toFixed(2);

      needsAmount.textContent = needs;
      wantsAmount.textContent = wants;
      savingsAmount.textContent = savings;
      balance = monthlySalary;

      createPieChart(needs, wants, savings);
  });

  // Add Expense
  expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const product = document.getElementById("product").value;
      const price = parseFloat(document.getElementById("price").value);
      const date = document.getElementById("date").value;
      const category = document.getElementById("categories").value;
      const paymentMethod = document.getElementById("Mode of Payment").value;

      if (!product || isNaN(price) || price <= 0 || !date || !category || !paymentMethod) {
          alert("Please fill all fields with valid values.");
          return;
      }

      if (price > balance) {
          alert("Insufficient balance.");
          return;
      }

      balance -= price;

      // Update Expense Table
      const expenseRow = document.createElement("tr");
      expenseRow.innerHTML = `
          <td>${date}</td>
          <td>${product}</td>
          <td>${paymentMethod}</td>
          <td>₹${price.toFixed(2)}</td>
          <td>₹${balance.toFixed(2)}</td>
      `;
      expenseTableBody.appendChild(expenseRow);

      // Update Daily Expenses Table
      if (!dailyExpenses[date]) dailyExpenses[date] = 0;
      dailyExpenses[date] += price;
      updateDailyExpensesTable();

      // Update Monthly Expenses Table
      const month = date.slice(0, 7); // YYYY-MM
      if (!monthlyExpenses[month]) monthlyExpenses[month] = 0;
      monthlyExpenses[month] += price;
      updateMonthlyExpensesTable();

      // Reset Form
      expenseForm.reset();
  });

  function updateDailyExpensesTable() {



















    
      dailyExpensesTableBody.innerHTML = "";
      Object.keys(dailyExpenses).forEach((date) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${date}</td>
              <td>₹${dailyExpenses[date].toFixed(2)}</td>
          `;
          dailyExpensesTableBody.appendChild(row);
      });
  }

  function updateMonthlyExpensesTable() {
      monthlyExpensesTableBody.innerHTML = "";
      Object.keys(monthlyExpenses).forEach((month) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${month}</td>
              <td>₹${monthlyExpenses[month].toFixed(2)}</td>
          `;
          monthlyExpensesTableBody.appendChild(row);
      });
  }
});

// script.js

function calculateFIRE() {
  // Get the annual expenses entered by the user
  const annualExpense = document.getElementById('annual-expense').value;

  // Ensure the input is a valid number
  if (annualExpense === '' || isNaN(annualExpense) || annualExpense <= 0) {
      alert('Please enter a valid positive number for annual expenses.');
      return;
  }

  // Calculate the FIRE number
  const fireNumber = annualExpense * 25;

  // Display the FIRE number in the result span
  document.getElementById('fire-result').textContent = fireNumber.toLocaleString('en-IN');
}



function calculateCarLoan() {
  // Get input values
  const carPrice = parseFloat(document.getElementById("car-price").value);
  const downPayment = parseFloat(document.getElementById("down-payment").value);
  const loanTerm = parseFloat(document.getElementById("loan-term").value);
  const interestRate = parseFloat(document.getElementById("interest-rate").value);

  // Validate input
  if (isNaN(carPrice) || isNaN(downPayment) || isNaN(loanTerm) || isNaN(interestRate)) {
      alert("Please enter valid numeric values for all fields.");
      return;
  }

  if (downPayment > carPrice) {
      alert("Down payment cannot exceed the car price.");
      return;
  }

  // Calculate loan amount
  const loanAmount = carPrice - downPayment;

  // Convert annual interest rate to monthly and calculate total number of payments
  const monthlyInterestRate = interestRate / 12 / 100;
  const totalPayments = loanTerm * 12;

  // EMI formula: EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
  const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
              (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  // Display the EMI, rounded to 2 decimal places
  document.getElementById("car-emi").textContent = emi.toFixed(2);
}


// script.js

function calculateInvestment() {
  // Get input values
  const initialInvestment = parseFloat(document.getElementById("initial-investment").value) || 0;
  const monthlyContribution = parseFloat(document.getElementById("monthly-contribution").value) || 0;
  const annualRateOfReturn = parseFloat(document.getElementById("rate-of-return").value) || 0;
  const years = parseInt(document.getElementById("years").value) || 0;

  // Calculate monthly rate of return
  const monthlyRateOfReturn = annualRateOfReturn / 100 / 12;

  // Calculate total months
  const totalMonths = years * 12;

  // Initialize the total projected value with the initial investment
  let projectedValue = initialInvestment * Math.pow(1 + monthlyRateOfReturn, totalMonths);

  // Add monthly contributions with compound interest
  for (let month = 1; month <= totalMonths; month++) {
      projectedValue += monthlyContribution * Math.pow(1 + monthlyRateOfReturn, totalMonths - month);
  }

  // Round the result to two decimal places
  projectedValue = projectedValue.toFixed(2);

  // Display the result
  document.getElementById("investment-result").innerText = projectedValue;
}

const ctx = document.getElementById('myPieChart').getContext('2d');
const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Wants', 'Needs', 'Savings'],
        datasets: [{
            data: [30, 50, 20],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    },
    options: {
        responsive: true, // Allow chart to scale with container
        maintainAspectRatio: true // Ensure aspect ratio is preserved
    }
});


        function calculateInsurance() {
            // Retrieve user inputs
            const debtInput = document.getElementById("debt").value;
            const incomeInput = document.getElementById("income").value;
            const mortgageInput = document.getElementById("mortgage").value;
            const educationInput = document.getElementById("education").value;

            // Parse inputs to numbers
            const debt = parseFloat(debtInput);
            const income = parseFloat(incomeInput);
            const mortgage = parseFloat(mortgageInput);
            const education = parseFloat(educationInput);

            // Validate inputs
            if (isNaN(debt) || debt < 0 || isNaN(income) || income < 0 ||
                isNaN(mortgage) || mortgage < 0 || isNaN(education) || education < 0) {
                alert("Please enter valid positive numbers for all fields.");
                return;
            }

            // Calculate insurance coverage using the DIME method
            // DIME: Debts + Income (10 years) + Mortgage + Education
            const coverage = debt + (income * 10) + mortgage + education;

            // Display the result
            document.getElementById("coverage-result").textContent = coverage.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
            });
        }

        
        function calculateTaxSavings() {
            // Get user inputs
            const annualIncomeInput = document.getElementById("annual-income").value;
            const section80CInput = document.getElementById("section-80c").value;

            // Parse inputs to numbers
            const annualIncome = parseFloat(annualIncomeInput);
            const section80C = parseFloat(section80CInput);

            // Validate inputs
            if (isNaN(annualIncome) || annualIncome <= 0) {
                alert("Please enter a valid annual income greater than zero.");
                return;
            }

            if (isNaN(section80C) || section80C < 0) {
                alert("Please enter a valid Section 80C deduction amount.");
                return;
            }

            // Apply the Section 80C deduction (limit ₹1,50,000)
            const max80CDeduction = Math.min(section80C, 150000);
            const taxableIncome = annualIncome - max80CDeduction;

            // Calculate tax based on income slabs (simplified for illustration)
            let tax = 0;
            if (taxableIncome <= 250000) {
                tax = 0; // No tax for income up to ₹2,50,000
            } else if (taxableIncome <= 500000) {
                tax = (taxableIncome - 250000) * 0.05; // 5% tax on income between ₹2,50,001 and ₹5,00,000
            } else if (taxableIncome <= 1000000) {
                tax = (250000 * 0.05) + (taxableIncome - 500000) * 0.2; // 20% tax on income between ₹5,00,001 and ₹10,00,000
            } else {
                tax = (250000 * 0.05) + (500000 * 0.2) + (taxableIncome - 1000000) * 0.3; // 30% tax on income above ₹10,00,000
            }

            // Tax saving is the reduction in tax due to Section 80C
            const taxWithoutDeduction = calculateTaxWithoutDeduction(annualIncome);
            const taxSavings = taxWithoutDeduction - tax;

            // Display the tax savings
            document.getElementById("tax-savings").textContent = taxSavings.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
            });
        }

        function calculateTaxWithoutDeduction(annualIncome) {
            // Calculate tax without any deductions for comparison
            if (annualIncome <= 250000) {
                return 0;
            } else if (annualIncome <= 500000) {
                return (annualIncome - 250000) * 0.05;
            } else if (annualIncome <= 1000000) {
                return (250000 * 0.05) + (annualIncome - 500000) * 0.2;
            } else {
                return (250000 * 0.05) + (500000 * 0.2) + (annualIncome - 1000000) * 0.3;
            }
        }
    
    







































