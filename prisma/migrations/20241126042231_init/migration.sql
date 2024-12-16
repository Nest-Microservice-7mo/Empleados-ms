-- CreateTable
CREATE TABLE "Empleado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreEmpleada" TEXT NOT NULL,
    "apellidoEmpleada" TEXT NOT NULL,
    "passwordEmpleada" TEXT NOT NULL,
    "direccionEmpleada" TEXT NOT NULL,
    "telefonoEmpleada" TEXT NOT NULL,
    "correoEmpleada" TEXT NOT NULL,
    "horarioEmpleada" TEXT NOT NULL,
    "salarioEmpleada" REAL NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
