#!/usr/bin/env node

import server from './server.js';

// Parse command line arguments
const args = process.argv.slice(2);
const useSSE = args.includes('--sse');
const port = args.find((arg) => arg.startsWith('--port='))?.split('=')[1] || '8080';

// Start the server with the appropriate transport
async function startServer() {
  try {
    if (useSSE) {
      // Start with SSE transport
      await server.start({
        transportType: 'sse',
        sse: {
          endpoint: '/sse',
          port: parseInt(port, 10),
        },
      });
    } else {
      // Start with stdio transport
      await server.start({
        transportType: 'stdio',
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();