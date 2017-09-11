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

  //gets data from requestURL (in this case, the picture locations)
  //downloads each picture into specified filepath with named pictures based on login info
  request.get(options, function(error, response, body) {
    let bodyObject = JSON.parse(body);
    for (let currentBodyObject of bodyObject){
      downloadImageByURL(currentBodyObject.avatar_url, filePath, currentBodyObject.login)
    }
  })              
}

function downloadImageByURL(url, filePath, login) {
  request.get(url)
       .on('error', function (err) {                               
         throw err; 
       })
       .on('response', function (response) {                       
         console.log('Response Status Code: ', response.statusCode);
         console.log(response.headers['content-type']);
       })
       .pipe(fs.createWriteStream(filePath + login)); 
}

//runs code if there is a repoName&owner given in the node terminal
if (repoOwner && repoName && repoOwner !== "" && repoName !== ""){

  getRepoContributors(repoOwner, repoName, function(err, result) {

    console.log("Errors:", err);

    console.log("Result:", result);

    console.log("body:", body);

  });
}
//else returns how to enter data that will run code
else {
  console.log("please enter a repoName and a repoOwner:")
  console.log("usage:")
  console.log("\tnode download_avatars repoName repoOwner")
}