import crypto from 'crypto-js';
import oauth1a from 'oauth-1.0a';

export class Oauth1Helper {
  static getAuthHeaderForRequest(request, token, verifier) {
    const oauth = oauth1a({
      consumer: {},
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto.algo.HMAC.create(crypto.algo.SHA1, key)
          .update(base_string)
          .finalize()
          .toString(crypto.enc.Base64);
      },
    });

    const authorization = oauth.authorize(request, token, verifier);

    return oauth.toHeader(authorization);
  }
}
