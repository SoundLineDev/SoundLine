/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Custom configurations for Soundline Cloud
// ====================================================================================
// Q: WHY THIS FILE EXISTS?
// A: Soundline deployment environment may have a lot of custom environment variables,
//    which are not suitable to be put in the `Soundline.ts` file.
//    For example, Soundline Cloud Clusters are deployed on Google Cloud Platform.
//    We need to enable the `gcloud` plugin to make sure the nodes working well,
//    but the default selfhost version may not require it.
//    So it's not a good idea to put such logic in the common `Soundline.ts` file.
//
//    ```
//    if (Soundline.deploy) {
//      Soundline.plugins.use('gcloud');
//    }
//    ```
// ====================================================================================
const env = process.env;

Soundline.metrics.enabled = !Soundline.node.test;

if (env.R2_OBJECT_STORAGE_ACCOUNT_ID) {
  Soundline.plugins.use('cloudflare-r2', {
    accountId: env.R2_OBJECT_STORAGE_ACCOUNT_ID,
    credentials: {
      accessKeyId: env.R2_OBJECT_STORAGE_ACCESS_KEY_ID!,
      secretAccessKey: env.R2_OBJECT_STORAGE_SECRET_ACCESS_KEY!,
    },
  });
  Soundline.storage.storages.avatar.provider = 'cloudflare-r2';
  Soundline.storage.storages.avatar.bucket = 'account-avatar';
  Soundline.storage.storages.avatar.publicLinkFactory = key =>
    `https://avatar.Soundlineassets.com/${key}`;

  Soundline.storage.storages.blob.provider = 'cloudflare-r2';
  Soundline.storage.storages.blob.bucket = `workspace-blobs-${
    Soundline.Soundline.canary ? 'canary' : 'prod'
  }`;

  Soundline.storage.storages.copilot.provider = 'cloudflare-r2';
  Soundline.storage.storages.copilot.bucket = `workspace-copilot-${
    Soundline.Soundline.canary ? 'canary' : 'prod'
  }`;
}

Soundline.plugins.use('copilot', {
  openai: {},
  fal: {},
});
Soundline.plugins.use('redis');
Soundline.plugins.use('payment', {
  stripe: {
    keys: {
      // fake the key to ensure the server generate full GraphQL Schema even env vars are not set
      APIKey: '1',
      webhookKey: '1',
    },
  },
});
Soundline.plugins.use('oauth');

if (Soundline.deploy) {
  Soundline.mailer = {
    service: 'gmail',
    auth: {
      user: env.MAILER_USER,
      pass: env.MAILER_PASSWORD,
    },
  };

  Soundline.plugins.use('gcloud');
}
