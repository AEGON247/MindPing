// server/sms.js
module.exports = (req, res) => {
  const { message, to } = req.body;
  // your SMS sending logic
  res.send("SMS sent!");
};