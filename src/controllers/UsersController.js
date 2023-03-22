const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite");


class UsersControlller {
  async create(request, response) {
    const { name, email, password } = request.body;
    const database = await sqliteConnection();

    const hashedPassword = await hash(password, 8)
    const check = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (check) { throw new Error("this email is already registered") }

    await database.run("INSERT INTO users (name, email, password) VALUES  (?,?,?)", [name, email, hashedPassword])

    return response.status(201).json()

  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("User not found")
    }

    const userUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userUpdatedEmail && userUpdatedEmail.id !== user.id) {
      throw new AppError("Email already in use")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("you need to inform your old password in order to update ")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("your password does not match")
      }

      user.password = await hash(password, 8)
    }

    await database.run(
      `
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now'),
        WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );

    return response.status(200).json();
  }
}

module.exports = UsersControlller;