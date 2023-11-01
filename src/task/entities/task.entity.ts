import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Epoch } from 'src/epochs/entities/epoch.entity';
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
  @Field(() => String)
  category: string;

  @Column()
  @Field(() => Float)
  value: number;

  @Column()
  @Field(() => Date)
  createdAt: Date;

  @Column({nullable: true})
  @Field(() => String, { nullable: true})
  depending?: string;

  @ManyToMany(() => Epoch, (epoch) => epoch.tasks, { lazy: true })
  @Field(() => [Epoch])
  epochs: Epoch[];
}
