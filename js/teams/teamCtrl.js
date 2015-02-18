var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService, teamData){ // teamData is injected here and is used as a method name on your resolve in your app.js

$scope.teamData = teamData;

$scope.newGame = {};

$scope.showNewGameForm = false;

$scope.toggleNewGameForm = function() {
	$scope.showNewGameForm = !$scope.showNewGameForm;
}

$scope.formatDate = function(dateStr) {
		return new Date(dateStr).toLocaleDateString();
	}

if ($routeParams.team === 'utahjazz') {
	$scope.homeTeam = 'Utah Jazz'
	$scope.logoPath = 'images/jazz-logo.png'
}
else if ($routeParams.team === 'losangeleslakers') {
	$scope.homeTeam = 'Los Angeles Lakes'
	$scope.logoPath = 'images/lakers-logo.png'
}
else if ($routeParams.team === 'miamiheat') {
	$scope.homeTeam = 'Miami Heat'
	$scope.logoPath = 'images/heat-logo.png'
}

	$scope.submitGame = function() {
		$scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
		$scope.newGame.homeTeamScore = $scope.homeScore;
		$scope.newGame.opponent = $scope.mySelected;
		$scope.newGame.opponentScore = $scope.awayScore;
		teamService.addNewGame($scope.newGame).then(function(data){
			teamService.getTeamData($scope.newGame.homeTeam).then(function(data){
				$scope.teamData = data;
				$scope.newGame = {};
				$scope.showNewGameForm = false;
			});
		});
	}

		console.log($scope.teamData);
});







// to $scope.homeTeam.split(' ').join('').toLowerCase() 
// * Now we want to call the addNewGame method on our teamService method. So call addNewGame and pass it $scope.newGame
// * Take a look at the teamService.js file and notice what addNewGame returns. 
// * You should have noticed it returns a promise. That means immediately after we call addNewGame we can call .then()
// * Call .then and pass it a callback function, this function is then going to call the getTeamData service passing it 
// $scope.newGame.homeTeam. Notice what we're doing.
//  We've added a new game to the home teams schedule and now we need to go and get the new data that's in our database.
// * You should notice that the getTeamData method is also returning a promise. So just like before, call .then immediately 
// after you call getTeamData() and give it a callback function which accepts parameter (which is going to be the data 
// 	returned from the getTeamData method)
// * Now we want to set a few properties on our scope based off the data we got from our promise. First, 
// set $scope.teamData equal to the data you got back from the promise. Then, reset $scope.newGame to be an empty object, 
// then set $scope.showNewGameForm back to false.









// if $routeParams.team is equal to 'utahjazz',
//  $scope.homeTeam is going to equal 'Utah Jazz' 
// and $scope.logoPath is going to equal 'images/jazz-logo.png'.