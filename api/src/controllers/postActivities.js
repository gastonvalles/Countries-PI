const { Activity } = require('../db.js');

const postActivity = async (req, res) => {
    const { name, difficulty, duration, season, countryId } = req.body;
    if (!name && !difficulty && !duration && !season) return res.status(404).json({ msg: "Faltan Datos" });
    try {
        const obj = { name, difficulty, duration, season };
        const newActivity = await Activity.create(obj);
        newActivity.addCountry(countryId);
        // console.log(newActivity.__proto__);
        res.json(newActivity);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { postActivity };