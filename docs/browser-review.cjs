const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH, headless:true});
  const output = path.resolve('docs/visual-review');
  fs.mkdirSync(output, {recursive:true});
  const results=[];
  for(const width of [1440,768,390]) {
    const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1,isMobile:width===390,hasTouch:width===390});
    for(const file of fs.readdirSync('.').filter(f=>f.endsWith('.html'))) {
      const page=await context.newPage(); const errors=[];
      page.on('pageerror', e=>errors.push(e.message));
      await page.goto('http://127.0.0.1:8765/'+file);
      await page.evaluate(()=>document.fonts.ready);
      // Visit every section so lazy images and scroll-reveal content are visible.
      await page.evaluate(async () => {
        for(let y=0;y<document.body.scrollHeight;y+=700) {
          window.scrollTo({top:y,behavior:'instant'});
          await new Promise(requestAnimationFrame);
        }
        window.scrollTo({top:0,behavior:'instant'});
      });
      await page.waitForTimeout(700);
      const state=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth,
        wide:[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+2 && e.getBoundingClientRect().width>0).slice(0,8).map(e=>e.className),
        brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),
        videos:[...document.querySelectorAll('video')].map(v=>({autoplay:v.autoplay,muted:v.muted,controls:v.controls,paused:v.paused,ready:v.readyState})),
        small:[...document.querySelectorAll('main p,main a,main label,footer a')].filter(e=>e.getBoundingClientRect().width && parseFloat(getComputedStyle(e).fontSize)<14).map(e=>e.className),
        branding:/akoode|made with|built with/i.test(document.body.innerText),
        h1:document.querySelectorAll('h1').length,
      }));
      if (!process.env.SKIP_SCREENSHOTS) await page.screenshot({path:path.join(output,`${file.replace('.html','')}-${width}.png`),fullPage:true});
      results.push({file,width,...state,errors});
      await page.close();
    }
    await context.close();
  }
  fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.filter(r=>r.overflow||r.errors.length||r.brokenImages.length||r.small.length||r.branding||r.videos.length),null,2));
  await browser.close();
})();
