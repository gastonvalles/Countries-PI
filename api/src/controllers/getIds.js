const axios = require("axios");
const { Country, Activity } = require("../db.js");

const getIds = async (req, res) => {
    const id = req.params.id;
    if (!id || parseInt(id) > 0) res.status(404).json("Invalid id");
    try {
        const country = await Country.findOne({
            where: {
                id: id.toUpperCase()
            },
            include: [{
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: { attributes: [] }
            }]
        })
        if (country) return res.json(country);
        else return res.status(404).send("Country not found");
    } catch (error) {
        console.log(error)
    }
};

module.exports = { getIds };