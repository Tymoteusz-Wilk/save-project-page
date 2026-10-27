// Curated summaries of the three saved Minerva traces in assets/demos/traces.json.
// QUERY indices and frame timestamps are from those records; the linked JSON has the full model text.
const walkthroughs = {
  cape: {
    videoId: 'fRCohICNVws', duration: 649.248,
    type: 'MINERVA / SOUND + VISUAL SEARCH',
    question: 'What sound is happening when the girl with brown hair wears a magician’s cape?',
    options: ['A dog is barking.', 'A woman is laughing.', 'A man is screaming.', 'A baby is crying.', 'A cat is meowing.'],
    steps: [
      { label: 'Question', phase: '01 / QUESTION', action: 'CHOOSE A RANGE',
        thought: 'Find the brown-haired girl wearing a magician’s cape, then identify the sound at that moment.',
        observation: 'No frames have been inspected yet. The agent starts by scanning the video for the target scene.', frames: [] },
      { label: 'Scan', phase: '02 / BROAD SCAN', action: 'ACTION: QUERY 0 32460', range: [0, 649.2],
        thought: 'Sample frames at intervals across the full 10:49 video to locate the brown-haired girl in the magician’s cape.',
        observation: 'The coarse query returns 40 frames spread across the video. These four examples show different moments, but do not pinpoint the cape scene. The agent chooses an earlier span for a closer look.',
        frameNote: '4 OF 40 SAMPLED FRAMES · SPREAD ACROSS THE FULL VIDEO',
        frames: [
          { src: 'assets/demos/frames/cape-scan-086.webp', time: 86.72, caption: 'Early: girl with baby', alt: 'At 01:26, a brown-haired girl holds a baby' },
          { src: 'assets/demos/frames/cape-scan-255.webp', time: 255.52, caption: 'Middle: girl in another scene', alt: 'At 04:15, the brown-haired girl appears in another scene' },
          { src: 'assets/demos/frames/cape-scan-401.webp', time: 401.7, caption: 'Later: girl in another scene', alt: 'At 06:41, the girl appears lying on the floor beside round cushions' },
          { src: 'assets/demos/frames/cape-scan-582.webp', time: 582.16, caption: 'Near end: another character', alt: 'At 09:42, a blonde woman appears in a later part of the video' }
        ] },
      { label: 'Zoom', phase: '03 / FOCUSED QUERY', action: 'ACTION: QUERY 3754 8095', range: [75.08, 161.9], defaultFrame: 1,
        thought: 'Search the earlier costume changes at higher temporal detail.',
        observation: 'At 01:47, the girl wears the black magician’s cape. The nearby transcript includes “Stop crying,” linking the scene to the baby’s sound.',
        frames: [
          { src: 'assets/demos/frames/cape-approach-102.webp', time: 102.46, caption: 'Nearby costume change', alt: 'Girl in a different costume shortly before the magician scene' },
          { src: 'assets/demos/cape-and-crying.webp', time: 107.08, caption: 'Magician’s cape identified', alt: 'Girl wearing a black cape with gold trim beside a baby' },
          { src: 'assets/demos/frames/cape-evidence-110.webp', time: 110.92, caption: 'Following scene', alt: 'Girl in another costume immediately after the magician scene' }
        ] },
      { label: 'Answer', phase: '04 / STOP & ANSWER', action: 'ACTION: STOP', range: [75.08, 161.9],
        thought: 'The visual target and transcript agree; no further query is needed.',
        observation: 'The agent returns option (3): a baby is crying.', answer: '(3) A baby is crying',
        frames: [{ src: 'assets/demos/cape-and-crying.webp', time: 107.08, caption: 'Answer-relevant moment', alt: 'Girl wearing the magician’s cape beside the baby' }] }
    ]
  },
  basketball: {
    videoId: '--oWChJdE-o', duration: 82.488,
    type: 'MINERVA / COUNTING + TIME BOUNDARY',
    question: 'How many baskets are made during the 00:22 - 01:00?',
    options: ['3.', '1.', '0.', '4.', '2.'],
    steps: [
      { label: 'Question', phase: '01 / QUESTION', action: 'CHOOSE A RANGE',
        thought: 'Count made baskets only inside the requested 00:22–01:00 interval.',
        observation: 'The question supplies an exact time window. The agent can inspect it directly.', frames: [] },
      { label: 'Count', phase: '02 / TARGETED QUERY', action: 'ACTION: QUERY 659 1798', range: [22, 60],
        thought: 'Inspect the interval to identify each made basket and any play close to the cutoff.',
        observation: 'The agent counts made baskets near 00:30, 00:42, and 00:54. Another drive begins near 00:59, so it checks whether that play finishes before 01:00.',
        frames: [
          { src: 'assets/demos/frames/basket-030.webp', time: 29.5629, caption: 'Make reported near 00:30', alt: 'Basketball play near the hoop around 00:30' },
          { src: 'assets/demos/frames/basket-042.webp', time: 42.4424, caption: 'Make reported near 00:42', alt: 'Players near the court after a play around 00:42' },
          { src: 'assets/demos/frames/basket-054.webp', time: 53.5869, caption: 'Make reported near 00:54', alt: 'Players moving down court around 00:54' },
          { src: 'assets/demos/frames/basket-059.webp', time: 59.1925, caption: 'Another drive begins', alt: 'Basketball player dribbling as the time window nears its end' }
        ] },
      { label: 'Verify', phase: '03 / BOUNDARY CHECK', action: 'ACTION: QUERY 1774 1850', range: [59.1925, 61.7283], defaultFrame: 1,
        thought: 'Inspect the narrow range around 01:00 to verify the fourth play’s timing.',
        observation: 'At roughly 00:59 and 01:00, the player is still dribbling. The agent concludes the next basket falls after the cutoff.',
        frames: [
          { src: 'assets/demos/frames/basket-059.webp', time: 59.1925, caption: 'Before cutoff', alt: 'Player dribbling just before 01:00' },
          { src: 'assets/demos/frames/basket-060.webp', time: 60.1935, caption: 'At the cutoff', alt: 'Player still dribbling at about 01:00' },
          { src: 'assets/demos/frames/basket-061.webp', time: 61.2278, caption: 'After cutoff', alt: 'Player continuing the drive after 01:00' }
        ] },
      { label: 'Answer', phase: '04 / STOP & ANSWER', action: 'ACTION: STOP 3', range: [59.1925, 61.7283],
        thought: 'Three made baskets are inside the requested window; the fourth play is too late.',
        observation: 'The agent returns option (0): 3 baskets.', answer: '(0) 3 baskets',
        frames: [{ src: 'assets/demos/frames/basket-060.webp', time: 60.1935, caption: 'The 01:00 boundary', alt: 'Player still dribbling at the time cutoff' }] }
    ]
  },
  scrabble: {
    videoId: 'LhVqb5ifpac', duration: 1584.488,
    type: 'MINERVA / READING + SEQUENCE',
    question: 'What is Mack’s first played word in Game 4?',
    options: ['Axe.', 'Eke.', 'Brown.', 'Fytte.', 'Koine.'],
    steps: [
      { label: 'Question', phase: '01 / QUESTION', action: 'CHOOSE A RANGE',
        thought: 'Find the start of Game 4 in the long recording, then distinguish Mack’s first move from Ian’s.',
        observation: 'The agent does not yet know where Game 4 begins, so it starts with a video-wide scan.', frames: [] },
      { label: 'Locate', phase: '02 / BROAD SCAN', action: 'ACTION: QUERY 0 47485', range: [0, 1584.49], defaultFrame: 2,
        thought: 'Scan the entire 26:24 recording to find the Game 4 transition.',
        observation: 'The query samples frames across the recording. At 09:37, the agent spots the start of Game 4: EKE is on the board and Ian has +14, so Mack has not played yet.',
        frameNote: '5 OF 15 SAMPLED FRAMES · SPREAD ACROSS THE FULL VIDEO',
        frames: [
          { src: 'assets/demos/frames/scrabble-scan-061.webp', time: 61.2278, caption: 'Game 1 begins', alt: 'At 01:01, the Scrabble broadcast shows the opening of Game 1' },
          { src: 'assets/demos/frames/scrabble-scan-330.webp', time: 330.7304, caption: 'Game 2 in progress', alt: 'At 05:30, the Scrabble board shows Game 2 in progress' },
          { src: 'assets/demos/frames/scrabble-577.webp', time: 577.1766, caption: 'Game 4 starts: Ian plays EKE', alt: 'At 09:37, the Scrabble board shows EKE and Ian’s score of 14 while Mack has zero' },
          { src: 'assets/demos/frames/scrabble-scan-1016.webp', time: 1016.5822, caption: 'Game 5 in progress', alt: 'At 16:56, the Scrabble board shows Game 5 in progress' },
          { src: 'assets/demos/frames/scrabble-scan-1459.webp', time: 1459.1911, caption: 'Later match footage', alt: 'At 24:19, the broadcast shows a later game with an overhead view of the physical board' }
        ] },
      { label: 'Inspect', phase: '03 / FOCUSED QUERY', action: 'ACTION: QUERY 17298 18500', range: [577.1766, 617.2833], defaultFrame: 1,
        thought: 'Inspect the moves immediately after Ian’s EKE to see Mack’s first response.',
        observation: 'The board changes from EKE to AXE; Mack’s score rises to 28. The nearby transcript says “move of Axe.”',
        frames: [
          { src: 'assets/demos/frames/scrabble-577.webp', time: 577.1766, caption: 'Ian: EKE (+14)', alt: 'Scrabble board with EKE and Ian’s opening score' },
          { src: 'assets/demos/scrabble-axe.webp', time: 580.8136, caption: 'Mack: AXE (+28)', alt: 'Scrabble board with AXE and Mack’s score of 28' },
          { src: 'assets/demos/frames/scrabble-584.webp', time: 584.4839, caption: 'AXE remains on board', alt: 'Scrabble board showing AXE after Mack’s move' }
        ] },
      { label: 'Answer', phase: '04 / STOP & ANSWER', action: 'ACTION: STOP', range: [577.1766, 617.2833],
        thought: 'The board and transcript agree that Mack’s first word is AXE.',
        observation: 'The agent returns option (0): Axe.', answer: '(0) Axe',
        frames: [{ src: 'assets/demos/scrabble-axe.webp', time: 580.8136, caption: 'Mack’s first word: AXE', alt: 'Scrabble board showing AXE and Mack’s score of 28' }] }
    ]
  }
};

