# Backend Python para Tienda

Este backend está implementado con FastAPI y provee una API REST para la tienda.

## Instalación

```bash
cd backend
python -m pip install -r requirements.txt
```

## Ejecutar servidor

Antes de iniciar, asegúrate de tener PostgreSQL instalado y una base de datos creada.

```bash
# Ejemplo con psql
createdb tienda
```

Configura la URL de conexión con la variable de entorno `DATABASE_URL`:

```bash
export DATABASE_URL="postgresql+psycopg2://usuario:contraseña@localhost:5432/tienda"
# En PowerShell:
# $env:DATABASE_URL = "postgresql+psycopg2://usuario:contraseña@localhost:5432/tienda"
```

Instala las dependencias y ejecuta el servidor:

```bash
cd backend
python -m pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

El backend inicializará las tablas y colocará los datos de ejemplo en PostgreSQL.

## Endpoints principales

- `GET /products`
- `GET /products/{product_id}`
- `GET /cart`
- `POST /cart`
- `PATCH /cart/{product_id}`
- `DELETE /cart/{product_id}`
- `DELETE /cart`
- `GET /favorites`
- `POST /favorites`
- `DELETE /favorites/{product_id}`
- `GET /profile`
- `PUT /profile`
- `GET /addresses`
- `POST /addresses`
- `PUT /addresses/{address_id}`
- `DELETE /addresses/{address_id}`
- `GET /payments`
- `POST /payments`
- `PUT /payments/{payment_id}`
- `DELETE /payments/{payment_id}`
- `GET /orders`
- `POST /orders`
