# Enlaces

## Imágenes públicas

- Backend: https://github.com/JuliAA10/ingsoft3-tps/pkgs/container/timetracker-backend
- Frontend: https://github.com/JuliAA10/ingsoft3-tps/pkgs/container/timetracker-frontend

Paquetes:

- ghcr.io/juliaa10/timetracker-backend
- ghcr.io/juliaa10/timetracker-frontend

Etiqueta publicada y comprobada mediante docker pull sin credenciales:
sha-dffdb97d6418781827903c9907c80ae6dff6e9b6

## Cadena de publicación

- PR con tests verdes y login/publicación salteados:
  https://github.com/JuliAA10/ingsoft3-tps/actions/runs/38919964286/job/117037043125

- Corrida de main con publicación como último paso propio del job:
  https://github.com/JuliAA10/ingsoft3-tps/actions/runs/38921016940/job/117043695853

## Entornos

- Frontend QA: https://timetracker-front-qa.onrender.com
- API QA: https://timetracker-api-qa.onrender.com/health
- Frontend PROD: https://timetracker-front-prod.onrender.com
- API PROD: https://timetracker-api-prod.onrender.com/health

## Aprobación, rechazo y restauración

- Primer despliegue aprobado a PROD:
  https://github.com/JuliAA10/ingsoft3-tps/actions/runs/39305125609/job/118240873060

- Despliegue rechazado:
  https://github.com/JuliAA10/ingsoft3-tps/actions/runs/39305125609/job/118248089321

- Restauración mediante pipeline después del rollback:
  https://github.com/JuliAA10/ingsoft3-tps/actions/runs/39305125609/job/118333537025

Estos jobs pertenecen a distintos intentos de la misma corrida.

## Rollback medido en Render

- Backend:
  https://dashboard.render.com/web/srv-dbb5h0rncjis73dhqgi0/deploys/dep-dbb94ho473hc73c51v8g

- Frontend:
  https://dashboard.render.com/web/srv-dbb5nm8m7kps73c79ce0/deploys/dep-dbb94jrl550s73ftkr00

Los detalles de Render requieren iniciar sesión y se mostrarán durante
la defensa.

# Enlaces del TP7

## Imágenes públicas

- Backend: https://github.com/JuliAA10/ingsoft3-tps/pkgs/container/timetracker-backend
- Frontend: https://github.com/JuliAA10/ingsoft3-tps/pkgs/container/timetracker-frontend

Imágenes utilizadas en la ejecución corregida:

- ghcr.io/juliaa10/timetracker-backend:sha-a605262c50c8afbc007e5b52e6e91a5d2c08bb41
- ghcr.io/juliaa10/timetracker-frontend:sha-a605262c50c8afbc007e5b52e6e91a5d2c08bb41

## Entornos

- Frontend QA: https://timetracker-front-qa.onrender.com
- API QA: https://timetracker-api-qa.onrender.com/health
- Frontend PROD: https://timetracker-front-prod.onrender.com
- API PROD: https://timetracker-api-prod.onrender.com/health

## Evidencia del bloqueo y de la corrección

- PR con el cambio que provoca el fallo: https://github.com/JuliAA10/ingsoft3-tps/pull/29
- Ejecución con integración exitosa, E2E fallido y PROD bloqueado: https://github.com/JuliAA10/ingsoft3-tps/actions/runs/39495210998
- Reporte E2E del fallo: https://github.com/JuliAA10/ingsoft3-tps/actions/runs/39495210998/artifacts/12297003698
- PR de corrección: https://github.com/JuliAA10/ingsoft3-tps/pull/30
- Ejecución corregida con despliegue exitoso en PROD: https://github.com/JuliAA10/ingsoft3-tps/actions/runs/39497007523
- Reporte de integración exitoso: https://github.com/JuliAA10/ingsoft3-tps/actions/runs/39497007523/artifacts/12297149082
- Reporte E2E exitoso: https://github.com/JuliAA10/ingsoft3-tps/actions/runs/39497007523/artifacts/12299065041

Los artefactos están sujetos al plazo de retención de GitHub Actions.
La configuración y los eventos de despliegue de Render requieren acceso
a la cuenta y se pueden mostrar durante la defensa.

---

# Decisiones — TP1

## 1. ¿Por qué Git no pudo resolver el conflicto solo?

Git no pudo resolver el conflicto automáticamente porque las ramas feature/titulo-a y feature/titulo-b modificaron la misma línea del archivo README.md, pero con contenidos diferentes. Luego de que la rama A fue integrada a main, al intentar integrar la rama B Git encontró dos versiones distintas para la misma línea y no podía determinar cuál de ellas era la correcta.

Por este motivo, Git marcó el conflicto y fue necesario resolverlo manualmente, decidiendo qué contenido debía quedar finalmente en el archivo y eliminando los marcadores de conflicto.

El conflicto no habría aparecido si las dos ramas hubieran modificado líneas o partes diferentes del archivo. También podría haberse evitado si la rama B se hubiera creado o actualizado después de integrar los cambios de la rama A, ya que en ese caso habría conocido previamente el nuevo estado de main.

## 2. Problemas encontrados y cómo los solucioné

Más que problema, no sabía que al crear el PR del titulo-a, tenía que volver para atrás y crear el PR del titulo-b, entonces pense que lo tenía que cambiar desde el VS.
Otro problema que tuve fue que no había eliminado la branch para el titulo-a, entonces tuve que ver a donde estaba y ahí pude eliminarla, ya que son descartables.
Por último, un problema fue que no sabía como subir las imagenes, pero lo pude solucionar creando la carpeta img en el repo y depositando ahí con nombre cada una de las capturas.

## 3. Declaración de uso de IA

En este TP, solo use la IA (ChatGPT) para la última parte, para que me arme bien qué poner en evidencias.md y en decisiones.md. Claramente controle que estuviera todo bien y claro, pero fue más por simplicidad que por otra cosa.

# Decisiones — TP2

## 1. Elección de la app

Elegí esta app porque, con ayuda de la IA, encontré este repositorio sobre un proyecto para freelancers donde se gestionan proyectos, tareas, horas trabajadas, tarifas y facturas. Me pareció una buena idea y cumplía con las condiciones que debía tener la app para el semestre, a su vez, al probarla, fue fácil levantarla, la única complicación fue que no tenía PostgreSQL, pero logré resolverlo levantando este motor de base de datos en un docker.
Por último, este proyecto usa React para el frontend y Go para el backend, dos tecnologías previamente usadas en materias anteriores por lo cuál tengo conocimiento de código.

## 2. Error al hacer test de docker compose build

Al levantar todo el proyecto con un docker compose build, vimos que tuvimos un problema. Durante las pruebas end-to-end se detectó que el registro permitía crear usuarios, pero posteriormente el login devolvía 401. El problema se encontraba en el modelo User, donde el campo Password estaba marcado con json:"-", por lo que ShouldBindJSON no cargaba la contraseña durante el registro. Se solucionó utilizando una estructura específica para recibir las credenciales y manteniendo json:"-" en el modelo para evitar exponer el hash de la contraseña.

## 3. Decisiones de contenerización

