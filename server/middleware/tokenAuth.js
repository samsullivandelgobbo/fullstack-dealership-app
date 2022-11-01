const JsonWebToken = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const userService = require("../services/userService")

SECRET = process.env.TOKEN_SECRET

exports.Auth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    let authorization = req.headers.authorization
    if (req.query && req.query.id) {
      let email = req.query.id
      try {
        const userSessionSecretKey = await userService.getUserByEmail(email)
        let decoded = JsonWebToken.verify(
          authorization,
          userSessionSecretKey.personalKey
        )
        next()
      } catch (err) {
        res.status(500).json({ success: false, error: "Authorization failed" })
      }
    }
  } else {
    res
      .status(500)
      .json({ success: false, error: "Authorization not provided" })
  }
}
