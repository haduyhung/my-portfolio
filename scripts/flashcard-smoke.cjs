/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression script. */
// Run against a local dev server. Playwright may be installed separately and supplied
// via PLAYWRIGHT_MODULE_PATH; no application dependency is required.
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');

const BASE_URL = process.env.FLASHCARD_BASE_URL || 'http://localhost:3000';
const words = [
  { id: [1, 1], edition: [1, 2], kanji: '先生', kana: 'せんせい', romaji: 'sensei', meaning: { vi: 'giáo viên', en: 'teacher', fr: 'professeur' } },
  { id: [1, 2], edition: [1, 2], kanji: '学生', kana: 'がくせい', romaji: 'gakusei', meaning: { vi: 'học sinh', en: 'student', fr: 'étudiant' } },
  { id: [1, 3], edition: [1, 2], kanji: null, kana: 'わたし', romaji: 'watashi', meaning: { vi: 'tôi', en: 'I', fr: 'moi' } },
];
const dataset = { lessons: [
  { id: 1, key: 'lesson-01', words },
  { id: 2, key: 'lesson-02', words: words.slice(0, 2).map((word, i) => ({ ...word, id: [2, i + 1] })) },
] };
const errors = [];
const outcomes = [];
let context;

async function pageFor(path) {
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const response = await page.goto(BASE_URL + path, { timeout: 90000 });
  assert.equal(response.status(), 200, path);
  // Numbers renders its menu on the server; wait for its client handlers before clicking.
  await page.waitForLoadState('networkidle');
  return page;
}
const cardOf = page => page.locator('button[aria-pressed]');
async function front(page, index = 1, total = 3) {
  await page.waitForFunction(({ index, total }) => {
    const card = document.querySelector('button[aria-pressed]');
    return card?.getAttribute('aria-pressed') === 'false'
      && document.body.innerText.includes(`${index} / ${total}`);
  }, { index, total }, { timeout: 10000 });
}
async function flipped(page, value) {
  await page.waitForFunction(value => document.querySelector('button[aria-pressed]')?.getAttribute('aria-pressed') === String(value), value, { timeout: 10000 }).catch(async error => { error.message += ` STATE ${JSON.stringify(await snapshot(page))}`; throw error; });
}
async function snapshot(page) {
  return cardOf(page).evaluate(card => ({ pressed: card.getAttribute('aria-pressed'), text: card.textContent, progress: card.parentElement.innerText.match(/\d+ \/ \d+/)?.[0] }));
}
async function reveal(page) {
  await cardOf(page).focus();
  await page.keyboard.press('Enter');
  await flipped(page, true);
}
async function dragCard(page, dx, dy = 0, cancel = false) {
  const card = cardOf(page);
  await settleCard(page);
  const box = await card.boundingBox();
  assert.ok(box);
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  for (let step = 1; step <= 8; step++) {
    await page.mouse.move(x + dx * step / 8, y + dy * step / 8);
    await page.waitForTimeout(20);
  }
  if (cancel) await card.dispatchEvent('pointercancel', { pointerId: 1, pointerType: 'mouse', isPrimary: true });
  await page.mouse.up();
}
async function settleCard(page) {
  await page.waitForFunction(() => {
    const card = document.querySelector('button[aria-pressed]');
    if (!card) return false;
    const face = card.firstElementChild;
    if (!face || getComputedStyle(face).opacity !== '1') return false;
    const transform = getComputedStyle(card).transform;
    return transform === 'none' || Math.abs(new DOMMatrixReadOnly(transform).m41) < 0.5;
  });
}
async function assertBottomAction(page, button) {
  const metrics = await button.evaluate(element => {
    let container = element;
    while (container && getComputedStyle(container).position !== 'fixed') container = container.parentElement;
    const buttonBox = element.getBoundingClientRect();
    return { fixed: !!container, top: buttonBox.top, bottom: buttonBox.bottom, viewport: window.innerHeight };
  });
  assert.ok(metrics.fixed, 'Mobile actions must have a fixed container');
  assert.ok(metrics.top >= metrics.viewport - 170 && metrics.bottom <= metrics.viewport, JSON.stringify(metrics));
}
async function scenario(name, run) {
  if (process.env.FLASHCARD_SCENARIO && !name.includes(process.env.FLASHCARD_SCENARIO)) return;
  try { await run(); outcomes.push({ name, status: 'PASS' }); console.log('PASS', name); }
  catch (error) { outcomes.push({ name, status: 'FAIL', message: error.message }); console.error('FAIL', name, error.stack); }
}

