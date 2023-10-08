const { DataTypes } = require("sequelize");

const MeetupModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("meetup", MeetupModel);
  },

  createMeetup: (meetupData) => {
    return this.model.create(meetupData);
  },

  findMeetup: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateMeetup: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllMeetups: (query) => {
    return this.model.findAll({
      where: query,
    });
  },

  deleteMeetup: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
