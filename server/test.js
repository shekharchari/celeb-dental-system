const dns = require("dns");

dns.lookup("google.com", (err, address) => {
  console.log(err || address);
});