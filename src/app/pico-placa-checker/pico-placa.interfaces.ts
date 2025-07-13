export interface PicoPlacaResponse {
  placa: string;
  fechaHora: string;
  libre: boolean;
  motivo: string | null;
}

export interface ApiError {
  error: string;
}