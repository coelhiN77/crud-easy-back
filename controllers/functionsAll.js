import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    
    return res.status(200).json(data);
  });
};

export const addUser = async (req, res) => {
  const emailToVerify = `SELECT * FROM users WHERE users.email= "${req.body.email}"`;

  await db.query(emailToVerify, (err, data) => {
    if (err) return res.json(err);

    if (data.length != 0) {
      return res.status(400).json({"msg": "Existing Email!"});
    } else {
      const q = 
        "INSERT INTO users(`name`, `email`, `password`, `age`, `country`) VALUES(?)";

      const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.age,
        req.body.country,
      ];

      db.query(q, [values], (err) => {
      if (err) return res.json(err);

      return res.status(200).json("User created successfully.");
      });
    }
  });
};

export const updateUser = (req, res) => {
  const q =
  "UPDATE users SET `name` = ?, `email` = ?, `password` = ?, `age` = ?, `country` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.age,
    req.body.country,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("User updated successfully.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("User deleted successfully.");
  });
};