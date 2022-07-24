const sendgrid = require("../middlewares/mailerManager");
const logger = require("../lib/logger");
const { createToken } = require("../lib/tokenManager");
const User = require("../models/sqlite").User;

exports.signup = async (req, res) => {
  const { firstname, lastname, email, password, pathway } = req.body;
  const user = await User.build({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
    pathway: pathway,
  });

  const token = await createToken(user);
  user.token = token;
  return await user
    .save()
    .then(() => {
      logger.info(`User ${user.id_user} signed up`);
      res.status(201).send(user);
      sendgrid.sendVerificationEmail(user);
      res.redirect("/");
    })
    .catch((error) => {
      logger.error(`Error signing up user ${user.id_user}`, error);
      res.status(500).send(error);
    });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email: email },
  }).catch((error) => {
    logger.error(`Error signing in user ${email}`, error);
    res.status(500).send(error);
    return;
  });

  if (!user) {
    logger.error(`User ${email} not found`);
    res.status(404).send("User not found");
    return;
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    logger.error(`User ${email} password incorrect`);
    return res
      .status(422)
      .send({ accessToken: null, message: "Invalid password" });
  }

  if (user.verified === false) {
    logger.error(`User ${email} not verified`);
    return res.status(401).send({ message: "Please verify your account" });
  }

  const token = await createToken(user);

  res.status(200).send({
    accessToken: token,
    id: user,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  });
};

exports.verifyUser = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    where: { token: token },
  })
    .then((user) => {
      if (!user) {
        logger.error(`User not found for token ${token}`);
        res.status(404).send("User not found");
        return;
      }
      user.verified = "true";
      user
        .save()
        .then(() => {
          logger.info(`User ${user.id_user} verified`);
        })
        .catch((error) => {
          logger.error(`Error verifying user ${user.id_user}`, error);
          res.status(500).send(error);
        });
    })
    .catch((error) => {
      logger.error(`Error verifying user for token ${token}`, error);
      res.status(500).send(error);
      return;
    });
};
