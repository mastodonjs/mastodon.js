const BaseManager = require('./BaseManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for instances
 * @extends {BaseManager}
 */
class InstanceManager extends BaseManager {
  /**
   * Obtains the instance an account is in
   * @returns {Promise<any>}
   */
  async fetch() {
    const data = await this.client.rest.get(Routes.instance());
    return data;
  }
}

module.exports = InstanceManager;