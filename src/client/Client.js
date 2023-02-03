'use strict';

const EventEmitter = require('node:events');
const MastodonAPIError = require('../errors/MastodonAPIError');
const InstanceManager = require('../managers/InstanceManager');
const RESTManager = require('../managers/RESTManager');

/**
 * The client for working with the Mastodon API
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
  constructor(options = {}) {
    super({ captureRejections: true });

    /**
     * The instance manager of the client
     * @type {InstanceManager}
     */
    this.instance = new InstanceManager(this);

    /**
     * The REST manager of the client
     * @type {RESTManager}
     */
    this.rest = new RESTManager(this);

    Object.defineProperty(this, 'token', { writable: true });
    if (!this.token && 'MASTODON_TOKEN' in process.env) {
      /**
       * Authorization token for the logged in bot.
       * If present, this defaults to `process.env.MASTODON_TOKEN` when instantiating the client
       * @type {?string}
       */
      this.token = process.env.MASTODON_TOKEN;
    } else {
      this.token = null;
    }

    Object.defineProperty(this, 'host', { writable: true });
    if (options.host) {
      /**
       * Base URL of the Mastodon instance.
       * Defaults to https://botsin.space
       * @type {?string}
       */
      this.host = options.host;
    } else {
      this.host = 'https://botsin.space';
    }
  }

  /**
   * Logs the client in
   * @param {string} [token=this.token] Token of the account to log in with
   * @returns {Promise<string>} Token of the account used
   * @example
   * client.login('my token');
   */
  async login(token = this.token) {
    if (!token || typeof token !== 'string') throw new MastodonAPIError("Token invalid!");
    this.token = token = token.replace(/^(Bearer)\s*/i, '');

    try {
      return this.token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Client;