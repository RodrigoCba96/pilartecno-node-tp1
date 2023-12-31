import express from "express";
import Joi from "joi";
import starsController from './controllers/starsController.js';  
import starsRoutes from './routes/starsRoutes.js';

const app = express();
const PORT = 3000;

const estrellas = [
    {
        "id": 1,
        "name": ["Sirius"],
        "type": "Binaria",
        "distancia": "8.6 años luz",
        "mass": "2.02 masas solares",
        "radius": "1.711 radios solares",
        "temperature": "9,940 K",
        "luminosity": "25.4 luminosidades solares",
        "age": "200-300 millones de años",
        "composition": {
          "hydrogen": "71%",
          "helium": "27%",
          "otros_elementos": "2%"
        },
        "stellar_history": "Sirius es una de las estrellas más brillantes en el cielo nocturno y es una estrella binaria compuesta por Sirius A y Sirius B. Es una estrella blanca de la secuencia principal que ha consumido la mayor parte de su hidrógeno y se encuentra en una etapa avanzada de su vida."
      },
      {
        "id": 2,
        "name": ["Proxima Centauri"],
        "type": "Roja",
        "distancia": "4.24 años luz",
        "mass": "0.123 masas solares",
        "radius": "0.141 radios solares",
        "temperature": "2,850 K",
        "luminosity": "0.0015 luminosidades solares",
        "age": "Aproximadamente 4,850 millones de años",
        "composition": {
          "hydrogen": "92.7%",
          "helium": "7.1%",
          "otros_elementos": "0.2%"
        },
        "stellar_history": "Proxima Centauri es una estrella enana roja que forma parte del sistema estelar Alfa Centauri. Es la estrella más cercana al sistema solar y una de las más débiles en términos de luminosidad. A pesar de su proximidad, no es visible a simple vista debido a su baja luminosidad."
      },
      {
        "id": 3,
        "name": ["Betelgeuse"],
        "type": "Supergigante",
        "distancia": "640 años luz",
        "mass": "15-20 masas solares",
        "radius": "1,180 radios solares",
        "temperature": "3,000-3,500 K",
        "luminosity": "100,000-200,000 luminosidades solares",
        "age": "Alrededor de 8-8.5 millones de años",
        "composition": {
          "hydrogen": "85%",
          "helium": "13%",
          "otros_elementos": "2%"
        },
        "stellar_history": "Betelgeuse es una supergigante roja que se encuentra en la constelación de Orión. Es una de las estrellas más grandes y brillantes conocidas y está cerca del final de su vida, preparándose para una supernova en el futuro."
      },
      {
        "id": 4,
        "name": ["Alpha Centauri A"],
        "type": "Estrella en la secuencia principal (tipo G2V)",
        "distancia": "4.37 años luz",
        "mass": "1.1 masas solares",
        "radius": "1.22 radios solares",
        "temperature": "5,782 K",
        "luminosity": "1.52 luminosidades solares",
        "age": "Aproximadamente 6.3 mil millones de años",
        "composition": {
          "hydrogen": "71%",
          "helium": "27%",
          "otros_elementos": "2%"
        },
        "stellar_history": "Alpha Centauri A es la estrella más grande y brillante del sistema estelar Alfa Centauri. Es una estrella amarilla en la secuencia principal, similar al Sol, y es parte de un sistema triple junto con Alpha Centauri B y Proxima Centauri."
      },
      {
        "id": 5,
        "name": ["Vega"],
        "type": "Estrella en la secuencia principal (tipo A0V)",
        "distancia": "25 años luz",
        "mass": "2.15 masas solares",
        "radius": "2.362 radios solares",
        "temperature": "9,550 K",
        "luminosity": "37 luminosidades solares",
        "age": "Aproximadamente 450 millones de años",
        "composition": {
          "hydrogen": "73%",
          "helium": "25%",
          "otros_elementos": "2%"
        },
        "stellar_history": "Vega es una estrella en la constelación de la Lira y una de las estrellas más brillantes del cielo nocturno. Es una estrella blanca de la secuencia principal que gira rápidamente y es conocida por su brillo constante."
      }

 ];

 app.use(express.json());
 app.use('/stars', starsRoutes);

app.get('/stars', (req, res) => {
  const { type } = req.query;
  let estrellasFiltradas = estrellas;

  if (type) {
    estrellasFiltradas = estrellas.filter((estrella) =>
      estrella.type.includes(type)
    );
  }

  res.status(200).json(estrellasFiltradas);
});

app.post('/stars', (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(), // Corregido: Validar como número
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

app.get('/stars/:id', (req, res) => {
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

app.listen(PORT, () => {
  console.log('Servidor express iniciado en', PORT);
});
