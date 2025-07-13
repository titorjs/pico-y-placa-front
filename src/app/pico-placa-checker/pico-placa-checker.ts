import { Component, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
// ¡Importaciones clave para formularios reactivos!
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PicoPlacaService } from '../services/pico-placa.service';
import { PicoPlacaResponse, ApiError } from './pico-placa.interfaces';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-pico-placa-checker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pico-placa-checker.html',
  styleUrl: './pico-placa-checker.css'
})
export class PicoPlacaChecker {
  // Inyectamos el FormBuilder y nuestro servicio
  private fb = inject(FormBuilder);
  private picoPlacaService = inject(PicoPlacaService);
  
  // Propiedades para almacenar el resultado o el error de la API
  public consultaResult: PicoPlacaResponse | null = null;
  public consultaError: ApiError | null = null;
  public isLoading = false;

  // Obtenemos la fecha y hora actuales para los valores por defecto
  private now = new Date();
  
  // Añadimos 5 minutos a la hora actual para el valor por defecto
  private defaultTime = new Date(this.now.getTime() + 5 * 60000);

  // LÍNEAS NUEVAS Y CORRECTAS
  private year = this.now.getFullYear();
  // getMonth() es base 0 (Enero=0), por eso sumamos 1. padStart añade el '0' si es necesario.
  private month = String(this.now.getMonth() + 1).padStart(2, '0');
  private day = String(this.now.getDate()).padStart(2, '0');

  // Construimos la cadena con el formato correcto usando la fecha local
  private defaultDateString = `${this.year}-${this.month}-${this.day}`;
  private defaultTimeString = this.defaultTime.toTimeString().split(' ')[0].substring(0, 5);
  
  // Definición de nuestro formulario
  public picoPlacaForm: FormGroup = this.fb.group({
    // El primer valor es el valor por defecto, el segundo es un array de validadores
    placa: ['', [
      Validators.required, 
      Validators.pattern(/^[A-Z]{3}[0-9]{4}$/) // Valida 3 letras mayúsculas y 4 números
    ]],
    fecha: [this.defaultDateString, [Validators.required]],
    hora: [this.defaultTimeString, [Validators.required]]
  });

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    // Si el formulario es inválido, no hacemos nada
    if (this.picoPlacaForm.invalid) {
      // Marcamos todos los campos como "tocados" para que muestren sus errores
      this.picoPlacaForm.markAllAsTouched();
      return;
    }

    // Validación extra para la fecha/hora
    const formValue = this.picoPlacaForm.value;
    const fechaHoraConsulta = new Date(`${formValue.fecha}T${formValue.hora}`);
    if (fechaHoraConsulta < new Date()) {
        this.consultaError = { error: 'La fecha/hora de consulta no puede ser anterior al momento actual.' };
        this.consultaResult = null;
        return;
    }

    // Reiniciamos estados y mostramos el indicador de carga
    this.isLoading = true;
    this.consultaResult = null;
    this.consultaError = null;

    // Llamamos al método del servicio con los valores del formulario
    this.picoPlacaService.consultar(formValue.placa, formValue.fecha, formValue.hora)
      .pipe(
        // 'tap' nos permite ejecutar código cuando llega una respuesta exitosa
        tap(response => {
          this.isLoading = false;
          // Verificamos si la respuesta es un error de la API o un resultado exitoso
          if ('error' in response) {
            this.consultaError = response as ApiError;
          } else {
            this.consultaResult = response as PicoPlacaResponse;
          }
        }),
        // 'catchError' intercepta cualquier error de la petición HTTP
        catchError(error => {
          this.isLoading = false;
          this.consultaError = { error: 'Error inesperado al conectar con el servidor. Inténtalo de nuevo.' };
          // 'of(null)' devuelve un observable vacío para que el flujo continúe sin errores
          return of(null);
        })
      )
      .subscribe();
  }
}
