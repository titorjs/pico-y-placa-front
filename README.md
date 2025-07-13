# Pico y Placa Checker (Angular)

Este proyecto es una aplicación de una sola página (SPA) desarrollada con Angular. Permite a los usuarios consultar si un vehículo puede circular según las restricciones de "Pico y Placa", basándose en su número de placa, una fecha y una hora específicas.

La aplicación cuenta con un formulario reactivo con validaciones en tiempo real y consume una API de backend para obtener el estado de la restricción.

## Características

-   **Formulario Reactivo:** Campos para placa, fecha y hora con valores por defecto inteligentes.
    
-   **Validación de Datos:**
    
    -   Formato de placa (AAA1234).
        
    -   Campos requeridos.
        
    -   Verificación de que la fecha y hora no sean en el pasado.
        
-   **Consumo de API:** Se comunica con un backend para verificar las restricciones.
    
-   **Visualización de Resultados:** Muestra de forma clara si el vehículo puede o no circular.
    
-   **Manejo de Errores:** Informa al usuario sobre errores de validación o problemas de comunicación con la API.

## Instalación y Desarrollo Local

Para correr este proyecto en un entorno de desarrollo, sigue estos pasos:

1.  **Prerrequisitos:**
    
    -   Node.js (v18 o superior)
        
    -   Angular CLI (`npm install -g @angular/cli`)
        
    -   Tener la **API de backend de Java** corriendo en `http://localhost:8080`, repo: [titorjs/picoyplac](https://github.com/titorjs/picoyplac).
        
2.  **Clonar el repositorio:**
    
    Bash
    
    ```
    git clone <url-del-repositorio>
    cd <nombre-del-repositorio>
    ```
    
3.  **Instalar dependencias:**
    
    Bash
    
    ```
    npm install
    ```
    
4.  **Configurar el Proxy (Desarrollo):** Para evitar problemas de CORS en desarrollo, el proyecto está configurado para usar un proxy. Para levantarlo, usa el comando:
    
    Bash
    
    ```
    ng serve
    ```
    
    La aplicación estará disponible en `http://localhost:4200`.
    

----------

## Deploy en Producción

Para desplegar esta aplicación, primero debes compilarla para producción.

### 1. Compilar la Aplicación

Ejecuta el siguiente comando. Esto generará una carpeta `dist/` (en este repo, en el disrectorio `dist/` ya se encuentra la versión deployable) con todos los archivos estáticos optimizados.

Bash

```
ng build
```

### 2. Estrategias de Despliegue

#### Servidor Web Estático (Nginx)

Copia el contenido de la carpeta `dist/pico-y-placa-app/browser/` a la raíz de tu servidor web (ej. `/var/www/html`). Es **crucial** configurar el servidor para que redirija todas las peticiones al `index.html` y así el enrutamiento de Angular funcione.

**Ejemplo de configuración en `nginx.conf`:**

Nginx

```
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```