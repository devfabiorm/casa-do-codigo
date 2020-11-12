import { Database } from "sqlite3";

interface Product {
  id?: number;
  titulo: string;
  preco: number;
  descricao: string;
}

export default class BookDao {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  list() {
    return new Promise<Product[]>((resolve, reject) => {
      this.db.all('SELECT * FROM livros',
      (err, rows) => {
        if(err) return reject('Não foi possível listar os livros!');

        return resolve(rows)
      }
    )
    });
  }

  create({titulo, preco, descricao}: Product) {
    return new Promise<void>((resolve, reject) => {
      this.db.run(`
      INSERT INTO livros (
        titulo,
        preco,
        descricao
      ) values (?,?,?)`,
      [
        titulo,
        preco,
        descricao
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
      this.db.get(
        `SELECT * FROM livros WHERE id = ?`,
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

  update({id, titulo, preco, descricao}: Product) {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        'UPDATE livro SET titulo = ?, preco = ?, descricao = ? WHERE id = ?',
        [titulo, preco, descricao, id],
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
      this.db.run(
        'DELETE FROM LIVROS WHERE id = ?',
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