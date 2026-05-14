import os
from datetime import datetime
from uuid import uuid4

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, create_engine, delete, func, select, update
from sqlalchemy.orm import Session, declarative_base, relationship, sessionmaker
from typing import List, Optional

app = FastAPI(
    title="Tienda Backend",
    description="Backend Python para la tienda de joyería de Angular.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Product(BaseModel):
    id: int
    sku: str
    nombre: str
    precio: int
    imagen: str
    badge: Optional[str] = None
    categoria: str
    material: str
    tipo: str
    precioAnterior: Optional[int] = None

class CartItem(BaseModel):
    id: int
    nombre: str
    precio: int
    cantidad: int
    sku: Optional[str] = None
    imagen: Optional[str] = None

class CartItemUpdate(BaseModel):
    cantidad: int = Field(..., ge=0)

class FavoriteItem(BaseModel):
    id: int
    nombre: str
    precio: int
    sku: Optional[str] = None
    imagen: Optional[str] = None

class Address(BaseModel):
    id: int
    nombre: str
    direccion: str
    ciudad: str
    telefono: str
    principal: bool = False

class PaymentMethod(BaseModel):
    id: int
    tipo: str
    marca: str
    ultimosDigitos: str
    expira: str
    principal: bool = False

class OrderProduct(BaseModel):
    nombre: str
    precio: int
    cantidad: int

class Order(BaseModel):
    id: str
    fecha: str
    estado: str
    total: int
    items: int
    productos: List[OrderProduct]

class Profile(BaseModel):
    nombre: str
    email: str
    telefono: str
    fechaNacimiento: str
    genero: str

class OrderCreate(BaseModel):
    cart: List[CartItem]
    address_id: int
    payment_id: int
    profile: Optional[Profile] = None

store = {
    "products": [
        {
            "id": 1,
            "sku": "LJ-ANIL-001",
            "nombre": "Anillo Esmeralda Trapiche",
            "precio": 299000,
            "precioAnterior": 399000,
            "imagen": "assets/img/productos/anillo-esmeralda-trapiche.jpg",
            "badge": "🔥 Más Vendido",
            "categoria": "Anillos",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 9,
            "sku": "LJ-ANIL-002",
            "nombre": "Anillo Diamante Solitario",
            "precio": 245000,
            "imagen": "assets/img/productos/anillo-diamante-solitario.jpg",
            "badge": "⭐ Destacado",
            "categoria": "Anillos",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 10,
            "sku": "LJ-ANIL-003",
            "nombre": "Anillo Zafiro Celeste",
            "precio": 199000,
            "precioAnterior": 259000,
            "imagen": "assets/img/productos/anillo-zafiro-celeste.jpg",
            "badge": "❤️ Favorito",
            "categoria": "Anillos",
            "material": "Plata",
            "tipo": "Elegante"
        },
        {
            "id": 11,
            "sku": "LJ-ANIL-004",
            "nombre": "Anillo Rubí Colombiano",
            "precio": 175000,
            "imagen": "assets/img/productos/anillo-rubi-colombiano.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Anillos",
            "material": "Oro Rosa",
            "tipo": "Romántico"
        },
        {
            "id": 12,
            "sku": "LJ-ANIL-005",
            "nombre": "Anillo Esmeralda Ovalada",
            "precio": 159000,
            "imagen": "assets/img/productos/anillo-esmeralda-ovalada.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Anillos",
            "material": "Oro",
            "tipo": "Clásico"
        },
        {
            "id": 13,
            "sku": "LJ-ANIL-006",
            "nombre": "Anillo Topacio Imperial",
            "precio": 135000,
            "imagen": "assets/img/productos/anillo-topacio-imperial.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Anillos",
            "material": "Plata",
            "tipo": "Moderno"
        },
        {
            "id": 2,
            "sku": "LJ-COLL-001",
            "nombre": "Collar Esmeralda Cholita",
            "precio": 189000,
            "precioAnterior": 249000,
            "imagen": "assets/img/productos/collar-esmeralda-cholita.jpg",
            "badge": "⭐ Destacado",
            "categoria": "Collares",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 14,
            "sku": "LJ-COLL-002",
            "nombre": "Collar Perlas del Pacífico",
            "precio": 165000,
            "precioAnterior": 219000,
            "imagen": "assets/img/productos/collar-perlas-del-pacifico.pjg.webp",
            "badge": "❤️ Favorito",
            "categoria": "Collares",
            "material": "Perlas",
            "tipo": "Elegante"
        },
        {
            "id": 15,
            "sku": "LJ-COLL-003",
            "nombre": "Collar Corazón Brillante",
            "precio": 129000,
            "imagen": "assets/img/productos/corazon-brillante.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Collares",
            "material": "Oro",
            "tipo": "Romántico"
        },
        {
            "id": 16,
            "sku": "LJ-COLL-004",
            "nombre": "Collar Cadena Fina",
            "precio": 89000,
            "imagen": "assets/img/productos/collar-cadena-fina.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Collares",
            "material": "Plata",
            "tipo": "Minimalista"
        },
        {
            "id": 17,
            "sku": "LJ-COLL-005",
            "nombre": "Collar Esmeralda Marquis",
            "precio": 145000,
            "precioAnterior": 189000,
            "imagen": "assets/img/productos/collar-esmeralda-marquis.pjg.webp",
            "badge": "🏆 Premium",
            "categoria": "Collares",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 18,
            "sku": "LJ-COLL-006",
            "nombre": "Collar Lazo de Oro",
            "precio": 99000,
            "imagen": "assets/img/productos/collar-lazo-de-oro.pjg.webp",
            "badge": "✨ Nuevo",
            "categoria": "Collares",
            "material": "Oro",
            "tipo": "Moderno"
        },
        {
            "id": 3,
            "sku": "LJ-PULS-001",
            "nombre": "Pulsera Brazalete Esmeralda",
            "precio": 149000,
            "precioAnterior": 199000,
            "imagen": "assets/img/productos/pulsera-brazalete-esmeralda.jpg",
            "badge": "❤️ Favorito",
            "categoria": "Pulseras",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 19,
            "sku": "LJ-PULS-002",
            "nombre": "Pulsera Cadena Torino",
            "precio": 289000,
            "precioAnterior": 359000,
            "imagen": "assets/img/productos/pulsera-brazalete-torino.jpg",
            "badge": "🏆 Premium",
            "categoria": "Pulseras",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 20,
            "sku": "LJ-PULS-003",
            "nombre": "Pulsera Charm Esmeralda",
            "precio": 79000,
            "imagen": "assets/img/productos/pulsera.charm-esmerlda.pjg.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Pulseras",
            "material": "Oro Rosa",
            "tipo": "Delicado"
        },
        {
            "id": 21,
            "sku": "LJ-PULS-004",
            "nombre": "Pulsera Infinito",
            "precio": 95000,
            "imagen": "assets/img/productos/pulsera-infinito.pjg.webp",
            "badge": "✨ Nuevo",
            "categoria": "Pulseras",
            "material": "Plata",
            "tipo": "Moderno"
        },
        {
            "id": 22,
            "sku": "LJ-PULS-005",
            "nombre": "Pulsera Perlas Barroquas",
            "precio": 159000,
            "imagen": "assets/img/productos/pulsera-perlas-barroquas.pjg.webp",
            "badge": "⭐ Destacado",
            "categoria": "Pulseras",
            "material": "Perlas",
            "tipo": "Elegante"
        },
        {
            "id": 23,
            "sku": "LJ-PULS-006",
            "nombre": "Pulsera Cuero Artesanal",
            "precio": 65000,
            "imagen": "assets/img/productos/pulsera-cuero-artesanal.pjg.webp",
            "badge": "✨ Nuevo",
            "categoria": "Pulseras",
            "material": "Cuero",
            "tipo": "Casual"
        },
        {
            "id": 5,
            "sku": "LJ-ARET-001",
            "nombre": "Aretes Esmeralda Drops",
            "precio": 79000,
            "imagen": "assets/img/productos/aretes-esmeralda-drop.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Aretes",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 24,
            "sku": "LJ-ARET-002",
            "nombre": "Aretes Argolla Colombiana",
            "precio": 119000,
            "precioAnterior": 159000,
            "imagen": "assets/img/productos/aretes-argolla-colombiana.pjg.webp",
            "badge": "🔥 Más Vendido",
            "categoria": "Aretes",
            "material": "Oro",
            "tipo": "Clásico"
        },
        {
            "id": 25,
            "sku": "LJ-ARET-003",
            "nombre": "Aretes Perla Graduada",
            "precio": 99000,
            "imagen": "assets/img/productos/aretes-perla-graduada.pjg.webp",
            "badge": "⭐ Destacado",
            "categoria": "Aretes",
            "material": "Perlas",
            "tipo": "Elegante"
        },
        {
            "id": 26,
            "sku": "LJ-ARET-004",
            "nombre": "Aretes Diamante Finos",
            "precio": 189000,
            "precioAnterior": 249000,
            "imagen": "assets/img/productos/aretes-diamante-fino.pjg.png",
            "badge": "🏆 Premium",
            "categoria": "Aretes",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 27,
            "sku": "LJ-ARET-005",
            "nombre": "Aretes Lazo Rosa",
            "precio": 55000,
            "imagen": "assets/img/productos/aretes-lazo-rosa.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Aretes",
            "material": "Oro Rosa",
            "tipo": "Delicado"
        },
        {
            "id": 28,
            "sku": "LJ-ARET-006",
            "nombre": "Aretes Chandelier",
            "precio": 45000,
            "imagen": "assets/img/productos/aretes-chandelier.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Aretes",
            "material": "Plata",
            "tipo": "Elegante"
        },
        {
            "id": 4,
            "sku": "LJ-RELO-001",
            "nombre": "Reloj Colombiano Luxury",
            "precio": 459000,
            "precioAnterior": 599000,
            "imagen": "assets/img/productos/reloj-luxury-colombiano.jpg",
            "badge": "🏆 Premium",
            "categoria": "Relojes",
            "material": "Acero",
            "tipo": "Lujo"
        },
        {
            "id": 29,
            "sku": "LJ-RELO-002",
            "nombre": "Reloj Rose Gold Dame",
            "precio": 289000,
            "precioAnterior": 349000,
            "imagen": "assets/img/productos/reloj-rose-dame-dame.jpg",
            "badge": "❤️ Favorito",
            "categoria": "Relojes",
            "material": "Oro Rosa",
            "tipo": "Elegante"
        },
        {
            "id": 30,
            "sku": "LJ-RELO-003",
            "nombre": "Reloj Minimalista",
            "precio": 199000,
            "imagen": "assets/img/productos/reloj-minimalista.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Relojes",
            "material": "Cuero",
            "tipo": "Moderno"
        },
        {
            "id": 31,
            "sku": "LJ-RELO-004",
            "nombre": "Reloj Inteligente Pro",
            "precio": 329000,
            "imagen": "assets/img/productos/reloj-inteligente-pro.jpg",
            "badge": "🏆 Premium",
            "categoria": "Relojes",
            "material": "Acero",
            "tipo": "Moderno"
        },
        {
            "id": 32,
            "sku": "LJ-RELO-005",
            "nombre": "Reloj Clásico Dama",
            "precio": 245000,
            "imagen": "assets/img/productos/reloj-clasico-dama.pjg.webp",
            "badge": "⭐ Destacado",
            "categoria": "Relojes",
            "material": "Oro",
            "tipo": "Clásico"
        },
        {
            "id": 6,
            "sku": "LJ-DIJE-001",
            "nombre": "Dije Esmeralda Corazón",
            "precio": 55000,
            "imagen": "assets/img/productos/dije-esmeralda-corazon.pjg.webp",
            "badge": "✨ Nuevo",
            "categoria": "Dijes",
            "material": "Oro",
            "tipo": "Romántico"
        },
        {
            "id": 33,
            "sku": "LJ-DIJE-002",
            "nombre": "Dije Cruz Esmeralda",
            "precio": 45000,
            "imagen": "assets/img/productos/dije-cruz-esmeralda.jpg",
            "badge": "❤️ Favorito",
            "categoria": "Dijes",
            "material": "Oro",
            "tipo": "Elegante"
        },
        {
            "id": 34,
            "sku": "LJ-DIJE-003",
            "nombre": "Dije Corazón Piedra",
            "precio": 65000,
            "imagen": "assets/img/productos/dije-corazon-piedra.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Dijes",
            "material": "Plata",
            "tipo": "Romántico"
        },
        {
            "id": 35,
            "sku": "LJ-DIJE-004",
            "nombre": "Dije Estrella Luna",
            "precio": 39000,
            "imagen": "assets/img/productos/dije-estrella-luna.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Dijes",
            "material": "Plata",
            "tipo": "Moderno"
        },
        {
            "id": 36,
            "sku": "LJ-DIJE-005",
            "nombre": "Dije Infinito Rosa",
            "precio": 49000,
            "imagen": "assets/img/productos/dije-infinito-rosa.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Dijes",
            "material": "Oro Rosa",
            "tipo": "Delicado"
        },
        {
            "id": 7,
            "sku": "LJ-CHAR-001",
            "nombre": "Charm Esmeralda Mina",
            "precio": 45000,
            "imagen": "assets/img/productos/charm-esmeralda-mina.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Charms",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 37,
            "sku": "LJ-CHAR-002",
            "nombre": "Charm Flor Loto",
            "precio": 35000,
            "imagen": "assets/img/productos/charm-flor-loto.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Charms",
            "material": "Plata",
            "tipo": "Delicado"
        },
        {
            "id": 38,
            "sku": "LJ-CHAR-003",
            "nombre": "Charm Corona Real",
            "precio": 55000,
            "imagen": "assets/img/productos/charm-corona-real.pjg.webp",
            "badge": "🏆 Premium",
            "categoria": "Charms",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 39,
            "sku": "LJ-CHAR-004",
            "nombre": "Charm Mariposa",
            "precio": 39000,
            "imagen": "assets/img/productos/charm-mariposa.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Charms",
            "material": "Oro Rosa",
            "tipo": "Romántico"
        },
        {
            "id": 40,
            "sku": "LJ-CHAR-005",
            "nombre": "Charm Corazón",
            "precio": 42000,
            "imagen": "assets/img/productos/charm-corazon.jpg",
            "badge": "❤️ Favorito",
            "categoria": "Charms",
            "material": "Plata",
            "tipo": "Romántico"
        },
        {
            "id": 8,
            "sku": "LJ-SETS-001",
            "nombre": "Set Esmeralda Novia",
            "precio": 389000,
            "imagen": "assets/img/productos/set-esmeralda-novia.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Sets",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 41,
            "sku": "LJ-SETS-002",
            "nombre": "Set Perla Graduada",
            "precio": 249000,
            "precioAnterior": 319000,
            "imagen": "assets/img/productos/set-perla-graduada.jpg",
            "badge": "⭐ Destacado",
            "categoria": "Sets",
            "material": "Perlas",
            "tipo": "Elegante"
        },
        {
            "id": 42,
            "sku": "LJ-SETS-003",
            "nombre": "Set Diamante Princess",
            "precio": 299000,
            "imagen": "assets/img/productos/set-diamante-princess.jpg",
            "badge": "🔥 Más Vendido",
            "categoria": "Sets",
            "material": "Oro",
            "tipo": "Lujo"
        },
        {
            "id": 43,
            "sku": "LJ-SETS-004",
            "nombre": "Set Cadena Bohemia",
            "precio": 159000,
            "imagen": "assets/img/productos/set-cadena-bohemia.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Sets",
            "material": "Plata",
            "tipo": "Moderno"
        },
        {
            "id": 44,
            "sku": "LJ-SETS-005",
            "nombre": "Set Pulsera Rosa",
            "precio": 179000,
            "imagen": "assets/img/productos/set-pulsera-rosa.jpg",
            "badge": "✨ Nuevo",
            "categoria": "Sets",
            "material": "Oro Rosa",
            "tipo": "Romántico"
        }
    ],
    "cart": [],
    "favorites": [],
    "profile": {
        "nombre": "María García",
        "email": "maria.garcia@email.com",
        "telefono": "300 123 4567",
        "fechaNacimiento": "15/05/1990",
        "genero": "Femenino"
    },
    "addresses": [
        {
            "id": 1,
            "nombre": "Casa",
            "direccion": "Calle 123 #45-67",
            "ciudad": "Bogotá",
            "telefono": "300 123 4567",
            "principal": True
        },
        {
            "id": 2,
            "nombre": "Trabajo",
            "direccion": "Carrera 7 #65-21",
            "ciudad": "Bogotá",
            "telefono": "301 987 6543",
            "principal": False
        }
    ],
    "payments": [
        {
            "id": 1,
            "tipo": "Tarjeta",
            "marca": "Visa",
            "ultimosDigitos": "4242",
            "expira": "12/26",
            "principal": True
        },
        {
            "id": 2,
            "tipo": "Tarjeta",
            "marca": "Mastercard",
            "ultimosDigitos": "8888",
            "expira": "08/25",
            "principal": False
        }
    ],
    "orders": [
        {
            "id": "PED-2024-001",
            "fecha": "15 Mar 2024",
            "estado": "Entregado",
            "total": 299000,
            "items": 1,
            "productos": [
                {"nombre": "Anillo Esmeralda Trapiche", "precio": 299000, "cantidad": 1}
            ]
        },
        {
            "id": "PED-2024-002",
            "fecha": "20 Mar 2024",
            "estado": "Enviado",
            "total": 378000,
            "items": 2,
            "productos": [
                {"nombre": "Collar Esmeralda Cholita", "precio": 189000, "cantidad": 2}
            ]
        }
    ]
}

DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "sqlite:///./tienda.db"
)
USER_ID = 1

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

