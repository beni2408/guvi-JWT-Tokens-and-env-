const getInfo = (req, res) => {
  // Access the decoded JWT data from req.user (set by authMiddleware)
  const { id, iat, role } = req.user;

  res.status(200).json({
    status: "success",
    message: "Info endpoint working",
    data: {
      info: "This is a test info endpoint",
      requestedBy: req.user,
      user: {
        id: id,
        role: role,
        issuedAt: new Date(iat * 1000).toISOString(), // Convert iat to readable date
        tokenIssuedAt: iat,
      },
    },
  });
};

export default getInfo;
