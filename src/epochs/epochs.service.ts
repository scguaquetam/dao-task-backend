import { Injectable } from '@nestjs/common';
import { CreateEpochInput } from './dto/create-epoch.input';
import { UpdateEpochInput } from './dto/update-epoch.input';

@Injectable()
export class EpochsService {
  create(createEpochInput: CreateEpochInput) {
    return 'This action adds a new epoch';
  }

  findAll() {
    return `This action returns all epochs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} epoch`;
  }

  update(id: number, updateEpochInput: UpdateEpochInput) {
    return `This action updates a #${id} epoch`;
  }

  remove(id: number) {
    return `This action removes a #${id} epoch`;
  }
}
