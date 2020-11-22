import { Database } from 'sqlite3';

export interface User {
  full_name: string;
  email: string;
  password: string;
}

export default class UserDao {

  constructor(private _db: Database) {}

  findByEmail(email: string) {
    return new Promise<User>((resolve, reject) => {
      this._db.get(
        `
          SELECT *
          FROM usuarios
          WHERE email = ?
        `,
        [email],
        (err, user) => {
          if (err) {
              return reject('Não foi possível encontrar o usuário!');
          }

          return resolve(user);
        }
      )
    });
  }
}