module.exports = {
  apps: [
    {
      name: 'fssocket-gateway',
      script: 'dist/main.js', // Path to the main file of your built app
      // instances: 'max', // Use 'max' to scale based on available CPU cores
      exec_mode: 'cluster', // Enables cluster mode
      env: {
        "ENV": 'DEV',
      },
      env_production: {
        "ENV": 'PROD',
        "PORT": 3001
      },
    },
  ],
};