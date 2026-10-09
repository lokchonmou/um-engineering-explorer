import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root = path.dirname(new URL(import.meta.url).pathname);
const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
let elements;
let handlers;
let registered;
let nav;
let sandbox;
let document;
const nodeList = items => Object.assign({ length: items.length, forEach: callback => items.forEach(callback), [Symbol.iterator]: function* () { yield* items; } }, items);
const camel = key => key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

function attrs(tag) {
  const result = {};
  for (const match of tag.matchAll(/([\w-]+)(?:="([^"]*)")?/g)) result[match[1]] = match[2] ?? '';
  return result;
}
class Element {
  constructor(tag, properties = {}) {
    this.tagName = tag.toUpperCase();
    this.properties = properties;
    this.id = properties.id;
    this.dataset = {};
    for (const [key, value] of Object.entries(properties)) if (key.startsWith('data-')) this.dataset[camel(key.slice(5))] = value;
    this.hidden = Object.hasOwn(properties, 'hidden');
    this.checked = Object.hasOwn(properties, 'checked');
    this.value = properties.value ?? '';
    this._html = '';
    this.children = [];
    this.events = {};
    this.textContent = '';
  }
  set innerHTML(value) {
    this._html = value;
    this.children = [...value.matchAll(/<(input|button|option|select|p)\b[^>]*>/g)].map(match => new Element(match[1], attrs(match[0])));
  }
  get innerHTML() { return this._html; }
  addEventListener(type, handler) { this.events[type] = handler; }
  setAttribute(key, value) { this.properties[key] = value; }
  removeAttribute(key) { delete this.properties[key]; }
  focus() { document.activeElement = this; }
  closest(selector) { const key = camel(selector.match(/^\[data-(.+)\]$/)?.[1] || ''); return key && key in this.dataset ? this : null; }
}
function boot({ webmcp = true, mobile = false } = {}) {
elements = new Map(); handlers = new Map(); registered = new Map();
for (const match of html.matchAll(/<(\w+)\b[^>]*\bid="[^"]+"[^>]*>/g)) {
  const properties = attrs(match[0]);
  assert(!elements.has(properties.id), `Duplicate id: ${properties.id}`);
  elements.set(properties.id, new Element(match[1], properties));
}
nav = [...html.matchAll(/<button\b[^>]*data-view="[^"]+"[^>]*>/g)].map(match => new Element('button', attrs(match[0])));
document = {
  getElementById(id) { assert(elements.has(id), `Missing DOM element: ${id}`); return elements.get(id); },
  addEventListener(type, handler) { handlers.set(type, handler); },
  querySelectorAll(selector) {
    if (selector === '.view') return nodeList([...elements.values()].filter(element => element.properties.class === 'view'));
    if (selector === '.view-nav [data-view]') return nodeList(nav.slice(0, 5));
    const key = camel(selector.match(/^\[data-(.+)\]$/)?.[1] || '');
    if (key) return nodeList([...elements.values()].flatMap(element => element.children).filter(element => key in element.dataset));
    throw new Error(`Unexpected selector: ${selector}`);
  },
  ...(webmcp ? { modelContext: { registerTool(tool) { assert(!registered.has(tool.name)); registered.set(tool.name, tool); } } } : {})
};
sandbox = vm.createContext({ document, window: { scrollTo() {}, addEventListener() {}, matchMedia() { return { matches: mobile }; } }, URL, AbortController, console });
vm.runInContext(fs.readFileSync(path.join(root, 'dist/data.js'), 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'dist/preparation.js'), 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'dist/app.js'), 'utf8'), sandbox);
}
boot();
const queryAll = selector => [...document.querySelectorAll(selector)];
const data = sandbox.window.EXPLORER_DATA;
const read = () => registered.get('read_engineering_exploration').execute({});
const readPlain = () => JSON.parse(JSON.stringify(read()));
const dispatchChange = (input, checked) => { input.checked = checked; handlers.get('change')({ target: input }); };
const inputFor = (key, value) => {
  const input = queryAll(`[data-${key}]`).find(element => element.dataset[camel(key)] === value || element.value === value);
  assert(input, `Missing input ${key}=${value}`); return input;
};
const passed = [];
function check(name, fn) { fn(); passed.push(name); }

