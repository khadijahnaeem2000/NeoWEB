import http from "../http-common";

class productosService {
  getProductos(route, data) {
    return http.get(route, data);
  }
  buyProducts(route, data) {
    return http.get(route, data);
  }
  activeAndInactiveProduct(route, data) {
    return http.post(route, data);
  }
}

export default new productosService();
