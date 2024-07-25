# ✨Proyecto: SKATEPARK

## Descripción
Una aplicación completa para la gestión de eventos y participantes
1 usuarios pueden registrarse para participar, incluyendo datos y archivo de imagen
2 login de acceso participantes para edición de perfil
3 dashboard de administración para dar de alta participantes
4 vista pública de participantes y su estado de alta

## 🚀 Getting Started

```bash
git clone git@github.com:lvergaram/skatepark.git
```

crea una base de datos en postgres llamada **skatepark**

crea el archivo .env en el directorio raíz y configura las siguientes variables
```bash
PORT=3000

PGUSER="*****"
PGPASSWORD="*****"
PGHOST="*****"
PGPORT="*****"
PGDATABASE="skatepark"

JWT_SECRET="*****"
```

configura tu base de datos con la siguiente query inicial
```sql
DROP TABLE IF EXISTS skaters;
DROP TABLE IF EXISTS admins;

CREATE TABLE admins (
	id SERIAL PRIMARY KEY, 
	email VARCHAR(50) NOT NULL, 
	password VARCHAR(25) NOT NULL
);

CREATE TABLE skaters (
	id SERIAL PRIMARY KEY, 
	email VARCHAR(100) NOT NULL, 
	nombre VARCHAR(50) NOT NULL, 
	password VARCHAR(60) NOT NULL, 
	anos_experiencia INT NOT NULL, 
	especialidad VARCHAR(50) NOT NULL, 
	foto VARCHAR(255) NOT NULL DEFAULT 'SIN FOTO', 
	estado BOOLEAN NOT NULL DEFAULT FALSE
);

--DATOS SEMILLA
--	 administrador
INSERT INTO admins (email, password) VALUES
('admin@mail.com', 'admin123');

-- skaters
INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES
('juan.perez@mail.com', 'Juan Perez', 'password1', 5, 'Street', 'https://i.pravatar.cc/150?img=1', TRUE),
('ana.gomez@mail.com', 'Ana Gomez', 'password2', 3, 'Vert', 'https://i.pravatar.cc/150?img=2', FALSE),
('carlos.lopez@mail.com', 'Carlos Lopez', 'password3', 4, 'Freestyle', 'https://i.pravatar.cc/150?img=3', TRUE),
('luis.martinez@mail.com', 'Luis Martinez', 'password5', 2, 'Bowl', 'https://i.pravatar.cc/150?img=5', TRUE);

INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto) VALUES
('maria.fernandez@mail.com', 'Maria Fernandez', 'password4', 6, 'Park', 'https://i.pravatar.cc/150?img=4');
```

## 🛑 Accesos administrador
```
usuario: admin@mail.com
password: admin123

```

## 🛠️ Stack
- HTML, CSS & Javascript.
- Bootstrap
- Node
- Express
- Postres
- Handlebars

