const Joi = require("joi");

const createEdificioSchema = Joi.object({
  nombre: Joi.string().required(),
  direccion: Joi.object({
    calle: Joi.string().required(),
    numero: Joi.string().required(),
    ciudad: Joi.string().required(),
    codigoPostal: Joi.string().required(),
    pais: Joi.string().required(),
    coordenadas: Joi.object({
      lat: Joi.number(),
      lng: Joi.number()
    })
  }).required(),
  propietarioId: Joi.string(),
  empresaInmobiliariaId: Joi.string(),
  descripcion: Joi.string(),
  imagenes: Joi.array().items(Joi.string().uri()),
  planos: Joi.array().items(Joi.string().uri()),
  amenidades: Joi.array().items(
    Joi.object({
      tipo: Joi.string(),
      descripcion: Joi.string(),
      horario: Joi.string()
    })
  ),
  horario: Joi.object({
    apertura: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).default("09:00"),
    cierre: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).default("18:00"),
    diasOperacion: Joi.array().items(
      Joi.string().valid('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo')
    )
  }),
  accesibilidad: Joi.boolean().default(false),
  estacionamiento: Joi.boolean().default(false),
  activo: Joi.boolean().default(true)
});

const updateEdificioSchema = Joi.object({
  nombre: Joi.string(),
  direccion: Joi.object({
    calle: Joi.string(),
    numero: Joi.string(),
    ciudad: Joi.string(),
    codigoPostal: Joi.string(),
    pais: Joi.string(),
    coordenadas: Joi.object({
      lat: Joi.number(),
      lng: Joi.number()
    })
  }),
  propietarioId: Joi.string(),
  empresaInmobiliariaId: Joi.string(),
  descripcion: Joi.string(),
  imagenes: Joi.array().items(Joi.string().uri()),
  planos: Joi.array().items(Joi.string().uri()),
  amenidades: Joi.array().items(
    Joi.object({
      tipo: Joi.string(),
      descripcion: Joi.string(),
      horario: Joi.string()
    })
  ),
  horario: Joi.object({
    apertura: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    cierre: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    diasOperacion: Joi.array().items(
      Joi.string().valid('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo')
    )
  }),
  accesibilidad: Joi.boolean(),
  estacionamiento: Joi.boolean(),
  activo: Joi.boolean()
}).min(1);

const filtrarEdificiosSchema = Joi.object({
  ciudad: Joi.string(),
  pais: Joi.string(),
  propietarioId: Joi.string(),
  empresaInmobiliariaId: Joi.string(),
  amenidades: Joi.array().items(Joi.string()),
  accesibilidad: Joi.boolean(),
  estacionamiento: Joi.boolean(),
  activo: Joi.boolean()
});

module.exports = {
  createEdificioSchema,
  updateEdificioSchema,
  filtrarEdificiosSchema
};