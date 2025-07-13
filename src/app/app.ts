import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PicoPlacaChecker } from './pico-placa-checker/pico-placa-checker';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PicoPlacaChecker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pico-y-placa-app');
}
