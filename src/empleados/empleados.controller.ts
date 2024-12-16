import { Controller, ParseIntPipe } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  //@Post()
  @MessagePattern({cmd: 'create_empleado'})
  create(@Payload() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadosService.create(createEmpleadoDto);
  }

  //@Get()
  @MessagePattern({cmd: 'find_all_empleados'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.empleadosService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({cmd: 'find_one_empleado'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.empleadosService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd: 'update_empleado'})
  update(@Payload() updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.empleadosService.update(updateEmpleadoDto.id, updateEmpleadoDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd: 'delete_empleado'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.empleadosService.remove(id);
  }
}
