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
  resolveReference(reference: {__typename: string; id: string}) {
    return this.usersService.findUser({id: reference.id});
  }

  @ResolveField(() => String)
  picture(@Parent() {picture}: UserEntity) {
    return new URL(`/${picture}`, this.config.imageproxyBaseUrl).toString();
  }

  @Query(() => UserEntity, {name: 'user'})
  async findUser(@Args() args: FindUserArgs) {
    return this.usersService.findUser(args);
  }

  @Query(() => [UserEntity])
  async allUsers() {
    return this.usersService.allUsers();
  }
}
