import request from './request.js';
import { SERVICES } from './api.const.js';

const { ROUTES } = SERVICES.GENERIC;

function getInvoiceNo(type, data = {}) {
  return request({
    url: `${ROUTES.BASE_ROUTE}${ROUTES[type]}`,
    method: 'GET',
    data: data
  });
}

function addPayment(data) {
  return request({
    url: `${ROUTES.PAYMENTS}`,
    method: 'POST',
    data: data
  });
}

function getPayments(data = {}, query = null) {
  return request({
    url: `${ROUTES.TRANSACTIONS}?${query ? '&' + query : ''}`,
    method: 'POST',
    data: data
  });
}

function deleteInvoice(query = null) {
  return request({
    url: `${ROUTES.BASE_ROUTE}?${query ? '&' + query : ''}`,
    method: 'DELETE'
  });
}

function getDashboardStats(data = {}) {
  return request({
    url: `inventory/stats`,
    method: 'POST',
    data,
  })
}

const GeneralService = {
  getInvoiceNo,
  addPayment,
  getPayments,
  deleteInvoice,
  getDashboardStats
};

export default GeneralService;
