import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Trasaction from '../models/Transaction';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const deleteTransaction = getRepository(Trasaction);

    const { affected } = await deleteTransaction.delete(id);

    if (!affected) {
      throw new AppError('Impossible delete transaction');
    }
  }
}

export default DeleteTransactionService;
