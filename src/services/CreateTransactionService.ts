import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const categoryExists = await categoryRepository.findOne({
      where: {
        category,
      },
    });

    let categoryObj = null;

    if (categoryExists) {
      categoryObj = categoryExists;
    } else {
      categoryObj = categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(categoryObj);
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: categoryObj,
    });

    const balance = await transactionsRepository.getBalance();

    if (transaction.type === 'outcome') {
      balance.outcome = transaction.value;
      balance.total = balance.income - balance.outcome;
    }

    if (balance.total < 0) {
      throw new AppError(
        'Impossible to save, because outcome is greater total',
      );
    }

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
