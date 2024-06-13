import http from "../http-common";
// import authHeader from '../../auth/authHeader';
class userService {
  //   getAll() {
  //     return http.get("/tutorials");
  //   }

  //   get(id) {
  //     return http.get(`/tutorials/${id}`);
  //   }

  commonPostService(route, data) {
    return http.post(route, data);
  }
  commonGetService(route, data) {
    return http.get(route, data);
  }

  commonDeleteService(route, data) {
    return http.delete(route, data);
  }

  //   update(id, data) {
  //     return http.put(`/tutorials/${id}`, data);
  //   }

  //   delete(id) {
  //     return http.delete(`/tutorials/${id}`);
  //   }

  //   deleteAll() {
  //     return http.delete(`/tutorials`);
  //   }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }

  activities(route, data) {
    return http.get(route, data);
  }
  weeklySchedule(route, data) {
    return http.post(route, data);
  }

  addSlots(route, data) {
    return http.post(route, data);
  }

  registerWithGoogle(route, data) {
    return http.post(route, data);
  }

  telephoneVerification(route, data) {
    return http.get(route, data);
  }

  registerwith30days(route, data) {
    return http.post(route, data);
  }
  verifyingUser(route, data) {
    return http.post(route, data);
  }
}

export default new userService();
