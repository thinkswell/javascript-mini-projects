document.addEventListener('DOMContentLoaded', () => {
  const totalBalanceElement = document.getElementById('totalBalance');
  const transactionListElement = document.getElementById('transaction-list');
  const transactionTypeElement = document.getElementById('transaction-type');
  const amountElement = document.getElementById('amount');
  const noteElement = document.getElementById('note');
  const addTransactionButton = document.getElementById('add-transaction-btn');

  let totalBalance = parseFloat(localStorage.getItem('totalBalance')) || 0;
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  function init() {
    transactions.forEach(transaction => renderTransaction(transaction));
    updateBalanceDisplay();
  }

  addTransactionButton.addEventListener('click', () => {
    const transactionType = transactionTypeElement.value;
    const amount = parseFloat(amountElement.value);
    const note = noteElement.value.trim();

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const transaction = {
      id: generateID(),
      type: transactionType,
      amount: amount,
      note: note
    };

    transactions.push(transaction);
    saveTransactions();
    updateBalance(transactionType, amount, true);
    renderTransaction(transaction);
    amountElement.value = '';
    noteElement.value = '';
  });

  function generateID() {
    return Math.floor(Math.random() * 1000000);
  }

  function updateBalance(type, amount, save = true) {
    if (type === 'income') {
      totalBalance += amount;
    } else if (type === 'expense') {
      totalBalance -= amount;
    }
    if (save) {
      localStorage.setItem('totalBalance', totalBalance.toString());
    }
    updateBalanceDisplay();
  }

  function updateBalanceDisplay() {
    totalBalanceElement.textContent = `INR ${totalBalance.toFixed(2)}`;
  }

  function renderTransaction(transaction) {
    const transactionItem = document.createElement('li');
    transactionItem.classList.add(transaction.type);
    transactionItem.innerHTML = `
      ${transaction.type === 'income' ? '+' : '-'} INR ${transaction.amount.toFixed(2)} 
      ${transaction.note ? `<span>(${transaction.note})</span>` : ''}
      <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
    `;
    transactionListElement.appendChild(transactionItem);
  }

  function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  window.deleteTransaction = function (id) {
    const transactionIndex = transactions.findIndex(transaction => transaction.id === id);
    if (transactionIndex !== -1) {
      const transaction = transactions[transactionIndex];
      transactions.splice(transactionIndex, 1);
      saveTransactions();
      updateBalance(transaction.type === 'income' ? 'expense' : 'income', transaction.amount, false);
      localStorage.setItem('totalBalance', totalBalance.toString());
      transactionListElement.innerHTML = '';
      transactions.forEach(renderTransaction);
    }
  };

  init();
});
