import { FastMCP } from 'fastmcp';
import registerResources from './resources/index.js';
import registerTools from './tools/index.js';

// Monkey-patch the Server.setCapability method to allow completions
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
const originalSetCapability = Server.prototype.setCapability;
Server.prototype.setCapability = function(capability) {
  if (capability === 'completions') {
    return;
  }
  return originalSetCapability.call(this, capability);
};

// Create a FastMCP server
const server = new FastMCP({
  name: 'Appium Gestures',
  version: '1.0.0',
  description: 'MCP server providing resources and tools for Appium mobile gestures',
});

// Register all resources
registerResources(server);

// Register all tools
registerTools(server);

// Export the server
export default server;