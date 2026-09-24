// Validate User Data
const validateUser = (req, res, next) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'name', 'email', and 'role' fields are required."
    });
  }
  next();
};

// Validate Product Data
const validateProduct = (req, res, next) => {
  const { name, price, category, stock } = req.body;
  if (!name || price === undefined || !category || stock === undefined) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'name', 'price', 'category', and 'stock' fields are required."
    });
  }
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'price' must be a positive number."
    });
  }
  next();
};

module.exports = { validateUser, validateProduct };