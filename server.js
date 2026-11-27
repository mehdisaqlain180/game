import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
const SITE_ORIGIN = 'https://gravitygamez.fun';

function loadBrowserRegistry(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window;
}

const { GAMES_DATA = [] } = loadBrowserRegistry(path.join(__dirname, 'games-data.js'));
const { BLOG_ARTICLES = [] } = loadBrowserRegistry(path.join(__dirname, 'blog-data.js'));

const playTemplate = fs.readFileSync(path.join(__dirname, 'play.html'), 'utf8');
const articleTemplate = fs.readFileSync(path.join(__dirname, 'article.html'), 'utf8');

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function replaceMetaTag(html, regex, replacement) {
  return regex.test(html) ? html.replace(regex, replacement) : html;
}

function buildPlayHtml(gameSlug) {
  const game = GAMES_DATA.find((g) => g.slug === gameSlug) || GAMES_DATA[0];
  if (!game) return playTemplate;

  const pageTitle = `Play ${game.title} Free Online — Gravity Games`;
  const pageDesc = `${game.tagline} ${game.description}`.slice(0, 160);
  const canonicalUrl = `${SITE_ORIGIN}/play.html?game=${encodeURIComponent(game.slug)}`;
  const coverRel = game.paths.cover || game.paths.banner || game.paths.icon;
  const coverUrl = `${SITE_ORIGIN}/${encodeURI(coverRel)}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoGame',
        name: game.title,
        description: game.description,
        genre: game.category,
        url: canonicalUrl,
        image: coverUrl,
        applicationCategory: 'Game',
        operatingSystem: 'Web Browser',
        playMode: 'SinglePlayer',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(game.rating || 4.8),
          bestRating: '5',
          worstRating: '1',
          ratingCount: '1250',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_ORIGIN}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: game.category,
            item: `${SITE_ORIGIN}/?cat=${encodeURIComponent(game.category)}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: game.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  let html = playTemplate;
  html = replaceMetaTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`);
  html = replaceMetaTag(
    html,
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${escapeHtml(pageDesc)}">`
  );
  html = replaceMetaTag(
    html,
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${escapeHtml(pageTitle)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${escapeHtml(pageDesc)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${escapeHtml(coverUrl)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${escapeHtml(pageTitle)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${escapeHtml(pageDesc)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta name="twitter:image" content="[^"]*">/,
    `<meta name="twitter:image" content="${escapeHtml(coverUrl)}">`
  );

  html = replaceMetaTag(
    html,
    /<h1 class="player-game-title" id="gameDisplayTitle">[^<]*<\/h1>/,
    `<h1 class="player-game-title" id="gameDisplayTitle">${escapeHtml(game.title)}</h1>`
  );
  html = replaceMetaTag(
    html,
    /<span class="player-game-tagline" id="gameDisplayTagline">[^<]*<\/span>/,
    `<span class="player-game-tagline" id="gameDisplayTagline">${escapeHtml(game.tagline)}</span>`
  );
  html = replaceMetaTag(
    html,
    /<p class="game-description-body" id="gameDescriptionText">[^<]*<\/p>/,
    `<p class="game-description-body" id="gameDescriptionText">${escapeHtml(game.description)}</p>`
  );

  const schemaTag = `  <script id="dynamicGameSchema" type="application/ld+json">${safeJsonLd(schema)}</script>\n</head>`;
  html = html.replace('</head>', schemaTag);
  return html;
}

function buildArticleHtml(articleId) {
  const article = BLOG_ARTICLES.find((a) => a.id === articleId) || BLOG_ARTICLES[0];
  if (!article) return articleTemplate;

  const pageTitle = `${article.title} — Gravity Games`;
  const pageDesc = article.meta || article.excerpt || '';
  const canonicalUrl = `${SITE_ORIGIN}/article.html?id=${encodeURIComponent(article.id)}`;
  const bannerUrl = `${SITE_ORIGIN}/${encodeURI(article.banner || 'Images/GravityGamez.png')}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: pageDesc,
        image: bannerUrl,
        datePublished: '2026-11-26',
        dateModified: '2026-11-27',
        author: {
          '@type': 'Organization',
          name: 'Gravity Games',
          url: `${SITE_ORIGIN}/`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Gravity Games',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_ORIGIN}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Guides & Blog',
            item: `${SITE_ORIGIN}/blog.html`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  let html = articleTemplate;
  html = replaceMetaTag(
    html,
    /<title id="articlePageTitle">[\s\S]*?<\/title>/,
    `<title id="articlePageTitle">${escapeHtml(pageTitle)}</title>`
  );
  html = replaceMetaTag(
    html,
    /<meta name="description" id="articleMetaDesc" content="[^"]*">/,
    `<meta name="description" id="articleMetaDesc" content="${escapeHtml(pageDesc)}">`
  );
  html = replaceMetaTag(
    html,
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${escapeHtml(pageTitle)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${escapeHtml(pageDesc)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${escapeHtml(bannerUrl)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${escapeHtml(pageTitle)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${escapeHtml(pageDesc)}">`
  );
  html = replaceMetaTag(
    html,
    /<meta name="twitter:image" content="[^"]*">/,
    `<meta name="twitter:image" content="${escapeHtml(bannerUrl)}">`
  );
  html = replaceMetaTag(
    html,
    /<h1 class="article-title" id="articleHeading">[^<]*<\/h1>/,
    `<h1 class="article-title" id="articleHeading">${escapeHtml(article.title)}</h1>`
  );
  html = replaceMetaTag(
    html,
    /<span id="articleCategory"([^>]*)>[^<]*<\/span>/,
    `<span id="articleCategory"$1>${escapeHtml(article.category)}</span>`
  );

  const schemaTag = `  <script id="dynamicArticleSchema" type="application/ld+json">${safeJsonLd(schema)}</script>\n</head>`;
  html = html.replace('</head>', schemaTag);
  return html;
}

// Rewrite map migrated from _redirects / sw.js for game bundles referencing root /assets/*
const ASSET_REWRITES = {
  '/assets/index-D9VmC681.js': "/Don't-Trust-The-Floor/assets/index-D9VmC681.js",
  '/assets/index-DidBH2Kp.css': "/Don't-Trust-The-Floor/assets/index-DidBH2Kp.css",
  '/assets/index-BMwqUhe3.css': '/Neon-Wave-Legends/assets/index-BMwqUhe3.css',
  '/assets/index-B_S9MjvE.js': '/Neon-Wave-Legends/assets/index-B_S9MjvE.js',
  '/assets/index-Cd68nujF.css': '/One-Button-Hell/assets/index-Cd68nujF.css',
  '/assets/index-KVZgtUt5.js': '/One-Button-Hell/assets/index-KVZgtUt5.js',
  '/assets/index-CRz3fB4t.js': '/Prism-Rush/assets/index-CRz3fB4t.js',
  '/assets/index-DvnoxroI.css': '/Prism-Rush/assets/index-DvnoxroI.css',
  '/assets/index-jV_uEiAw.js': '/Reality-Changes/assets/index-jV_uEiAw.js',
  '/assets/index-WJD7Bop8.css': '/Reality-Changes/assets/index-WJD7Bop8.css',
  '/assets/index-BGY81bhI.js': '/Savannah-Sovereign/assets/index-BGY81bhI.js',
  '/assets/index-D2o2slNE.css': '/Savannah-Sovereign/assets/index-D2o2slNE.css',
  '/assets/index-ChNP0ICl.css': '/swingline/assets/index-ChNP0ICl.css',
  '/assets/index-D-MpTOUe.js': '/swingline/assets/index-D-MpTOUe.js',
  '/assets/door-icon.svg': '/the-fake-exit/assets/door-icon.svg',
  '/assets/index-BT-Kubhw.js': '/the-fake-exit/assets/index-BT-Kubhw.js',
  '/assets/index-DdEPpUf8.css': '/the-fake-exit/assets/index-DdEPpUf8.css',
  '/assets/logo-CmA8_L1Q.svg': '/the-fake-exit/assets/logo-CmA8_L1Q.svg',
  '/assets/logo.svg': '/the-fake-exit/assets/logo.svg',
  '/assets/skull-icon.svg': '/the-fake-exit/assets/skull-icon.svg',
  '/assets/index-0mv6DrIp.css': '/threshold-shift/assets/index-0mv6DrIp.css',
  '/assets/index-DhbKtyPW.js': '/threshold-shift/assets/index-DhbKtyPW.js',
  '/assets/index-BOB8fjTq.css': '/trust-issues/assets/index-BOB8fjTq.css',
  '/assets/index-DbnShG_P.js': '/trust-issues/assets/index-DbnShG_P.js',
  '/assets/index-A_vNoe2W.js': '/vector-flip/assets/index-A_vNoe2W.js',
  '/assets/index-B7YF1nYG.css': '/vector-flip/assets/index-B7YF1nYG.css'
};

app.use((req, res, next) => {
  const rewrittenPath = ASSET_REWRITES[req.path];
  if (rewrittenPath) {
    return res.sendFile(path.join(__dirname, rewrittenPath));
  }
  next();
});

app.get(['/play', '/play.html'], (req, res) => {
  const gameSlug = typeof req.query.game === 'string' ? req.query.game : '';
  res.type('html').send(buildPlayHtml(gameSlug));
});

app.get(['/article', '/article.html'], (req, res) => {
  const articleId = typeof req.query.id === 'string' ? req.query.id : '';
  res.type('html').send(buildArticleHtml(articleId));
});

app.use(
  express.static(__dirname, {
    extensions: ['html']
  })
);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Gravity Games server listening on http://${HOST}:${PORT}`);
});