Para el backend utilicé golang:1.22-alpine en la etapa de build y alpine:3.20 como imagen final. Esto permite compilar con todas las herramientas de Go, pero ejecutar luego solo el binario generado, reduciendo el tamaño de la imagen.
Para el frontend utilicé node:22-alpine para instalar dependencias y generar el build de React/Vite, y nginx:alpine para servir los archivos estáticos en producción.
En ambos casos se utilizó una estructura multi-stage para que las herramientas de compilación no formen parte de la imagen final.
La base de datos utiliza postgres:16-alpine y un volumen nombrado db_data, que permite conservar los datos aunque los contenedores se eliminen. Los contenedores de frontend y backend son efímeros y no necesitan persistir información.
La configuración sensible se maneja mediante variables de entorno. El archivo .env no se versiona y se incluye un .env.example como plantilla.

## 4. Arquitectura de las imágenes publicadas

Las imágenes Docker del backend y frontend fueron construidas en mi computadora personal, cuya arquitectura es amd64 (Intel/AMD).
Por este motivo, las imágenes publicadas en GitHub Container Registry con la versión v0.1.0 fueron construidas específicamente para esa arquitectura. Esto implica que pueden ejecutarse directamente en máquinas compatibles con linux/amd64, pero podrían no funcionar en un equipo con una arquitectura diferente, por ejemplo ARM64, mostrando un error como no matching manifest.

## 5. Declaración de uso de IA

En este TP, sólo use la IA (ChatGPT). Ayudándome a que no tenga que estar tipeando los comandos en el cmd sino que pueda copiarlos y pegarlos directamente, a su vez me ayudó con el contenido de los archivos creados como docker-compose.yml, docker-compose.registry.yml, .gitignore y .env. Esto siempre lo fui verificando con otro proyecto que he hecho y a su vez buscando comprender el por qué de las cosas.
Por último, le pedí que me organice de buena manera el readme.md ya que estaba todo en inglés y el proyecto se levantaba por partes, no todo junto como lo pedía la cátedra.

# Decisiones — TP3

## 1. Elección del tiempo en Sprint

Elegí una duración de 2 semanas para el Sprint porque considero que es un período suficiente para avanzar con las tareas planteadas sin que la iteración sea demasiado larga. A su vez, permite revisar el progreso frecuentemente y realizar cambios si surge algún inconveniente durante el desarrollo.

## 2. Límite de trabajo en progreso

Definí un límite de trabajo en progreso (WIP) de 2 elementos en la columna In Progress.

Elegí este valor porque el proyecto lo estoy desarrollando individualmente y se utilizó como referencia la regla de cantidad de personas más uno. De esta manera puedo tener una tarea principal en desarrollo y, en caso de que quede bloqueada o esperando alguna resolución, avanzar temporalmente con otra sin acumular demasiadas tareas empezadas al mismo tiempo.

## 3. Diagnóstico de la historia mal escrita

La historia "Como desarrollador quiero crear la tabla usuarios para guardar los datos" está mal escrita porque describe una tarea técnica de implementación y no una funcionalidad que aporte valor observable a un usuario.

Una forma de reescribirla sería: "Como usuario quiero poder registrarme en la aplicación para poder acceder utilizando mi propia cuenta". La creación de la tabla de usuarios sería una de las tareas técnicas necesarias para implementar esa historia.

## 4. Problemas encontrados y cómo los solucioné

Al comenzar a trabajar con GitHub Projects tuve un problema con los permisos de GitHub CLI. Al ejecutar el comando para listar los proyectos, GitHub indicó que al token de autenticación le faltaba el scope read:project.

Lo solucioné ejecutando:

`gh auth refresh -s project`

Luego autoricé nuevamente mi cuenta desde el navegador y pude crear y administrar el Project correctamente.

Otro detalle a tener en cuenta fue que el Project fue creado mediante GitHub CLI, por lo que los issues no se agregaron automáticamente al tablero y fue necesario agregarlos al Project.

## 5. Declaración de uso de IA

En este TP utilicé IA (ChatGPT) como apoyo para interpretar la guía, organizar el orden de los pasos a realizar y facilitar algunos comandos de Git y GitHub CLI. También la utilicé como ayuda para redactar los issues y este archivo de decisiones.

Todo lo realizado fue comprobado directamente en GitHub, verificando la jerarquía entre épica, historia y tareas, la configuración del Sprint y del tablero, el límite de trabajo en progreso y la trazabilidad entre el Pull Request y el issue que se cerró automáticamente.

# TP4 – CI: Pipelines as Code

## 1. Estructura del pipeline

Para implementar integración continua se utilizó GitHub Actions mediante el archivo
`.github/workflows/ci.yml`, versionado dentro del repositorio.

El workflow se ejecuta automáticamente ante dos eventos:

- Pull Requests cuyo destino sea `main`.
- Push realizados sobre `main`.

Se definieron dos jobs independientes:

- `build-backend`: construye la imagen del backend utilizando `backend/Dockerfile`.
- `build-frontend`: construye la imagen del frontend utilizando `client/Dockerfile`.

Los jobs no poseen dependencias entre sí, por lo que GitHub Actions puede ejecutarlos en
paralelo. Esta decisión permite verificar ambos componentes de forma independiente y evita
que el tiempo total del pipeline sea simplemente la suma del tiempo de los dos builds.

Cada job se ejecuta en su propio runner `ubuntu-latest`. Los runners son independientes y
no comparten filesystem, por lo que cada job debe realizar su propio checkout del
repositorio.

## 2. Uso de los Dockerfiles como definición de build

Se decidió que el pipeline construya las imágenes utilizando los mismos Dockerfiles
creados en el TP2, en lugar de ejecutar directamente comandos como `go build` o
`npm run build` desde el workflow.

Esto evita mantener dos definiciones diferentes del proceso de construcción: una en el
Dockerfile y otra en el pipeline. De esta manera existe una única fuente de verdad para
el build y el proceso que verifica CI es el mismo que posteriormente se utilizará para
construir las imágenes de la aplicación.

El pipeline solamente construye las imágenes y no las publica en ningún registry,
por lo que se configuró `push: false`. (Lo abordaremos en el TP6).

## 3. Cache de capas

Se configuró Docker Buildx junto con el cache de GitHub Actions mediante:

`cache-from: type=gha`

y

`cache-to: type=gha,mode=max`

Se utilizaron scopes independientes para evitar que los builds se sobrescriban entre sí:

- `scope=backend`
- `scope=frontend`

En una primera ejecución las capas fueron construidas y almacenadas. Luego se realizó
una segunda corrida sobre el mismo Pull Request y se verificó en los logs la aparición
de capas marcadas como `CACHED`, demostrando que el cache estaba siendo reutilizado.

El cache es solamente una optimización. Si GitHub elimina o invalida el cache, el pipeline
debe continuar funcionando correctamente, reconstruyendo todas las capas desde cero.
Por lo tanto, el funcionamiento del pipeline no depende de la existencia del cache.

## 4. Pipeline como gate de main

Se configuraron `build-backend` y `build-frontend` como Required Status Checks de la rama
`main`.

Como consecuencia, un Pull Request no puede ser mergeado mientras alguno de estos checks
no se encuentre en verde. Esta protección complementa la obligatoriedad de utilizar Pull
Requests configurada previamente.

También se activó la opción "Require branches to be up to date before merging", equivalente
al comportamiento `strict: true`. Esto obliga a que un Pull Request sea validado contra
el estado actual de `main`. Si `main` cambia luego de que el pipeline del PR fue ejecutado,
la rama debe actualizarse y los checks deben volver a ejecutarse.

