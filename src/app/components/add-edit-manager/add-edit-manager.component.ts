import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Manager } from '../../interfaces/manager';
import { CommonModule } from '@angular/common'; 
import { ToastrService } from 'ngx-toastr'; 
import { ManagerService } from '../../services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-manager',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-edit-manager.component.html',
  styleUrl: './add-edit-manager.component.css'
})
export class AddEditManagerComponent  implements OnInit{
form: FormGroup;
loading: boolean = false;
id: number;
operacion: string = 'Agregar ';
constructor(private fb: FormBuilder,
  private _managerService: ManagerService,
  private router: Router,
  private toastr: ToastrService,
  private aRouter: ActivatedRoute
){
this.form= this.fb.group({
  name:['',Validators.required],
  email:['',[Validators.required,Validators.email]],
  company:['',Validators.required],
  country:['',Validators.required],
  whatsapp:['',Validators.required],
})
this.id = Number(aRouter.snapshot.paramMap.get('id'));
}
ngOnInit(): void {
  if (this.id != 0) {
    this.operacion = 'Editar ';
    this.getManager(this.id);
  }
}
getManager(id: number) {
  this.loading = true;
  this._managerService.getManager(id).subscribe((data: Manager) => {
    this.loading = false;
    this.form.setValue({
      name:data.name,
      email:data.email,
      company:data.company,
      whatsapp:data.whatsapp, 
      country:data.country
    })
  })
}

addManager(){
  let date = new Date();
  const manager: Manager={
   name:this.form.value.name,
   email:this.form.value.email,
   company:this.form.value.company,
   whatsapp:this.form.value.whatsapp,
   country:this.form.value.country,  
   created_at:`${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getDate()}`
  }
  this.loading = true;

  if (this.id !== 0) {
    manager.id = this.id;
    this._managerService.updateManager(this.id, manager).subscribe(() => {
      this.toastr.info(`El manager ${manager.name} fue actualizado con exito`, 'Manager actualizado');
      this.loading = false;
      this.router.navigate(['/']);
    })

  } else {
    this._managerService.saveManager(manager).subscribe(() => {
      this.toastr.success(`El manager ${manager.name} fue registrado con exito`, 'Manager registrado');
      this.loading = false;
      this.router.navigate(['/']);
    })
  }
}
}
