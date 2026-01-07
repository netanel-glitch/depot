import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Captured at build time (when TypeScript compiles)
const BUILD_TIME = new Date().toISOString();

// Captured when the server starts
const START_TIME = new Date().toISOString();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Cache layer verification endpoint
app.get('/cache-info', (req: Request, res: Response) => {
  res.json({
    buildTime: BUILD_TIME,
    startTime: START_TIME,
    currentTime: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
    },
    uptime: `${Math.floor(process.uptime())}s`,
    memoryUsage: process.memoryUsage(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

