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

const { GAMES_DATA = [], GENRE_METADATA = [], TAG_METADATA = [] } = loadBrowserRegistry(path.join(__dirname, 'games-data.js'));
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
  return regex.test(html) ? html.replace(regex, () => replacement) : html;
}

function toIsoDate(dateStr = '') {
  const parsed = new Date(dateStr);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  return '2026-11-27';
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
            item: `${SITE_ORIGIN}/games/${encodeURIComponent(game.category.toLowerCase())}`,
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
  const bannerRel = article.banner || 'Images/GravityGamez.png';
  const bannerUrl = `${SITE_ORIGIN}/${encodeURI(bannerRel)}`;
  const isoDate = toIsoDate(article.date);
  const ctaHref = article.gameSlug ? `play.html?game=${encodeURIComponent(article.gameSlug)}` : 'index.html';
  const ctaLabel = article.gameSlug
    ? (article.group === 'lists' ? 'Play Featured Game &rarr;' : 'Play This Game Now &rarr;')
    : 'Browse Games &rarr;';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: pageDesc,
        image: bannerUrl,
        datePublished: isoDate,
        dateModified: isoDate,
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
  html = replaceMetaTag(
    html,
    /<span id="articleDate">[^<]*<\/span>/,
    `<span id="articleDate">${escapeHtml(article.date || 'November 27, 2026')}</span>`
  );
  html = replaceMetaTag(
    html,
    /<span id="articleReadTime">[^<]*<\/span>/,
    `<span id="articleReadTime">${escapeHtml(article.readTime || '4 min read')}</span>`
  );
  html = replaceMetaTag(
    html,
    /<img id="articleBannerImg"[^>]*>/,
    `<img id="articleBannerImg" src="${escapeHtml(bannerRel)}" alt="${escapeHtml(article.title)}" style="width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:var(--radius-md); margin-bottom:24px; border:var(--border-subtle);" referrerpolicy="no-referrer">`
  );
  html = replaceMetaTag(
    html,
    /<div class="article-prose" id="articleBody"><\/div>/,
    `<div class="article-prose" id="articleBody">${article.body || ''}</div>`
  );
  html = replaceMetaTag(
    html,
    /<div id="articleFollowUp" class="article-prose"><\/div>/,
    `<div id="articleFollowUp" class="article-prose">${article.followUp || ''}</div>`
  );
  html = replaceMetaTag(
    html,
    /<a id="articlePlayCta"[^>]*>[\s\S]*?<\/a>/,
    `<a id="articlePlayCta" href="${escapeHtml(ctaHref)}" class="bento-play-btn" style="margin-top: 0;">${ctaLabel}</a>`
  );

  const schemaTag = `  <script id="dynamicArticleSchema" type="application/ld+json">${safeJsonLd(schema)}</script>\n</head>`;
  html = html.replace('</head>', () => schemaTag);
  return html;
}

