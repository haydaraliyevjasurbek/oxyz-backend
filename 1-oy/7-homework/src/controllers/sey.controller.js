// @Path GET /
// @Desc Get welcome message
// @Access Public
export const SeyGET = (req, res) => {
  res.send("Welcome to the SEY router!");
};
// @Path GET /message
// @Desc Get message
// @Access Public
export const SeyGETMessage = (req, res) => {
  res.json({ message: "Hello from SEY controller!" });
};

// @Path POST /message
// @Desc Post message
// @Access Public

export const SeyPOSTMessage = (req, res) => {
  const { name, email, age, message } = req.body;
  res.json({ name, email, age, message });
};