## 5. Demostración del gate

Para comprobar el funcionamiento del gate se creó la rama `feature/demo-gate`.

Se introdujo una llamada a una función inexistente (`noExiste()`) dentro del backend Go.
El comando `go build` ejecutado durante la construcción de la imagen falló,
provocando que el job `build-backend` quedara en rojo, mientras que `build-frontend`
continuó correctamente.

Como `build-backend` era un Required Status Check, GitHub bloqueó el merge del Pull Request.

Luego se eliminó el error mediante un segundo commit. El workflow se ejecutó nuevamente
de forma automática y ambos jobs finalizaron correctamente, habilitando el merge.

La secuencia demostrada fue:

build roto -> pipeline rojo -> merge bloqueado -> fix -> pipeline verde -> merge habilitado.

También se abrió un segundo Pull Request antes de realizar el merge del primero. Al cambiar
`main`, ese segundo PR quedó desactualizado y GitHub mostró la opción `Update branch`,
permitiendo comprobar el funcionamiento de la política que exige mantener las ramas
actualizadas antes del merge.

## 6. Visibilidad del estado del proyecto

Se agregó al `README.md` un status badge asociado al workflow de CI.

El badge refleja automáticamente el estado de la última ejecución del workflow sobre
`main` y permite acceder al historial de ejecuciones haciendo clic sobre él.

## 7. Problemas encontrados y resolución

Durante la demostración del build roto inicialmente se intentó introducir un import
inexistente en el backend Go ("timetracker/internal/noexiste"). El editor eliminaba
automáticamente el import al guardar el archivo debido a las herramientas de formateo
y organización automática de imports.

Para realizar la demostración de manera controlada se reemplazó esa estrategia por una
llamada a una función inexistente (`noExiste()`), lo que produjo un error real de
compilación durante `go build` y permitió demostrar correctamente el funcionamiento del
gate.

También se comprobó que la existencia de capas `CACHED` no debe evaluarse observando
únicamente el tiempo total de ejecución, ya que recuperar y almacenar el cache también
tiene un costo. La evidencia utilizada fue la aparición explícita de `CACHED` en los logs
de Docker BuildKit.

## 8. Uso de Inteligencia Artificial

Se utilizó ChatGPT como herramienta de asistencia durante el desarrollo del TP4 para
interpretar la consigna, adaptar el workflow de GitHub Actions a la estructura real del
repositorio, comprender la configuración del cache, analizar errores y preparar esta
documentación de decisiones.md.

Las sugerencias fueron verificadas ejecutando localmente los builds con Docker y mediante
las ejecuciones reales de GitHub Actions. También se comprobó directamente el
comportamiento de los Required Status Checks, el bloqueo de merges, la recuperación luego
del fix, la política de actualización de ramas y el funcionamiento del status badge.
Todo esto fue contrastado con el tp4 subido por la cátedra.

# TP5 – Testing y calidad automatizada

## 1. Elección de la lógica a testear

Se decidió comenzar por la lógica de registro de tiempos y facturación, porque los
errores en estos cálculos afectan directamente las horas trabajadas y el importe
que se cobra al cliente.

Se seleccionaron cuatro reglas de la aplicación:

- Calcular la duración de un registro a partir de su inicio y fin.
- Convertir segundos a horas, conservando las fracciones.
- Calcular el importe a partir de las horas y la tarifa.
- Agrupar las horas trabajadas por fecha de inicio.

Los tests incluyen casos normales, casos de borde y entradas inválidas. Por ejemplo,
se verifica que 5400 segundos equivalgan a 1,5 horas, que dos registros del mismo día
sumen sus horas y que un registro sin fechas o con un final anterior al inicio sea
rechazado.

Se decidió aceptar una duración de cero cuando el inicio y el fin coinciden.
Para la agrupación se mantuvo el comportamiento existente: cada registro se asigna
a su fecha de inicio, sin dividirlo entre días si cruza la medianoche.

## 2. Separación de la lógica y los handlers

Inicialmente, los cálculos de duración y facturación estaban dentro de los handlers,
mezclados con el procesamiento HTTP y el acceso a la base de datos.

Se extrajeron las funciones CalculateDuration, SecondsToHours, CalculateAmount y
GroupHoursByDate al paquete internal/services. Luego se modificaron los handlers para
utilizar esas mismas funciones.

Esta decisión permite probar la lógica de forma aislada, sin levantar el servidor ni
conectarse a PostgreSQL. Además, los tests verifican funciones utilizadas realmente
por la aplicación, evitando crear código exclusivamente para alcanzar una cantidad
de pruebas.

## 3. Estructura de los tests y herramientas utilizadas

Para el backend se utilizó el paquete testing de Go y archivos terminados en
\_test.go.

Los tests se organizaron siguiendo la estructura AAA:

- Arrange: preparar los datos y las dependencias.
- Act: ejecutar la operación bajo prueba.
- Assert: comprobar el resultado o la interacción esperada.

Para los tests parametrizados se utilizaron tablas de casos y t.Run. Esto permite
ejecutar un mismo comportamiento con distintas entradas, como intervalos de tiempo
válidos, fechas faltantes o inicio y fin iguales.

Se utilizaron fechas fijas para que los resultados no dependan del momento en que se
ejecuten los tests.

Hasta este avance se implementaron 13 funciones de test: 12 en services y una en
handlers. Los subtests de cada tabla no se contaron como funciones independientes.

## 4. Refactorización para utilizar un mock

La consulta de registros para generar una factura utilizaba directamente
database.DB dentro del handler.

Se creó la interfaz TimeEntryRepository, con el método FindForInvoice, y la función
LoadInvoiceHours, que recibe esa dependencia como parámetro.

En la aplicación se utiliza invoiceTimeEntryRepository, que realiza la consulta
real mediante GORM. En los tests se utiliza un doble escrito en Go, que devuelve
registros controlados y registra las llamadas recibidas.

El test verifica que el repositorio sea consultado exactamente una vez y que reciba
el proyecto, usuario y período correctos. También comprueba que los registros
devueltos se agrupen correctamente.

Se agregó otro test para comprobar que un error del repositorio sea devuelto al
llamador sin producir un resultado de horas.

El doble no funciona solamente como un stub que entrega datos: también permite
verificar la interacción con la dependencia, cumpliendo el objetivo del mock.
Estos tests no verifican el SQL ni la conexión real a PostgreSQL.

## 5. Medición inicial de cobertura y alcance

Primero se midió la cobertura del paquete internal/services:

```bash
go test ./internal/services -count=1 -coverprofile=coverage.out
go tool cover -func=coverage.out
```

El resultado fue 100 % de cobertura de sentencias en las cinco funciones del paquete.

Luego se amplió la medición a todos los paquetes del backend:

```bash
go test ./... -count=1 -coverpkg=./... -coverprofile=coverage-all.out
go tool cover -func=coverage-all.out
```

La cobertura global inicial fue de 4,4 %. Después de incorporar el test de fecha
inválida del handler de facturación, aumentó a 6,0 %.

La diferencia se debe al alcance de cada medición: los servicios están ejercitados
por los tests, pero gran parte de los handlers, la autenticación y el acceso a datos
todavía no tienen pruebas.

Por este motivo, el 100 % de services no se presenta como cobertura de todo el backend.

