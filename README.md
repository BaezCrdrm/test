# Schiller test

## Ejecución

### Descarga de proyectos

```bash
git clone https://github.com/BaezCrdrm/test.git
cd test
git submodule init
git submodule update
```

### Inicia pruebas (requiere docker)

```bash
docker-compose up --build -d
```

Navegar a http://localhost:8081 (puerto especificado en `docker-compose.yml`.
