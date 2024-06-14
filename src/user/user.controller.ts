import { Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  @Post('reset-problems')
  async resetProblemsFlag() {
    const count = await this.userService.resetProblemsFlag();
    return { count };
  }
}
