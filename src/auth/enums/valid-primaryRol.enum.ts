import { registerEnumType } from "@nestjs/graphql";

export enum ValidPrimaryRol {
  daoManager = 'daoManager',
  daoContributor = 'daoContributor',
}

registerEnumType(ValidPrimaryRol, {'name': 'ValidPrimaryRol', 'description': 'Valid roles for users to pick when login'})