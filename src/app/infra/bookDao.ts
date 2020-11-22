import { Database } from "sqlite3";

interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
}

export default class BookDao {

  constructor(private _db: Database) {}

  list() {
    return new Promise<Product[]>((resolve, reject) => {
      this._db.all('SELECT * FROM books',
      (err, rows) => {
        if(err) return reject('Não foi possível listar os livros!');

        return resolve(rows)
      }
    )
    });
  }

  create({title, price, description}: Product) {
    return new Promise<void>((resolve, reject) => {
      this._db.run(`
      INSERT INTO books (
        title,
        price,
        description
      ) values (?,?,?)`,
      [
        title,
        price,
        description
      ],
      function(err: Error) {
        if(err) {
          console.log(err);
          return reject('Não foi possível adicionar o livro!');
        }
        resolve();
      })
    });
  }

  findById(id: number) {
    return new Promise<Product>((resolve, reject) => {
      this._db.get(
        `SELECT * FROM books WHERE id = ?`,
        [id], 
        (err: Error, row: any) => {
          if(err) {
            console.log(err);
            return reject('Não foi possível encontrar o livro procurado')
          }

          return resolve(row);
        }
      )
    });
  }

  update({id, title, price, description}: Product) {
    return new Promise<void>((resolve, reject) => {
      this._db.run(
        'UPDATE books SET title = ?, price = ?, description = ? WHERE id = ?',
        [title, price, description, id],
        (err: Error) => {
          if(err) {
            console.log(err);
            return reject('Não foi possível atualizar o livro')
          }

          return resolve();
        }
      )
    });
  }

  remove(id: number) {
    return new Promise<void>((resolve, reject) => {
      this._db.run(
        'DELETE FROM books WHERE id = ?',
        [id],
        (err: Error) => {
          if(err) {
            console.log(err);
            reject('Não foi possível excluir o livro');
          }

          resolve();
        }
      );
    });
  }
}