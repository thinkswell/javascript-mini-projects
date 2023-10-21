<!DOCTYPE html>
<html>

<head>
  <title>Linear Regression on Iris Dataset</title>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/ml-regression"></script>
</head>

<body>
  <h1>Linear Regression on Iris Dataset</h1>

  <div>
    <label for="sepalLength">Sepal Length: </label>
    <input type="number" id="sepalLength" step="0.1" min="4" max="8">
  </div>

  <div>
    <label for="prediction">Predicted Sepal Width: </label>
    <span id="prediction">-</span>
  </div>

  <button onclick="predictSepalWidth()">Predict Sepal Width</button>

  <script>
    // Load the Iris dataset from a URL using Axios
    axios.get('https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data')
      .then(function (response) {
        const data = response.data.split('\n').map(row => row.split(','));
        const irisData = data.map(row => [parseFloat(row[0]), parseFloat(row[1])]);

        const regression = new ML.Regression(irisData, { order: 1 });

        function predictSepalWidth() {
          const sepalLength = parseFloat(document.getElementById('sepalLength').value);
          const predictedSepalWidth = regression.predict([sepalLength]);
          document.getElementById('prediction').textContent = predictedSepalWidth[0].toFixed(2);
        }
      });
  </script>
</body>

</html>
