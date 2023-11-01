import { registerEnumType } from '@nestjs/graphql';

export enum ValidTaskStatus {
  active = 'Active',
  process = 'Process',
  finished = 'Finished',
  paused = 'Paused',
}

registerEnumType(ValidTaskStatus, {
  name: 'ValidTaskStatus',
  description: 'Valid status for tasks',
});
