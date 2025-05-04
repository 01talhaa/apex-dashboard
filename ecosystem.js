module.exports = {
  apps: [
    {
      name: 'nhl-staging-dashboard',
      script: '.output/server/index.mjs',
      env: {
        NUXT_PORT: 3100,
        NUXT_HOST: '0.0.0.0',
        NODE_ENV: 'staging',
        NUXT_PUBLIC_API_URL: 'https://staging-replica-api.apexdrive365.com/api'
      }
    }
  ]
}