const $ = id => document.getElementById(id);
const tabs = [...document.querySelectorAll('.demo-tabs [role="tab"]')];
let videoKey = 'cape';
let stepIndex = 0;
let autoplay = null;

function clock(seconds) {
  const value = Math.floor(seconds);
  return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
}
function node(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (value !== undefined) element.textContent = value;
  return element;
}
function updateControls() {
  const video = walkthroughs[videoKey];
  const last = video.steps.length - 1;
  $('walkthrough-progress').textContent = `${stepIndex + 1} of ${video.steps.length} steps revealed · ${clock(video.duration)} video`;
  $('walkthrough-prev').disabled = stepIndex === 0;
  $('walkthrough-next').disabled = stepIndex === last;
  const play = $('walkthrough-play');
  play.textContent = autoplay ? 'Ⅱ Pause' : stepIndex === last ? '↺ Replay' : '▶ Play';
  play.setAttribute('aria-label', autoplay ? 'Pause walkthrough' : stepIndex === last ? 'Replay walkthrough' : 'Play walkthrough');
}
function stopAutoplay() {
  if (autoplay !== null) clearTimeout(autoplay);
  autoplay = null;
  updateControls();
}
function makeStep(step, index, video, animate) {
  const card = node('article', `walkthrough-entry${step.answer ? ' is-answer' : ''}${animate ? ' is-new' : ''}`);
  card.setAttribute('aria-label', `Step ${index + 1}: ${step.label}`);
  card.append(node('span', 'walkthrough-step-number', String(index + 1).padStart(2, '0')));

  const heading = node('div', 'walkthrough-entry-heading');
  const title = node('div', 'walkthrough-entry-title');
  title.append(node('span', 'walkthrough-phase', step.phase), node('h4', '', step.label));
  heading.append(title, node('span', 'walkthrough-action', step.action));
  card.append(heading);

  const notes = node('div', 'walkthrough-entry-notes');
  const thought = node('div', 'walkthrough-note');
  thought.append(node('span', '', 'AGENT THOUGHT'), node('p', '', step.thought));
  const observation = node('div', 'walkthrough-note');
  observation.append(node('span', '', 'WHAT IT OBSERVED'), node('p', '', step.observation));
  notes.append(thought, observation);
  card.append(notes);

  if (step.range && !step.answer) {
    const [start, end] = step.range;
    const range = node('div', 'walkthrough-range');
    range.append(node('span', '', `QUERY WINDOW · ${clock(start)}–${clock(end)} / ${clock(video.duration)}`));
    const track = node('div', 'walkthrough-range-track');
    const fill = node('i', '');
    fill.style.left = `${100 * start / video.duration}%`;
    fill.style.width = `${Math.min(100 - 100 * start / video.duration, 100 * (end - start) / video.duration)}%`;
    track.append(fill);
    range.append(track);
    card.append(range);
  }

  if (step.frames.length) {
    if (step.frameNote) card.append(node('p', 'walkthrough-frame-note', step.frameNote));
    const gallery = node('div', `walkthrough-frame-grid${step.frames.length === 1 ? ' is-single' : ''}`);
    gallery.style.setProperty('--frame-count', step.frames.length);
    step.frames.forEach(frame => {
      const figure = node('figure', 'walkthrough-frame');
      const image = node('img', '');
      image.src = frame.src;
      image.alt = frame.alt;
      image.loading = 'lazy';
      figure.append(image, node('span', 'walkthrough-frame-time', clock(frame.time)), node('figcaption', '', frame.caption));
      gallery.append(figure);
    });
    card.append(gallery);
  }
  if (step.answer) card.append(node('div', 'walkthrough-final-answer', `FINAL ANSWER · ${step.answer}`));
  return card;
}
function appendStep(index, animate = true, scroll = true) {
  const video = walkthroughs[videoKey];
  const card = makeStep(video.steps[index], index, video, animate);
  $('walkthrough-log').append(card);
  stepIndex = index;
  updateControls();
  if (scroll) requestAnimationFrame(() => card.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'nearest'
  }));
}
function resetWalkthrough() {
  const video = walkthroughs[videoKey];
  $('walkthrough-panel').setAttribute('aria-labelledby', `tab-${videoKey}`);
  $('walkthrough-type').textContent = video.type;
  $('walkthrough-question').textContent = video.question;
  $('walkthrough-options').replaceChildren(...video.options.map((option, index) => node('li', '', `(${index}) ${option}`)));
  $('walkthrough-video-id').textContent = `VIDEO ${video.videoId}`;
  $('walkthrough-video-link').href = `https://www.youtube.com/watch?v=${encodeURIComponent(video.videoId)}`;
  $('walkthrough-log').replaceChildren();
  appendStep(0, false, false);
}
function selectVideo(key, focus = false) {
  stopAutoplay();
  videoKey = key;
  tabs.forEach(tab => {
    const active = tab.dataset.video === key;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  resetWalkthrough();
}
function advance() {
  if (stepIndex < walkthroughs[videoKey].steps.length - 1) appendStep(stepIndex + 1);
}
function scheduleNext(delay = 4700) {
  autoplay = setTimeout(() => {
    advance();
    if (stepIndex === walkthroughs[videoKey].steps.length - 1) stopAutoplay();
    else scheduleNext();
  }, delay);
  updateControls();
}
function toggleAutoplay() {
  if (autoplay !== null) { stopAutoplay(); return; }
  if (stepIndex === walkthroughs[videoKey].steps.length - 1) resetWalkthrough();
  scheduleNext(850);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectVideo(tab.dataset.video));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs[tabs.length - 1];
    if (next) { event.preventDefault(); selectVideo(next.dataset.video, true); }
  });
});
$('walkthrough-prev').addEventListener('click', () => {
  stopAutoplay();
  if (stepIndex > 0) {
    $('walkthrough-log').lastElementChild.remove();
    stepIndex--;
    updateControls();
    $('walkthrough-log').lastElementChild.scrollIntoView({ block: 'nearest' });
  }
});
$('walkthrough-next').addEventListener('click', () => {
  const wasPlaying = autoplay !== null;
  if (wasPlaying) clearTimeout(autoplay);
  advance();
  if (wasPlaying) {
    if (stepIndex === walkthroughs[videoKey].steps.length - 1) stopAutoplay();
    else scheduleNext();
  }
});
$('walkthrough-play').addEventListener('click', toggleAutoplay);

const initial = new URLSearchParams(window.location.search);
if (Object.hasOwn(walkthroughs, initial.get('demo'))) {
  videoKey = initial.get('demo');
  tabs.forEach(tab => {
    const active = tab.dataset.video === videoKey;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
}
resetWalkthrough();
const requested = Number(initial.get('step'));
if (initial.has('step') && Number.isInteger(requested)) {
  const last = walkthroughs[videoKey].steps.length - 1;
  for (let index = 1; index <= Math.max(0, Math.min(last, requested)); index++) appendStep(index, false, false);
}
