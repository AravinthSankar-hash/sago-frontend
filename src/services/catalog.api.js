import request from './request.js';
import { HTTP_METHODS, SERVICES } from './api.const.js';

const { ROUTES } = SERVICES.CATALOG;

function getItems(type, data = {}, query = null) {
  return request({
    url: `${ROUTES.BASE_ROUTE}/items?item_type=${type}${query ? '&' + query : ''}`,
    method: 'POST',
    data: data
  });
}

function getPartners(type, data = {}, query = null) {
  return request({
    url: `${ROUTES.BASE_ROUTE}/partners?partner_type=${type}${query ? '&' + query : ''}`,
    method: 'POST',
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

function update({ type, data }) {
  return request({
    url: `${ROUTES.BASE_ROUTE}${ROUTES[type]}`,
    method: HTTP_METHODS.UPDATE,
    data
  });
}

function remove({ type, id }) {
  return request({
    url: `${ROUTES.BASE_ROUTE}?type=${type}&id=${id}`,
    method: HTTP_METHODS.DELETE,
    data: {}
  });
}

const CatalogService = {
  getItems,
  getPartners,
  create,
  update,
  remove
};

export default CatalogService;
