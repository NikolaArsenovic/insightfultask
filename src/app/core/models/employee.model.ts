import { Shift } from "./shift.model";

export interface Employee {
  id: string;
  name: string;
  email: string;
  hourlyRate: number;
  hourlyRateOvertime: number;

  clockedInTime?: string;
  paidForRegularHours?: number;
  paidForOvertimeHours?: number;

  shifts: Shift[];
}
