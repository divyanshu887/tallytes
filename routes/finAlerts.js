const axios = require('axios');
const { messaging } = require('../utils/admin');

exports.finAlerts = async () => {
  var payload = {
    notification: {
      title: 'Finance News| Author: ',
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
    if(user[key].preference === "Finance")
    payload.tokens.push(user[key].token);
  }
  const options = {
        method: 'GET',
        url: 'https://ms-finance.p.rapidapi.com/articles/get-details',
        params: {id: '981538'},
        headers: {
          'X-RapidAPI-Key': 'bc65df8011msh743163aa8215daap143b8ejsnb48c09086d14',
          'X-RapidAPI-Host': 'ms-finance.p.rapidapi.com'
        }
      };

  await axios
    .request(options)
    .then(function (response) {
      payload.notification.body = response.data.title;
      payload.notification.title += response.data.authors[0].name;
      
      if(payload.tokens.length > 0) {
      messaging
        .sendMulticast(payload)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log({ error: err });
        });}
    })
    .catch(function (error) {
      console.error(error);
    });
};

// finAlerts();

