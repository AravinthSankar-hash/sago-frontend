import request from './request.js';
import { HTTP_METHODS, SERVICES } from './api.const.js';

const { ROUTES } = SERVICES.INVENTORY;

function getData(type, data = {}, query = null) {
  return request({
    url: `${ROUTES.BASE_ROUTE}${type}?${query ? '&' + query : ''}`,
    method: HTTP_METHODS.POST,
    data: data
  });
}

function create({ type, data }) {
  alert(type);
  console.log(ROUTES[type], 'ROUTES[type]');
  return request({
    url: `${ROUTES.BASE_ROUTE}${ROUTES[type]}`,
    method: HTTP_METHODS.POST,
    headers: {},
    data
  });
}

const ApiService = {
  getData,
  create
};

export default ApiService;
