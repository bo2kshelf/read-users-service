import {Inject} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {CommonConfig} from '../configs/common.config';
import {FindUserArgs} from './dto/find-user.dto';
import {UserEntity} from './user.entity';
import {UsersService} from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    @Inject(CommonConfig.KEY)
    private readonly config: ConfigType<typeof CommonConfig>,
    private readonly usersService: UsersService,
  ) {}

  @ResolveReference()
  resolveReference({id}: {id: string}): Promise<UserEntity> {
    return this.usersService.ensureUser({id});
  }

  @Query(() => UserEntity, {name: 'user'})
  async findUser(@Args() {uniqueName}: FindUserArgs): Promise<UserEntity> {
    const user = await this.usersService.findUser(uniqueName);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Query(() => [UserEntity])
  async allUsers(): Promise<UserEntity[]> {
    return this.usersService.allUsers();
  }
}
