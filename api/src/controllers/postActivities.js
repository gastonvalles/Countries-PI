const { Activity, Country } = require('../db.js');

const postActivity = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
    if (!name && !difficulty && !duration && !season) return res.status(404).json({ msg: "Faltan Datos" });
    try {
        const obj = { name, difficulty, duration, season };
        const newActivity = await Activity.create(obj);
        await newActivity.addCountry(countries);
        // console.log(newActivity.__proto__);
        const aux = countries.map(async () => {
            await Country.findOne({ where: { id: countries } });
        })
        res.json(aux);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { postActivity };