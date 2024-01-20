import request from './request.js';
import { HTTP_METHODS, SERVICES } from './api.const.js';

const { ROUTES, SALE_TYPES } = SERVICES.SALE;

function getSales(type, data = {}, query = null) {
    return request({
        url: `${ROUTES.BASE_ROUTE}${SALE_TYPES[type]}`,
        method: 'POST',
        data: data
    });
}

function createSale({ type, data }) {
    return request({
        url: `${ROUTES.BASE_ROUTE}`,
        method: HTTP_METHODS.POST,
        headers: {},
        data: { ...data, sale_type: SALE_TYPES[type] }
    });
}

const SaleService = {
    getSales,
    createSale
};

export default SaleService;
