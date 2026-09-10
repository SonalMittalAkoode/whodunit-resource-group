const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH});
 const results = [];
 for (const width of [1440,768,390]) {
  const page = await browser.newPage({viewport:{width,height:1100}});
  await page.goto('http://127.0.0.1:8765/index.html');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.source-cta').evaluate(e => window.scrollTo({top:e.offsetTop,behavior:'instant'}));
  await page.screenshot({path:`docs/visual-review/cta-footer-${width}.png`});
  await page.addScriptTag({path:process.env.AXE_PATH});
  const state = await page.evaluate(async () => {
   const cta = await axe.run(document.querySelector('.source-cta'),{runOnly:['color-contrast','link-name']});
   const footer = await axe.run(document.querySelector('.site-footer'),{runOnly:['color-contrast','link-name']});
   return {overflow:document.documentElement.scrollWidth>innerWidth, violations:[...cta.violations,...footer.violations].map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))};
  });
  results.push({width,...state});
  await page.locator('.wrg-footer-panel').screenshot({path:`docs/visual-review/footer-${width}.png`});
  await page.close();
 }
 const page = await browser.newPage();
 for(const file of fs.readdirSync('.').filter(f=>f.endsWith('.html'))) {
  await page.goto('http://127.0.0.1:8765/'+file);
  const links = await page.locator('.wrg-footer-panel a').evaluateAll(elements=>elements.map(e=>e.getAttribute('href')));
  for(const link of links.filter(l=>!/^https?:|^mailto:|^tel:/.test(l))) {
   const [target,fragment]=link.split('#');
   if(!fs.existsSync(target)) throw Error('Missing footer target: '+link);
   if(fragment && !fs.readFileSync(target,'utf8').includes(`id="${fragment}"`)) throw Error('Missing footer fragment: '+link);
  }
 }
 await browser.close();
 fs.writeFileSync('docs/visual-review/cta-footer-results.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));
 console.log('Footer links resolve on all 13 pages.');
})();
