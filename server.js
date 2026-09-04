const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fetch = require("node-fetch");
const swaggerFile = require("./swagger-output.json");

const app = express();
const PORT = 3000;
const POKEAPI_BASE = "https://pokeapi.co/api/v2";

app.use(express.json());

// Montamos Swagger UI en /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 1. Buscar pokemon por nombre
app.get("/api/pokemon/:nombre", async (req, res) => {
  // #swagger.tags = ['Pokemon']
  // #swagger.description = 'Obtiene la información de un pokemon buscando por su nombre.'
  try {
    const { nombre } = req.params;
    const response = await fetch(`${POKEAPI_BASE}/pokemon/${nombre.toLowerCase()}`);

    if (!response.ok) {
      return res.status(404).json({ error: "Pokemon no encontrado" });
    }

    const data = await response.json();
    res.status(200).json({
      id: data.id,
      nombre: data.name,
      tipos: data.types.map(t => t.type.name),
      peso: data.weight,
      altura: data.height,
      imagen: data.sprites.front_default
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 2. Buscar pokemon por id
app.get("/api/pokemon/id/:id", async (req, res) => {
  // #swagger.tags = ['Pokemon']
  // #swagger.description = 'Obtiene la información de un pokemon buscando por su id numérico.'
  try {
    const { id } = req.params;
    const response = await fetch(`${POKEAPI_BASE}/pokemon/${id}`);

    if (!response.ok) {
      return res.status(404).json({ error: "Pokemon no encontrado" });
    }

    const data = await response.json();
    res.status(200).json({
      id: data.id,
      nombre: data.name,
      tipos: data.types.map(t => t.type.name),
      peso: data.weight,
      altura: data.height,
      imagen: data.sprites.front_default
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 3. Listar pokemones (con query params limit y offset)
app.get("/api/pokemones", async (req, res) => {
  // #swagger.tags = ['Pokemon']
  // #swagger.description = 'Devuelve un listado de pokemones, con soporte para paginación mediante limit y offset.'
  try {
    const { limit = 10, offset = 0 } = req.query;
    const response = await fetch(`${POKEAPI_BASE}/pokemon?limit=${limit}&offset=${offset}`);

    if (!response.ok) {
      return res.status(400).json({ error: "Solicitud incorrecta" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 4. Info de un tipo
app.get("/api/type/:tipo", async (req, res) => {
  // #swagger.tags = ['Types']
  // #swagger.description = 'Obtiene información sobre un tipo de pokemon (por ejemplo fire, water) y los pokemones que pertenecen a ese tipo.'
  try {
    const { tipo } = req.params;
    const response = await fetch(`${POKEAPI_BASE}/type/${tipo.toLowerCase()}`);

    if (!response.ok) {
      return res.status(404).json({ error: "Tipo no encontrado" });
    }

    const data = await response.json();
    res.status(200).json({
      nombre: data.name,
      pokemones: data.pokemon.slice(0, 10).map(p => p.pokemon.name)
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 5. Info de una habilidad
app.get("/api/ability/:nombre", async (req, res) => {
  // #swagger.tags = ['Abilities']
  // #swagger.description = 'Obtiene información sobre una habilidad de pokemon buscando por su nombre.'
  try {
    const { nombre } = req.params;
    const response = await fetch(`${POKEAPI_BASE}/ability/${nombre.toLowerCase()}`);

    if (!response.ok) {
      return res.status(404).json({ error: "Habilidad no encontrada" });
    }

    const data = await response.json();
    res.status(200).json({
      nombre: data.name,
      generacion: data.generation.name,
      efecto: data.effect_entries.find(e => e.language.name === "en")?.short_effect || "Sin descripción"
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 6. Info de una generación
app.get("/api/generation/:id", async (req, res) => {
  // #swagger.tags = ['Generations']
  // #swagger.description = 'Obtiene información sobre una generación de pokemon buscando por su id.'
  try {
    const { id } = req.params;
    const response = await fetch(`${POKEAPI_BASE}/generation/${id}`);

    if (!response.ok) {
      return res.status(404).json({ error: "Generación no encontrada" });
    }

    const data = await response.json();
    res.status(200).json({
      nombre: data.name,
      region: data.main_region.name,
      cantidadEspecies: data.pokemon_species.length
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});