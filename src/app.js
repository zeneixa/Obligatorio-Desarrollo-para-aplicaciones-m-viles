require("dotenv").config();
require("./utils/instrument.js");

const Sentry = require("@sentry/node");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectMongoDB = require("./models/mongo.client");
const connectToRedis = require("./services/redis.service");
const authMiddleWare = require("./middlewares/auth.middleware");
const sanitizeMiddleware = require("./middlewares/sanitizeMiddleware");
const payloadMiddleware = require("./middlewares/payload.middleware");
const logger = require("./utils/logger.js");

const {
  createEmpresaInmobiliariaController
} = require("./controllers/empresaInmobiliaria.controller");
const {
  createProveedorController
} = require("./controllers/proveedor.controller");
const {
  createEmpresaInmobiliariaSchema
} = require("./routes/validations/empresaInmobiliaria.validation");
const {
  createProveedorSchema
} = require("./routes/validations/proveedor.validation");

const publicRoutes = require("./routes/public.router");
const authRouter = require("./routes/auth.router");
const espaciosRoutes = require("./routes/espacios.router");
const membresiasRoutes = require("./routes/membresias.router");
const notificacionesRoutes = require("./routes/notificaciones.router");
const oficinasRoutes = require("./routes/oficinas.router");
const pagosRoutes = require("./routes/pagos.router");
const resenasRoutes = require("./routes/resenas.router");
const reservasRoutes = require("./routes/reservas.router");
const usuariosRoutes = require("./routes/usuarios.router");
const edificiosRoutes = require("./routes/edificios.router");
const salasReunionRoutes = require("./routes/salaReuniones.router");
const escritoriosFlexiblesRoutes = require("./routes/escritoriosFlexibles.router");
const serviciosAdicionalesRoutes = require("./routes/serviciosAdicionales.router");
const reservasServicioRoutes = require("./routes/reservasServicio.router");
const facturasRoutes = require("./routes/facturas.router");
const promocionesRoutes = require("./routes/promociones.router");
const disponibilidadesRoutes = require("./routes/disponibilidades.router");

const empresasInmobiliariasRoutes = require("./routes/empresaInmobiliarias.router");
const proveedoresRoutes = require("./routes/proveedores.router");

const app = express();

(async () => {
  try {
    await connectMongoDB();
    logger.info("Conexión a MongoDB establecida correctamente");
  } catch (error) {
    logger.sentryError({ message: "Error al conectarse a MongoDB:", error });
    process.exit(1);
  }
})();
(async () => {
  try {
    await connectToRedis();
    logger.info("Conexión a Redis establecida correctamente");
  } catch (error) {
    logger.error("Error al conectarse a Redis:", error);
    process.exit(1);
  }
})();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(sanitizeMiddleware);

app.use("/", publicRoutes);
app.use("/v1/auth", authRouter);

app.post(
  "/v1/empresas-inmobiliarias",
  payloadMiddleware(createEmpresaInmobiliariaSchema),
  createEmpresaInmobiliariaController
);

app.post(
  "/v1/proveedores",
  payloadMiddleware(createProveedorSchema),
  createProveedorController
);

app.use("/v1/empresas-inmobiliarias", empresasInmobiliariasRoutes);

app.use("/v1", authMiddleWare);

app.use("/v1", proveedoresRoutes);
app.use("/v1", espaciosRoutes);
app.use("/v1", membresiasRoutes);
app.use("/v1", notificacionesRoutes);
app.use("/v1", oficinasRoutes);
app.use("/v1", pagosRoutes);
app.use("/v1", resenasRoutes);
app.use("/v1", reservasRoutes);
app.use("/v1", usuariosRoutes);
app.use("/v1", edificiosRoutes);
app.use("/v1", salasReunionRoutes);
app.use("/v1", escritoriosFlexiblesRoutes);
app.use("/v1", serviciosAdicionalesRoutes);
app.use("/v1", reservasServicioRoutes);
app.use("/v1", facturasRoutes);
app.use("/v1", promocionesRoutes);
app.use("/v1", disponibilidadesRoutes);

app.get("/", (req, res) => res.send("🟢 API funcionando correctamente"));
app.get("/debug-sentry", (req, res) => { throw new Error("My first Sentry error!"); });
Sentry.setupExpressErrorHandler(app);

module.exports = app;
