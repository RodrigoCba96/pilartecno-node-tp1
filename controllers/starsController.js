import express from "express";
import Joi from "joi";

const router = express.Router();

const estrellas = [
 ];

router.get('/', (req, res) => {
  const { type } = req.query;
  let estrellasFiltradas = estrellas;

  if (type) {
    estrellasFiltradas = estrellas.filter((estrella) =>
      estrella.type.includes(type)
    );
  }

  res.status(200).json(estrellasFiltradas);
});

router.post('/', (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.array().items(Joi.string()).required(),
    type: Joi.string().required(),
    distancia: Joi.string().required(),
    mass: Joi.string().required(),
    radius: Joi.string().required(),
    temperature: Joi.string().required(),
    luminosity: Joi.string().required(),
    age: Joi.string().required(),
    composition: Joi.object({
      hydrogen: Joi.string().required(),
      helium: Joi.string().required(),
      otros_elementos: Joi.string().required(),
    }).required(),
    stellar_history: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: 'invalid_request',
      message: error.details[0].message,
    });
  } else {
    const nuevaEstrella = req.body;
    estrellas.push(nuevaEstrella);
    res.status(201).json({
      status: 'OK',
      message: 'Estrella creada correctamente',
    });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const estrellaEncontrada = estrellas.find(
    (estrella) => estrella.id === parseInt(id)
  );

  if (estrellaEncontrada) {
    res.status(200).json(estrellaEncontrada);
  } else {
    res.status(404).json({ error: 'Estrella no encontrada' });
  }
});

export default router;
