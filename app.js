angular
   .module('myApp', [])
   .controller('myCtrl', bodyController);

function bodyController ($scope, $log, $http) {
  $scope.tickers = ["MSFT","AAPL"];

  var getQuotesUrl = "https://api.iextrading.com/1.0/stock/market/batch?symbols={0}&types=delayed-quote"

  $scope.getQuotes = function() {
    var tickString = ""
    tickString = $scope.tickers.join(",");

    var requestUrl = String.format(getQuotesUrl, $scope.tickers.join(","));

    $http.get(requestUrl)
    .then(function(response) {
        $scope.data = response.data;

        $scope.parsedQuotes = [];
        angular.forEach($scope.data, function(value, key) {
          angular.forEach(value, function(value, key) {
            $log.info(value);
            $log.info(value.delayedPrice);
            $scope.parsedQuotes.push({
              ticker:value.symbol,
              delayedQuote:value.delayedPrice
            })
          })

    });
    });
  }

  $scope.addTicker = function(item) {
      $scope.tickers.push(item);
  }

  $scope.removeTicker = function(item) {
    var index = $scope.tickers.indexOf(item);
    $scope.tickers.splice(index, 1);
  }

  String.format = function () {
      // The string containing the format items (e.g. "{0}")
      // will and always has to be the first argument.
      var theString = arguments[0];

      // start with the second argument (i = 1)
      for (var i = 1; i < arguments.length; i++) {
          // "gm" = RegEx options for Global search (more than one instance)
          // and for Multiline search
          var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
          theString = theString.replace(regEx, arguments[i]);
      }

      return theString;
  }
}
