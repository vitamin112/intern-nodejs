import axios from 'axios';
import app from '../config/app';

/**
 * @param {string} code
 * @return {Promise<void>}
 */
export async function generateTokenByCode(code) {
  try {
    const formData = new URLSearchParams();
    formData.append('client_id', app.clientId);
    formData.append('client_secret', app.client_secret);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', app.redirect_uri);
    formData.append('code', code);

    const resp = await axios.post(`https://api.instagram.com/oauth/access_token`, formData, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    if (resp.data) {
      return resp.data;
    }
    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
}

/**
 * @param {string} access_token
 * @return {Promise<void>}
 */
export async function getUserByAccessToken(access_token) {
  try {
    const reps = await axios.get(
      `https://graph.instagram.com/me?fields=id,username&limit=2&access_token=${access_token}}`
    );
    return reps.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

/**
 * @param {string} access_token
 * @param {number} limit
 * @return {Promise<void>}
 */
export async function getMediaByAccessToken(access_token, limit = 30) {
  try {
    const reps = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,thumbnail_url&limit=${limit}&access_token=${access_token}}`
    );
    return reps.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}
