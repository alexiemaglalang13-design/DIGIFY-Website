import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(express.json());

// In-memory token storage for authorized admin sessions
const activeAdminTokens = new Set<string>();

// Admin credentials from environment variables (or secure project defaults)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@digify.com';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2026';
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'digify_admin_jwt_secret_2026_secure_random_key';

// Data paths
const INQUIRIES_FILE = path.resolve('data', 'inquiries.json');
const SERVICES_FILE = path.resolve('public', 'data', 'services.json');

// Ensure data folder exists
if (!fs.existsSync(path.resolve('data'))) {
  fs.mkdirSync(path.resolve('data'), { recursive: true });
}

// In-memory caching with file persistence
interface InquiryRecord {
  id: number;
  customerName: string;
  email: string;
  preferredDate: string;
  serviceOfInterest: string;
  packageSelected: string;
  promoCode: string | null;
  message: string;
  status: 'New' | 'Contacted' | 'Completed';
  submittedAt: string;
  notes?: string;
}

let inquiriesCache: InquiryRecord[] = [];

// Load initial inquiries
try {
  if (fs.existsSync(INQUIRIES_FILE)) {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    inquiriesCache = JSON.parse(raw);
  } else {
    inquiriesCache = [];
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiriesCache, null, 2));
  }
} catch (err) {
  console.error('Error loading inquiries file, using in-memory store:', err);
  inquiriesCache = [];
}

const saveInquiries = () => {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiriesCache, null, 2));
  } catch (err) {
    console.error('Error saving inquiries file:', err);
  }
};

// Services Cache
let servicesCache: any[] = [];
try {
  if (fs.existsSync(SERVICES_FILE)) {
    const raw = fs.readFileSync(SERVICES_FILE, 'utf-8');
    servicesCache = JSON.parse(raw);
  }
} catch (err) {
  console.error('Error loading services file:', err);
}

const saveServices = () => {
  try {
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(servicesCache, null, 2));
  } catch (err) {
    console.error('Error saving services file:', err);
  }
};

// Generate token
const generateAuthToken = (username: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const token = Buffer.from(`${username}:${Date.now()}:${salt}`).toString('base64');
  activeAdminTokens.add(token);
  return token;
};

// Authentication Middleware
const requireAdminAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid authentication token.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!activeAdminTokens.has(token)) {
    res.status(401).json({ error: 'Unauthorized: Session expired or invalid administrator token.' });
    return;
  }

  next();
};

/* =========================================================================
   AUTHENTICATION ROUTES
   ========================================================================= */

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username/Email and Password are required.' });
    return;
  }

  const cleanUser = username.trim().toLowerCase();
  const isValidUser =
    cleanUser === ADMIN_EMAIL.toLowerCase() ||
    cleanUser === ADMIN_USERNAME.toLowerCase() ||
    cleanUser === 'admin';

  const isValidPassword = password === ADMIN_PASSWORD;

  if (isValidUser && isValidPassword) {
    const token = generateAuthToken(ADMIN_USERNAME);
    res.json({
      success: true,
      token,
      user: {
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        role: 'Administrator',
        displayName: 'Digify Operations Lead',
      },
    });
  } else {
    res.status(401).json({ error: 'Invalid administrator email or password.' });
  }
});

// Admin Verify Token
app.get('/api/admin/verify', requireAdminAuth, (req: Request, res: Response) => {
  res.json({
    valid: true,
    user: {
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      role: 'Administrator',
      displayName: 'Digify Operations Lead',
    },
  });
});

// Admin Logout
app.post('/api/admin/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeAdminTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

/* =========================================================================
   CUSTOMER INQUIRIES ROUTES
   ========================================================================= */

// GET All Inquiries (Protected - Admin only)
app.get('/api/inquiries', requireAdminAuth, (req: Request, res: Response) => {
  res.json({
    inquiries: inquiriesCache,
    total: inquiriesCache.length,
  });
});

// POST New Customer Inquiry (Public - used by website Contact form)
app.post('/api/inquiries', (req: Request, res: Response) => {
  const { name, email, subject, message, date, promoCode } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Customer Name, Email Address, and Message are required.' });
    return;
  }

  // Email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }

  const selectedService = subject || 'Digital Starter Package';
  const isStarter =
    selectedService.includes('Starter') ||
    (promoCode && promoCode.toUpperCase() === 'STARTER20');

  const newInquiry: InquiryRecord = {
    id: Date.now(),
    customerName: name.trim(),
    email: email.trim(),
    preferredDate: date || new Date().toISOString().split('T')[0],
    serviceOfInterest: selectedService,
    packageSelected: isStarter
      ? 'Digital Starter Package (20% OFF)'
      : selectedService,
    promoCode: promoCode ? promoCode.trim().toUpperCase() : null,
    message: message.trim(),
    status: 'New',
    submittedAt: new Date().toISOString(),
    notes: 'Submitted via customer web inquiry portal.',
  };

  inquiriesCache.unshift(newInquiry);
  saveInquiries();

  res.status(201).json({
    success: true,
    message: 'Inquiry received and recorded successfully.',
    inquiry: newInquiry,
  });
});

