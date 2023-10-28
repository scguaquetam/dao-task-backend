import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Organization } from 'src/organization/entities/organization.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'epochs' })
@ObjectType()
export class Epoch {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Number)
  duration: number;

  @Column()
  @Field(() => Number)
  startDate: number;

  @Column()
  @Field(() => Number)
  endDate: number;

  @Column()
  @Field(() => String)
  description: string;


  @ManyToOne(() => Organization, (organization) => organization.epochs)
  @Field(() => Organization)
  organization: Organization;

}
