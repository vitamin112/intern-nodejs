import axios from 'axios';
import app from '../config/app';
import {limitDoc} from '../const/firestore';

class Instagram {
  constructor() {
    this.clientId = app.clientId;
    this.client_secret = app.client_secret;
    this.redirect_uri = app.redirect_uri;
  }

  /**
   * @param {string} code
   * @return {Promise<>}
   */
  getTokenByCode(code) {
    try {
      const formData = new URLSearchParams();
      formData.append('client_id', this.clientId);
      formData.append('client_secret', this.client_secret);
      formData.append('grant_type', 'authorization_code');
      formData.append('redirect_uri', this.redirect_uri + 'clientApi/getToken');
      formData.append('code', code);

      return axios
        .post(`https://api.instagram.com/oauth/access_token`, formData, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(resp => resp.data);
    } catch (error) {
      console.log(error);
      return {error};
    }
  }

  /**
   * @param {string} access_token
   * @return {Promise<object>} user
   */
  getUserByAccessToken(access_token) {
    try {
      return axios
        .get(
          `https://graph.instagram.com/me?fields=id,username&limit=2&access_token=${access_token}}`
        )
        .then(resp => ({...resp.data, accessToken: access_token}));
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  /**
   * @param {string} access_token
   * @param {number} limit
   * @return {Promise<[object]>} media
   */
  getMediaByAccessToken(access_token) {
    try {
      return axios
        .get(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,thumbnail_url&limit=${limitDoc}&access_token=${access_token}}`
        )
        .then(resp => resp.data);
    } catch (error) {
      console.log(error);
      return {error};
    }
  }

  /**
   * @param {string} access_token
   * @param {number} id
   * @return {Promise<[object]>} media
   */
  getMediaById(access_token, id) {
    try {
      return axios.get(
        `https://graph.instagram.com/v18.0/${id}?fields=id,caption,media_url,timestamp,media_type,thumbnail_url&access_token=${access_token}}`
      );
    } catch (error) {
      console.log(error);
      return {error};
    }
  }
}

export default Instagram;
