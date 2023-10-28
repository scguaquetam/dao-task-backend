import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Epoch } from 'src/epochs/entities/epoch.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({nullable: true})
  @Field(() => String, { nullable: true})
  img?: string;

  @ManyToMany(() => User, (user) => user.organizations, { lazy: true })
  @Field(() => [User])
  users: User[];

  @OneToMany(() => Epoch, (epoch) => epoch.organization, {
    nullable: true,
    lazy: true,
  })
  @Field(() => [Epoch], { nullable: true })
  epochs?: Epoch[];
}
