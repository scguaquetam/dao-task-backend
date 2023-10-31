import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'organizationUser' })
@ObjectType()
export class OrganizationUser {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column()
  @Field(() => String)
  role: string;
}
