var superagent = require('superagent');

var urlBase = 'https://6u9mkuqp8j.execute-api.us-east-1.amazonaws.com/dev/account';

var email = "test" + parseInt(Math.random() * 100000000000) + "@gh.com";
var password = 'Healthgrades1';
var source = 'oas';

function printResults(name) {
  return function(err, res) {
    console.log(name + ' finished');
    if(err) {
      console.log('Error:', err);
    }
    console.log('Status:', res.status);
    console.log(JSON.parse(res.text));
  }
}

console.log("Starting", email, password, source);

superagent
  .get(urlBase + '/checkemail/' + email)
  .end(printResults('check email'));

superagent
  .post(urlBase + '/login')
  .send({
    email: email, 
    password: password,
    provider: 'cognito-identity.amazonaws.com'
  })
  .end(printResults('login fails'));

setTimeout(function() {

  superagent
    .post(urlBase + '/register')
    .send({
      email: email, 
      password: password,
      provider: 'cognito-identity.amazonaws.com',
      source: source
    })
    .end(printResults('register'));

    setTimeout(function() {

      superagent
        .post(urlBase + '/login')
        .send({
          email: email, 
          password: password,
          provider: 'cognito-identity.amazonaws.com',
          source: source
        })
        .end(printResults('login succeeds'));

    }, 5000);

}, 3000);


if(window.XDomainRequest){
  console.log("XDR Test");
  var xdr = new XDomainRequest();
  xdr.open("get", urlBase + '/checkemail/' + email);
  xdr.onprogress = function () { };
  xdr.ontimeout = function () { };
  xdr.onerror = function () { 
    console.log("xdr error!");
    console.log(xdr.responseText);
  };
  xdr.onload = function() {
    console.log("xdr success!");
    console.log(xdr.responseText);
  }
  setTimeout(function () {xdr.send();}, 0);
} else {
  console.log("No XDR Test");
}