function buildGenreHtml(rawGenreSlug) {
  const cleanSlug = String(rawGenreSlug || '').toLowerCase().trim();
  const genre = GENRE_METADATA.find((g) => g.slug === cleanSlug);
  if (!genre) return null;

  const genreGames = GAMES_DATA.filter((g) => g.category.toLowerCase() === genre.slug);
  const genreGameSlugs = new Set(genreGames.map((g) => g.slug));
  let relatedGuides = BLOG_ARTICLES.filter((a) => a.gameSlug && genreGameSlugs.has(a.gameSlug));
  if (relatedGuides.length === 0) {
    relatedGuides = BLOG_ARTICLES.slice(0, 3);
  } else {
    relatedGuides = relatedGuides.slice(0, 3);
  }

  const canonicalUrl = `${SITE_ORIGIN}/games/${encodeURIComponent(genre.slug)}`;
  const ogImageRel = genre.ogImage || (genreGames[0] && genreGames[0].paths.cover) || 'Images/GravityGamez.png';
  const ogImageUrl = `${SITE_ORIGIN}/${encodeURI(ogImageRel)}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: genre.headline,
        description: genre.metaDescription,
        url: canonicalUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Gravity Games',
          url: `${SITE_ORIGIN}/`,
        },
      },
      {
        '@type': 'ItemList',
        name: `${genre.name} Browser Games`,
        numberOfItems: genreGames.length,
        itemListElement: genreGames.map((game, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_ORIGIN}/play.html?game=${encodeURIComponent(game.slug)}`,
          name: game.title,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Gravity Games', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: `${genre.name} Games`, item: canonicalUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: (genre.faqs || []).map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  const switcherHtml = GENRE_METADATA.map((item) => {
    const activeClass = item.slug === genre.slug ? ' active' : '';
    return `<a href="/games/${escapeHtml(item.slug)}" class="filter-pill${activeClass}">${escapeHtml(item.name)}</a>`;
  }).join('');

  const gamesHtml = genreGames.map((game) => `
    <a href="/play.html?game=${escapeHtml(game.slug)}" class="game-cover-card" data-slug="${escapeHtml(game.slug)}" title="Play ${escapeHtml(game.title)}">
      <img src="/${encodeURI(game.paths.cover)}" alt="${escapeHtml(game.title)} cover artwork" class="cover-art" loading="lazy" referrerpolicy="no-referrer">
      <div class="cover-overlay">
        <div class="cover-card-header">
          <img src="/${encodeURI(game.paths.icon)}" alt="${escapeHtml(game.title)} icon" class="cover-card-icon" loading="lazy" referrerpolicy="no-referrer">
          <span class="cover-card-title">${escapeHtml(game.title)}</span>
        </div>
        <div class="cover-card-meta">
          <span class="cover-card-category">${escapeHtml(game.category)} · ${escapeHtml(game.plays)}</span>
          <span class="cover-card-rating tabular-nums">★ ${escapeHtml(String(game.rating))}</span>
        </div>
      </div>
    </a>
  `).join('');

  const guidesHtml = relatedGuides.map((article) => {
    const url = article.customUrl ? `/${article.customUrl}` : `/article.html?id=${encodeURIComponent(article.id)}`;
    return `
      <article class="blog-card">
        <a href="${url}" title="${escapeHtml(article.title)}">
          <img src="/${encodeURI(article.banner || 'Images/GravityGamez.png')}" alt="${escapeHtml(article.title)}" class="blog-card-thumb" loading="lazy" referrerpolicy="no-referrer">
        </a>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="blog-card-cat">${escapeHtml(article.category)}</span>
            <span aria-hidden="true">·</span>
            <span>${escapeHtml(article.readTime || '5 min read')}</span>
          </div>
          <h3 class="blog-card-title"><a href="${url}">${escapeHtml(article.title)}</a></h3>
          <p class="blog-card-excerpt">${escapeHtml(article.excerpt)}</p>
          <div class="blog-card-actions">
            <a href="${url}" class="blog-read-link">Read Guide &rarr;</a>
            ${article.gameSlug ? `<a href="/play.html?game=${encodeURIComponent(article.gameSlug)}" class="blog-play-link">Play Game</a>` : ''}
          </div>
        </div>
      </article>
    `;
  }).join('');

  const faqsHtml = (genre.faqs || []).map((faq) => `
    <div class="genre-faq-item">
      <h3 class="genre-faq-q">${escapeHtml(faq.q)}</h3>
      <p class="genre-faq-a">${escapeHtml(faq.a)}</p>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${escapeHtml(genre.seoTitle)}</title>
  <meta name="description" content="${escapeHtml(genre.metaDescription)}">
  <meta name="theme-color" content="#0E1016">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <link rel="manifest" href="/manifest.webmanifest">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Gravity Games">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:title" content="${escapeHtml(genre.seoTitle)}">
  <meta property="og:description" content="${escapeHtml(genre.metaDescription)}">
  <meta property="og:image" content="${escapeHtml(ogImageUrl)}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${escapeHtml(canonicalUrl)}">
  <meta name="twitter:title" content="${escapeHtml(genre.seoTitle)}">
  <meta name="twitter:description" content="${escapeHtml(genre.metaDescription)}">
  <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}">

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png?v=2">
  <link rel="shortcut icon" href="/favicon.ico?v=2">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">

  <script id="dynamicGenreSchema" type="application/ld+json">${safeJsonLd(schema)}</script>
</head>
<body>
  <header class="site-header">
    <div class="brand-group">
      <a href="/index.html" class="brand-link" title="Gravity Games Home">
        <img src="/logo.png" alt="Gravity Games" class="brand-logo-img">
      </a>
    </div>

    <div class="search-container">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="search" id="searchInput" class="search-input" placeholder="Search all 17 games..." autocomplete="off" aria-label="Search games">
        <span class="search-shortcut" aria-hidden="true">/</span>
      </div>
    </div>

    <div class="header-nav-group">
      <nav class="header-actions" aria-label="Primary navigation">
        <a href="/index.html" class="nav-link">All Games</a>
        <a href="/index.html?cat=trending" class="nav-link">Trending</a>
        <a href="/index.html?cat=favorites" class="nav-link">Favorites</a>
        <a href="/blog.html" class="nav-link">Guides</a>
      </nav>
      <button type="button" class="btn-surprise js-random-game" title="Launch a random game">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="16 3 21 3 21 8"></polyline>
          <line x1="4" y1="20" x2="21" y2="3"></line>
          <polyline points="21 16 21 21 16 21"></polyline>
          <line x1="15" y1="15" x2="21" y2="21"></line>
          <line x1="4" y1="4" x2="9" y2="9"></line>
        </svg>
        <span>Surprise Me</span>
      </button>
    </div>
  </header>

  <div class="app-container">
    <main class="main-viewport">
      <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <a href="/index.html">Gravity Games</a>
        <span aria-hidden="true">/</span>
        <span>${escapeHtml(genre.name)} Games</span>
      </nav>

      <section class="genre-hero" aria-label="${escapeHtml(genre.name)} genre overview">
        <div class="genre-hero-meta tabular-nums">
          <span>${genreGames.length} ${genreGames.length === 1 ? 'Game' : 'Games'}</span>
          <span aria-hidden="true">·</span>
          <span>Zero Downloads</span>
          <span aria-hidden="true">·</span>
          <span>Mobile &amp; Desktop</span>
        </div>
        <h1 class="genre-hero-title">${escapeHtml(genre.headline)}</h1>
        <p class="genre-hero-intro">${escapeHtml(genre.intro)}</p>
      </section>

      <div class="genre-switcher-strip">
        <nav class="genre-switcher-links" aria-label="Browse genres">
          <a href="/index.html" class="filter-pill">All 17 Games</a>
          ${switcherHtml}
        </nav>

        <div class="sort-segmented-group" role="group" aria-label="Sort ${escapeHtml(genre.name)} games">
          <button type="button" class="sort-btn active" data-genre-sort="featured" aria-pressed="true">Featured</button>
          <button type="button" class="sort-btn" data-genre-sort="rating" aria-pressed="false">Top Rated</button>
          <button type="button" class="sort-btn" data-genre-sort="plays" aria-pressed="false">Most Played</button>
          <button type="button" class="sort-btn" data-genre-sort="alpha" aria-pressed="false">A–Z</button>
        </div>
      </div>

      <section aria-label="${escapeHtml(genre.name)} catalog">
        <div class="covers-grid" id="genreGamesGrid" data-genre="${escapeHtml(genre.slug)}">
          ${gamesHtml}
        </div>
      </section>

      <section aria-label="${escapeHtml(genre.name)} guides">
        <div class="section-header">
          <div class="section-title-group">
            <h2 class="section-title">${escapeHtml(genre.name)} Strategy Guides</h2>
          </div>
          <a href="/blog.html" class="section-meta-link">Browse all guides &rarr;</a>
        </div>
        <div class="guides-home-grid">
          ${guidesHtml}
        </div>
      </section>

      <section class="genre-faq-section" aria-label="Frequently asked questions">
        <h2 class="section-title">${escapeHtml(genre.name)} Games FAQ</h2>
        <div class="genre-faq-list">
          ${faqsHtml}
        </div>
      </section>
    </main>
  </div>

  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand-col">
        <a href="/index.html">
          <img src="/logo.png" alt="Gravity Games" class="footer-logo-img">
        </a>
        <p class="footer-desc">
          Gravity Games (gravitygamez.fun) delivers free, instant HTML5 browser games built for mobile and desktop with zero downloads or logins.
        </p>
      </div>

      <div>
        <h3 class="footer-col-title">Game Genres</h3>
        <ul class="footer-nav-list">
          <li><a href="/games/action" class="footer-nav-link">Action &amp; Rage Games</a></li>
          <li><a href="/games/arcade" class="footer-nav-link">Arcade &amp; 3D Sandbox</a></li>
          <li><a href="/games/puzzle" class="footer-nav-link">Puzzle &amp; Chess</a></li>
          <li><a href="/games/skill" class="footer-nav-link">Skill &amp; One Button</a></li>
          <li><a href="/games/adventure" class="footer-nav-link">Adventure &amp; Simulation</a></li>
        </ul>
      </div>

      <div>
        <h3 class="footer-col-title">Guides &amp; Info</h3>
        <ul class="footer-nav-list">
          <li><a href="/blog.html" class="footer-nav-link">Gaming Blog &amp; Guides</a></li>
          <li><a href="/online-games-for-free.html" class="footer-nav-link">Online Games for Free</a></li>
          <li><a href="/free-browser-games-like-minecraft.html" class="footer-nav-link">Games Like Minecraft</a></li>
          <li><a href="/about.html" class="footer-nav-link">About Gravity Games</a></li>
          <li><a href="/contact.html" class="footer-nav-link">Developer Contact</a></li>
        </ul>
      </div>

      <div>
        <h3 class="footer-col-title">Legal &amp; Privacy</h3>
        <ul class="footer-nav-list">
          <li><a href="/privacy.html" class="footer-nav-link">Privacy Policy</a></li>
          <li><a href="/terms.html" class="footer-nav-link">Terms of Service</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>&copy; 2026 Gravity Games (gravitygamez.fun). All rights reserved.</span>
    </div>
  </footer>

  <nav class="mobile-bottom-nav" aria-label="Mobile quick navigation">
    <a href="/index.html" class="mobile-tab-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        <circle cx="8" cy="12" r="2"></circle>
        <path d="M15 9v6"></path>
        <path d="M12 12h6"></path>
      </svg>
      <span>Games</span>
    </a>
    <a href="/index.html?cat=trending" class="mobile-tab-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
      <span>Trending</span>
    </a>
    <a href="/index.html?cat=favorites" class="mobile-tab-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span>Saved</span>
    </a>
    <a href="/blog.html" class="mobile-tab-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
      <span>Guides</span>
    </a>
  </nav>

  <script src="/games-data.js"></script>
  <script src="/blog-data.js"></script>
  <script src="/app-core.js"></script>
  <script src="/genre.js"></script>
</body>
</html>`;
}

