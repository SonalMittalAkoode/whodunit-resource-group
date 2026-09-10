const { chromium } = require('C:/Users/Admin/AppData/Local/Temp/wrg-site-check/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({executablePath:'C:/Users/Admin/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe'});
 for (const width of [1440,768,390]) {
  const page = await browser.newPage({viewport:{width,height:1000}});
  await page.goto('http://127.0.0.1:8765/index.html');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.home-product-grid').scrollIntoViewIfNeeded();
  await page.locator('.home-product-grid').screenshot({path:'docs/visual-review/collage-' + width + '.png'});
  console.log(width, await page.evaluate(() => ({overflow:document.documentElement.scrollWidth > innerWidth, cards:[...document.querySelectorAll('.home-product-card')].map(e => ({height:e.clientHeight,content:e.scrollHeight}))})));
  await page.close();
 }
 await browser.close();
})();
