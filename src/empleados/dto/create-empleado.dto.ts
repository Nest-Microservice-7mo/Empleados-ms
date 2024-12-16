import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateEmpleadoDto {
    @IsString()
    public nombreEmpleada: string;

    @IsString()
    public apellidoEmpleada: string;

    @IsString()
    public passwordEmpleada: string;

    @IsString()
    public direccionEmpleada: string;

    @IsString()
    public telefonoEmpleada: string;

    @IsString()
    public correoEmpleada: string;

    @IsString()
    public horarioEmpleada: string;

    @IsNumber({maxDecimalPlaces: 2})
    @Min(0)
    @Type(() => Number)
    public salarioEmpleada: number;
}
