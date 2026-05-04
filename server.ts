import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface User {
  id: string;
  name: string;
  barangay: string;
  points: number;
  logs: WasteLog[];
}

interface WasteLog {
  id: string;
  date: string;
  plastic: number;
  paper: number;
  glass: number;
  bio: number;
  points: number;
}

const users: Record<string, User> = {
  "demo-user": {
    id: "demo-user",
    name: "Collector Juan",
    barangay: "Poblacion",
    points: 450,
    logs: [
      { id: "1", date: "2024-03-01", plastic: 5, paper: 2, glass: 0, bio: 10, points: 170 },
      { id: "2", date: "2024-03-15", plastic: 10, paper: 5, glass: 3, bio: 10, points: 280 }
    ]
  }
};

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/stats", (req, res) => {
    const totalWaste = Object.values(users).reduce((acc, user) => 
      acc + user.logs.reduce((sum, log) => sum + log.plastic + log.paper + log.glass + log.bio, 0), 0);
    res.json({
      totalWasteRecycled: 1250 + totalWaste, // Base stats + user stats
      activeCollectors: Object.keys(users).length + 84,
      pointsEarned: 24500
    });
  });

  app.post("/api/auth/login", (req, res) => {
    const { email } = req.body;
    // Simple mock logic: any email works for demo
    const userId = "demo-user"; 
    res.json(users[userId]);
  });

  app.post("/api/waste-log", (req, res) => {
    const { userId, plastic, paper, glass, bio } = req.body;
    const user = users[userId];
    if (!user) return res.status(404).json({ error: "User not found" });

    const totalKg = Number(plastic) + Number(paper) + Number(glass) + Number(bio);
    const earnedPoints = totalKg * 10;

    const newLog: WasteLog = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      plastic: Number(plastic),
      paper: Number(paper),
      glass: Number(glass),
      bio: Number(bio),
      points: earnedPoints
    };

    user.logs.push(newLog);
    user.points += earnedPoints;

    res.json({ user, earned: earnedPoints });
  });

  app.get("/api/leaderboard", (req, res) => {
    const board = [
      { name: "Maria Clara", points: 1250, barangay: "San Isidro" },
      { name: "Jose Rizal", points: 1100, barangay: "Poblacion" },
      { name: "Juan Luna", points: 950, barangay: "Bagtas" },
      { name: "Andres B.", points: 880, barangay: "San Jose" },
      { name: "Collector Juan", points: users["demo-user"].points, barangay: "Poblacion" }
    ].sort((a, b) => b.points - a.points);
    res.json(board);
  });

  app.post("/api/redeem", (req, res) => {
    const { userId, points } = req.body;
    const user = users[userId];
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.points < points) return res.status(400).json({ error: "Insufficient points" });

    user.points -= points;
    res.json({ success: true, newTotal: user.points });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kolekta.ph server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
