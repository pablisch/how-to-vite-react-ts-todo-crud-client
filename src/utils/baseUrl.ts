const environment: string = import.meta.env.VITE_NODE_ENV as unknown as string
console.log(environment)

const localDefaultUrl =
  environment === 'deploy'
    ? 'http://localhost:3000/api/v1.0' // base URL for localhost API and deployed client
    : 'http://localhost:3000/api/v1.0' // base URL for localhost API and localhost client

const deployedDefaultUrl =
  environment === 'deploy'
    ? 'https://todo-api-zfaj.onrender.com/api/v1.0' // base URL for deployed API and deployed client
    : 'https://todo-api-zfaj.onrender.com/api/v1.0' // base URL for deployed API and localhost client

export { localDefaultUrl, deployedDefaultUrl }
