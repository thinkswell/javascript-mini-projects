<!DOCTYPE html>
<html>

<head>
  <title>Currency Converter</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
  <h1>Currency Converter</h1>
  <div>
    <label for="amount">Amount (INR):</label>
    <input type="number" id="amount" placeholder="Enter amount">
  </div>
  <div>
    <label for="toCurrency">To Currency:</label>
    <select id="toCurrency">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="JPY">JPY</option>
      <option value="AUD">AUD</option>
    </select>
  </div>
  <button onclick="convertCurrency()">Convert</button>
  <div>
    <p>Result: <span id="result"></span></p>
  </div>
  <script src="script.js"></script>
</body>

</html>