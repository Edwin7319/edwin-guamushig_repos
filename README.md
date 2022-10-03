## EJERCICIO PRÁCTICO BACKEND DEVELOPER

### Descripción
* Reto backend developer, dependencias utilizadas: 
   * Node v16.15.1
   * NestJS
   * TypeORM
   * CockroachDB
   * pg-mem (para pruebas unitarias)
   * Jest (para pruebas unitarias)
  

* Para generar el servicio **MOCK** en una app independiente, se utilizó la estrategia de **MONOREPOS**; el servicio simulado se encuentra dentro del directorio `/apps/mock-service`.


* La migración utilizada para crear datos de prueba, se corre de forma automática al iniciar la aplicación, dicha migración se encuentra en el directorio `/apps/edwin-guamushig_repos/migrations`.


### Levantar el proyecto
* Para levantar el proyecto es necesario las variables de entorno que se encuentran descritas en el archivo `.env.example`. Las variables se encuentran en el siguiente enlace `https://drive.google.com/file/d/1EUhDRCXex6pjW-MAqZJcyVETSDjxaEPp/view?usp=sharing`


* Clonar el repositorio
```bash
$ git clone https://github.com/Edwin7319/edwin-guamushig_repos.git
``` 
```bash
$ cd edwin-guamushig_repos
```
* En caso de tener instalado NVM
```bash
$ nvm use
``` 

* Instalar dependencias
```bash
$ npm install
```

* Levantar proyecto principal
```bash 
$ npm run start:dev
```

* Levantar proyecto simulado
```bash
$ npm run start:dev:mock
```

* Correr pruebas unitarias
```bash
$ npm run test
```

### Endpoints

* **GET** Servicio simulador `http://localhost:3000/repositories`
* **GET** Métricas de un repositorio `http://localhost:8080/metrics/tribe/1`
* **GET** Reporte CSV `http://localhost:8080/metrics/csv-report/1`



### License

**All rights reserved by Guamushig Edwin**

### Developed by
**Guamushig Edwin**



[![Build Status](https://icons.iconarchive.com/icons/papirus-team/papirus-apps/128/github-icon.png)](https://github.com/RLazamh)