check('Six complete programme records and traceable primary sources', () => {
  assert.equal(data.programmes.length, 6);
  assert.equal(new Set(data.programmes.map(p => p.id)).size, 6);
  assert.equal(new Set(data.sources.map(s => s.id)).size, data.sources.length);
  for (const source of data.sources) assert.equal(new URL(source.url).protocol, 'https:');
  for (const programme of data.programmes) {
    for (const key of ['purpose', 'learn', 'math', 'coding', 'ai', 'syllabus']) assert(programme[key]?.length);
    assert(programme.courses.length && programme.careers.length);
    for (const id of [...programme.sources, ...programme.aiSource]) assert(data.sources.some(s => s.id === id));
    if (programme.planned) assert(programme.syllabus.includes('2028/2029') && programme.syllabus.includes('公報'));
  }
  const tasks = [...data.commonTasks, ...Object.values(data.majorTasks).flat()];
  assert.equal(new Set(tasks.map(t => t.id)).size, tasks.length);
  for (const task of tasks) assert(task.evidence.length);
  assert.equal(data.commonTasks.length, 8);
  for (const task of data.commonTasks) assert.equal(task.feedback.length, 4);
  assert.deepEqual(JSON.parse(JSON.stringify(data.examOptions.map(exam => exam.id))), ['python', 'cie-other', 'arduino', 'other', 'ielts', 'igcse', 'ial']);
  for (const exam of data.examOptions) if (exam.source) assert(data.sources.some(source => source.id === exam.source));
  assert(data.examOptions.find(exam => exam.id === "python").label.includes("1–6"));
  assert(data.sources.find(source => source.id === "python-exam").url.includes("qceit.org.cn"));
  assert(elements.get("checklist-content").innerHTML.includes("2027/2028"));
  assert(elements.get("checklist-content").innerHTML.includes("參賽本身不等於獲獎"));
});
check('First render: all six cards, default comparison and source list', () => {
  assert.equal((elements.get('programme-grid').innerHTML.match(/<article/g) || []).length, 6);
  assert.deepEqual(readPlain().comparison, ['eme', 'ece']);
  assert.equal(elements.get('compare-count').textContent, 2);
  assert.equal(elements.get('empty-state').hidden, true);
  assert.equal((elements.get('source-list').innerHTML.match(/class="source-item"/g) || []).length, data.sources.length);
});
check('Interest OR plus ability AND; empty result recovers', () => {
  dispatchChange(inputFor('filter', 'chips'), true);
  assert.deepEqual(readPlain().matchingProgrammes, ['ece', 'micro']);
  dispatchChange(inputFor('filter', 'spatial'), true);
  assert.deepEqual(readPlain().matchingProgrammes, []);
  assert.equal(elements.get('empty-state').hidden, false);
  elements.get('empty-reset').events.click();
  assert.equal(readPlain().matchingProgrammes.length, 6);
  assert.equal(elements.get('empty-state').hidden, true);
  dispatchChange(inputFor('filter', 'built'), true);
  dispatchChange(inputFor('filter', 'software'), true);
  assert.deepEqual(readPlain().matchingProgrammes, ['cs', 'civil', 'robotics']);
  assert.deepEqual(readPlain().comparison, ['eme', 'ece']);
  elements.get('reset-filters').events.click();
});
check('Compare selection synchronises across cards and comparison controls', () => {
  dispatchChange(inputFor('compare', 'micro'), true);
  assert(readPlain().comparison.includes('micro'));
  assert(queryAll('[data-compare]').filter(input => input.dataset.compare === 'micro').every(input => input.checked));
  for (const p of data.programmes) dispatchChange(inputFor('compare', p.id), true);
  assert.equal(readPlain().comparison.length, 6);
  assert(elements.get('comparison-content').innerHTML.includes('機械人'));
  assert.equal((elements.get('comparison-content').innerHTML.match(/scope="col"/g) || []).length, 7);
  elements.get('clear-compare').events.click();
  assert.equal(readPlain().comparison.length, 0);
  assert(elements.get('comparison-content').innerHTML.includes('先勾選'));
  assert(queryAll('[data-compare]').every(input => !input.checked));
  dispatchChange(inputFor('compare', 'cs'), true);
  assert(elements.get('comparison-content').innerHTML.includes('目前只選了一科'));
});
check('All five navigation views toggle visibility and focus main', () => {
  for (const button of nav.slice(0, 5)) {
    handlers.get('click')({ target: button });
    assert.equal(readPlain().view, button.dataset.view);
    assert.equal(queryAll('.view').filter(view => !view.hidden).length, 1);
    assert.equal(elements.get(`${button.dataset.view}-view`).hidden, false);
    assert.equal(document.activeElement.id, 'main');
    assert.equal(button.properties['aria-current'], 'page');
  }
});
check('Checklist progress tracks visible tasks and preserves other directions', () => {
  dispatchChange(inputFor('task', 'prep-projects'), true);
  assert.equal(elements.get('check-progress').value, 1);
  const focus = elements.get('prepare-focus');
  focus.value = 'micro'; handlers.get('change')({ target: focus });
  assert.equal(elements.get('check-progress').max, data.commonTasks.length + data.majorTasks.micro.length);
  dispatchChange(inputFor('task', 'micro-sim'), true);
  assert.equal(elements.get('check-progress').value, 2);
  focus.value = 'cs'; handlers.get('change')({ target: focus });
  assert.equal(elements.get('check-progress').value, 1);
  focus.value = 'micro'; handlers.get('change')({ target: focus });
  assert(inputFor('task', 'micro-sim').checked);
  dispatchChange(inputFor('task', 'micro-sim'), false);
  assert.equal(elements.get('check-progress').value, 1);
});
check('Project inventory starts blank and preserves personal knowledge, skills and work', () => {
  const initial = readPlain().preparation.projects;
  assert.equal(initial.length, 1);
  for (const field of ['name', 'knowledge', 'skills', 'work']) assert.equal(initial[0][field], '');
  const write = (id, key, value) => {
    const input = queryAll('[data-project-field]').find(field => field.dataset.project === id && field.dataset.projectField === key);
    assert(input); input.value = value; handlers.get('input')({ target: input });
  };
  write('p1', 'name', '<img src=x onerror=alert(1)> 我的項目');
  write('p1', 'knowledge', '我自己的概念整理'); write('p1', 'skills', '我能獨立做的操作'); write('p1', 'work', '我親自負責的測試');
  handlers.get('click')({ target: inputFor('add-project', 'true') });
  assert.equal(readPlain().preparation.projects.length, 2);
  assert.equal(document.activeElement.dataset.project, 'p2');
  assert.equal(readPlain().preparation.projects[0].knowledge, '我自己的概念整理');
  assert(elements.get('checklist-content').innerHTML.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert(!elements.get('checklist-content').innerHTML.includes('<img src=x'));
  handlers.get('click')({ target: inputFor('remove-project', 'p2') });
  assert.equal(readPlain().preparation.projects.length, 1);
  assert.equal(readPlain().preparation.projects[0].work, '我親自負責的測試');
});
check('Exam checkboxes reveal content, level and status; switching preserves entries', () => {
  assert(Object.values(readPlain().preparation.exams).every(exam => !exam.selected));
  assert.equal(queryAll('[data-exam-field]').length, 0);
  dispatchChange(inputFor('exam', 'igcse'), true);
  assert.equal(document.activeElement.dataset.exam, 'igcse');
  const write = (key, value) => {
    const input = queryAll('[data-exam-field]').find(field => field.dataset.examId === 'igcse' && field.dataset.examField === key);
    assert(input); input.value = value; handlers.get(key === 'status' ? 'change' : 'input')({ target: input });
  };
  write('content', 'Cambridge Mathematics 0580'); write('level', '目標 A'); write('status', 'preparing');
  dispatchChange(inputFor('exam', 'igcse'), false);
  assert.equal(queryAll('[data-exam-field]').length, 0);
  dispatchChange(inputFor('exam', 'igcse'), true);
  assert.equal(queryAll('[data-exam-field]').find(input => input.dataset.examField === 'content').value, 'Cambridge Mathematics 0580');
  const focus = elements.get('prepare-focus'); focus.value = 'common'; handlers.get('change')({ target: focus });
  assert.equal(readPlain().preparation.exams.igcse.status, 'preparing');
  assert.equal(readPlain().preparation.exams.igcse.level, '目標 A');
  for (const id of ['python', 'cie-other', 'arduino', 'other', 'ielts', 'ial']) dispatchChange(inputFor('exam', id), true);
  assert.equal(queryAll('[data-exam-field]').length, 21);
  assert.equal(readPlain().preparation.projects[0].skills, '我能獨立做的操作');
});
check('Confidence is initially unanswered and changes targeted feedback without marking completion', () => {
  assert.deepEqual(readPlain().preparation.confidence, {});
  const id = 'prep-understanding';
  const choose = score => {
    const input = queryAll('[data-confidence]').find(field => field.dataset.confidence === id && field.value === String(score));
    assert(input); input.checked = true; handlers.get('change')({ target: input });
  };
  choose(1);
  assert.equal(readPlain().preparation.confidence[id], 1);
  assert(readPlain().preparation.feedback[id].includes('需要協助'));
  const firstFeedback = readPlain().preparation.feedback[id];
  choose(4);
  assert.notEqual(readPlain().preparation.feedback[id], firstFeedback);
  assert(readPlain().preparation.feedback[id].includes('換一個條件'));
  assert(!readPlain().completedTasks.includes(id));
  assert.equal(queryAll('[data-confidence]').filter(input => input.dataset.confidence === id && input.checked).length, 1);
  const notice = queryAll('[data-confidence-feedback]').find(p => p.dataset.confidenceFeedback === id);
  assert.equal(notice.hidden, false); assert(notice.textContent.includes('下一步'));
  const focus = elements.get('prepare-focus'); focus.value = 'micro'; handlers.get('change')({ target: focus });
  assert.equal(readPlain().preparation.confidence[id], 4);
});
check('WebMCP schemas, valid actions and invalid input atomicity in simulated context', () => {
  assert.equal(registered.size, 4);
  assert.equal(registered.get('read_engineering_exploration').annotations.readOnlyHint, true);
  for (const tool of registered.values()) assert.equal(tool.inputSchema.additionalProperties, false);
  const compare = registered.get('configure_programme_comparison');
  compare.execute({ programmeIds: ['civil', 'robotics'] });
  assert.deepEqual(readPlain().comparison, ['civil', 'robotics']);
  assert.equal(readPlain().view, 'compare');
  const before = readPlain();
  for (const input of [{ programmeIds: ['bogus'] }, { programmeIds: ['cs', 'cs'] }, {}, { programmeIds: ['cs'], extra: true }]) {
    assert.throws(() => compare.execute(input));
    assert.deepEqual(readPlain(), before);
  }
  const update = registered.get('update_preparation_checklist');
  update.execute({ taskId: 'robot-sense', completed: true });
  assert.equal(readPlain().checklistFocus, 'robotics');
  assert.equal(elements.get('check-progress').value, 2);
  const snapshot = readPlain();
  assert.throws(() => update.execute({ taskId: 'robot-sense', completed: 'yes' }));
  assert.throws(() => update.execute({ taskId: 'bogus', completed: true }));
  assert.deepEqual(readPlain(), snapshot);
  const confidence = registered.get('update_preparation_confidence');
  confidence.execute({ taskId: 'prep-news', score: 2 });
  assert.equal(readPlain().preparation.confidence['prep-news'], 2);
  assert.equal(readPlain().view, 'prepare');
  const beforeConfidence = readPlain();
  for (const input of [{ taskId: 'prep-news', score: 0 }, { taskId: 'prep-news', score: 5 }, { taskId: 'prep-news', score: 1.5 }, { taskId: 'prep-news', score: '2' }, { taskId: 'fake', score: 1 }, { taskId: 'prep-news', score: 1, extra: true }]) {
    assert.throws(() => confidence.execute(input)); assert.deepEqual(readPlain(), beforeConfidence);
  }
});
check('Fresh opening resets entries; website also works without WebMCP', () => {
  boot({ mobile: true });
  assert.deepEqual(readPlain().preparation.confidence, {});
  assert.equal(readPlain().completedTasks.length, 0);
  assert.equal(readPlain().preparation.projects[0].name, '');
  assert(Object.values(readPlain().preparation.exams).every(exam => !exam.selected && exam.content === '' && exam.level === '' && exam.status === ''));
  assert.equal(elements.get('filter-details').open, false);
  boot({ webmcp: false });
  assert.equal(registered.size, 0);
  assert.equal(queryAll('[data-confidence]').length, 32);
  assert.equal(queryAll('[data-project-field]').length, 4);
  assert.equal(elements.get('check-progress').value, 0);
});
check('Static assets, language, favicon and narrow-screen rules', () => {
  assert(html.includes('lang="zh-Hant"'));
  assert(html.includes('rel="icon"'));
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (!/^(https?:|data:|#)/.test(match[1])) assert(fs.existsSync(path.join(root, 'dist', match[1])), `Missing asset: ${match[1]}`);
  }
  const css = fs.readFileSync(path.join(root, 'dist/styles.css'), 'utf8');
  assert(css.includes('@media(max-width:600px)'));
  assert(css.includes('overflow-x:auto'));
  assert(css.includes('prefers-reduced-motion'));
  assert(css.includes(':focus-visible'));
});
console.log(JSON.stringify({ passed: passed.length, checks: passed, browserVisualQA: 'not performed', webmcpQA: 'simulated context only' }, null, 2));
