import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BaseTask } from 'src/base-tasks/entities/base-task.entity';
import { Epoch } from 'src/epochs/entities/epoch.entity';
import { OrganizationUser } from 'src/organization-user/entities/organization-user.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
export const fieldsBaseTransformer = {
  to(value: string[]): string {
    return JSON.stringify(value);
  },
  from(value: string): string[] {
    return JSON.parse(value);
  },
};
@Entity({ name: 'organizations' })
@ObjectType()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Number)
  moderatorsNumber: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  img?: string;

  @Column({
    type: 'text',
    default: JSON.stringify(['General']),
    transformer: fieldsBaseTransformer,
  })
  @Field(() => [String])
  fieldsBase: string[];

  @OneToMany(() => OrganizationUser, (orgUser) => orgUser.organization, {
    lazy: true,
  })
  @Field(() => [OrganizationUser])
  organizationUsers: OrganizationUser[];

  @OneToMany(() => Epoch, (epoch) => epoch.organization, {
    nullable: true,
    lazy: true,
  })
  @Field(() => [Epoch], { nullable: true })
  epochs?: Epoch[];

  @OneToMany(() => BaseTask, (baseTask) => baseTask.organization, {
    lazy: true,
  })
  @Field(() => [BaseTask], { nullable: true })
  baseTasks?: BaseTask[];
}
