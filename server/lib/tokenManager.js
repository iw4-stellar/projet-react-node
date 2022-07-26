const jwt = require("jsonwebtoken");

exports.createToken = async (user) => {
  const token = await jwt.sign(
    { id: user.id_user, firstName: user.firstName },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
    }
  );

  return token;
};

exports.verifyToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  return { id: decoded.id, firstName: decoded.firstName };
};
