const environment: string = import.meta.env.VITE_NODE_ENV as unknown as string
console.log(environment)

export default environment === 'deploy'
  ? 'http://localhost:3000/api/v1.0' // deployed API base URL
  : 'http://localhost:3000/api/v1.0' // localhost base URL
