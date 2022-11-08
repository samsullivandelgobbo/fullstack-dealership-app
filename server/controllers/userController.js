const userService = require("../services/userService")
const messageService = require("../services/messageService")
const JsonWebToken = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv").config()
const Secret = require("../middleware/generateSecret")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

exports.addUser = async (req, res) => {
  try {
    let object = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      personalKey: Secret.generate(),
    }

    const newuser = await userService.addUser(object)
    const token = JsonWebToken.sign({ id: newuser.id }, object.personalKey, {
      expiresIn: "4h",
    })
    res.status(200).json({ success: true, token: token })
  } catch (err) {
    res.status(500).json({ success: false, error: err })
  }
}

exports.GoogleUser = passport.authenticate("google", {
  session: false,
  scope: ["openid", "profile", "email"],
})
passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.CALLBACK_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      const userObject = {
        email: profile.emails[0].value,
        name: {
          first: profile.name.givenName,
          last: profile.name.familyName,
        },
        source: "google",
        profilePhoto: profile.photos[0].value,
        personalKey: Secret.generate(),
      }

      let currentUser = await userService.getUserByEmail(userObject.email)
      if (!currentUser) {
        try {
          currentUser = await userService.addUser(userObject)
        } catch (err) {
          console.log(err)
        }
      }
      done(null, currentUser)
    }
  )
)

exports.GoogleToken = async (req, res) => {
  const token = JsonWebToken.sign({ id: req.user.id }, req.user.personalKey, { expiresIn: "4h" },)
  res
    .status(200)
    .cookie("token", token, { httpOnly: false })
    .cookie("userData", req.user.email, { httpOnly: false })
    .redirect("http://localhost:5173")
}

exports.userLogin = async (req, res) => {
  let email = req.body.email
  let password = req.body.password
  const validUser = await userService.validEmail(email)
  if (!validUser) {
    res.status(500).json({ success: false, error: "Invalid username" })
  } else {
    const userPassword = validUser.password
    bcrypt.compare(password, userPassword, function (err, result) {
      if (!result) {
        res.status(500).json({ success: false, error: "Invalid password" })
      }
    })
    try {
      const id = validUser.id
      const updateUser = await userService.updateUserSessionSecretKey(
        { _id: id },
        Secret.generate()
      )

      const token = JsonWebToken.sign({ id: id }, updateUser.personalKey, {
        expiresIn: "4h",
      })

      res.json({ success: true, token: token })
    } catch (err) {
      res.status(500)
    }
  }
}

exports.getUserByToken = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization
    const email = req.query.id
    try {
      const userSessionSecretKey = await userService.getUserByEmail(email)

      let decoded = JsonWebToken.verify(
        authorization,
        userSessionSecretKey.personalKey
      )
      try {
        const findUser = await userService.getUserById(decoded.id)
        let object = {
          success: true,
          userID: findUser.id,
          email: findUser.email,
          name: findUser.name,
          messages: findUser.messages,
          isAdmin: findUser.isAdmin,
          profilePic: findUser.profilePic,
          favorites: findUser.favorites,
        }
        res.status(200).json(object)
      } catch (err) {
        res.status(500).json({ error: err })
      }
    } catch (err) {
      res.status(500).json({ success: false, error: "Authorization failed" })
    }
  } else {
    res
      .status(500)
      .json({ success: false, error: "Authorization not provided" })
  }
}

exports.userLogout = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization
    if (req.query && req.query.id) {
      let email = req.query.id
      try {
        const userSessionSecretKey = await userService.getUserByEmail(email)
        let decoded = JsonWebToken.verify(
          authorization,
          userSessionSecretKey.personalKey
        )
        if (decoded.id) {
          const resetSessionSecretKey =
            await userService.updateUserSessionSecretKey(
              { email: email },
              Secret.generate()
            )
          res
            .status(200)
            .json({ success: true, message: "User logged out succesfully" })
        }
      } catch (err) {
        res.status(500).json({ error: err })
      }
    } else {
      res
        .status(500)
        .json({ success: false, error: "User identity not provided" })
    }
  }
}

exports.addFavorite = async (req, res) => {
  try {
    const favorite = await userService.addFavoriteByUserId(
      req.body.id,
      req.body.favorite
    )
    await res.status(200).send(favorite)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.deleteFavorite = async (req, res) => {
  try {
    const newFavorites = await userService.deleteFavoriteByUserId(
      req.body.id,
      req.body.favorite
    )
    await res.status(200).send(newFavorites)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.sendMessage = async (req, res) => {
  try {
    const sendMessage = await messageService.sendMessage(req.body)
    res.status(200).send(await sendMessage)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
exports.getUsersMessages = async (req, res) => {
  try {
    const usersMessages = await messageService.getUsersMessages(req.params.id)
    res.status(200).send(usersMessages)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
