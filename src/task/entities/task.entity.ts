import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true})
  @Field(() => String, { nullable: true})
  status?: string;

  @Column()
  @Field(() => Float)
  value: number;

  @Column({ nullable: true})
  @Field(() => String, { nullable: true})
  owner?: string;

  @Column()
  @Field(() => Date)
  createdAt: Date;

  @Column({nullable: true})
  @Field(() => String, { nullable: true})
  depending?: string;
}
