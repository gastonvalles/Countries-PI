const axios = require("axios");
const { Country, Activity } = require("../db.js");

const getCountries = async (req, res) => {
    const api = await axios.get("https://restcountries.com/v3/all");
    const name = req.query.name;
    try {
        const map = api.data.map(e => {
            let country = {
                id: e.cca3,
                name: e.name.common,
                flagImg: e.flags[1],
                continent: e.continents[0],
                capital: e.capital != null ? e.capital[0] : "No data",
                subregion: e.subregion,
                area: e.area,
                population: e.population
            }
            return country;
        });
        const db = await Country.findAll({ include: [{ model: Activity }] });
        if (!db.length) {
            const newCountry = [...map, ...db];
            await Country.bulkCreate(newCountry);
            return res.json(newCountry);
        }
        if (!name) {
            const countries = await Country.findAll({
                include: [{
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season',],
                    through: { attributes: [] }
                }]
            });
            if (countries) return res.json(countries);
            else return res.status(404).send("Countries not found");
        } else {
            let country = await Country.findAll({
                where: {
                    name: { [Op.substring]: name }
                },
                include: [{
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season',],
                    through: { attributes: [] }
                }]
            })
            if (country) return res.json(country);
            else return res.status(404).send("Country not found");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getCountries };