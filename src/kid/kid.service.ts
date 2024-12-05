import { Injectable } from '@nestjs/common';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateToyDto } from 'src/toy/dto/create-toy.dto';
import { Kid } from '@prisma/client';

@Injectable()
export class KidService {
  constructor(private prisma: PrismaService){}
  async create(createKidDto: CreateKidDto): Promise<Kid> {
    return this.prisma.kid.create({data: createKidDto});
  }

  async findAll(): Promise<Kid> {
    return this.prisma.kid.findMany({include: {toys: true}});
  }

  async findOne(id: number): Promise<Kid> {
    return this.prisma.kid.findUnique({where: {id}, include: {toys:true}});
  }

  async update(id: number, updateKidDto: UpdateKidDto):Promise<Kid>{
    return this.prisma.kid.update({where: {id}, data: updateKidDto });
  }

  async remove(id: number): Promise<Kid> {
    return this.prisma.kid.delete({where: {id}});
  }

  async addtoytokid(kidId: number, toyId: number): Promise<Kid>{
    await this.prisma.toy.update({
      where: {id: toyId},
      data: {kidId}
    });
    return this.findOne(kidId);
  }
}
