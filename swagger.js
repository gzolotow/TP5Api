const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "TP5 API - Mini Pokedex",
    description: "API que envuelve la PokeAPI (externa) para consultar pokemones, tipos, habilidades y generaciones. TP: Documentación de una API con Swagger."
  },
  host: "localhost:3000",
  schemes: ["http"],
  tags: [
    { name: "Pokemon", description: "Endpoints relacionados a pokemones" },
    { name: "Types", description: "Endpoints relacionados a tipos" },
    { name: "Abilities", description: "Endpoints relacionados a habilidades" },
    { name: "Generations", description: "Endpoints relacionados a generaciones" }
  ]
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Especificación de Swagger generada con éxito.");
});