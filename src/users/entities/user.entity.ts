import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Organization } from 'src/organization/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  address: string;

  @Column({ unique: true })
  @Field(() => String)
  nickname: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  primaryRol?: string;

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  @Field(() => [String])
  roles: string[];

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field(() => Boolean)
  isActive: boolean;



  //TODO relaciones

  @ManyToOne(() => User, (user) => user.lastUpdateBy, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'lastUpdateBy' })
  @Field(() => User, { nullable: true })
  lastUpdateBy?: User;

  @ManyToMany(() => Organization, (organization) => organization.users, {
    lazy: true,
  })
  @JoinTable()
  @Field(() => [Organization])
  organizations: Organization[];
}