La medición global utiliza ./... sin exclusiones explícitas de paquetes.
El alcance definitivo del quality gate y sus exclusiones todavía no fueron definidos.

La herramienta nativa de Go informa cobertura de sentencias.

## 6. Por qué una cobertura alta no garantiza calidad

La cobertura indica qué código se ejecutó durante los tests, pero no demuestra por
sí sola que los resultados hayan sido comprobados correctamente.

Por ejemplo, un test que solamente llame a CalculateAmount(1.5, 100), sin verificar
su resultado, puede ejecutar toda la función y aportar cobertura aunque el cálculo
sea incorrecto.

En nuestra suite se comprueba que el resultado sea 150. También se verifica que
SecondsToHours(5400) devuelva 1.5, lo que permite detectar una división entera que
pierda la fracción de hora.

Aun con 100 % de sentencias en services, pueden faltar escenarios. Por ejemplo,
todavía no se agregó un test específico para comprobar la asignación de un registro
que cruza la medianoche a su fecha de inicio.

## 7. Ejercicio del camino sin cubrir

En la medición global inicial, GenerateInvoice, dentro de
backend/internal/handlers/invoice_handler.go, tenía 0 % de cobertura.

Se identificó el camino de error del if err != nil inmediatamente posterior a:

```go
startDate, err := time.Parse("2006-01-02", req.StartDate)
```

Una entrada concreta que recorre ese camino es:

```json
{
  "projectId": 7,
  "startDate": "no-es-una-fecha",
  "endDate": "2026-10-14"
}
```

Se decidió agregar TestGenerateInvoice_RejectsInvalidStartDate para comprobar
ese comportamiento.

El test procesa una petición en memoria mediante httptest y Gin, sin levantar un
servidor ni utilizar PostgreSQL, porque la validación ocurre antes de acceder a la base.

Se verifica que la respuesta tenga estado HTTP 400 y el mensaje
"Invalid start date format". Comprobar también el mensaje permite distinguir este
rechazo de otros errores que podrían producir el mismo estado HTTP.

El test pasó correctamente. La cobertura de GenerateInvoice aumentó de 0 % a 19,4 %
y la cobertura global del backend pasó de 4,4 % a 6,0 %.

Esto demuestra que se incorporó una prueba para un camino antes no ejercitado,
aunque todavía quedan otros caminos del handler sin cubrir.

## 8. Verificación local y dificultades encontradas

Los cambios fueron formateados con go fmt y verificados mediante:

```bash
go test ./internal/services -v
go test ./internal/handlers -run TestGenerateInvoice_RejectsInvalidStartDate -v
go test ./...
```

Las 13 funciones de test finalizaron correctamente y los paquetes del backend
compilaron sin errores.

Una dificultad de interpretación fue distinguir el 100 % del paquete services de
la cobertura global del backend. Se resolvió ampliando la medición con
-coverpkg=./... y revisando el reporte por función.

También se identificó que la herramienta nativa de Go mide sentencias y no ramas,
por lo que ambos conceptos deben mantenerse separados en los reportes y en la
justificación del umbral.

## 9. Tests y refactorización del frontend

Se incorporaron Vitest 3.2.7 y @vitest/coverage-v8 3.2.7, con ejecución en
entorno Node, sin DOM.

La suite cuenta con 18 casos ejecutados, distribuidos en tres archivos:

- utils.test.ts: formato de duración y moneda.
- invoices.test.ts: solicitud de facturación y propagación de errores.
- time.test.ts: cálculo de duración y validación de fechas.

Se utilizaron tests parametrizados con it.each, casos de error y un mock
del cliente HTTP mediante vi.mock y vi.fn.

El mock permite comprobar que la generación de facturas invoque una sola
vez al endpoint correcto, envíe los datos esperados y devuelva la respuesta.
También se verifica que un error de la solicitud sea propagado al llamador,
sin realizar peticiones reales.

Se detectó que el cálculo de duración estaba repetido en TimeEntryForm,
TimerContext y useTimer. Se extrajo a src/lib/time.ts y los tres lugares
pasaron a utilizar la misma función.

La función recibe los instantes de inicio y fin, acepta duración cero,
rechaza fechas inválidas o intervalos invertidos y devuelve segundos
completos. Los tests utilizan fechas fijas para evitar depender del reloj.

Además, al detener los temporizadores se calcula la duración usando el
instante de finalización, en lugar de enviar el valor del último refresco
visual del contador.

Los 18 casos pasaron localmente y npm run build terminó correctamente.

## 10. Alcance y umbrales de cobertura del frontend

La medición incluye src/\*_/_.{ts,tsx}. Se excluyen los archivos de test y
las declaraciones .d.ts porque no forman parte del comportamiento de
producción que se busca medir.

Se mantienen incluidos los componentes, hooks y contextos, ya que pueden
contener lógica sin probar. No se los excluyó solamente por tener
extensión .tsx o por disminuir el porcentaje global.

Se configuraron los siguientes umbrales:

| Alcance             | Líneas | Ramas |
| ------------------- | -----: | ----: |
| Frontend completo   |    1 % |  20 % |
| src/lib/time.ts     |   90 % |  90 % |
| src/api/invoices.ts |   90 % |  90 % |
| src/lib/utils.ts    |   60 % |  90 % |

La medición local previa al gate fue de 1,02 % de líneas y 25 % de ramas
para todo el frontend. time.ts e invoices.ts alcanzaron 100 % en ambas
métricas; utils.ts obtuvo 65,21 % de líneas y 100 % de ramas.

El piso global es una protección inicial limitada, no una afirmación de
que la aplicación tiene cobertura suficiente. Se complementa con umbrales
más exigentes en los módulos trabajados.

En utils.ts se eligió 60 % de líneas frente al 65,21 % medido. Todavía
faltan pruebas para cn y formatDate. Para elevar el umbral global será
necesario ampliar la suite sobre las funcionalidades restantes.

Se comprobó el fallo del mecanismo aumentando temporalmente el umbral
de líneas de utils.ts a 80 %. Los 18 tests pasaron, pero el comando falló
porque su cobertura de 65,21 % no alcanzó ese valor.

Luego se restauró el umbral a 60 % y la ejecución volvió a finalizar
correctamente con código de salida 0.

Esta comprobación local no reemplaza la demostración exigida mediante
Pull Requests con código nuevo sin tests y umbrales sin modificar.

## 11. Ejecución del frontend en Docker y GitHub Actions

Se agregó una etapa test al Dockerfile del frontend, derivada de la etapa
build. Su comando ejecuta npm run test:coverage.

De esta manera, los tests utilizan el código y las dependencias de la
misma receta de construcción de la aplicación. La etapa final continúa
siendo Nginx.

En la prueba local con Docker pasaron los 18 tests y se cumplieron los
umbrales, con código de salida 0. El reporte del contenedor indicó
1,42 % de líneas y 26,78 % de ramas para el frontend completo.

Estos valores difieren de la medición local en Windows. No se interpreta
esa diferencia como una mejora del código; la causa exacta no fue
determinada. La ejecución en el contenedor de CI será la referencia
para evaluar el gate.

Se extendió el job build-frontend del workflow existente para:

- Construir y cargar la etapa test.
- Ejecutar los tests y verificar los umbrales dentro del contenedor.
- Escribir un resumen de cobertura en la corrida.
- Publicar los reportes como artefacto coverage-frontend.

