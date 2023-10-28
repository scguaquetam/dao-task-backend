import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks'})
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  status: string;

  @Column()
  @Field(() => Float)
  value: number;

  @Column()
  @Field(() => Date)
  createdAt: Date;

  @Column({nullable: true})
  @Field(() => String, { nullable: true})
  depending?: string;

  // @OneToMany(() => User, (user) => user.tasks, {nullable: true})
  // @Index('userId-index')
  // @Field(() => [User], {nullable: true})
  // users?: User[];


}
