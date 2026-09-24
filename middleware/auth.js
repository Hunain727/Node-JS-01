const apiKeyAuth = (req, res, next) => {
  const apiKey = req.query.api_key;
  const validApiKey = process.env.API_KEY || "mysecretapikey123";

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or missing API key parameter (?api_key=...)"
    });
  }

  next();
};

module.exports = apiKeyAuth;