Los pasos de resumen y publicación utilizan always() para intentar
conservar la evidencia aunque falle la cobertura. Esto no anula el
fallo del paso de tests ni convierte el job en exitoso.

PR de implementación:
https://github.com/JuliAA10/ingsoft3-tps/pull/19

Primera corrida del PR:
https://github.com/JuliAA10/ingsoft3-tps/actions/runs/38759240571

### Verificación del pipeline y evidencias

Se verificó una ejecución del PR #19 en la que los jobs build-backend
y build-frontend finalizaron correctamente.

En ambos componentes se construyeron las etapas de tests, se ejecutaron
las pruebas y se cumplieron los umbrales de cobertura configurados.
También finalizaron correctamente los pasos de generación del resumen
y publicación de reportes.

Se comprobó la disponibilidad de los artefactos descargables
coverage-backend y coverage-frontend.

Corrida verificada:
https://github.com/JuliAA10/ingsoft3-tps/actions/runs/38778635555

PR de implementación:
https://github.com/JuliAA10/ingsoft3-tps/pull/19

Esta corrida demuestra que los tests, los umbrales y la publicación de
reportes funcionan en CI. Todavía no demuestra el bloqueo de un merge
por cobertura.

### Demostración de fallo por cobertura

Se agregó calculateBillableMinutes en src/lib/time.ts sin incorporar
sus tests. La función propone redondear el tiempo facturable hacia
arriba en bloques de 15 minutos; todavía no está conectada al cálculo
actual de facturas.

La imagen del frontend se construyó correctamente y los 18 tests
existentes pasaron. Sin embargo, build-frontend falló porque la
cobertura de líneas de time.ts bajó a 59,25 %, por debajo del umbral
de 90 %. El paso terminó con código de salida 1.

Corrida roja por cobertura:
https://github.com/JuliAA10/ingsoft3-tps/actions/runs/38780695123

Para corregirlo se agregaron pruebas de redondeo, límites exactos de
los bloques, duración cero, valores negativos y valores no finitos.
El umbral se mantuvo sin modificaciones.

Después de incorporar los tests de calculateBillableMinutes, la suite
del frontend pasó de 18 a 29 casos. La corrida posterior finalizó
correctamente, manteniendo los mismos umbrales de cobertura.

Corrida exitosa después de agregar los tests:
https://github.com/JuliAA10/ingsoft3-tps/actions/runs/38781580642

La corrección consistió en probar el código nuevo, sin reducir el
porcentaje exigido ni excluir la función de la medición.

## 12. Problemas adicionales y estado del trabajo

Durante la edición de package.json, VS Code informó que el archivo en
disco era más reciente. Esto ocurrió después de instalar las dependencias.
Se indicó conservar la versión actualizada y aplicar el cambio de scripts
sin sobrescribir las dependencias agregadas por npm.

También apareció un aviso de deprecación de baseUrl. Se eliminó esa
opción de tsconfig.json y se conservó el alias mediante paths.
Los tests y la compilación finalizaron correctamente después del cambio.

La primera ejecución de cobertura en Docker falló con EBUSY porque
Vitest intentaba eliminar /app/coverage, que era el punto de montaje
del volumen.

Se resolvió montando la carpeta local en /out y generando los reportes
en /out/frontend. Así Vitest puede limpiar su subcarpeta sin eliminar
el punto de montaje. La ejecución posterior terminó correctamente.

Se agregó una etapa test al Dockerfile del backend, derivada de build,
que ejecuta scripts/test-coverage.sh.

El script ejecuta los tests y genera reportes de cobertura de sentencias
para el backend completo y para internal/services. Los umbrales iniciales
son 5 % global y 90 % para services, frente a las mediciones de 6 % y
100 %, respectivamente.

El piso global ofrece una protección limitada y mantiene visible el
código sin pruebas. El umbral de services protege con mayor exigencia
las reglas de tiempos y facturación trabajadas en este TP.

La ejecución local dentro del contenedor pasó los tests, cumplió ambos
umbrales y terminó con código de salida 0.

Se agregaron al job build-backend los pasos para construir la etapa test,
ejecutarla, mostrar el resumen y publicar el artefacto coverage-backend.
Queda pendiente verificar esta integración en GitHub Actions.

#### Medición complementaria de ramas

Se incorporó Gobco v1.3.4 en la etapa `test` del Dockerfile del
backend y se ejecuta con `-branch -list-all` desde el script de cobertura.

La ejecución local en Docker obtuvo 6/6 resultados de ramas cubiertos
(100%) en `internal/services`. Los tres `if` instrumentados se evaluaron
tanto por verdadero como por falso: error del repositorio, fechas
faltantes y fecha de fin anterior al inicio.

Este resultado corresponde únicamente a las decisiones instrumentadas
en `services`; no representa la cobertura de ramas de todo el backend
ni garantiza todas las combinaciones de condiciones.

Se generan los archivos `branches-services.txt` y
`branches-services.json` dentro de la carpeta de reportes del backend,
y el resultado se incorpora a `summary.md`.

La cobertura de ramas es informativa. Se mantienen los umbrales
obligatorios de sentencias: 5% para el backend completo y 90% para
`services`. La ejecución local obtuvo 6.0% y 100.0%, respectivamente,
y finalizó con código de salida 0.

#### PR de demostración conservado en rojo

Se creó el PR #20 incorporando `calculateBillableAmount` sin pruebas,
como regla propuesta pendiente de integración. No se modificaron
los tests existentes ni los umbrales de cobertura.

En CI, la construcción del frontend finalizó correctamente y los
29 tests existentes pasaron. Sin embargo, la cobertura de líneas
de `src/lib/time.ts` quedó en 65,11%, por debajo del 90% requerido.
El comando terminó con código 1 y el job del frontend falló
específicamente por cobertura insuficiente.

El job del backend pasó. Los resúmenes y artefactos de cobertura
se publicaron también en la ejecución fallida.

El PR permanece abierto y sin fusionar para la defensa. Al verificarlo,
GitHub informó el estado de merge `blocked`.

- PR: https://github.com/JuliAA10/ingsoft3-tps/pull/20
- Ejecución de CI: https://github.com/JuliAA10/ingsoft3-tps/actions/runs/38916002270

## 13. Uso de Inteligencia Artificial

Se utilizó ChatGPT como herramienta de asistencia para interpretar la consigna,
seleccionar reglas de negocio, proponer la separación entre handlers y servicios,
escribir los tests, implementar el doble del repositorio e interpretar los
resultados de cobertura.

También se utilizó para organizar esta documentación.

El código sugerido fue incorporado al proyecto y verificado mediante ejecuciones
locales de go test, comprobando los resultados de los tests y los porcentajes
informados por la herramienta de cobertura.

La asistencia incluyó la explicación de los asserts y de los límites de cada prueba,
especialmente la diferencia entre comprobar la interacción con un repositorio
simulado y verificar una consulta contra la base de datos real.

En el frontend se utilizó ChatGPT para asistir en la configuración de
Vitest, la escritura de tests y mocks, la extracción del cálculo de
duración, la configuración de umbrales y la integración con Docker y
GitHub Actions.

Las sugerencias se verificaron ejecutando los 18 casos de test, el build
de producción, el fallo temporal del umbral y la ejecución dentro del
contenedor. La validación del pipeline se registra por separado según
el resultado real de cada corrida.

