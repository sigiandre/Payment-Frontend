import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service:PaymentDetailService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord:PaymentDetail){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('¿Estás seguro de eliminar este registro?')){
      this.service.deletePaymentDetail(id)
      .subscribe(
        re => {
          this.service.refreshList();
          this.toastr.error('Borrado exitosamente', 'Registro de Detalles de Pago');
        },
        err => { console.log(err) }
      )
    }
  }
}
