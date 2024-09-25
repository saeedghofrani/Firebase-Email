import { EntityRepository, Repository } from 'typeorm';
import { LogEmailEntity } from '../entities/log.email.entity';
import { RegisterDto } from '../dto/registerDto';


@EntityRepository(LogEmailEntity)
export class LogEmailRepository extends  Repository<LogEmailEntity>{

constructor() {
  super();
}
async createLOgEmail(emailDto : RegisterDto) {
 const logEmailEntity = new LogEmailEntity()
  logEmailEntity.language= emailDto.lang.toString()
  logEmailEntity.data = JSON.stringify(emailDto.data)
  logEmailEntity.file_name =emailDto.file
  return await this.save(await this.create(logEmailEntity))
}
}