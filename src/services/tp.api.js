import request from './request.js';
import { HTTP_METHODS, SERVICES } from './api.const.js';

const { ROUTES } = SERVICES.TP;

function getData(type, data = {}, query = null) {
  return request({
    url: `${ROUTES.BASE_ROUTE}${ROUTES[type]}`,
    method: 'GET',
    data: data
  });
}

function create({ type, data }) {
  return request({
    url: `${ROUTES.BASE_ROUTE}${ROUTES[type]}`,
    method: HTTP_METHODS.POST,
    headers: {},
    data
  });
}

const TPService = {
  getData,
  create
};

export default TPService;