# TP6 – Entrega continua, entornos y aprobaciones

## 1. Qué se implementó

Se extendió el pipeline de los TPs anteriores para publicar imágenes
Docker y desplegar la aplicación en dos entornos: QA y producción.

Se implementó Continuous Delivery: QA se actualiza automáticamente
después de superar CI, pero producción requiere aprobación humana.

No se implementó Continuous Deployment, porque los cambios no llegan
automáticamente a producción sin esa decisión. Para esta aplicación,
la aprobación permite revisar el funcionamiento real antes de promover
un cambio, complementando una suite de tests que todavía tiene un
alcance limitado.

## 2. Publicación del artefacto

Se publican dos imágenes en GitHub Container Registry: una del backend
y otra del frontend. Cada imagen se etiqueta con sha- seguido del SHA
completo del commit.

La publicación se realiza solamente en eventos push sobre main y al
final del mismo job que ejecuta los tests y verifica la cobertura.
Los pasos que publican imágenes no utilizan always().

La cadena se apoya en tres controles: los checks requeridos protegen
la integración a main, solamente main publica y la publicación ocurre
después de las verificaciones del componente.

Los jobs del backend y frontend son independientes. Uno puede publicar
si pasó aunque el otro falle, pero el despliegue de QA exige que ambos
hayan finalizado correctamente.

Publicar imágenes aunque fallen sus verificaciones haría que estar en
el registry dejara de indicar que pasaron esos controles. Esta garantía
corresponde al pipeline: no impide que alguien con permisos publique
manualmente otra imagen.

Se comprobó la descarga pública de ambos paquetes utilizando una
configuración temporal de Docker sin credenciales.

La etiqueta por SHA permite identificar el código de origen, pero una
etiqueta puede sobrescribirse, por ejemplo al repetir una corrida.
El digest identifica el contenido concreto de la imagen y ofrece una
referencia más precisa.

## 3. Entornos y separación de datos

Se crearon cuatro Web Services Docker en Render: backend y frontend
para QA, y backend y frontend para producción.

En Neon se crearon app_qa y app_prod. Son bases distintas dentro del
mismo proyecto y rama; no representan servidores independientes.

Cada backend recibe su propia DATABASE_URL. GORM ejecuta AutoMigrate
al arrancar para crear las tablas de usuarios, proyectos, tareas y
registros de tiempo.

Se comprobó la separación creando un proyecto en QA y otro llamado
Prueba PROD en producción. El proyecto de producción apareció en
app_prod y no en app_qa.

Los cuatro servicios tienen Auto-Deploy desactivado. Después de la
preparación inicial, el flujo normal de despliegue lo dispara Actions.
La prueba de rollback se realizó manualmente desde Render.

## 4. Configuración fuera de las imágenes

El frontend mantiene /api como ruta de acceso a la API. Nginx recibe
las solicitudes y las reenvía al backend correspondiente.

Se reemplazó nginx.conf por default.conf.template. Al arrancar,
la imagen oficial de Nginx sustituye BACKEND_URL y DNS_RESOLVER.
Así, una misma imagen puede utilizar configuraciones diferentes
sin recompilar React.

Se comprobó localmente la sustitución de variables usando la misma
imagen con otra dirección de backend. Esa prueba verificó la
configuración generada, no una conexión a la dirección de ejemplo.

Dentro de la imagen quedan los archivos compilados de React, la
plantilla y los valores predeterminados para Compose local. Las URLs
específicas de QA y PROD se proporcionan desde Render.

El backend recibe DATABASE_URL, JWT_SECRET, PORT, GIN_MODE y
ALLOWED_ORIGINS mediante variables de entorno. CORS permite configurar
el origen del frontend para cada entorno. Los secretos JWT de QA y
producción son diferentes.

## 5. Cadena de promoción y secretos

deploy-qa depende de build-backend y build-frontend mediante needs.
Su condición if permite ejecutarlo únicamente ante un push a main.

deploy-prod depende de deploy-qa y utiliza el environment production.
GitHub lo mantiene esperando hasta que se aprueba el despliegue.

Los hooks se guardaron como environment secrets:

- qa: RENDER_HOOK_API_QA y RENDER_HOOK_FRONT_QA.
- production: RENDER_HOOK_API_PROD y RENDER_HOOK_FRONT_PROD.

Los jobs acceden a los secretos de su entorno. Las credenciales de la
base y JWT se configuran en Render; no están escritas en el workflow.

Cada llamada al hook incluye &ref=$GITHUB_SHA para solicitar el commit
verificado por esa corrida, en lugar de la punta de main.

Esto evita elegir accidentalmente otro commit si la rama avanza,
pero no serializa por sí solo distintas corridas ni impide aprobar
una corrida antigua después de una nueva.

## 6. Criterios de aprobación y prueba de rechazo

Antes de aprobar producción se revisan:

- Los resultados de build, tests, cobertura y smoke test de QA.
- Que ambos servicios de QA estén Live con el commit de la corrida.
- El funcionamiento de la aplicación y el alcance del cambio.
- La versión anterior disponible y la compatibilidad de los datos.

El environment production tiene a JuliAA10 como required reviewer
y Prevent self-review desactivado, para permitir la aprobación en
este proyecto individual.

Se realizó una promoción aprobada y luego una repetición controlada.
En esa repetición se rechazó volver a desplegar cd9bbaa porque ya
estaba validado en producción y no había cambios nuevos que promover.

El motivo quedó escrito en GitHub. El job de producción terminó
rechazado sin ejecutar los hooks. El resultado rojo de ese intento
demuestra el bloqueo y no un fallo de la aplicación.

## 7. Smoke tests y sus límites

Se agregó /health al backend. Comprueba la conexión con PostgreSQL
mediante PingContext, con un límite de cinco segundos. Devuelve
HTTP 200 si responde y HTTP 503 si falla.

El smoke comprueba el estado HTTP y los campos status y database
del JSON, y verifica que la raíz del frontend responda correctamente.

Se realizan hasta 30 intentos, con pausas de 20 segundos y límites
de tiempo en las solicitudes. Cada job de deploy tiene un máximo
de 25 minutos.

El smoke no prueba login, creación de proyectos, todas las tablas,
ni todos los caminos de negocio. Tampoco comprueba el contenido
visual del frontend o qué commit está ejecutándose.

Los hooks inician una construcción en segundo plano. Mientras tanto,
Render puede seguir sirviendo la versión anterior, por lo que un
smoke verde no demuestra que la nueva versión haya terminado de
desplegarse. Se complementó con la revisión del commit Live en Render
y pruebas manuales de la aplicación.

## 8. Mismo commit y limitación de la reconstrucción

En este TP Render construye desde el repositorio utilizando los
Dockerfiles. No ejecuta directamente las imágenes publicadas en GHCR.

Por eso se solicita el mismo commit en QA y PROD, pero no se garantiza
el mismo contenido binario: las construcciones podrían resolver
dependencias o imágenes base diferentes.

Consumir la misma imagen mediante una referencia inmutable y verificar
la versión en ejecución permitiría cerrar esta diferencia en el TP7.

## 9. Límites del plan gratuito y presupuesto

Render suspende los servicios gratuitos después de 15 minutos sin
tráfico; al volver a recibir solicitudes pueden tardar alrededor de
un minuto en arrancar. Los reintentos del smoke contemplan esa demora.

