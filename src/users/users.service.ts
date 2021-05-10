import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async ensureUser({id}: {id: string}) {
    return this.prismaService.user.upsert({
      where: {id},
      create: {
        id,
        uniqueName: id,
        displayName: id,
        initialized: false,
      },
      update: {},
    });
  }

  async findUser(unique: string) {
    return this.prismaService.user.findUnique({where: {uniqueName: unique}});
  }

  async allUsers() {
    return this.prismaService.user.findMany();
  }
}
