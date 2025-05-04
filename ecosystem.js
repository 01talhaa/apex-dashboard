// ecosystem.config.js
export const apps = [
    {
        name: 'nhl-staging-dashboard',
        script: '.output/server/index.mjs',
        exec_mode: 'fork', // or 'cluster' if you want multiple instances
        instances: 1,
        env: {
            NODE_ENV: 'staging',
            NUXT_PORT: 4000,
            NUXT_HOST: '0.0.0.0'
        }
    }
];
