const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Acción",
      "Animación",
      "Aventura",
      "Bélica",
      "Ciencia Ficción",
      "Comedia",
      "Crimen",
      "Documental",
      "Drama",
      "Familia",
      "Fantasía",
      "Historia",
      "Misterio",
      "Música",
      "Películas de TV",
      "Romance",
      "Suspense",
      "Terror",
      "Western",
    ],
  },
  director: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  trailerUrl: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  createAt: {
    type: Number,
    required: true,
  },
});

const movie = mongoose.model("Movies", movieSchema, "Movies");

module.exports = movie;
