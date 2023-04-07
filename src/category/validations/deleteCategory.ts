import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteCategory {
  @ApiProperty()
  @IsString()
  id: string;

}
