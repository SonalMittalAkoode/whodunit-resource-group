const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true});
 const page=await browser.newPage();
 const findings=[];
 for(const file of fs.readdirSync('.').filter(f=>f.endsWith('.html'))){
  await page.goto('http://127.0.0.1:8765/'+file);
  await page.evaluate(async () => {
   for(let y=0;y<document.body.scrollHeight;y+=700) {
    window.scrollTo({top:y,behavior:'instant'});
    await new Promise(requestAnimationFrame);
   }
   window.scrollTo({top:0,behavior:'instant'});
  });
  await page.waitForTimeout(700);
  await page.addScriptTag({path:process.env.AXE_PATH});
  const violations = await page.evaluate(async () => {
    const result = await axe.run(document, {runOnly:['color-contrast','link-name','button-name','label']});
    return result.violations.map(v => ({id:v.id, nodes:v.nodes.map(n => ({target:n.target,summary:n.failureSummary}))}));
  });
  findings.push({file,violations});
 }
 fs.writeFileSync('docs/visual-review/accessibility.json',JSON.stringify(findings,null,2));
 if (process.env.CONTRAST_ONLY) {
  console.log(JSON.stringify(findings.filter(f=>f.violations.length),null,2));
  await browser.close();
  return;
 }
 await page.goto('http://127.0.0.1:8765/index.html');
 await page.clock.install();
 await page.reload();
 const images=await page.locator('.home-hero-slide').evaluateAll(els=>els.map(e=>e.getAttribute('src')));
 assert.deepEqual(images.map(s=>s.match(/iStock-(\d+)/)[1]),['1141536501','1383100164','1031620134','1386443883','2225713678']);
 for(let i=1;i<=5;i++){
  await page.clock.runFor(8000);
  assert.equal(await page.locator('.home-hero-slide.is-active').getAttribute('src'),images[i%5]);
 }
 await page.getByRole('button',{name:'Pause photos',exact:true}).click();
 const paused=await page.locator('.home-hero-slide.is-active').getAttribute('src');
 await page.clock.runFor(16000);
 assert.equal(await page.locator('.home-hero-slide.is-active').getAttribute('src'),paused);
 await page.getByRole('button',{name:'Play photos',exact:true}).click();
 await page.clock.runFor(8000);
 assert.notEqual(await page.locator('.home-hero-slide.is-active').getAttribute('src'),paused);
 await page.clock.resume();
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('http://127.0.0.1:8765/contact.html');
  await page.getByRole('button',{name:'Prepare Email Inquiry'}).click();
  assert.match(await page.locator('.form-status').innerText(),/highlighted/);
  assert(await page.locator('[aria-invalid="true"]').count()>0);
  for(const file of ['contact.html','sourcing.html']){
   await page.goto('http://127.0.0.1:8765/'+file);
   await page.waitForFunction(()=>!document.querySelector('video').paused);
   await page.getByRole('button',{name:'Pause video',exact:true}).focus();
   await page.getByRole('button',{name:'Pause video',exact:true}).click();
   assert(await page.locator('video').evaluate(v=>v.paused));
   await page.getByRole('button',{name:'Play video',exact:true}).click();
   await page.waitForFunction(()=>!document.querySelector('video').paused);
  }
  await page.goto('http://127.0.0.1:8765/product-detail.html');
  await page.getByRole('button',{name:'View red lentil specifications'}).click();
  assert(await page.getByRole('dialog').isVisible());
  await page.keyboard.press('Escape');
  assert(!(await page.getByRole('dialog').isVisible()));
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:8765/index.html');
 assert(await page.getByRole('button',{name:'Play photos',exact:true}).isVisible());
 console.log('PASS: five-photo order and full loop, eight-second interval, pause/resume, reduced motion; desktop/mobile form errors, video autoplay/pause/resume, product dialog.');
 console.log(findings.map(f=>({file:f.file,issues:f.violations.map(v=>({id:v.id,count:v.nodes.length}))})));
 await browser.close();
})();
