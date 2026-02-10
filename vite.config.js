export default {
  worker: {
    format: 'es' // Use ES modules in workers
  },
  build: {
    target: 'esnext'
  },
  define: {
    global: 'globalThis'
  }
}
