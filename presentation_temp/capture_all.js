import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function getDebugUrl() {
  try {
    const res = await fetch('http://localhost:9222/json');
    const targets = await res.json();
    // Find the target page that represents our local app
    const target = targets.find(t => t.type === 'page' && t.url.includes('localhost:4321'));
    if (!target) {
      throw new Error('Active page target on localhost:4321 not found. Make sure the site is open in the browser.');
    }
    return target.webSocketDebuggerUrl;
  } catch (err) {
    console.error('Error fetching debugging targets:', err);
    throw err;
  }
}

async function run() {
  const wsUrl = await getDebugUrl();
  console.log('Connecting to WebSocket:', wsUrl);
  
  const ws = new WebSocket(wsUrl);
  
  let msgId = 1;
  const pending = new Map();
  
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) {
        reject(msg.error);
      } else {
        resolve(msg.result);
      }
    }
  };
  
  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  };
  
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  
  console.log('Connected to Chrome DevTools Protocol.');
  
  // Set device metrics override to ensure exact 1920x1080 resolution
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false
  });
  
  const slides = [
    // 1. Home
    { url: 'http://localhost:4321/', name: 'slide_01.png', wait: 2000 },
    
    // 2. Solutions
    { url: 'http://localhost:4321/solutions', name: 'slide_02.png', scrollY: 0, wait: 1200 },
    { url: 'http://localhost:4321/solutions', name: 'slide_03.png', scrollY: 1080, wait: 1200 },
    { url: 'http://localhost:4321/solutions', name: 'slide_04.png', scrollY: 2160, wait: 1200 },
    { url: 'http://localhost:4321/solutions', name: 'slide_05.png', scrollY: 3240, wait: 1200 },
    { url: 'http://localhost:4321/solutions', name: 'slide_06.png', scrollY: 4320, wait: 1200 },
    
    // 3. Product (CircularFeatures)
    { url: 'http://localhost:4321/features', name: 'slide_07.png', scrollY: 0, wait: 2000 },
    { url: 'http://localhost:4321/features', name: 'slide_08.png', scrollY: 2160, wait: 1200 },
    { url: 'http://localhost:4321/features', name: 'slide_09.png', scrollY: 4320, wait: 1200 },
    { url: 'http://localhost:4321/features', name: 'slide_10.png', scrollY: 5400, wait: 1200 },
    { url: 'http://localhost:4321/features', name: 'slide_11.png', scrollY: 6480, wait: 1200 },
    { url: 'http://localhost:4321/features', name: 'slide_12.png', scrollY: 7560, wait: 1200 },
    { url: 'http://localhost:4321/features', name: 'slide_13.png', scrollY: 8640, wait: 1200 },
    { url: 'http://localhost:4321/features', name: 'slide_14.png', scrollY: 9720, wait: 1200 },
    { url: 'http://localhost:4321/features', name: 'slide_15.png', scrollY: 10800, wait: 1200 },
    
    // 4. Architecture
    { url: 'http://localhost:4321/architecture', name: 'slide_16.png', wait: 2000 }, // Title slide
    { url: 'http://localhost:4321/architecture', name: 'slide_17.png', js: `document.querySelectorAll('#architecture button')[1].click()`, wait: 1500 }, // Standard architecture diagram
    
    // 5. Cloud
    { url: 'http://localhost:4321/cloud', name: 'slide_18.png', wait: 2000 }, // Cloud overall
    { url: 'http://localhost:4321/cloud', name: 'slide_19.png', js: `document.querySelectorAll('.flex.justify-center.mb-6 button')[0].click()`, wait: 1200 }, // IoT Core
    { url: 'http://localhost:4321/cloud', name: 'slide_20.png', js: `document.querySelectorAll('.flex.justify-center.mb-6 button')[1].click()`, wait: 1200 }, // CloudFormation
    { url: 'http://localhost:4321/cloud', name: 'slide_21.png', js: `document.querySelectorAll('.flex.justify-center.mb-6 button')[2].click()`, wait: 1200 }, // CloudWatch
    { url: 'http://localhost:4321/cloud', name: 'slide_22.png', js: `document.querySelectorAll('.flex.justify-center.mb-6 button')[3].click()`, wait: 1200 }, // DynamoDB
    { url: 'http://localhost:4321/cloud', name: 'slide_23.png', js: `document.querySelectorAll('.flex.justify-center.mb-6 button')[4].click()`, wait: 1200 }, // REST API
    { url: 'http://localhost:4321/cloud', name: 'slide_24.png', js: `document.querySelectorAll('.flex.justify-center.mb-6 button')[5].click()`, wait: 1200 }, // Lambda
    
    // 6. Dashboard
    { url: 'http://localhost:4321/dashboard', name: 'slide_25.png', scrollY: 0, wait: 2000 },
    { url: 'http://localhost:4321/dashboard', name: 'slide_26.png', scrollY: 1080, wait: 1200 },
    { url: 'http://localhost:4321/dashboard', name: 'slide_27.png', scrollY: 2160, wait: 1200 },
    { url: 'http://localhost:4321/dashboard', name: 'slide_28.png', scrollY: 3240, wait: 1200 },
    { url: 'http://localhost:4321/dashboard', name: 'slide_29.png', scrollY: 4320, wait: 1200 },
    { url: 'http://localhost:4321/dashboard', name: 'slide_30.png', scrollY: 5400, wait: 1200 },
    { url: 'http://localhost:4321/dashboard', name: 'slide_31.png', scrollY: 6480, wait: 1200 },
    { url: 'http://localhost:4321/dashboard', name: 'slide_32.png', scrollY: 7560, wait: 1200 },
    { url: 'http://localhost:4321/dashboard', name: 'slide_33.png', scrollY: 8640, wait: 1200 },
    
    // 7. Future Work
    { url: 'http://localhost:4321/future-work', name: 'slide_34.png', wait: 2000 }, // Standard mode
    { url: 'http://localhost:4321/future-work', name: 'slide_35.png', js: `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('SCALE SYSTEM ARCHITECTURE'));
      if (btn) btn.click();
    `, wait: 2000 }, // Scaled mode
    
    // 8. Team
    { url: 'http://localhost:4321/team', name: 'slide_36.png', wait: 2000 },
    
    // 9. Pricing
    { url: 'http://localhost:4321/pricing', name: 'slide_37.png', wait: 2000 },
    
    // 10. Contact
    { url: 'http://localhost:4321/contact', name: 'slide_38.png', wait: 2000 }
  ];
  
  let currentUrl = '';
  
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    console.log(`[${i+1}/${slides.length}] Processing ${s.name} at ${s.url}...`);
    
    // Navigate if different URL
    if (s.url !== currentUrl) {
      await send('Page.navigate', { url: s.url });
      currentUrl = s.url;
      // Extra wait for page initialization
      await delay(s.wait);
    }
    
    // Scroll if scrollY specified
    if (s.scrollY !== undefined) {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo(0, ${s.scrollY});`
      });
      await delay(s.wait);
      
      // Secondary check scroll to ensure it settled
      await send('Runtime.evaluate', {
        expression: `window.scrollTo(0, ${s.scrollY});`
      });
      await delay(300);
    }
    
    // Run JS action if specified
    if (s.js) {
      await send('Runtime.evaluate', {
        expression: s.js
      });
      await delay(s.wait);
    }
    
    // Take screenshot
    console.log(`  Taking screenshot...`);
    const screenshotRes = await send('Page.captureScreenshot', { format: 'png' });
    const imgBuffer = Buffer.from(screenshotRes.data, 'base64');
    
    const outputPath = path.join(__dirname, s.name);
    fs.writeFileSync(outputPath, imgBuffer);
    console.log(`  Saved screenshot to ${s.name}`);
  }
  
  console.log('All screenshots captured successfully!');
  ws.close();
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error running capture script:', err);
  process.exit(1);
});
