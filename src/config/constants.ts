/**
 * App config - single place for port and CORS
 */
export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  corsOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
  ],
} as const;
