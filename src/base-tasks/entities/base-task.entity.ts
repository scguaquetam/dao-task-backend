import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Organization } from 'src/organization/entities/organization.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ValidTaskStatus } from '../enums/valid-taskStatus.enum';

@Entity({ name: 'baseTasks' })
@ObjectType()
export class BaseTask {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({
    type: 'text',
    default : 'Active'
  })
  @Field(() => ValidTaskStatus)
  status: ValidTaskStatus;

  @Column({nullable: true})
  @Field(() => String, { nullable: true})
  priority?: string;

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

  @ManyToOne(() => Organization, (organization) => organization.baseTasks)
  @Field(() => Organization)
  organization: Organization;
}
