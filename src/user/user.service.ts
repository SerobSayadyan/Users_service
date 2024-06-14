import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async resetProblemsFlag(): Promise<number> {
    const usersWithProblems = await this.usersRepository.find({
      where: { hasProblems: true },
    });

    const count = usersWithProblems.length;

    if (count > 0) {
      await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set({ hasProblems: false })
        .where({ hasProblems: true })
        .execute();
    }

    return count;
  }
}