(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome', headless: true });
  context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.addInitScript(() => { localStorage.setItem('jp_auth', '1'); });
  await context.route('**/data/minna-no-ds.json', route => route.fulfill({ json: dataset }));

  await scenario('normal flashcard: initial focus, both flip keys, front answer guard, hold guard', async () => {
    const page = await pageFor('/en/japanese/minna/1/flashcard');
    await front(page);
    const card = cardOf(page);
    assert.equal(await card.evaluate(element => element === document.activeElement), true);
    const firstFront = await card.innerText();
    const word = words.find(word => firstFront.includes(word.kana));
    assert.ok(word);
    if (word.kanji) assert.ok((await card.innerText()).includes(word.kanji));
    assert.ok(!(await card.innerText()).includes(word.romaji));
    const initial = await snapshot(page);
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');
    assert.deepEqual(await snapshot(page), initial);
    await page.keyboard.press('Enter');
    await flipped(page, true);
    for (const text of [word.meaning.en, word.romaji, word.kana]) assert.ok((await card.innerText()).includes(text));
    await page.keyboard.press('Space');
    await flipped(page, false);
    await page.keyboard.down('Enter');
    await flipped(page, true);
    await page.keyboard.down('Enter');
    await page.keyboard.up('Enter');
    await flipped(page, true);
    assert.equal(await page.getByRole('button', { name: 'Lật lại', exact: true }).count(), 0);
    await card.focus();
    await page.keyboard.press('Space');
    await flipped(page, false);
    await page.keyboard.press('Enter');
    await flipped(page, true);
    assert.equal(await page.getByText(/Space \/ Enter: lật thẻ/).count(), 0, 'Keyboard instructions must not be rendered on desktop');
    await page.close();
  });

  await scenario('modifier keys never trigger native card/flip activation', async () => {
    const page = await pageFor('/en/japanese/minna/1/flashcard');
    await front(page);
    for (const target of [cardOf(page), page.getByRole('button', { name: 'Lật thẻ', exact: true })]) {
      for (const key of ['Shift+Enter', 'Control+Enter', 'Alt+Enter', 'Meta+Enter', 'Shift+Space', 'Control+Space', 'Alt+Space', 'Meta+Space']) {
        await target.focus();
        const before = await snapshot(page);
        await page.keyboard.press(key);
        assert.deepEqual(await snapshot(page), before, key);
      }
    }
    await page.close();
  });

  await scenario('editable targets and unrelated controls retain keyboard behavior', async () => {
    const page = await pageFor('/en/japanese/minna/1/flashcard');
    await front(page);
    await reveal(page);
    for (const tag of ['input', 'textarea', 'select', 'contenteditable', 'textbox']) {
      await cardOf(page).evaluate((card, tag) => {
        const input = document.createElement(['contenteditable', 'textbox'].includes(tag) ? 'div' : tag);
        input.id = 'smoke-editable';
        input.tabIndex = 0;
        if (tag === 'contenteditable') input.contentEditable = 'true';
        if (tag === 'textbox') input.setAttribute('role', 'textbox');
        card.parentElement.appendChild(input);
        input.focus();
      }, tag);
      const before = await snapshot(page);
      for (const key of ['Enter', 'Space', 'ArrowLeft', 'ArrowRight']) await page.keyboard.press(key);
      assert.deepEqual(await snapshot(page), before, tag);
      await page.locator('#smoke-editable').evaluate(element => element.remove());
    }
    await cardOf(page).dispatchEvent('keydown', { key: 'Enter', isComposing: true });
    await flipped(page, true);
    const exit = page.getByRole('button', { name: 'Về bài học', exact: true });
    await exit.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL('**/en/japanese/minna/1');
    await page.close();
  });

  await scenario('normal completion, transition lock, unknown-only review, full restart', async () => {
    const page = await pageFor('/en/japanese/minna/1/flashcard');
    await front(page);
    const unknownFront = await cardOf(page).innerText();
    await reveal(page);
    await cardOf(page).evaluate(card => {
      for (const key of ['ArrowLeft', 'ArrowRight', 'Enter', ' ']) card.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    });
    await front(page, 2);
    assert.equal(await cardOf(page).evaluate(element => element === document.activeElement), true);
    await reveal(page);
    await page.getByRole('button', { name: 'Biết rồi →', exact: true }).focus();
    await page.keyboard.press('Enter');
    await front(page, 3);
    await reveal(page);
    await page.getByRole('button', { name: 'Biết rồi →', exact: true }).focus();
    await page.keyboard.press('Space');
    const result = page.getByRole('heading', { name: 'Kết quả', exact: true });
    await result.waitFor();
    assert.equal(await result.evaluate(element => element === document.activeElement), true);
    assert.match(await page.getByText('Đã biết', { exact: true }).locator('..').innerText(), /^2\s+Đã biết$/);
    assert.match(await page.getByText('Chưa biết', { exact: true }).locator('..').innerText(), /^1\s+Chưa biết$/);
    await page.getByRole('button', { name: 'Ôn lại 1 từ chưa biết', exact: true }).click();
    await front(page, 1, 1);
    assert.equal(await cardOf(page).innerText(), unknownFront);
    await reveal(page);
    await page.keyboard.press('ArrowRight');
    await result.waitFor();
    assert.equal(await page.getByRole('button', { name: /Ôn lại .* từ chưa biết/ }).count(), 0);
    await page.getByRole('button', { name: 'Làm lại từ đầu', exact: true }).focus();
    await page.keyboard.press('Enter');
    await front(page, 1, 3);
    await page.close();
  });

  await scenario('reverse Vietnamese front across en/fr/vi; Japanese, kana and romaji on back', async () => {
    for (const locale of ['en', 'fr', 'vi']) {
      const page = await pageFor(`/${locale}/japanese/minna/1/reverse-flashcard`);
      await front(page);
      const card = cardOf(page);
      const unknownFront = await card.innerText();
      const seen = new Set();
      for (let i = 0; i < 3; i++) {
        await front(page, i + 1);
        const frontText = await card.innerText();
        const word = words.find(word => frontText.includes(word.meaning.vi));
        assert.ok(word);
        assert.ok(!seen.has(word.kana));
        seen.add(word.kana);
        assert.doesNotMatch(frontText, /teacher|professeur|先生|せんせい|sensei|学生|がくせい|gakusei|わたし|watashi/);
        await reveal(page);
        for (const text of [word.kanji, word.kana, word.romaji].filter(Boolean)) assert.ok((await card.innerText()).includes(text));
        assert.ok(!(await card.innerText()).includes(word.meaning.vi));
        await page.keyboard.press(i === 0 ? 'ArrowLeft' : 'ArrowRight');
      }
      await page.getByRole('heading', { name: 'Kết quả' }).waitFor();
      await page.getByRole('button', { name: 'Ôn lại 1 từ chưa biết', exact: true }).click();
      await front(page, 1, 1);
      assert.equal(await card.innerText(), unknownFront);
      await reveal(page);
      await page.keyboard.press('ArrowRight');
      await page.getByRole('button', { name: 'Làm lại từ đầu', exact: true }).click();
      await front(page);
      const restartedFront = await card.innerText();
      assert.ok(words.some(word => restartedFront.includes(word.meaning.vi)));
      await page.close();
    }
  });

  await scenario('Minna and Numbers exercise links and return navigation', async () => {
    for (const source of ['minna', 'numbers']) {
      const page = await pageFor(`/vi/japanese/${source}/1`);
      const option = page.getByRole('button', { name: /Flashcard đảo ngược/ });
      // Motion menus start at opacity 0 in server HTML. Playwright considers
      // these clickable before hydration; wait until the option is actually shown.
      await page.waitForFunction(element => getComputedStyle(element).opacity === '1', await option.elementHandle());
      await option.click();
      await page.waitForURL(`**/vi/japanese/${source}/1/reverse-flashcard`);
      await cardOf(page).waitFor();
      assert.equal(await cardOf(page).getAttribute('aria-pressed'), 'false');
      assert.doesNotMatch(await cardOf(page).innerText(), /[\u3040-\u30ff\u4e00-\u9fff]/);
      await reveal(page);
      assert.match(await cardOf(page).innerText(), /[\u3040-\u30ff\u4e00-\u9fff]/);
      await page.getByRole('button', { name: 'Về bài học', exact: true }).focus();
      await page.keyboard.press('Space');
      await page.waitForURL(`**/vi/japanese/${source}/1`);
      await page.close();
    }
  });

  await scenario('review reverse selection, lesson range and return configuration', async () => {
    const page = await pageFor('/vi/japanese/review?from=1&to=2&type=flashcard');
    await page.getByRole('radio', { name: /Flashcard đảo ngược/ }).locator('..').click();
    await page.waitForURL('**/vi/japanese/review?from=1&to=2&type=reverse-flashcard');
    assert.equal(new URL(page.url()).searchParams.get('type'), 'reverse-flashcard');
    await page.getByRole('button', { name: 'Bắt đầu ôn tập' }).click();
    await page.waitForURL('**/vi/japanese/review/reverse-flashcard?from=1&to=2');
    await front(page, 1, 5);
    await page.getByRole('button', { name: 'Về cài đặt', exact: true }).click();
    await page.waitForURL('**/vi/japanese/review?from=1&to=2&type=reverse-flashcard');
    assert.equal(await page.getByRole('radio', { name: /Flashcard đảo ngược/ }).isChecked(), true);
    assert.equal(await page.locator('#review-from').innerText(), 'Bài 1');
    assert.equal(await page.locator('#review-to').innerText(), 'Bài 2');
    await page.reload();
    await page.getByRole('button', { name: 'Bắt đầu ôn tập' }).waitFor();
    assert.equal(await page.getByRole('radio', { name: /Flashcard đảo ngược/ }).isChecked(), true);
    await page.close();
  });

  await scenario('mobile reverse card layout and tap flip', async () => {
    const page = await pageFor('/vi/japanese/minna/1/reverse-flashcard');
    await page.setViewportSize({ width: 390, height: 844 });
    await front(page);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    const initialBox = await cardOf(page).boundingBox();
    await assertBottomAction(page, page.getByRole('button', { name: 'Lật thẻ', exact: true }));
    await cardOf(page).click();
    await flipped(page, true);
    const backBox = await cardOf(page).boundingBox();
    assert.ok(Math.abs(initialBox.height - backBox.height) <= 1, 'Card height changes after flipping');
    assert.equal(await page.getByRole('button', { name: 'Lật lại', exact: true }).count(), 0);
    assert.equal(await page.getByRole('button', { name: 'Lật thẻ', exact: true }).count(), 0);
    await assertBottomAction(page, page.getByRole('button', { name: '← Chưa biết', exact: true }));
    await assertBottomAction(page, page.getByRole('button', { name: 'Biết rồi →', exact: true }));
    if (process.env.FLASHCARD_SCREENSHOT_PATH) {
      await page.waitForFunction(() => getComputedStyle(document.querySelector('button[aria-pressed] > span')).opacity === '1');
      const backPath = process.env.FLASHCARD_SCREENSHOT_PATH.replace(/(\.[^.]+)$/, '-back$1');
      await page.screenshot({ path: backPath, fullPage: true });
    }
    await cardOf(page).click();
    await flipped(page, false);
    assert.ok(Math.abs(initialBox.height - (await cardOf(page).boundingBox()).height) <= 1);
    await page.getByRole('button', { name: 'Mở menu', exact: true }).click();
    const action = page.getByRole('button', { name: 'Lật thẻ', exact: true });
    assert.equal(await action.evaluate(element => {
      const box = element.getBoundingClientRect();
      return element.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
    }), false, 'Mobile sidebar must cover the fixed action buttons');
    await page.mouse.click(380, 400);
    await page.waitForFunction(() => !document.querySelector('div.fixed.inset-0.z-20'));
    if (process.env.FLASHCARD_SCREENSHOT_PATH) {
      await page.waitForFunction(() => getComputedStyle(document.querySelector('button[aria-pressed] > span')).opacity === '1');
      await page.screenshot({ path: process.env.FLASHCARD_SCREENSHOT_PATH, fullPage: true });
    }
    await page.close();
  });

  await scenario('mouse swipe scoring, short drags, vertical drags and pointer cancellation', async () => {
    const page = await pageFor('/vi/japanese/minna/1/reverse-flashcard');
    await front(page);
    const initial = await snapshot(page);
    await dragCard(page, 110);
    assert.deepEqual(await snapshot(page), initial, 'Dragging the unrevealed card must not reveal or score it');
    await reveal(page);
    const revealed = await snapshot(page);
    for (const [dx, dy, cancel] of [[24, 0, false], [10, 90, false], [90, 0, true]]) {
      await dragCard(page, dx, dy, cancel);
      assert.deepEqual(await snapshot(page), revealed, `Drag dx=${dx}, dy=${dy}, cancel=${cancel} must not flip or score`);
    }
    await dragCard(page, -110);
    await front(page, 2);
    await page.keyboard.press('ArrowRight');
    await reveal(page);
    await dragCard(page, 110);
    await front(page, 3);
    await cardOf(page).click();
    await flipped(page, true);
    await dragCard(page, 110);
    await page.getByRole('heading', { name: 'Kết quả', exact: true }).waitFor();
    assert.match(await page.getByText('Đã biết', { exact: true }).locator('..').innerText(), /^2\s+Đã biết$/);
    assert.match(await page.getByText('Chưa biết', { exact: true }).locator('..').innerText(), /^1\s+Chưa biết$/);
    await page.close();
  });

  await scenario('touch swipe left/right and touch cancel preserve tap behavior', async () => {
    const page = await pageFor('/vi/japanese/minna/1/flashcard');
    await page.setViewportSize({ width: 390, height: 844 });
    const client = await context.newCDPSession(page);
    await client.send('Emulation.setTouchEmulationEnabled', { enabled: true });
    const touch = async (dx, cancel = false) => {
      await settleCard(page);
      const box = await cardOf(page).boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      for (let step = 1; step <= 6; step++) {
        await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * step / 6, y }] });
        await page.waitForTimeout(20);
      }
      await client.send('Input.dispatchTouchEvent', { type: cancel ? 'touchCancel' : 'touchEnd', touchPoints: [] });
    };
    await front(page);
    await touch(0);
    await flipped(page, true);
    const initial = await snapshot(page);
    await touch(24);
    assert.deepEqual(await snapshot(page), initial, 'Short touch drag must not flip');
    await touch(90, true);
    assert.deepEqual(await snapshot(page), initial, 'Cancelled touch must not score');
    await touch(-110);
    await front(page, 2);
    await touch(0);
    await flipped(page, true);
    await touch(110);
    await front(page, 3);
    await touch(0);
    await flipped(page, true);
    await touch(110);
    await page.getByRole('heading', { name: 'Kết quả', exact: true }).waitFor();
    assert.match(await page.getByText('Đã biết', { exact: true }).locator('..').innerText(), /^2\s+Đã biết$/);
    assert.match(await page.getByText('Chưa biết', { exact: true }).locator('..').innerText(), /^1\s+Chưa biết$/);
    await page.close();
  });

  await scenario('Minna and Numbers Romaji switches hide columns and support keyboard/mobile', async () => {
    for (const source of ['minna', 'numbers']) {
      const page = await pageFor(`/vi/japanese/${source}/1`);
      const toggle = page.getByRole('switch', { name: 'Hiện Romaji', exact: true });
      await toggle.waitFor();
      assert.equal(await toggle.getAttribute('aria-checked'), 'true');
      const header = page.getByText('Romaji', { exact: true });
      await header.waitFor();
      const row = header.locator('..');
      const columns = await row.evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length);
      const romaji = source === 'minna' ? 'sensei' : 'ichi';
      assert.ok(await page.getByText(romaji, { exact: true }).count() > 0);
      await toggle.focus();
      await page.keyboard.press('Space');
      assert.equal(await toggle.getAttribute('aria-checked'), 'false');
      assert.equal(await header.count(), 0);
      assert.equal(await page.getByText(romaji, { exact: true }).count(), 0);
      const newHeader = page.getByText('漢字', { exact: true }).locator('..');
      assert.equal(await newHeader.evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length), columns - 1);
      await page.keyboard.press('Enter');
      assert.equal(await toggle.getAttribute('aria-checked'), 'true');
      await header.waitFor();
      await page.setViewportSize({ width: 390, height: 844 });
      await toggle.click();
      assert.equal(await toggle.getAttribute('aria-checked'), 'false');
      assert.equal(await header.count(), 0);
      await toggle.click();
      assert.equal(await toggle.getAttribute('aria-checked'), 'true');
      await page.close();
    }
  });

  const uniqueErrors = [...new Set(errors)];
  console.log(JSON.stringify({ outcomes, browserErrors: uniqueErrors }, null, 2));
  await browser.close();
  process.exitCode = outcomes.some(outcome => outcome.status === 'FAIL') || uniqueErrors.length > 0 ? 1 : 0;
})().catch(error => { console.error(error); process.exitCode = 1; });
