const superagent = require('superagent');

const urlBase = 'https://6u9mkuqp8j.execute-api.us-east-1.amazonaws.com/dev/account';

const email = "test" + parseInt(Math.random() * 100000000000) + "@gh.com";
const password = 'Healthgrades1';
const source = 'oas';

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