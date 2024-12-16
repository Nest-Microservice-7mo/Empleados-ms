import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EmpleadosService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Empleados Service')

  onModuleInit() {
    this.$connect();
    this.logger.log('Base de Datos Conectada');
  }

  create(createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleado.create({
      data: createEmpleadoDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.empleado.count({where:{estado:true}});
    const lastPage = Math.ceil(totalPages / limit);

    if(page > lastPage) {
      return {
        message: `La página ${page} no existe`,
        meta: {
          total: totalPages,
          page: page,
          lastPage: lastPage
        }
      }
    }

    return {
      data: await this.empleado.findMany({
        skip: ( page - 1 ) * limit,
        take: limit,
        where: { estado:true }
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      }
    }
  }

  async findOne(id: number) {
    const empleado = await this.empleado.findFirst({where: {id, estado:true}})
    if(!empleado) {
      throw new RpcException({
        message: `Empleado con ID #${id} no encontrado`,
        status: HttpStatus.BAD_REQUEST
      });
    }
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    await this.findOne(id);
    const { id:__, ...data } = updateEmpleadoDto;
    const empleado = await this.empleado.update({
      where: {id},
      data: data
    });
    return empleado;
  }

  async remove(id: number) {
    await this.findOne(id);
    const empleado = await this.empleado.update({
      where: {id},
      data: {estado: false}
    });
    return empleado
  }
}
