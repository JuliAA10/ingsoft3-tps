# Decisiones — TP1

# 1. ¿Por qué Git no pudo resolver el conflicto solo?

Git no pudo resolver el conflicto automáticamente porque las ramas feature/titulo-a y feature/titulo-b modificaron la misma línea del archivo README.md, pero con contenidos diferentes. Luego de que la rama A fue integrada a main, al intentar integrar la rama B Git encontró dos versiones distintas para la misma línea y no podía determinar cuál de ellas era la correcta.

Por este motivo, Git marcó el conflicto y fue necesario resolverlo manualmente, decidiendo qué contenido debía quedar finalmente en el archivo y eliminando los marcadores de conflicto.

El conflicto no habría aparecido si las dos ramas hubieran modificado líneas o partes diferentes del archivo. También podría haberse evitado si la rama B se hubiera creado o actualizado después de integrar los cambios de la rama A, ya que en ese caso habría conocido previamente el nuevo estado de main.

# 2. Problemas encontrados y cómo los solucioné

Más que problema, no sabía que al crear el PR del titulo-a, tenía que volver para atrás y crear el PR del titulo-b, entonces pense que lo tenía que cambiar desde el VS.
Otro problema que tuve fue que no había eliminado la branch para el titulo-a, entonces tuve que ver a donde estaba y ahí pude eliminarla, ya que son descartables.
Por último, un problema fue que no sabía como subir las imagenes, pero lo pude solucionar creando la carpeta img en el repo y depositando ahí con nombre cada una de las capturas.

# 3. Declaración de uso de IA

En este TP, solo use la IA (ChatGPT) para la última parte, para que me arme bien qué poner en evidencias.md y en decisiones.md. Claramente controle que estuviera todo bien y claro, pero fue más por simplicidad que por otra cosa.