// PATCH Update Inquiry Status or Notes (Protected)
app.patch('/api/inquiries/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status, notes } = req.body;

  const inquiry = inquiriesCache.find((inq) => inq.id === id);
  if (!inquiry) {
    res.status(404).json({ error: 'Inquiry record not found.' });
    return;
  }

  if (status && ['New', 'Contacted', 'Completed'].includes(status)) {
    inquiry.status = status;
  }

  if (notes !== undefined) {
    inquiry.notes = notes;
  }

  saveInquiries();

  res.json({
    success: true,
    message: 'Inquiry updated successfully.',
    inquiry,
  });
});

// DELETE Inquiry Record (Protected)
app.delete('/api/inquiries/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = inquiriesCache.findIndex((inq) => inq.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Inquiry record not found.' });
    return;
  }

  const deleted = inquiriesCache.splice(index, 1)[0];
  saveInquiries();

  res.json({
    success: true,
    message: `Inquiry for "${deleted.customerName}" deleted successfully.`,
    id,
  });
});

/* =========================================================================
   SERVICES / PACKAGES ROUTES
   ========================================================================= */

// GET All Services (Public)
app.get('/api/services', (_req: Request, res: Response) => {
  res.json(servicesCache);
});

// PATCH Update Service Details (Protected)
app.patch('/api/services/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { availability, price, description, name, category, deliverables } = req.body;

  const service = servicesCache.find((s) => s.id === id);
  if (!service) {
    res.status(404).json({ error: 'Service record not found.' });
    return;
  }

  if (availability !== undefined) service.availability = availability;
  if (price !== undefined) service.price = price;
  if (description !== undefined) service.description = description;
  if (name !== undefined) service.name = name;
  if (category !== undefined) service.category = category;
  if (deliverables !== undefined && Array.isArray(deliverables)) service.deliverables = deliverables;

  saveServices();
  res.json({ success: true, service });
});

// DELETE Service Record (Protected)
app.delete('/api/services/:id', requireAdminAuth, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = servicesCache.findIndex((s) => s.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Service record not found.' });
    return;
  }

  const deleted = servicesCache.splice(index, 1)[0];
  saveServices();

  res.json({
    success: true,
    message: `Service "${deleted.name}" deleted successfully.`,
    id,
  });
});

// POST Add New Service (Protected)
app.post('/api/services', requireAdminAuth, (req: Request, res: Response) => {
  const { name, category, description, price, availability, deliverables } = req.body;

  if (!name || !category || !description) {
    res.status(400).json({ error: 'Service name, category, and description are required.' });
    return;
  }

  const newService = {
    id: servicesCache.length > 0 ? Math.max(...servicesCache.map((s) => s.id)) + 1 : 1,
    name: name.trim(),
    category: category.trim(),
    description: description.trim(),
    price: price || 'Custom Quote',
    availability: availability || 'Available',
    deliverables: Array.isArray(deliverables) ? deliverables : ['Standard Digital Deliverable'],
    badge: 'Custom Package',
  };

  servicesCache.push(newService);
  saveServices();
  res.status(201).json({ success: true, service: newService });
});

/* =========================================================================
   VITE & STATIC ASSET PIPELINE
   ========================================================================= */

// Serve static assets from public/assets, assets, public/images, and images
app.use('/assets', express.static(path.resolve('public/assets')));
app.use('/assets', express.static(path.resolve('assets')));
app.use('/images', express.static(path.resolve('public/images')));
app.use('/images', express.static(path.resolve('images')));

async function startServer() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve('dist'))) {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Digify Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
