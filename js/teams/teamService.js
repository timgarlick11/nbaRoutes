var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){



this.addNewGame = function(gameObj) {
	var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam
	if(parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponenScore)) {
		gameObj.won = true
	} else {gameObj.won = false}
	

	var deferred = $q.defer()
			$http({
				method: 'POST',
				url: url,
				data: gameObj
			
			}).then(function(response) {
				console.log(response)
			response = response.data.results;
			deferred.resolve(response)
			})

		return deferred.promise;


}


this.getTeamData = function(team) {
	var deferred = $q.defer()
	var url = 'https://api.parse.com/1/classes/' + team;
		$http({
			method:'GET',
			url: url,
		}).then(function(data) {
			console.log(data)
			var results = data.data.results;
			var wins = 0;
			var losses = 0;
			for (var i = 0; i < results.length; i++) {
				if (results[i].won === true) {
					wins++;
				} else {
					losses++
				}
			}

			results.wins = wins;
			results.loses = losses;
			deferred.resolve(results)
		})
		return deferred.promise;
}



});

// Inside the .then function, make a variable called results and set it equal to data.data.results, 
// which is the actual games the team has played.
// * Create two variables, one called wins and one called losses and set them both equal to 0. 
// * Loop over results (which is an array of game objects) and check the .won property on each object 
// in the results array, if the .won property is true, increment wins by 1. If .won is not true, increment 
// losses by 1. Now what we've done is gone through all of the games and we now know how many wins and losses that team has.
// * Now that we have complete wins and losses variables, we need to somehow access those variables outside of our service. 
// We know that we have a results array which holds an array of all the games the particular team has played. What if we do 
// something a little unconventional here. We know we're going to eventually resolve our promise we made earlier with the 
// results variable (so we can access all the games in our controller). We also know that an array is really just an object 
// at heart. Let's add a 'wins' property to the results array and set it equal to our wins variable and 
// let's also set a 'losses' property 
// on our results array and set it equal to our losses variable. I know this is a little weird because 
// we're not adding items to our array like
//  we usually do but instead we're adding properties to this array. It's a good reminder that arrays are just objects. 
//  Once you add the 
//  wins and losses 
//  property, go ahead and resolve our deferred object we made earlier with our results array.
// * Now that we've set up those two methods on our teamService object, we can close teamService. 
// We won't need to modify this file again but we will need 
// to call the methods 
// we set up in teamService.js later.










