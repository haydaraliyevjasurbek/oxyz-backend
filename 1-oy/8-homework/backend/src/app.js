const express = require('express');
const cors = require('cors');

const servicesRouter = require('./routes/service.routes');
const processStepsRouter = require('./routes/processStep.routes');
const statsRouter = require('./routes/stat.routes');
const newsRouter = require('./routes/news.routes');
const faqsRouter = require('./routes/faq.routes');
const contactsRouter = require('./routes/contact.routes');
const quoteFormsRouter = require('./routes/quoteForm.routes');
const quoteRequestsRouter = require('./routes/quoteRequest.routes');
const authRouter = require('./routes/auth.routes');
const { requireAuth } = require('./middlewares/auth');
const { getServiceImage } = require('./controllers/service.controller');
const {
  listProcessSteps,
  getProcessStep,
} = require('./controllers/processStep.controller');
const {
  listStats,
  getStat,
  getStatIcon,
} = require('./controllers/stat.controller');
const {
  listNews,
  getNews,
  getNewsImage,
} = require('./controllers/news.controller');
const {
  listFaqs,
  getFaq,
} = require('./controllers/faq.controller');
const {
  listContacts,
  getContact,
} = require('./controllers/contact.controller');
const {
  listQuoteForms,
  getQuoteForm,
} = require('./controllers/quoteForm.controller');
const {
  createQuoteRequestPublic,
} = require('./controllers/quoteRequest.controller');

const app = express();

const corsOrigin = process.env.CORS_ORIGIN;
const allowedOrigins = corsOrigin
  ? corsOrigin.split(',').map((o) => o.trim()).filter(Boolean)
  : null;

app.use(cors({
  origin: allowedOrigins ?? true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// http req body limit beramiz
app.use(express.json({ limit: '2mb' }));
// html formalarni xabarlarni parse qilamiz
app.use(express.urlencoded({ extended: true }));
// base url: quick sanity endpoint

app.get('/', (_req, res) => res.json({ ok: true, service: 'oxyz-backend' }));

app.get('/', (req, res) => res.send('Backend ishlayapti!'));

// bu yerda server holatini tekshirish uchun endpoint
app.get('/health', (req, res) => res.json({ ok: true }));
// auth router
app.use('/auth', authRouter);


// PUBLIC API (faqat GET va kerakli POST)
// Service
app.get('/api/services', listServices);
app.get('/api/services/:id', getService);
app.get('/api/services/:id/image', getServiceImage);
// Process Steps
app.get('/api/process-steps', listProcessSteps);
app.get('/api/process-steps/:id', getProcessStep);
// Stats
app.get('/api/stats', listStats);
app.get('/api/stats/:id', getStat);
app.get('/api/stats/:id/icon', getStatIcon);
// News
app.get('/api/news', listNews);
app.get('/api/news/:id', getNews);
app.get('/api/news/:id/image', getNewsImage);
// Faqs
app.get('/api/faqs', listFaqs);
app.get('/api/faqs/:id', getFaq);
// Contacts
app.get('/api/contacts', listContacts);
app.get('/api/contacts/:id', getContact);
// Quote Forms
app.get('/api/quote-forms', listQuoteForms);
app.get('/api/quote-forms/:id', getQuoteForm);
// Quote Requests (faqat create)
app.post('/api/quote-requests', createQuoteRequestPublic);

// ADMIN (PRIVATE) API (CRUD, requireAuth)
app.use('/admin/services', requireAuth, servicesRouter);
app.use('/admin/process-steps', requireAuth, processStepsRouter);
app.use('/admin/stats', requireAuth, statsRouter);
app.use('/admin/news', requireAuth, newsRouter);
app.use('/admin/faqs', requireAuth, faqsRouter);
app.use('/admin/contacts', requireAuth, contactsRouter);
app.use('/admin/quote-forms', requireAuth, quoteFormsRouter);
app.use('/admin/quote-requests', requireAuth, quoteRequestsRouter);

// Basic error handler
app.use((err, req, res, next) => {
// Vercel: redirect all unknown routes and root to frontend
const frontendUrl = process.env.FRONTEND_URL || 'https://oxyz-frontend.netlify.app';
if (process.env.VERCEL) {
  app.get('/', (req, res) => res.redirect(308, frontendUrl));
  app.use((req, res, next) => {
    if (!res.headersSent) {
      res.redirect(308, frontendUrl);
    }
  });
}
  // Multer file size error
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'Fayl juda katta (maksimal 10MB)' });
  }

  // Multer file type error
  if (err && err.message === 'Unsupported file type') {
    return res.status(415).json({ message: 'Fayl turi qo‘llab-quvvatlanmaydi (faqat rasm)' });
  }

  console.error(err);
  return res.status(500).json({ message: 'Ichki server xatosi' });
});

module.exports = app;
