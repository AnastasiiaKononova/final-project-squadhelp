const CONSTANTS = require('../../constants');
const { Op } = require('sequelize');

module.exports.contestScopes = {
  byTypeIndex(typeIndex) {
    return typeIndex ? {
      where: { contestType: typeIndex },
    } : {};
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
