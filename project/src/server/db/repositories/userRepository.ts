import { db } from '../schema';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  created_at: string;
}

export class UserRepository {
  static async create(email: string, name: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: nanoid(),
      email,
      name,
      password: hashedPassword,
      created_at: new Date().toISOString(),
    };

    const stmt = db.prepare(
      'INSERT INTO users (id, email, name, password, created_at) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(user.id, user.email, user.name, user.password, user.created_at);

    return user;
  }

  static async findByEmail(email: string): Promise<User | undefined> {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  }

  static async findById(id: string): Promise<User | undefined> {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
  }

  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}