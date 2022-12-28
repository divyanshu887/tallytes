const axios = require('axios');
const { messaging } = require('../utils/admin');
const weatherapi = require('./weatherUpdate');
const wmocode = require('../utils/WMO.json');


const options = {
  method: 'GET',
  url: 'https://tallytes-ac4hdxlaz-tallyinter.vercel.app/getusers',
};

exports.sendAlerts = async () => {
  try {
  // fetching user data
  var res = await axios.request(options);
   res =  res.data;
  //  console.log(res);
  // iterating to get and send weather update to all users
  var usercnt =0;
  for (var key in res) {
   
    let params = {
      queryType: 'hourly',
      location: {
        lat: res[key].Location.lat,
        lon: res[key].Location.long,
      },
    };
  //  sending user location info to weather api to get weather info
    var details = await weatherapi(params);
  // notifying user about weather at their location
  var payload = {
    notification: {
      title: 'Hourly Weather Update',
      body: wmocode[details.hourly.weathercode[0]],
    },
    priority: 'high',
    tokens: [res[key].token],
  };
  // console.log(payload)
  await messaging
      .sendMulticast(payload)
      .then(response => {
        console.log(response);
        // res.send(result)
        usercnt+=1
      })
      .catch(err => {
        console.log({ error: err });
        // res.send("Error Occurred")
      });
        
  }
  return ( `${usercnt} users have received weather update`);
}catch(error) {
  console.log(error);
}
};

// sendAlerts();