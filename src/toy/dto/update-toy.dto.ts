import { PartialType } from '@nestjs/mapped-types';
import { CreateToyDto } from './create-toy.dto';

export class UpdateToyDto extends PartialType(CreateToyDto) {
  name: string
  material: string
  weight: number
  kidId?: number
}