class ProductDB(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, nullable=False)
    nombre = Column(String, nullable=False)
    precio = Column(Integer, nullable=False)
    imagen = Column(String, nullable=False)
    badge = Column(String, nullable=True)
    categoria = Column(String, nullable=False)
    material = Column(String, nullable=False)
    tipo = Column(String, nullable=False)
    precioAnterior = Column(Integer, nullable=True)

class CartItemDB(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    nombre = Column(String, nullable=False)
    precio = Column(Integer, nullable=False)
    cantidad = Column(Integer, nullable=False)
    sku = Column(String, nullable=True)
    imagen = Column(String, nullable=True)

class FavoriteItemDB(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    nombre = Column(String, nullable=False)
    precio = Column(Integer, nullable=False)
    sku = Column(String, nullable=True)
    imagen = Column(String, nullable=True)

class AddressDB(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    nombre = Column(String, nullable=False)
    direccion = Column(String, nullable=False)
    ciudad = Column(String, nullable=False)
    telefono = Column(String, nullable=False)
    principal = Column(Boolean, default=False)

class PaymentMethodDB(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    tipo = Column(String, nullable=False)
    marca = Column(String, nullable=False)
    ultimosDigitos = Column(String, nullable=False)
    expira = Column(String, nullable=False)
    principal = Column(Boolean, default=False)

class OrderDB(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    fecha = Column(String, nullable=False)
    estado = Column(String, nullable=False)
    total = Column(Integer, nullable=False)
    items = Column(Integer, nullable=False)
    productos = relationship("OrderProductDB", back_populates="order", cascade="all, delete-orphan")

class OrderProductDB(Base):
    __tablename__ = "order_products"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    nombre = Column(String, nullable=False)
    precio = Column(Integer, nullable=False)
    cantidad = Column(Integer, nullable=False)
    order = relationship("OrderDB", back_populates="productos")

class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    password = Column(String, nullable=False)
    telefono = Column(String, nullable=False, default='')
    fechaNacimiento = Column(String, nullable=False, default='')
    genero = Column(String, nullable=False, default='')
    token = Column(String, nullable=True, unique=True, index=True)

class ProfileDB(Base):
    __tablename__ = "profiles"

    user_id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, nullable=False)
    telefono = Column(String, nullable=False)
    fechaNacimiento = Column(String, nullable=False)
    genero = Column(String, nullable=False)


class ConfigOrmMixin:
    class Config:
        orm_mode = True

class AuthRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    nombre: str
    email: str
    password: str
    confirmPassword: str

class AuthResponse(BaseModel):
    token: str
    profile: Profile

class Product(BaseModel, ConfigOrmMixin):
    id: int
    sku: str
    nombre: str
    precio: int
    imagen: str
    badge: Optional[str] = None
    categoria: str
    material: str
    tipo: str
    precioAnterior: Optional[int] = None

class CartItem(BaseModel, ConfigOrmMixin):
    id: int
    nombre: str
    precio: int
    cantidad: int
    sku: Optional[str] = None
    imagen: Optional[str] = None

class CartItemUpdate(BaseModel):
    cantidad: int = Field(..., ge=0)

class FavoriteItem(BaseModel, ConfigOrmMixin):
    id: int
    nombre: str
    precio: int
    sku: Optional[str] = None
    imagen: Optional[str] = None

class Address(BaseModel, ConfigOrmMixin):
    id: int
    nombre: str
    direccion: str
    ciudad: str
    telefono: str
    principal: bool = False

class PaymentMethod(BaseModel, ConfigOrmMixin):
    id: int
    tipo: str
    marca: str
    ultimosDigitos: str
    expira: str
    principal: bool = False

class OrderProduct(BaseModel, ConfigOrmMixin):
    nombre: str
    precio: int
    cantidad: int

class Order(BaseModel, ConfigOrmMixin):
    id: str
    fecha: str
    estado: str
    total: int
    items: int
    productos: List[OrderProduct]

class Profile(BaseModel, ConfigOrmMixin):
    nombre: str
    email: str
    telefono: str
    fechaNacimiento: str
    genero: str

class OrderCreate(BaseModel):
    cart: List[CartItem]
    address_id: int
    payment_id: int
    profile: Optional[Profile] = None


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def generate_token() -> str:
    return str(uuid4())


def seed_database(db: Session) -> None:
    product_count = db.scalar(select(func.count()).select_from(ProductDB))
    if product_count == 0:
        for product in store["products"]:
            db.add(ProductDB(**product))

    user_count = db.scalar(select(func.count()).select_from(UserDB))
    if user_count == 0:
        db.add(UserDB(
            nombre=store["profile"]["nombre"],
            email=store["profile"]["email"],
            password='Luxe1234',
            telefono=store["profile"]["telefono"],
            fechaNacimiento=store["profile"]["fechaNacimiento"],
            genero=store["profile"]["genero"],
            token=generate_token()
        ))

    profile_count = db.scalar(select(func.count()).select_from(ProfileDB))
    if profile_count == 0:
        db.add(ProfileDB(user_id=USER_ID, **store["profile"]))

    address_count = db.scalar(select(func.count()).select_from(AddressDB))
    if address_count == 0:
        for address in store["addresses"]:
            db.add(AddressDB(user_id=USER_ID, **address))

    payment_count = db.scalar(select(func.count()).select_from(PaymentMethodDB))
    if payment_count == 0:
        for payment in store["payments"]:
            db.add(PaymentMethodDB(user_id=USER_ID, **payment))

    order_count = db.scalar(select(func.count()).select_from(OrderDB))
    if order_count == 0:
        for order_data in store["orders"]:
            order_db = OrderDB(
                id=order_data["id"],
                user_id=USER_ID,
                fecha=order_data["fecha"],
                estado=order_data["estado"],
                total=order_data["total"],
                items=order_data["items"],
            )
            db.add(order_db)
            db.flush()
            for item in order_data["productos"]:
                db.add(OrderProductDB(order_id=order_db.id, **item))

    db.commit()


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()

@app.get("/health")
def health() -> dict:
    return {"status": "ok"}

@app.post("/auth/register", response_model=AuthResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)) -> AuthResponse:
    email = payload.email.strip().lower()
    if payload.password != payload.confirmPassword:
        raise HTTPException(status_code=400, detail="Las contraseñas no coinciden")

    existing_user = db.scalar(select(UserDB).where(UserDB.email == email))
    if existing_user:
        raise HTTPException(status_code=400, detail="Ya existe una cuenta con ese correo electrónico")

    token = generate_token()
    user = UserDB(
        nombre=payload.nombre.strip(),
        email=email,
        password=payload.password,
        telefono='',
        fechaNacimiento='',
        genero='',
        token=token
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return AuthResponse(
        token=user.token,
        profile=Profile(
            nombre=user.nombre,
            email=user.email,
            telefono=user.telefono,
            fechaNacimiento=user.fechaNacimiento,
            genero=user.genero
        )
    )

@app.post("/auth/login", response_model=AuthResponse)
def login(payload: AuthRequest, db: Session = Depends(get_db)) -> AuthResponse:
    email = payload.email.strip().lower()
    user = db.scalar(select(UserDB).where(UserDB.email == email, UserDB.password == payload.password))
    if not user:
        raise HTTPException(status_code=401, detail="Email o contraseña inválidos")

    if not user.token:
        user.token = generate_token()
        db.commit()
        db.refresh(user)

    return AuthResponse(
        token=user.token,
        profile=Profile(
            nombre=user.nombre,
            email=user.email,
            telefono=user.telefono,
            fechaNacimiento=user.fechaNacimiento,
            genero=user.genero
        )
    )

@app.get("/products", response_model=List[Product])
def list_products(db: Session = Depends(get_db)) -> List[Product]:
    return db.scalars(select(ProductDB).order_by(ProductDB.id)).all()

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)) -> Product:
    product = db.get(ProductDB, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product

@app.get("/cart", response_model=List[CartItem])
def get_cart(db: Session = Depends(get_db)) -> List[CartItem]:
    return db.scalars(select(CartItemDB).where(CartItemDB.user_id == USER_ID).order_by(CartItemDB.id)).all()

@app.post("/cart", response_model=List[CartItem])
def add_to_cart(item: CartItem, db: Session = Depends(get_db)) -> List[CartItem]:
    existing = db.scalars(
        select(CartItemDB).where(CartItemDB.user_id == USER_ID, CartItemDB.id == item.id)
    ).first()
    if existing:
        existing.cantidad += item.cantidad
    else:
        db.add(CartItemDB(user_id=USER_ID, **item.dict()))
    db.commit()
    return get_cart(db)

@app.patch("/cart/{product_id}", response_model=List[CartItem])
def update_cart_item(product_id: int, update: CartItemUpdate, db: Session = Depends(get_db)) -> List[CartItem]:
    item = db.scalars(
        select(CartItemDB).where(CartItemDB.user_id == USER_ID, CartItemDB.id == product_id)
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Artículo del carrito no encontrado")
    if update.cantidad <= 0:
        db.execute(delete(CartItemDB).where(CartItemDB.user_id == USER_ID, CartItemDB.id == product_id))
    else:
        item.cantidad = update.cantidad
    db.commit()
    return get_cart(db)

@app.delete("/cart/{product_id}", response_model=List[CartItem])
def delete_cart_item(product_id: int, db: Session = Depends(get_db)) -> List[CartItem]:
    db.execute(delete(CartItemDB).where(CartItemDB.user_id == USER_ID, CartItemDB.id == product_id))
    db.commit()
    return get_cart(db)

@app.delete("/cart", response_model=List[CartItem])
def clear_cart(db: Session = Depends(get_db)) -> List[CartItem]:
    db.execute(delete(CartItemDB).where(CartItemDB.user_id == USER_ID))
    db.commit()
    return []

@app.get("/favorites", response_model=List[FavoriteItem])
def get_favorites(db: Session = Depends(get_db)) -> List[FavoriteItem]:
    return db.scalars(select(FavoriteItemDB).where(FavoriteItemDB.user_id == USER_ID).order_by(FavoriteItemDB.id)).all()

@app.post("/favorites", response_model=List[FavoriteItem])
def add_favorite(item: FavoriteItem, db: Session = Depends(get_db)) -> List[FavoriteItem]:
    existing = db.scalars(
        select(FavoriteItemDB).where(FavoriteItemDB.user_id == USER_ID, FavoriteItemDB.id == item.id)
    ).first()
    if not existing:
        db.add(FavoriteItemDB(user_id=USER_ID, **item.dict()))
        db.commit()
    return get_favorites(db)

@app.delete("/favorites/{product_id}", response_model=List[FavoriteItem])
def delete_favorite(product_id: int, db: Session = Depends(get_db)) -> List[FavoriteItem]:
    db.execute(delete(FavoriteItemDB).where(FavoriteItemDB.user_id == USER_ID, FavoriteItemDB.id == product_id))
    db.commit()
    return get_favorites(db)

@app.get("/profile", response_model=Profile)
def get_profile(db: Session = Depends(get_db)) -> Profile:
    profile = db.get(ProfileDB, USER_ID)
    if not profile:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return profile

@app.put("/profile", response_model=Profile)
def update_profile(profile: Profile, db: Session = Depends(get_db)) -> Profile:
    existing = db.get(ProfileDB, USER_ID)
    if existing:
        existing.nombre = profile.nombre
        existing.email = profile.email
        existing.telefono = profile.telefono
        existing.fechaNacimiento = profile.fechaNacimiento
        existing.genero = profile.genero
    else:
        db.add(ProfileDB(user_id=USER_ID, **profile.dict()))
    db.commit()
    return profile

@app.get("/addresses", response_model=List[Address])
def get_addresses(db: Session = Depends(get_db)) -> List[Address]:
    return db.scalars(select(AddressDB).where(AddressDB.user_id == USER_ID).order_by(AddressDB.id)).all()

@app.post("/addresses", response_model=List[Address])
def create_address(address: Address, db: Session = Depends(get_db)) -> List[Address]:
    existing = db.scalars(
        select(AddressDB).where(AddressDB.user_id == USER_ID, AddressDB.id == address.id)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="La dirección ya existe")
    
    if address.principal:
        db.execute(
            update(AddressDB).where(AddressDB.user_id == USER_ID).values(principal=False)
        )
        
    db.add(AddressDB(user_id=USER_ID, **address.dict()))
    db.commit()
    return get_addresses(db)

@app.put("/addresses/{address_id}", response_model=Address)
def update_address(address_id: int, address: Address, db: Session = Depends(get_db)) -> Address:
    existing = db.scalars(
        select(AddressDB).where(AddressDB.user_id == USER_ID, AddressDB.id == address_id)
    ).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Dirección no encontrada")
        
    if address.principal and not existing.principal:
        db.execute(
            update(AddressDB).where(AddressDB.user_id == USER_ID).values(principal=False)
        )
        
    existing.nombre = address.nombre
    existing.direccion = address.direccion
    existing.ciudad = address.ciudad
    existing.telefono = address.telefono
    existing.principal = address.principal
    db.commit()
    return address

@app.delete("/addresses/{address_id}", response_model=List[Address])
def delete_address(address_id: int, db: Session = Depends(get_db)) -> List[Address]:
    db.execute(delete(AddressDB).where(AddressDB.user_id == USER_ID, AddressDB.id == address_id))
    db.commit()
    return get_addresses(db)

@app.get("/payments", response_model=List[PaymentMethod])
def get_payments(db: Session = Depends(get_db)) -> List[PaymentMethod]:
    return db.scalars(select(PaymentMethodDB).where(PaymentMethodDB.user_id == USER_ID).order_by(PaymentMethodDB.id)).all()

@app.post("/payments", response_model=List[PaymentMethod])
def create_payment(payment: PaymentMethod, db: Session = Depends(get_db)) -> List[PaymentMethod]:
    existing = db.scalars(
        select(PaymentMethodDB).where(PaymentMethodDB.user_id == USER_ID, PaymentMethodDB.id == payment.id)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="El método de pago ya existe")
        
    if payment.principal:
        db.execute(
            update(PaymentMethodDB).where(PaymentMethodDB.user_id == USER_ID).values(principal=False)
        )
        
    db.add(PaymentMethodDB(user_id=USER_ID, **payment.dict()))
    db.commit()
    return get_payments(db)

@app.put("/payments/{payment_id}", response_model=PaymentMethod)
def update_payment(payment_id: int, payment: PaymentMethod, db: Session = Depends(get_db)) -> PaymentMethod:
    existing = db.scalars(
        select(PaymentMethodDB).where(PaymentMethodDB.user_id == USER_ID, PaymentMethodDB.id == payment_id)
    ).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Método de pago no encontrado")
        
    if payment.principal and not existing.principal:
        db.execute(
            update(PaymentMethodDB).where(PaymentMethodDB.user_id == USER_ID).values(principal=False)
        )
        
    existing.tipo = payment.tipo
    existing.marca = payment.marca
    existing.ultimosDigitos = payment.ultimosDigitos
    existing.expira = payment.expira
    existing.principal = payment.principal
    db.commit()
    return payment

@app.delete("/payments/{payment_id}", response_model=List[PaymentMethod])
def delete_payment(payment_id: int, db: Session = Depends(get_db)) -> List[PaymentMethod]:
    db.execute(delete(PaymentMethodDB).where(PaymentMethodDB.user_id == USER_ID, PaymentMethodDB.id == payment_id))
    db.commit()
    return get_payments(db)

@app.get("/orders", response_model=List[Order])
def get_orders(db: Session = Depends(get_db)) -> List[Order]:
    return db.scalars(select(OrderDB).where(OrderDB.user_id == USER_ID).order_by(OrderDB.id)).all()

@app.post("/orders", response_model=Order)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)) -> Order:
    if not payload.cart:
        raise HTTPException(status_code=400, detail="El carrito está vacío")

    address = db.scalars(
        select(AddressDB).where(AddressDB.user_id == USER_ID, AddressDB.id == payload.address_id)
    ).first()
    payment = db.scalars(
        select(PaymentMethodDB).where(PaymentMethodDB.user_id == USER_ID, PaymentMethodDB.id == payload.payment_id)
    ).first()
    if not address:
        raise HTTPException(status_code=404, detail="Dirección no encontrada")
    if not payment:
        raise HTTPException(status_code=404, detail="Método de pago no encontrado")

    total = sum(item.precio * item.cantidad for item in payload.cart)
    order_id = f"PED-{datetime.utcnow().year}-{str(uuid4()).upper()[:8]}"
    order_db = OrderDB(
        id=order_id,
        user_id=USER_ID,
        fecha=datetime.utcnow().strftime("%d %b %Y"),
        estado="Pendiente",
        total=total,
        items=sum(item.cantidad for item in payload.cart),
    )
    db.add(order_db)
    db.flush()
    for item in payload.cart:
        db.add(OrderProductDB(order_id=order_db.id, **item.dict()))

    db.execute(delete(CartItemDB).where(CartItemDB.user_id == USER_ID))

    if payload.profile:
        existing_profile = db.get(ProfileDB, USER_ID)
        if existing_profile:
            existing_profile.nombre = payload.profile.nombre
            existing_profile.email = payload.profile.email
            existing_profile.telefono = payload.profile.telefono
            existing_profile.fechaNacimiento = payload.profile.fechaNacimiento
            existing_profile.genero = payload.profile.genero
        else:
            db.add(ProfileDB(user_id=USER_ID, **payload.profile.dict()))

    db.commit()
    db.refresh(order_db)
    return order_db
