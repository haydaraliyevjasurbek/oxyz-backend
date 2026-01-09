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
app.get('/', (req, res) => res.json({ ok: true, service: 'oxyz-backend' }));
// bu yerda server holatini tekshirish uchun endpoint
app.get('/health', (req, res) => res.json({ ok: true }));
// auth router
app.use('/auth', authRouter);

// Public image endpoint (browser <img> can't send Authorization header)
app.get('/services/:id/image', getServiceImage);

// Public read endpoints for website content
app.get('/process-steps', listProcessSteps);
app.get('/process-steps/:id', getProcessStep);

app.get('/stats', listStats);
app.get('/stats/:id', getStat);
app.get('/stats/:id/icon', getStatIcon);

app.get('/news', listNews);
app.get('/news/:id', getNews);
app.get('/news/:id/image', getNewsImage);

app.get('/faqs', listFaqs);
app.get('/faqs/:id', getFaq);

app.get('/contacts', listContacts);
app.get('/contacts/:id', getContact);

app.get('/quote-forms', listQuoteForms);
app.get('/quote-forms/:id', getQuoteForm);

// Public: user submits quote request ("Расчитать стоимость")
app.post('/quote-requests', createQuoteRequestPublic);

// Require login before using Service CRUD
app.use('/services', requireAuth, servicesRouter);

// Require login before managing process steps
app.use('/process-steps', requireAuth, processStepsRouter);

// Require login before managing stats
app.use('/stats', requireAuth, statsRouter);

// Require login before managing news
app.use('/news', requireAuth, newsRouter);

// Require login before managing FAQs
app.use('/faqs', requireAuth, faqsRouter);

// Require login before managing Contacts
app.use('/contacts', requireAuth, contactsRouter);

// Require login before managing quote form settings
app.use('/quote-forms', requireAuth, quoteFormsRouter);

// Require login before viewing/managing quote requests
app.use('/quote-requests', requireAuth, quoteRequestsRouter);

// Basic error handler
app.use((err, req, res, next) => {
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
