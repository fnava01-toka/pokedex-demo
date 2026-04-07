import {requestAsync} from "/util/requestAsync"

Page({
  data: {
    pokemonName: "Default name",
    pokemonSpriteUrl: "",
    pokemonData: {}
  },
  async fetchData() {
    let pokemon_data = await requestAsync({
      url: "https://pokeapi.co/api/v2/pokemon/" + this.data.pokemonName,
      method: "GET"
    });

    this.setData({
      pokemonData: {
        baseExperience: pokemon_data.data.base_experience,
        baseStats: pokemon_data.data.stats,
        types: pokemon_data.data.types
      }
    });

    console.log(pokemon_data.data.types)
  },
  onLoad(query) {
    console.log(query)
    this.setData({
      pokemonName: query.name,
      pokemonSpriteUrl: query.sprite
    });

    this.fetchData()
  },
});