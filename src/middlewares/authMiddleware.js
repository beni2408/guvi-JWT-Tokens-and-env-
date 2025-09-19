import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Note: headers (plural)

  if (!authHeader) {
    return res.status(401).json({
      status: "error",
      message: "No token provided",
    });
  }

  // Check if it starts with "Bearer "
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token format",
    });
  }

  // Extract token from "Bearer TOKEN"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "No token provided",
    });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET_KEY);
    console.log("Decoded token data:", decoded);
    console.log("User ID:", decoded.id);
    console.log("Issued at (iat):", decoded.iat);
    console.log("Role:", decoded.role);
    req.user = decoded;
    next();
    const user = await userModel.findByID(id).select("-password");
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }
    req.user = user;
  } catch (error) {
    console.log("JWT verification error:", error.message);
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
  next();
};
