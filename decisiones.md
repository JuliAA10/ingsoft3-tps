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
