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
por lo que se configuró `push: false`. (Lo veremos en el TP5).

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
