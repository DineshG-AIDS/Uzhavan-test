import bcrypt from "bcryptjs";

const users = [
  {
    name: "jeevan",
    email: "jeevan@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "dineshbuddy",
    email: "dinesh@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "hari",
    email: "hari@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
