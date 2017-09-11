var request = require('request');
var fs = require('fs');
var args = process.argv.slice(2);
let repoOwner = args[0]; 
let repoName = args[1];
var GITHUB_USER = "mileswilde";
var GITHUB_TOKEN = "9b9898d1c9298aa67287e3973074a3ac1a275618";


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'mileswilde',
      'Authorization': 'token 9b9898d1c9298aa67287e3973074a3ac1a275618'
    }
  }

  let toBeIterated = request.get(options, function(error, response, body) {
    
    // console.log("body: ", body);
    let bodyObject = JSON.parse(body);
    // let bodyArray = body.split('},')
    // for (let i = 0; i < bodyArray.length-1; i++){
    //   bodyArray[i] += "}";
    // }
    // console.log(bodyArray[5]);
    //bodyArray[bodyArray.length - 1] = bodyArray[bodyArray.length - 1].substring(0,bodyArray.length - 2)
    //console.log(bodyArray[bodyArray.length - 1].login);
    for (let currentBodyObject of bodyObject){
      console.log(currentBodyObject.avatar_url)
    }
  })              
}


getRepoContributors("jquery", "jquery", function(err, result) {

  console.log("Errors:", err);

  console.log("Result:", result);

  console.log("body:", body);

});