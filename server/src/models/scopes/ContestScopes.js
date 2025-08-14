const CONSTANTS = require('../../constants');
const { Op } = require('sequelize');


const contestTypeMapping = ['', 'name', 'tagline', 'logo'];

module.exports.contestScopes = {
  byTypeIndex(typeIndex) {
    if (!typeIndex)
      return {};

    const contestType = contestTypeMapping[typeIndex];
    if (!contestType)
      return {};

    return {
      where: {
        contestType:{
          [Op.in]: [contestType],
        },
      },
    };
  },
  byUser(userId){
    return {
      where: { userId },
    };
  },
  byStatus(status){
    return status ? {
      where: { status },
    } : {};
  },
  byIndustry(industry) {
    return industry ? {
      where: { industry },
    } : {};
  },
  onlyActiveAndFinished: {
    where: {
      status: {
        [ Op.or ]: [
          CONSTANTS.CONTEST_STATUS_FINISHED,
          CONSTANTS.CONTEST_STATUS_ACTIVE,
        ],
      },
    },
  },
  orderByAward(order = 'DESC') {
    return {
      order: [['prize', order]],
    };
  },
  orderByIdDesc: {
    order: [['id',  'DESC']],
  },
  orderByIdAsc: {
    order: [['id',  'ASC']],
  },
};
