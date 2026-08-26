# Evidencias — TP1

## 1. Push directo a main rechazado

![Push directo a main rechazado](img/push-rechazado.png)
GitHub rechaza el push directo porque la rama `main` está protegida y la protección también se aplica al administrador del repositorio.

## 2. Conflicto en el Pull Request

![Conflicto en Pull Request](img/conflicto-pr.png)

GitHub detecta que la rama `feature/titulo-b` no puede integrarse automáticamente con `main` porque ambas modificaron la misma línea del archivo `README.md`.

## 3. Marcadores del conflicto

![Marcadores del conflicto](img/marcadores-conflicto.png)

Se observan los marcadores `<<<<<<<`, `=======` y `>>>>>>>` que Git utiliza para indicar las dos versiones que están en conflicto.

## 4. Release v1.0.0 publicada

![Release v1.0.0](img/release-v1.0.0.png)

Se observa la release `v1.0.0` publicada a partir del tag correspondiente.
