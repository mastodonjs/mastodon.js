class MastodonAPIError extends Error {
  constructor(rawError) {
    super(MastodonAPIError.getMessage(rawError));
  }

  static getMessage(error) {
    return error.msg;
  }
}

module.exports = MastodonAPIError;