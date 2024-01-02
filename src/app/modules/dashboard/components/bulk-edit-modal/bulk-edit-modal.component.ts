import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { DialogData } from './dialog-data.model';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-bulk-edit-modal',
  templateUrl: './bulk-edit-modal.component.html',
  styleUrls: ['./bulk-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BulkEditModalComponent {
  employeeService = inject(EmployeeService);

  constructor(@Inject(DIALOG_DATA) public data: DialogData) {}
}
