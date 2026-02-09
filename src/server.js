import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import registerResources from './resources/index.js';
import registerTools from './tools/index.js';

// Create an MCP server
const server = new Server(
  {
    name: 'Appium Gestures',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Override the assertRequestHandlerCapability method to ignore completions
const originalAssertRequestHandlerCapability = server.assertRequestHandlerCapability;
server.assertRequestHandlerCapability = function(method) {
  // Ignore completions method
  if (method === 'completion/complete') {
    return;
  }
  // Call original method for other methods
  return originalAssertRequestHandlerCapability.call(this, method);
};

// Register all resources
registerResources(server);

// Register all tools
registerTools(server);

// Export the server
export default server;