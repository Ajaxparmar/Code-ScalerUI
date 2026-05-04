import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { PrismaClient } from '@prisma/client';
import path from 'path';

let prisma: PrismaClient | null = null;

function getPrisma() {
  if (!prisma) {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL is not set. Contact form will not work.');
      return null;
    }
    prisma = new PrismaClient();
  }
  return prisma;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      const db = getPrisma();
      if (!db) {
        return res.status(503).json({ error: 'Database connection not configured' });
      }

      const entry = await db.contact.create({
        data: { name, email, subject, message }
      });

      res.status(201).json({ success: true, entry });
    } catch (error) {
      console.error('Contact submit error:', error);
      res.status(500).json({ error: 'Failed to save message' });
    }
  });

  app.post('/api/internship', async (req, res) => {
    try {
      const { name, email, college, course, semester } = req.body;
      
      const db = getPrisma();
      if (!db) {
        return res.status(503).json({ error: 'Database connection not configured' });
      }

      const application = await db.internshipApplication.create({
        data: { name, email, college, course, semester }
      });

      res.status(201).json({ success: true, application });
    } catch (error) {
      console.error('Internship submit error:', error);
      res.status(500).json({ error: 'Failed to save application' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Server failed to start:', err);
});
