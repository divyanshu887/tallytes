const axios = require('axios');
const { messaging } = require('../utils/admin');

exports.cricAlerts = async () => {
  var payload = {
    notification: {
      title: 'Cricket Alerts| Source: ',
      body: '',
    },
    priority: 'high',
    tokens: [],
  };
  const userOptions = {
    method: 'GET',
    url: 'https://backend-kt34ewv1l-divyanshu887.vercel.app/users',
  };
  var user = await axios.request(userOptions);
  user = user.data;

  for (var key in user) {
    if(user[key].preference === "Cricket")
    payload.tokens.push(user[key].token);
  }
//   console.log(payload);
  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/122025',
    headers: {
      'X-RapidAPI-Key': 'bc65df8011msh743163aa8215daap143b8ejsnb48c09086d14',
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      payload.notification.body = response.data.headline;
      payload.notification.title += response.data.source;
      console.log(payload,'ak');
      messaging
        .sendMulticast(payload)
        .then(response => {
          console.log(response);
          // res.send(result)
        })
        .catch(err => {
          console.log({ error: err });
          // res.send("Error Occurred")
        });
    })
    .catch(function (error) {
      console.error(error);
    });
};

// cricAlerts();
