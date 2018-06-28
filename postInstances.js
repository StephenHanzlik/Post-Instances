//JSON configuration is currently hard coded.  You will need to add user name and password.
//TODO: Use churros sauce to pull configuration JSON body
//TODO: Create a way to query and DELETE these instances
const requestPromise = require('request-promise-native');
const prompt = require('prompt');

prompt.start();
prompt.get(['Element Key or ID', 'Environment (api, staging, etc)', 'Iterations (< 500)', 'User Token', 'Organization Token'], function (err, result) {
  const environment = `${result['Environment (api, staging, etc)']}`;
  const elementKey = `${result['Element Key or ID']}`;
  const iterations = `${result['Iterations (< 500)']}`;
  const authHeader = `User ${result['User Token']}, Organization ${result['Organization Token']}`;
  const apiUrl =  `https://${environment}.cloud-elements.com/elements/api-v2/elements/${elementKey}/instances`;

  console.log(`POST to /instances ${iterations} times`);
  console.log(`Using ${environment} Environment`);
  console.log(`Using Element Key: ${elementKey}`);
  console.log(`Using Authorization Header: ${authHeader}`);

  let succesCounter = 0;
  let failedCounter = 0;

  if(iterations < 500){
    for (let i = 0; i < iterations; i++) {
      const options =  {
        'method': 'POST',
        'headers': {
          'Authorization': authHeader
        },
        'json': true,
        'url': apiUrl,
        'body': {
            "name":"New Instance",
            "configuration": {
                  "zuorav2.sandbox": "true",
                  "authentication.type": "basic",
                  "filter.response.nulls": "true",
                  "username": <username goes here>,
                  "password": <password goes here>
                }
              }
      };
      requestPromise(options)
      .then(function (response) {
        succesCounter++;
        console.log(`${succesCounter} successful POSTs to /instances`);
      })
      .catch(function (err) {
        failedCounter++
        console.log(`ERROR: ${err}`);
        console.log(`${failedCounter} failed`)
      });
    }
  } else {
    console.log("ERROR: Please enter an interation number less then 500")
  }
});
