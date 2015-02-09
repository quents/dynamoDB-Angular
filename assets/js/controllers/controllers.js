'use strict';

angular.module('TestDynamodbApp.controllers', [])
  .controller('mainCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) { 

    $scope.cols = [];
    $scope.users = [];
    $scope.user = {
      name : "ere",
      password : "111"
    };

    $scope.CreateTable = function () {
      var params = {
        "AttributeDefinitions": [
            {
                "AttributeName": "login",
                "AttributeType": "S"
            }
        ],
        "KeySchema": [
            {
                "AttributeName": "login",
                "KeyType": "HASH"
            }
        ],
        "ProvisionedThroughput": {
            "ReadCapacityUnits": "20",
            "WriteCapacityUnits": "20"
        },
        "TableName": "users"
      };
      $http.post("/createTable", params)
        .then(function(data) {
          $timeout(function() {
            if(data) {
              console.log("Table " + data.data.Table.Name + " was created");
            }
            else {
              console.log("Error!");
            }        
          });
        });
    }

    $scope.addUser = function () {
      var params = {
       "TableName":"users",
        "Item":{
          "login":{"S":$scope.user.name},
          "password":{"S":$scope.user.password}
       }
      };
      $http.post("/createUser", params)
        .then(function(data) {
          $timeout(function() {
            if(data) {
              console.log("User " + data.config.data.Item.login.S + " has been created");
            }
            else {
              console.log("Error!");
            }        
          });
        });
    }

    $scope.showTable = function() {
      var params = {
        "AttributesToGet": [
          "login",
          "password"
        ],
        "TableName" : 'users'
      };
      $http.post("/getTable", params)
        .then(function(data) {
          $timeout(function() {
            if(data) {
              $scope.cols = data.config.data.AttributesToGet;
              $scope.users = data.data.Items;
            }
            else {
              console.log("Error!");
            }        
          });
        });
    }
  }]);
