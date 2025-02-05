
const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async create(username, email, password, role) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
        [username, email, hashedPassword, role]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const result = await db.query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
}

  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(
        'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0]; // Retourne le premier utilisateur trouvé
}

static async update(id, userData) {
  const { role } = userData;

  const query = `
    UPDATE users 
    SET role = $1
    WHERE id = $2
    RETURNING *
  `;

  const values = [
    role, 
    id
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}
}

module.exports = User;