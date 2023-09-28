import { test, expect } from '@playwright/test';

test('test', async ({ page, browser }) => {
  await page.goto('https://stackblitz.com/');
  await page.getByRole('button', { name: 'Vite' }).click();
  await page.getByRole('link', { name: 'vanilla Vite' }).click();
  const iframe = page.frameLocator('iframe[title="Preview page"]');
  await iframe.getByRole('button', { name: 'count is 0' }).click();
  await expect(
    iframe.getByRole('button', { name: 'count is 1' })
  ).toBeVisible();

  await page.getByText('main.js', { exact: true }).click();
  await page.getByText('<h1>Hello Vite!</h1>').click();
  await page
    .getByLabel('Editor content;Press Alt+F1 for Accessibility Options.')
    .fill(
      '    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">\n      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />\n    </a>\n    <h1>Playwright & Vite!</h1>\n    <div class="card">\n      <button id="counter" type="button"></button>\n    </div>\n    <p class="read-the-docs">\n'
    );
  await page.getByText('counter.js', { exact: true }).click();

  await page
    .getByLabel('Editor content;Press Alt+F1 for Accessibility Options.')
    .fill(
      "export function setupCounter(element) {\n  let counter = 5\n  const setCounter = (count) => {\n    counter = count\n    element.innerHTML = `count is ${counter}`\n  }\n  element.addEventListener('click', () => setCounter(counter + 1))\n  setCounter(0)\n}\n"
    );
  await page
    .getByLabel('Editor content;Press Alt+F1 for Accessibility Options.')
    .fill(
      "export function setupCounter(element) {\n  let counter = 5\n  const setCounter = (count) => {\n    counter = count\n    element.innerHTML = `count is ${counter}`\n  }\n  element.addEventListener('click', () => setCounter(counter + 5))\n  setCounter(0)\n}\n"
    );
  await page
    .getByLabel('Editor content;Press Alt+F1 for Accessibility Options.')
    .fill(
      "export function setupCounter(element) {\n  let counter = 5\n  const setCounter = (count) => {\n    counter = count\n    element.innerHTML = `count is ${counter}`\n  }\n  element.addEventListener('click', () => setCounter(counter + 5))\n  setCounter(5)\n}\n"
    );

  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Share' }).click();
  await page.getByRole('button', { name: 'Copy URL' }).click();

  // create a new incognito browser context
  const context = await browser.newContext();
  // create a page insde that context
  const page1 = await context.newPage();
  await page1.goto(
    'https://stackblitz.com/edit/vitejs-vite-qtwkn2?file=counter.js'
  );
  const iframe2 = page1.frameLocator('iframe[title="Preview page"]');
  await iframe2.getByRole('button', { name: 'count is 5' }).click();
  await expect(
    iframe2.getByRole('button', { name: 'count is 10' })
  ).toBeVisible();
});
