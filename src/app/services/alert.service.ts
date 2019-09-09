import { Injectable } from "@angular/core";
import Swal, { SweetAlertType } from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor() {}

  public setAlertMessage(
    tipo: SweetAlertType,
    titulo: string,
    mensaje: string,
    duracion: number
  ) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: duracion,
      background: "#191919",
      customClass: {
        title: "title-class",
        content: "content-class"
      }
    });

    Toast.fire({
      type: tipo,
      title: titulo,
      text: mensaje
    });
  }
}
