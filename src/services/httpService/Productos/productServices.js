import http from "../http-common";

class productosService {
  getProductos(route, data) {
    return http.get(route, data);
  }
}

export default new productosService();
