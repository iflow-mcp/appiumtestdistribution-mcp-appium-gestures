import { FastMCP } from 'fastmcp';
import registerResources from './resources/index.js';
import registerTools from './tools/index.js';

// Create a FastMCP server
const server = new FastMCP({
  name: 'Appium Gestures',
  version: '1.0.0',
  description: 'MCP server providing resources and tools for Appium mobile gestures',
});

// Disable completions by monkey-patching the server's internal session
if (server._session) {
  const originalSetupCompleteHandlers = server._session.setupCompleteHandlers;
  server._session.setupCompleteHandlers = function() {
    // Don't call the original method to avoid setting up completions
  };
}

// Register all resources
registerResources(server);

// Register all tools
registerTools(server);

// Export the server
export default server;