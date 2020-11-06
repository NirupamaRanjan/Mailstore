const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const mail = req.body.email;

  const data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNMAE: lname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us2.api.mailchimp.com/3.0/lists/cb16b7b940";

  const options = {
    method: "POST",
    auth: "nirupama1:c7440f8ee0377075767b2592239cd651-us2",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/sucess.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {});
  });

  request.write(jsonData);
  request.end();
});

// app.post("/failure", function (req, res) {
//   res.redirect("/");
// });
app.post("/success", function (req, res) {
  res.redirect("/");
});
app.listen(3000, function () {
  console.log("server is running at port 3000");
});
