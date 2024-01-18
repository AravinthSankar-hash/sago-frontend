import request from './request.js';
import { HTTP_METHODS, SERVICES } from './api.const.js';

const { ROUTES } = SERVICES.GENERIC;

function getInvoiceNo(type, data = {}) {
  return request({
    url: `${ROUTES.BASE_ROUTE}${ROUTES[type]}`,
    method: 'GET',
    data: data
  });
}
const GeneralService = {
  getInvoiceNo
};

export default GeneralService;
