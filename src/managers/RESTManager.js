const { request } = require('undici');
const BaseManager = require('./BaseManager');
const MastodonAPIError = require('../errors/MastodonAPIError');

/**
 * Manages API methods for profiles
 * @extends {BaseManager}
 */
class RESTManager extends BaseManager {
  /**
   * Sends a request to a URL
   * @param {string} url The URL to GET
   * @param {Object?} options Options for the request
   * @returns {Dispatcher.ResponseData}
   */
  async request(url, options) {
    const method = options.method ?? 'GET';
    const host = this.client.host;
    if (options.token) {
      options.headers['Authorization'] = `Bearer ${this.client.token}`;
    }
    options.method = method;
    const res = await request(host + url, { ...options });
    const status = res.statusCode;

    if (status === 200) {
      return res;
    } else {
      const data = res.body.json();
      throw new MastodonAPIError(data);
    }
  }

  /**
   * GETs a URL
   * @param {string} url The URL to GET
   * @param {boolean?} token If an authorization token should be supplied
   * @returns {Dispatcher.ResponseData}
   */
  async get(url, token = true) {
    const response = await this.request(url, { token, headers: [] });
    return response.body.json();
  }
}

module.exports = RESTManager;