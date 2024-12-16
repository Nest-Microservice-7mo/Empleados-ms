import { Module } from '@nestjs/common';
import { EmpleadosModule } from './empleados/empleados.module';

@Module({
  imports: [EmpleadosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