Las 750 horas gratuitas mensuales se comparten entre los servicios
del workspace. No corresponden a cada servicio por separado.
No se utilizarán pings permanentes para mantenerlos despiertos.

También hay una cuota de minutos de construcción. Si se agota sin
un medio de pago habilitado, pueden bloquearse los nuevos builds
mientras sigue sirviéndose la versión anterior.

Como presupuesto inicial de planificación, cuatro servicios activos
dos horas diarias durante 30 días consumirían unas 240 horas.
No es una medición del consumo real.

La guía toma 500 minutos mensuales de build como referencia.
Con cuatro builds de cinco minutos por promoción, 20 promociones
consumirían unos 400 minutos, dejando margen para reintentos.
La cuota aplicable y el consumo restante deben comprobarse en Billing.

Se eligió Neon para las bases, evitando la expiración a los 30 días
del PostgreSQL gratuito de Render. También deben vigilarse las cuotas
de Neon y conservar las URLs disponibles hasta la defensa.

## 10. Estrategia propuesta para producción real

Para una producción real con usuarios se propone blue-green:
preparar una versión nueva en un entorno paralelo, validarla y cambiar
el tráfico cuando esté lista.

Su ventaja es poder devolver el tráfico rápidamente a la versión
anterior. Su costo es mantener dos entornos de aplicación durante
la transición y configurar el mecanismo de cambio de tráfico.

Esta estrategia no está implementada en el TP. QA y PROD no son
por sí mismos un blue-green.

Faltan métricas de errores, latencia y operaciones de negocio, alertas
y un procedimiento de cambio de tráfico. También habría que diseñar
migraciones compatibles con ambas versiones. Cambiar el tráfico no
revierte modificaciones de datos.

## 11. Rollback probado y medido

El 19/10/2026 se realizó un ensayo de rollback en ambos servicios de
producción, pasando de cd9bbaa a e144526.

Se compararon los commits: solamente cambiaba el workflow, no el
código de aplicación ni el esquema. Por eso la prueba demuestra el
procedimiento de redespliegue de un commit anterior, pero no una
recuperación ante un defecto funcional.

Procedimiento utilizado:

1. Identificar el commit anterior conocido y revisar su compatibilidad.
2. Abrir cada servicio de PROD en Render.
3. Seleccionar Manual Deploy → Deploy a specific commit.
4. Indicar e1445263a1352ccd868568ebad3d23aa33234988.
5. Esperar a que ambos servicios estén Live con ese commit.
6. Comprobar /health, login y conservación del proyecto Prueba PROD.

Duraciones informadas por Render:

| Servicio      |      Duración |
| ------------- | ------------: |
| Backend PROD  | 21,4 segundos |
| Frontend PROD | 26,9 segundos |

Son duraciones individuales de despliegue. No se suman ni representan
el tiempo total de recuperación, que incluye decidir y validar.
Los enlaces del detalle están al inicio de este archivo.

Después se restauró cd9bbaa mediante Actions, pasando nuevamente por
QA y aprobación manual de producción. Ambos smoke tests terminaron
correctamente.

La base conservó el proyecto Prueba PROD. Un rollback de código no
restaura los datos; para eso se requieren respaldos o recuperación
a un punto en el tiempo y un procedimiento probado.

## 12. Problemas encontrados y resolución

La publicación inicial en GHCR falló con permission_denied:
write_package. El login funcionaba, pero faltaba habilitar acceso
de escritura para Actions sobre los paquetes existentes.
Se agregó ingsoft3-tps en Manage Actions access con rol Write
y se repitió la corrida correctamente.

En el PR de la plantilla de Nginx se subió inicialmente el renombrado
sin los cambios de contenido y del Dockerfile. El build falló porque
todavía intentaba copiar nginx.conf. Se agregaron los archivos
modificados al commit siguiente y el CI pasó.

Al preparar el backend de PROD faltó configurar DATABASE_URL.
Se agregó la conexión de app_prod y se volvió a desplegar, verificando
después las tablas en Neon.

También fue necesario identificar los commits desde el detalle de
los despliegues de Render, porque el estado Live por sí solo no
identifica qué versión está funcionando.

## 13. Uso de Inteligencia Artificial

Se utilizó ChatGPT para interpretar la consigna, adaptar el workflow
a Go y React, configurar la publicación en GHCR, preparar la plantilla
de Nginx, el endpoint health y CORS, explicar los entornos y redactar
esta documentación.

Las propuestas se verificaron mediante builds y pruebas locales,
corridas de Actions, descargas sin credenciales, consultas en Neon,
pruebas de registro y proyectos, comparación de commits en Render,
aprobación, rechazo y ensayo de rollback.

Las limitaciones del smoke, de la cobertura y de reconstruir en
Render se documentan explícitamente.

# TP7 — Contenedores, integración y pruebas E2E

## 1. Construir una imagen y promoverla entre entornos

Se configuraron los cuatro servicios de Render para ejecutar imágenes
publicadas en GHCR. El pipeline identifica cada imagen con la etiqueta
sha-<SHA completo del commit>.

Los deploy hooks reciben la imagen mediante el parámetro imgURL.
De esta manera, QA y PROD reciben las mismas referencias de imágenes,
sin reconstruirlas para cada entorno.

Esto reduce las diferencias que pueden aparecer al reconstruir una
aplicación por cambios en dependencias o imágenes base. Las diferencias
de configuración entre entornos se mantienen en las variables y secretos
de cada servicio.

La etiqueta permite relacionar código y despliegue, pero técnicamente
puede sobrescribirse. El digest identifica el contenido de la imagen;
por eso no se considera que una etiqueta sea inmutable por sí sola.

## 2. Configuración y secretos

El frontend utiliza /api y Nginx dirige las solicitudes al backend
correspondiente mediante BACKEND_URL. Así puede utilizarse la misma
imagen del frontend en QA y PROD.

Las URL de las pruebas se configuran con API_BASE_URL y E2E_BASE_URL
en el environment qa de GitHub Actions. Las credenciales de la cuenta
de pruebas se guardan como QA_TEST_EMAIL y QA_TEST_PASSWORD en Secrets.

Los deploy hooks también se mantienen como secretos. No se incorporan
contraseñas, tokens ni hooks dentro de las imágenes o del repositorio.

## 3. Pruebas de integración

Se implementaron tres pruebas en client/e2e/api.spec.js utilizando
las solicitudes HTTP de Playwright contra la API desplegada en QA:

- Crear, consultar y eliminar un proyecto.
- Rechazar un nombre vacío sin crear un registro.
- Recuperar nombre, descripción y tarifa de un proyecto guardado.

Estas pruebas atraviesan la API y la persistencia real en PostgreSQL,
sin reemplazar esos componentes por mocks.

Se eligieron porque verifican operaciones centrales del sistema y una
regla de validación. La consulta posterior comprueba que los datos pueden
recuperarse, en lugar de verificar únicamente la respuesta de creación.

Son pruebas de integración amplias: cubren también configuración,
autenticación y comunicación con la base. A cambio, dependen de la
disponibilidad de QA y un fallo requiere investigar qué componente falló.

## 4. Pruebas E2E

Se implementaron tres flujos en client/e2e/projects.spec.js, ejecutados
con Chromium contra el frontend de QA:

- Crear un proyecto, verlo y eliminarlo.
- Mostrar un error por un nombre inválido sin guardar el proyecto.
- Conservar el proyecto y su tarifa después de recargar la página.

