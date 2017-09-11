var request = require('request');
var fs = require('fs');
var args = process.argv.slice(2);
let repoOwner = args[0]; 
let repoName = args[1];
var GITHUB_USER = "mileswilde";
var GITHUB_TOKEN = "9b9898d1c9298aa67287e3973074a3ac1a275618";
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
var filePath = "./contributorAvatars/downloaded"

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
    let bodyObject = JSON.parse(body);
    for (let currentBodyObject of bodyObject){
      request.get(currentBodyObject.avatar_url)
        .on('error', function (err) {                               
         throw err; 
       })
       .on('response', function (response) {                       
         console.log('Response Status Code: ', response.statusCode);
         console.log(response.headers['content-type']);
       })
       .pipe(fs.createWriteStream(filePath + currentBodyObject.login)); 
    }
  })              
}

function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
       .on('error', function (err) {                               
         throw err; 
       })
       .on('response', function (response) {                       
         console.log('Response Status Code: ', response.statusCode);
         console.log(response.headers['content-type']);
       })
       .pipe(fs.createWriteStream(filePath)); 
}

// getRepoContributors(repoOwner, repoName, downloadImageByURL);

getRepoContributors(repoOwner, repoName, function(err, result) {

  console.log("Errors:", err);

  console.log("Result:", result);

  console.log("body:", body);

});