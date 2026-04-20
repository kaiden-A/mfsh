/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mfsh.motionukict.com',   // ← your domain
  generateRobotsTxt: true,            // ← auto-creates robots.txt too
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }, // allow all bots to crawl everything
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
}