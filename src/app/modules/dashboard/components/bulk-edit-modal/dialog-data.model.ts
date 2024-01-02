import { Employee } from "src/app/core/models/employee.model";

export interface DialogData {
  title: string;
  employees?: Employee[];
}
