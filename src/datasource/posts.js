const { RESTDataSource } = require('apollo-datasource-rest');

class PostsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/posts';
  }

  async getallPosts() {
    try{
      const response = await this.get('');
      return response
    }catch(err){
      console.error(err)
    }
  }
  async getPostsById(id){
    try{
      const response = await this.get(`${id}`);
      return response;
    }catch(err){
      console.error(err)
    }
  }
  async getPostsByuserId(userId){
    try{
      const response = await this.get(`?userId=${userId}`);
      return response;
    }catch(err){
      console.error(err)
    }
  }
  
}

module.exports = PostsAPI;
