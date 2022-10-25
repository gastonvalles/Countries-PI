const { Activity } = require('../db.js');

const getActivities = async (req, res) => {
    const activities = await Activity.findAll();
    if (activities) return res.json(activities);
    else return res.status(404).json("No activities found");
};

module.exports = { getActivities };