function buildTagHtml(rawTagSlug) {
  const cleanSlug = String(rawTagSlug || '').toLowerCase().trim();
  const tag = TAG_METADATA.find((t) => t.slug === cleanSlug);
  if (!tag) return null;

  const matchSet = new Set((tag.matchTags || []).map((m) => String(m).toLowerCase()));
  const tagGames = GAMES_DATA.filter((g) => (g.tags || []).some((t) => matchSet.has(String(t).toLowerCase())));
  const tagGameSlugs = new Set(tagGames.map((g) => g.slug));
  let relatedGuides = BLOG_ARTICLES.filter((a) => a.gameSlug && tagGameSlugs.has(a.gameSlug));
  if (relatedGuides.length === 0) {
    relatedGuides = BLOG_ARTICLES.slice(0, 3);
  } else {
    relatedGuides = relatedGuides.slice(0, 3);
  }

  const canonicalUrl = `${SITE_ORIGIN}/tags/${encodeURIComponent(tag.slug)}`;
  const ogImageRel = tag.ogImage || (tagGames[0] && tagGames[0].paths.cover) || 'Images/GravityGamez.png';
  const ogImageUrl = `${SITE_ORIGIN}/${encodeURI(ogImageRel)}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: tag.headline,
        description: tag.metaDescription,
        url: canonicalUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Gravity Games',
          url: `${SITE_ORIGIN}/`,
        },
      },
      {
        '@type': 'ItemList',
        name: `${tag.name} Browser Games`,
        numberOfItems: tagGames.length,
        itemListElement: tagGames.map((game, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_ORIGIN}/play.html?game=${encodeURIComponent(game.slug)}`,
          name: game.title,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Gravity Games', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: `#${tag.name}`, item: canonicalUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: (tag.faqs || []).map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  const switcherHtml = TAG_METADATA.map((item) => {
    const activeClass = item.slug === tag.slug ? ' active' : '';
    return `<a href="/tags/${escapeHtml(item.slug)}" class="filter-pill${activeClass}">#${escapeHtml(item.name)}</a>`;
  }).join('');

  const gamesHtml = tagGames.map((game) => `
    <a href="/play.html?game=${escapeHtml(game.slug)}" class="game-cover-card" data-slug="${escapeHtml(game.slug)}" title="Play ${escapeHtml(game.title)}">
      <img src="/${encodeURI(game.paths.cover)}" alt="${escapeHtml(game.title)} cover artwork" class="cover-art" loading="lazy" referrerpolicy="no-referrer">
      <div class="cover-overlay">
        <div class="cover-card-header">
          <img src="/${encodeURI(game.paths.icon)}" alt="${escapeHtml(game.title)} icon" class="cover-card-icon" loading="lazy" referrerpolicy="no-referrer">
          <span class="cover-card-title">${escapeHtml(game.title)}</span>
        </div>
        <div class="cover-card-meta">
          <span class="cover-card-category">${escapeHtml(game.category)} · ${escapeHtml(game.plays)}</span>
          <span class="cover-card-rating tabular-nums">★ ${escapeHtml(String(game.rating))}</span>
        </div>
      </div>
    </a>
  `).join('');

  const guidesHtml = relatedGuides.map((article) => {
    const url = article.customUrl ? `/${article.customUrl}` : `/article.html?id=${encodeURIComponent(article.id)}`;
    return `
      <article class="blog-card">
        <a href="${url}" title="${escapeHtml(article.title)}">
          <img src="/${encodeURI(article.banner || 'Images/GravityGamez.png')}" alt="${escapeHtml(article.title)}" class="blog-card-thumb" loading="lazy" referrerpolicy="no-referrer">
        </a>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="blog-card-cat">${escapeHtml(article.category)}</span>
            <span aria-hidden="true">·</span>
            <span>${escapeHtml(article.readTime || '5 min read')}</span>
          </div>
          <h3 class="blog-card-title"><a href="${url}">${escapeHtml(article.title)}</a></h3>
          <p class="blog-card-excerpt">${escapeHtml(article.excerpt)}</p>
          <div class="blog-card-actions">
            <a href="${url}" class="blog-read-link">Read Guide &rarr;</a>
            ${article.gameSlug ? `<a href="/play.html?game=${encodeURIComponent(article.gameSlug)}" class="blog-play-link">Play Game</a>` : ''}
          </div>
        </div>
      </article>
    `;
  }).join('');

  const faqsHtml = (tag.faqs || []).map((faq) => `
    <div class="genre-faq-item">
      <h3 class="genre-faq-q">${escapeHtml(faq.q)}</h3>
      <p class="genre-faq-a">${escapeHtml(faq.a)}</p>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${escapeHtml(tag.seoTitle)}</title>
  <meta name="description" content="${escapeHtml(tag.metaDescription)}">
  <meta name="theme-color" content="#0E1016">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <link rel="manifest" href="/manifest.webmanifest">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Gravity Games">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:title" content="${escapeHtml(tag.seoTitle)}">
  <meta property="og:description" content="${escapeHtml(tag.metaDescription)}">
  <meta property="og:image" content="${escapeHtml(ogImageUrl)}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${escapeHtml(canonicalUrl)}">
  <meta name="twitter:title" content="${escapeHtml(tag.seoTitle)}">
  <meta name="twitter:description" content="${escapeHtml(tag.metaDescription)}">
  <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}">

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png?v=2">
  <link rel="shortcut icon" href="/favicon.ico?v=2">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">

  <script id="dynamicTagSchema" type="application/ld+json">${safeJsonLd(schema)}</script>
</head>
<body>
  <header class="site-header">
    <div class="brand-group">
      <a href="/index.html" class="brand-link" title="Gravity Games Home">
        <img src="/logo.png" alt="Gravity Games" class="brand-logo-img">
      </a>
    </div>

    <div class="search-container">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="search" id="searchInput" class="search-input" placeholder="Search all 17 games..." autocomplete="off" aria-label="Search games">
        <span class="search-shortcut" aria-hidden="true">/</span>
      </div>
    </div>

    <div class="header-nav-group">
      <nav class="header-actions" aria-label="Primary navigation">
        <a href="/index.html" class="nav-link">All Games</a>
        <a href="/index.html?cat=trending" class="nav-link">Trending</a>
        <a href="/index.html?cat=favorites" class="nav-link">Favorites</a>
        <a href="/blog.html" class="nav-link">Guides</a>
      </nav>
      <button type="button" class="btn-surprise js-random-game" title="Launch a random game">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="16 3 21 3 21 8"></polyline>
          <line x1="4" y1="20" x2="21" y2="3"></line>
          <polyline points="21 16 21 21 16 21"></polyline>
          <line x1="15" y1="15" x2="21" y2="21"></line>
          <line x1="4" y1="4" x2="9" y2="9"></line>
        </svg>
        <span>Surprise Me</span>
      </button>
    </div>
  </header>

  <div class="app-container">
    <main class="main-viewport">
      <nav class="breadcrumb-nav" aria-label="Breadcrumb">
        <a href="/index.html">Gravity Games</a>
        <span aria-hidden="true">/</span>
        <span>#${escapeHtml(tag.name)}</span>
      </nav>

      <section class="genre-hero" aria-label="${escapeHtml(tag.name)} overview">
        <div class="genre-hero-meta tabular-nums">
          <span>${tagGames.length} ${tagGames.length === 1 ? 'Game' : 'Games'}</span>
          <span aria-hidden="true">·</span>
          <span>#${escapeHtml(tag.name)}</span>
          <span aria-hidden="true">·</span>
          <span>Instant Browser Play</span>
        </div>
        <h1 class="genre-hero-title">${escapeHtml(tag.headline)}</h1>
        <p class="genre-hero-intro">${escapeHtml(tag.intro)}</p>
      </section>

      <div class="genre-switcher-strip">
        <nav class="genre-switcher-links" aria-label="Browse tags">
          <a href="/index.html" class="filter-pill">All 17 Games</a>
          ${switcherHtml}
        </nav>

        <div class="sort-segmented-group" role="group" aria-label="Sort ${escapeHtml(tag.name)} games">
          <button type="button" class="sort-btn active" data-tag-sort="featured" aria-pressed="true">Featured</button>
          <button type="button" class="sort-btn" data-tag-sort="rating" aria-pressed="false">Top Rated</button>
          <button type="button" class="sort-btn" data-tag-sort="plays" aria-pressed="false">Most Played</button>
          <button type="button" class="sort-btn" data-tag-sort="alpha" aria-pressed="false">A–Z</button>
        </div>
      </div>

      <section aria-label="${escapeHtml(tag.name)} games">
        <div class="covers-grid" id="tagGamesGrid" data-tag="${escapeHtml(tag.slug)}">
          ${gamesHtml}
        </div>
      </section>

      <section aria-label="${escapeHtml(tag.name)} guides">
        <div class="section-header">
          <div class="section-title-group">
            <h2 class="section-title">Related Strategy Guides</h2>
          </div>
          <a href="/blog.html" class="section-meta-link">Browse all guides &rarr;</a>
        </div>
        <div class="guides-home-grid">
          ${guidesHtml}
        </div>
      </section>

      <section class="genre-faq-section" aria-label="Frequently asked questions">
        <h2 class="section-title">${escapeHtml(tag.name)} Games FAQ</h2>
        <div class="genre-faq-list">
          ${faqsHtml}
        </div>
      </section>
    </main>
  </div>

  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand-col">
        <a href="/index.html">
          <img src="/logo.png" alt="Gravity Games" class="footer-logo-img">
        </a>
        <p class="footer-desc">
          Gravity Games (gravitygamez.fun) delivers free, instant HTML5 browser games built for mobile and desktop with zero downloads or logins.
        </p>
      </div>

      <div>
        <h3 class="footer-col-title">Game Genres</h3>
        <ul class="footer-nav-list">
          <li><a href="/games/action" class="footer-nav-link">Action &amp; Rage Games</a></li>
          <li><a href="/games/arcade" class="footer-nav-link">Arcade &amp; 3D Sandbox</a></li>
          <li><a href="/games/puzzle" class="footer-nav-link">Puzzle &amp; Chess</a></li>
          <li><a href="/games/skill" class="footer-nav-link">Skill &amp; One Button</a></li>
          <li><a href="/games/adventure" class="footer-nav-link">Adventure &amp; Simulation</a></li>
        </ul>
      </div>

      <div>
        <h3 class="footer-col-title">Guides &amp; Info</h3>
        <ul class="footer-nav-list">
          <li><a href="/blog.html" class="footer-nav-link">Gaming Blog &amp; Guides</a></li>
          <li><a href="/online-games-for-free.html" class="footer-nav-link">Online Games for Free</a></li>
          <li><a href="/free-browser-games-like-minecraft.html" class="footer-nav-link">Games Like Minecraft</a></li>
          <li><a href="/about.html" class="footer-nav-link">About Gravity Games</a></li>
          <li><a href="/contact.html" class="footer-nav-link">Developer Contact</a></li>
        </ul>
      </div>

      <div>
        <h3 class="footer-col-title">Legal &amp; Privacy</h3>
        <ul class="footer-nav-list">
          <li><a href="/privacy.html" class="footer-nav-link">Privacy Policy</a></li>
          <li><a href="/terms.html" class="footer-nav-link">Terms of Service</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>&copy; 2026 Gravity Games (gravitygamez.fun). All rights reserved.</span>
    </div>
  </footer>

  <nav class="mobile-bottom-nav" aria-label="Mobile quick navigation">
    <a href="/index.html" class="mobile-tab-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        <circle cx="8" cy="12" r="2"></circle>
        <path d="M15 9v6"></path>
        <path d="M12 12h6"></path>
      </svg>
      <span>Games</span>
    </a>
    <a href="/index.html?cat=trending" class="mobile-tab-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
      <span>Trending</span>
    </a>
    <a href="/index.html?cat=favorites" class="mobile-tab-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span>Saved</span>
    </a>
    <a href="/blog.html" class="mobile-tab-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
      <span>Guides</span>
    </a>
  </nav>

  <script src="/games-data.js"></script>
  <script src="/blog-data.js"></script>
  <script src="/app-core.js"></script>
  <script src="/genre.js"></script>
</body>
</html>`;
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

app.get('/games', (req, res) => {
  res.redirect('/');
});

app.get(['/games/:genre', '/games/:genre.html'], (req, res) => {
  const html = buildGenreHtml(req.params.genre);
  if (!html) {
    return res.status(404).sendFile(path.join(__dirname, '404.html'));
  }
  res.type('html').send(html);
});

app.get('/tags', (req, res) => {
  res.redirect('/');
});

app.get(['/tags/:tag', '/tags/:tag.html'], (req, res) => {
  const html = buildTagHtml(req.params.tag);
  if (!html) {
    return res.status(404).sendFile(path.join(__dirname, '404.html'));
  }
  res.type('html').send(html);
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
