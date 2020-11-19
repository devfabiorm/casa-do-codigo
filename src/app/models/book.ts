import { body } from 'express-validator';

export default class Book {
  static validations() {
    return [
      body('title').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres!'),
      body('price').isCurrency().withMessage('O preço precisa ter um valor monetário válido!')
    ]
  }
}