Las pruebas interactúan con la interfaz real y utilizan la API real.
Se generan datos identificables para cada prueba y se eliminan los
registros creados, verificando su eliminación.

Los tests unitarios siguen cubriendo lógica aislada. La integración
comprueba la comunicación entre componentes y los E2E verifican los
recorridos completos del usuario. No se intenta cubrir todas las
combinaciones mediante el navegador por su mayor costo y dependencia
del entorno.

## 5. Promoción condicionada por las pruebas

En los push a main, la secuencia del workflow es:

build y publicación → deploy-qa → integracion → e2e → deploy-prod.

Cada etapa depende del éxito de la anterior mediante needs.
deploy-prod conserva la aprobación del environment production.

Los fallos de integración o E2E impiden llegar al despliegue de PROD.
No se utilizan continue-on-error ni comandos que oculten el resultado
de las pruebas.

Los reportes se publican con always() para conservar evidencia incluso
cuando las pruebas fallan. Esto no habilita la promoción a PROD.

## 6. Demostración de fallo y recuperación

En el PR #29 se cambió el texto del botón de creación de Create Project
a Save Project, sin modificar los tests.

La compilación y las pruebas de integración pasaron. Los tres E2E
fallaron porque no encontraron el botón esperado, y deploy-prod quedó
omitido por la dependencia del job e2e.

El cambio muestra un fallo del contrato de interfaz verificado por
los tests; no implica que la API haya dejado de funcionar.

El PR #30 restauró Create Project sin modificar los tests. La ejecución
39497007523 completó tres pruebas de integración y tres E2E exitosamente.
Luego de la aprobación, también finalizaron correctamente el despliegue
y las verificaciones de PROD.

## 7. Diagnóstico y dificultades

Durante la configuración inicial, las credenciales de prueba se habían
cargado como variables, mientras que el workflow las consultaba como
Secrets. Se corrigió su ubicación en el environment qa.

Se agregó validación del nombre del proyecto en frontend y backend.
El backend aplica TrimSpace y devuelve HTTP 400 cuando el nombre queda
vacío, antes de intentar guardarlo.

En una ejecución inicial, la prueba de nombre vacío recibió HTTP 201
en lugar de 400. Se inspeccionó la imagen publicada y se comprobó que
contenía la validación. Después de volver a desplegar QA, la prueba pasó.
No se estableció una causa definitiva para aquella respuesta, por lo
que no se atribuye el incidente con certeza a una imagen desactualizada.

También hubo una configuración y un despliegue manual accidental en
PROD durante la preparación. Se verificó su funcionamiento y los
despliegues posteriores del pipeline completaron correctamente la
promoción. Ese despliegue manual no se utiliza como evidencia del gate.

## 8. Disponibilidad, reintentos y límites

Los servicios pueden necesitar tiempo para iniciar. Se utilizan esperas
por respuestas y elementos, junto con límites de tiempo explícitos.
Las pruebas se ejecutan con un worker y en CI se permite un reintento.

Los reintentos no reemplazan la investigación de los fallos. Los reportes
distinguen los resultados inestables de los éxitos sin reintentos.

El health check comprueba disponibilidad de API y base de datos, pero
por sí solo no demuestra qué versión está activa. La referencia de la
imagen y los eventos de Render complementan esa verificación.

Los tests cubren proyectos y no todos los módulos de la aplicación.
Un pipeline exitoso aporta evidencia sobre los escenarios comprobados,
sin garantizar la ausencia de otros errores.

## 9. Uso de IA y validación

Se utilizó IA para preparar y revisar la configuración del workflow,
las pruebas de Playwright, la validación del nombre y la documentación.

Las propuestas se contrastaron con los cambios del repositorio,
la compilación del frontend, los resultados de CI, las respuestas reales
de QA y los reportes de Playwright.

La enumeración de tests con --list solo comprobó su descubrimiento.
La evidencia funcional corresponde a las ejecuciones reales contra QA,
incluyendo el fallo controlado y la recuperación posterior.

# TP8 — Infraestructura como Código

## 1. Riel elegido y configuración

Se utilizó Terraform 1.16.6 con los providers kislerdm/neon 0.18.0
y render-oss/render 1.9.1, fijados por versión.

La carpeta infra/ declara un entorno preprod independiente: un proyecto,
un rol y una base en Neon, y dos servicios en Render para API y frontend.
Se reutilizan las imágenes del TP7 con la etiqueta
sha-c3d4a9d27e0595295ddd39e608373082e612d603.

DATABASE_URL se construye con los atributos de los recursos de Neon.
BACKEND_URL se obtiene de la URL de la API creada por Terraform.
Render genera JWT_SECRET y las credenciales de los providers se leen
desde variables de entorno.

El origen permitido por CORS se calcula a partir del nombre esperado
del frontend. Se comprobó que coincidiera con la URL asignada por Render.

El estado se guarda localmente y se excluye de Git porque contiene
credenciales legibles. Se versiona .terraform.lock.hcl para registrar
las versiones y hashes de los providers.

## 2. Problemas encontrados y verificación

La creación inicial del proyecto de Neon falló porque la API exigía
org_id. Se agregó el identificador de la organización al recurso.

Para practicar drift se intentó eliminar app_preprod desde SQL Editor,
pero surgieron dificultades de permisos y conexión. Se realizó el
borrado mediante la API de Neon. Terraform detectó la ausencia de la
base y propuso recrear únicamente ese recurso. Después del apply,
el plan volvió a indicar No changes.

También se creó base_intrusa fuera de Terraform. El plan no propuso
cambios, comprobando que no administra automáticamente todos los
recursos existentes. La base de prueba se eliminó después.

Se inspeccionó el estado local y se comprobó que los valores sensibles
pueden quedar almacenados en texto plano. Se probó prevent_destroy
sobre la base: Terraform rechazó el plan de destrucción. La protección
se retiró después del ensayo para permitir el ciclo de vida de preprod.

Se ejecutó destroy → apply del entorno completo: cinco recursos
destruidos y cinco recreados. El plan posterior indicó No changes.
Las URLs de Render se conservaron en este ensayo, mientras que los
identificadores y el host de Neon cambiaron. Las conexiones derivadas
permitieron utilizar la base nueva sin copiar sus datos manualmente.

Se verificaron /health, registro, login y persistencia de un proyecto
después de recargar el frontend, también después de recrear el entorno.
La recreación recupera la configuración, no los datos anteriores.

QA y PROD conservaron su funcionamiento y datos. La aparente ausencia
de un proyecto en QA se debía a ingresar con otra cuenta; se comprobó
su existencia y propietario mediante una consulta de solo lectura.

Al finalizar se destruyó preprod. Su configuración permanece disponible
para volver a crearlo y realizar la demostración en la defensa.

## 3. Uso de Inteligencia Artificial

Se utilizó ChatGPT para interpretar la consigna, adaptar el HCL a la
aplicación Go y React con Nginx, explicar los planes, diagnosticar errores
y asistir en la redacción de esta documentación.

Las propuestas se verificaron mediante terraform fmt, validate, plan,
apply y destroy, consultas en Neon, respuestas HTTP y pruebas manuales
de la aplicación. Se comprobaron idempotencia, detección y reparación
de drift, protección contra destrucción y recreación del entorno.
