// Convenient way to map environment variables to config values.
Soundline.ENV_MAP = {
  Soundline_SERVER_PORT: ['port', 'int'],
  Soundline_SERVER_HOST: 'host',
  Soundline_SERVER_SUB_PATH: 'path',
  Soundline_SERVER_HTTPS: ['https', 'boolean'],
  DATABASE_URL: 'db.url',
  ENABLE_CAPTCHA: ['auth.captcha.enable', 'boolean'],
  CAPTCHA_TURNSTILE_SECRET: ['auth.captcha.turnstile.secret', 'string'],
  OAUTH_GOOGLE_CLIENT_ID: 'plugins.oauth.providers.google.clientId',
  OAUTH_GOOGLE_CLIENT_SECRET: 'plugins.oauth.providers.google.clientSecret',
  OAUTH_GITHUB_CLIENT_ID: 'plugins.oauth.providers.github.clientId',
  OAUTH_GITHUB_CLIENT_SECRET: 'plugins.oauth.providers.github.clientSecret',
  MAILER_HOST: 'mailer.host',
  MAILER_PORT: ['mailer.port', 'int'],
  MAILER_USER: 'mailer.auth.user',
  MAILER_PASSWORD: 'mailer.auth.pass',
  MAILER_SENDER: 'mailer.from.address',
  MAILER_SECURE: ['mailer.secure', 'boolean'],
  THROTTLE_TTL: ['rateLimiter.ttl', 'int'],
  THROTTLE_LIMIT: ['rateLimiter.limit', 'int'],
  COPILOT_OPENAI_API_KEY: 'plugins.copilot.openai.apiKey',
  COPILOT_FAL_API_KEY: 'plugins.copilot.fal.apiKey',
  COPILOT_UNSPLASH_API_KEY: 'plugins.copilot.unsplashKey',
  REDIS_SERVER_HOST: 'plugins.redis.host',
  REDIS_SERVER_PORT: ['plugins.redis.port', 'int'],
  REDIS_SERVER_USER: 'plugins.redis.username',
  REDIS_SERVER_PASSWORD: 'plugins.redis.password',
  REDIS_SERVER_DATABASE: ['plugins.redis.db', 'int'],
  DOC_MERGE_INTERVAL: ['doc.manager.updatePollInterval', 'int'],
  DOC_MERGE_USE_JWST_CODEC: [
    'doc.manager.experimentalMergeWithYOcto',
    'boolean',
  ],
  STRIPE_API_KEY: 'plugins.payment.stripe.keys.APIKey',
  STRIPE_WEBHOOK_KEY: 'plugins.payment.stripe.keys.webhookKey',
  FEATURES_EARLY_ACCESS_PREVIEW: ['featureFlags.earlyAccessPreview', 'boolean'],
  FEATURES_SYNC_CLIENT_VERSION_CHECK: [
    'featureFlags.syncClientVersionCheck',
    'boolean',
  ],
  TELEMETRY_ENABLE: ['telemetry.enabled', 'boolean'],
};
