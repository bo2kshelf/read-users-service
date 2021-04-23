import {ArgsType, Field} from '@nestjs/graphql';

@ArgsType()
export class FindUserArgs {
  @Field(() => String)
  uniqueName!: string;
}
