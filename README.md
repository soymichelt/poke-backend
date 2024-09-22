# Poke Backend

## Descripción

Backend desarrollado con el framework [Nest](https://github.com/nestjs/nest), el cuál implementa la API de Pokemon para servir información. Además, este proyecto implementa TypeScript junto con otras herramientas de desarrollo de software moderno.

## Inicialización del proyecto

```bash
$ npm install
```

Luego de instalar las dependencias, asegúrate de configurar las variables de entorno requeridas para el proyecto. Si estás en tu entorno local en modo desarrollo asegúrate de crear el archivo `.env` y añadir ahí las variables de entorno. Sí estás en modo producción asegúrate que el sistema cuenta con las variables de entorno necesarias.

## Compilación y ejecución del proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Ejecución de tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Despliegue

El proyecto tiene un pipeline de CI/CD que está configurado para desplegar el código en Render sí los tests y el linter están respondiendo correctamente. Para desplegar la aplicación solo se debe hacer un push a la rama `main`, lo que va a disparar una GitHub Action que realizará las comprobaciones necesarias hasta lograr hacer el despliegue.

## Tracking de Errores

El proyecto tiene integrado el servicio Sentry para poder hacer tracking de los errores que surjan al momento de utilizar dicha aplicación. Además, este implementa domain exceptions como una forma práctica de estructurar y organizar los errores y sus códigos.

## Contacto

Añado información de contacto, para cualquier duda o información:

- [mtraatabladaa94@gmail.com](mailto:mtraatabladaa94@gmail.com)
- [https://soymichel.dev](https://soymichel.dev)
- [LinkedIn](https://www.linkedin.com/in/soymichelt)

![Foto de Perfil](https://github.com/soymichelt/CV/blob/master/public/res/circleProfile64x64.png)
