# DL FINANZAS

App web (PWA) de control de ingresos, gastos y presupuesto mensual del hogar.
Desarrollada por **DL COMPANY -TECHNOLOGY-**.

## Funciones
- Resumen mensual: balance, tasa de ahorro, ingresos, gastos fijos y variables, comparación con el mes anterior.
- Distribución de gastos por categoría, semáforo de topes y tendencia de 6 meses.
- Registrar, editar y eliminar movimientos; búsqueda y filtros; categorías personalizadas.
- Copiar los ingresos y gastos fijos del mes anterior.
- Tema claro y oscuro.
- Exportar a Excel (.csv), respaldo y restauración (.json).
- Instalable en Android/iPhone (botón “Descargar app”) y funciona sin conexión.
- Guía interactiva con voz (primer ingreso y desde el menú).
- Soporte por WhatsApp desde la app y la pantalla de ingreso.
- Registro con nombre de usuario, correo y contraseña (o Google).
- Saludo personalizado según la hora (buenos días / tardes / noches) con accesos rápidos para registrar ingresos y gastos.
- Cambiar el nombre y eliminar la cuenta con todos sus datos desde el menú.
- Planes Gratis (15 movimientos/mes, datos solo en el dispositivo), Pro ($20.000, oferta $10.000, 50 movimientos/mes y nube) y Premium ($40.000, oferta $20.000, ilimitado). El pago se coordina por WhatsApp y el administrador (d.l.company.2026@gmail.com) activa el plan desde el **Panel de administrador** del menú.

## Modos de almacenamiento
| Modo | Cuándo | Dónde quedan los datos |
|---|---|---|
| Local | `firebase-config.js` en `null` | En el navegador del dispositivo |
| Nube (actual) | `firebase-config.js` con la configuración de Firebase | Firestore, sincronizado entre dispositivos, con login por correo o Google |

Al pasar a modo nube, la app ofrece subir automáticamente los datos que el usuario tenía en el dispositivo.

## Configuración de Firebase (proyecto `dl-finanzas`)
1. Crear el proyecto `dl-finanzas` en la consola de Firebase y registrar una app web.
2. Pegar el bloque `firebaseConfig` en `firebase-config.js`.
3. Authentication → Método de acceso: activar **Correo/contraseña** y **Google**.
4. Authentication → Configuración → Dominios autorizados: agregar `dimelolenin7-ui.github.io`.
5. Firestore Database → crear base de datos → pestaña Reglas: pegar `firestore.rules` y publicar.

## Archivos
- `index.html` – la app completa.
- `legal.html` – Términos y condiciones y Política de privacidad.
- `firebase-config.js` – configuración de la nube.
- `firestore.rules` – reglas de seguridad de la base de datos.
- `logo.svg`, `icon-*.png`, `apple-touch-icon.png` – logo de la app.
- `dl-company.png` – logo oficial de DL COMPANY -TECHNOLOGY-.
- `sw.js`, `manifest.webmanifest` – instalación y uso sin conexión.
