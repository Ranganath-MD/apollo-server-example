const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://randomuser.me/api/';
  }

  async getUsers(){
    const { results } = await this.get("");
    return results;
  }

}

module.exports = UsersAPI;
