// src/app/services/pico-placa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PicoPlacaResponse, ApiError } from '../pico-placa-checker/pico-placa.interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PicoPlacaService {
  // La URL base de tu API
  private apiUrl = `${environment.apiUrl}/v1/picoPlaca`;

  // Inyectamos el cliente HTTP de Angular en el constructor
  constructor(private http: HttpClient) { }

  /**
   * Consulta el estado de "Pico y Placa" para una placa, fecha y hora.
   * @param placa La placa del vehículo (ej. ABC1234)
   * @param fecha La fecha en formato YYYY-MM-DD
   * @param hora La hora en formato HH:MM
   * @returns Un Observable con la respuesta de la API.
   */
  consultar(placa: string, fecha: string, hora: string): Observable<PicoPlacaResponse | ApiError> {
    // HttpParams es la forma segura y correcta de añadir parámetros a la URL
    const params = new HttpParams()
      .set('placa', placa)
      .set('fecha', fecha)
      .set('hora', hora);

    // Hacemos la petición GET y le decimos qué tipo de respuesta esperamos
    return this.http.get<PicoPlacaResponse | ApiError>(this.apiUrl, { params });
  }
}
