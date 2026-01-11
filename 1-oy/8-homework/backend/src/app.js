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

// bu yerda server holatini tekshirish uchun endpoint
app.get('/health', (req, res) => res.json({ ok: true }));
// auth router
app.use('/auth', authRouter);



// PUBLIC API (faqat /api orqali)
const publicApi = express.Router();
publicApi.get('/services', listServices);
publicApi.get('/services/:id', getService);
publicApi.get('/services/:id/image', getServiceImage);
publicApi.get('/process-steps', listProcessSteps);
publicApi.get('/process-steps/:id', getProcessStep);
publicApi.get('/stats', listStats);
publicApi.get('/stats/:id', getStat);
publicApi.get('/stats/:id/icon', getStatIcon);
publicApi.get('/news', listNews);
publicApi.get('/news/:id', getNews);
publicApi.get('/news/:id/image', getNewsImage);
publicApi.get('/faqs', listFaqs);
publicApi.get('/faqs/:id', getFaq);
publicApi.get('/contacts', listContacts);
publicApi.get('/contacts/:id', getContact);
publicApi.get('/quote-forms', listQuoteForms);
publicApi.get('/quote-forms/:id', getQuoteForm);
publicApi.post('/quote-requests', createQuoteRequestPublic);
app.use('/api', publicApi);

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
