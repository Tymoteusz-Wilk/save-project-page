// Curated summaries of the three saved Minerva traces in assets/demos/traces.json.
// QUERY indices and frame timestamps are from those records; the linked JSON has the full model text.
const walkthroughs = {
  cape: {
    videoId: 'fRCohICNVws', duration: 649.248,
    type: 'MINERVA / SOUND + VISUAL SEARCH',
    question: 'What sound is happening when the girl wears a magician’s cape?',
    steps: [
      { label: 'Question', phase: '01 / QUESTION', action: 'CHOOSE A RANGE',
        thought: 'Find the brown-haired girl wearing a magician’s cape, then identify the sound at that moment.',
        observation: 'No frames have been inspected yet. The agent starts by scanning the video for the target scene.', frames: [] },
      { label: 'Scan', phase: '02 / BROAD SCAN', action: 'ACTION: QUERY 0 32460', range: [0, 649.2],
        thought: 'Scan the full 10:49 video to locate the girl and the relevant costume.',
        observation: 'The broad samples show the girl and baby, but the agent cannot yet pinpoint the magician’s-cape moment. It chooses an earlier span to inspect more closely.',
        frames: [{ src: 'assets/demos/frames/cape-scan-086.webp', time: 86.72, caption: 'Girl and baby in the broad scan', alt: 'Girl holding a baby before the magician’s-cape scene' }] },
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
    question: 'How many baskets are made between 00:22 and 01:00?',
    steps: [
      { label: 'Question', phase: '01 / QUESTION', action: 'CHOOSE A RANGE',
        thought: 'Count made baskets only inside the requested 00:22–01:00 interval.',
        observation: 'The question supplies an exact time window. The agent can inspect it directly.', frames: [] },
      { label: 'Count', phase: '02 / TARGETED QUERY', action: 'ACTION: QUERY 659 1798', range: [22, 60],
        thought: 'Inspect the interval to identify each made basket and any play close to the cutoff.',
        observation: 'The trace counts makes near 00:30, 00:42, and 00:54. Another drive begins near 00:59, so the agent checks whether it finishes before 01:00.',
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
    steps: [
      { label: 'Question', phase: '01 / QUESTION', action: 'CHOOSE A RANGE',
        thought: 'Find the start of Game 4 in the long recording, then distinguish Mack’s first move from Ian’s.',
        observation: 'The agent does not yet know where Game 4 begins, so it starts with a video-wide scan.', frames: [] },
      { label: 'Locate', phase: '02 / BROAD SCAN', action: 'ACTION: QUERY 0 47485', range: [0, 1584.49],
        thought: 'Scan the entire recording to find the Game 4 transition.',
        observation: 'A frame near 09:37 shows Game 4 starting. The board reads EKE and Ian has +14, so this is Ian’s opening move, not Mack’s.',
        frames: [{ src: 'assets/demos/frames/scrabble-577.webp', time: 577.1766, caption: 'Game 4 starts: Ian plays EKE', alt: 'Scrabble board showing EKE and Ian’s score of 14 while Mack has zero' }] },
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
let frameIndex = 0;
let autoplay = null;
let frameAutoplay = null;

function clock(seconds) {
  const value = Math.floor(seconds);
  return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
}
function stopAutoplay() {
  if (autoplay) clearInterval(autoplay);
  autoplay = null;
  if (frameAutoplay) clearInterval(frameAutoplay);
  frameAutoplay = null;
  $('walkthrough-play').textContent = '▶ Play';
  $('walkthrough-play').setAttribute('aria-label', 'Play walkthrough');
}
function showFrame(index) {
  frameIndex = index;
  const video = walkthroughs[videoKey];
  const frame = video.steps[stepIndex].frames[index];
  if (!frame) return;
  $('walkthrough-image').src = frame.src;
  $('walkthrough-image').alt = frame.alt;
  $('walkthrough-frame-time').textContent = `${clock(frame.time)} · ${frame.caption}`;
  $('walkthrough-frame-time').hidden = false;
  $('walkthrough-range-playhead').style.left = `${Math.min(100, 100 * frame.time / video.duration)}%`;
  $('walkthrough-range-playhead').hidden = false;
  [...$('walkthrough-thumbs').children].forEach((button, n) => {
    button.setAttribute('aria-pressed', String(n === index));
  });
}
function render() {
  const video = walkthroughs[videoKey];
  const step = video.steps[stepIndex];
  $('walkthrough-panel').setAttribute('aria-labelledby', `tab-${videoKey}`);
  $('walkthrough-video-id').textContent = `VIDEO ${video.videoId}`;
  $('walkthrough-step-count').textContent = `STEP ${stepIndex + 1} / ${video.steps.length}`;
  $('walkthrough-type').textContent = video.type;
  $('walkthrough-question').textContent = video.question;
  $('walkthrough-phase').textContent = step.phase;
  $('walkthrough-action').textContent = step.action;
  $('walkthrough-thought').textContent = step.thought;
  $('walkthrough-observation').textContent = step.observation;
  $('walkthrough-answer').textContent = step.answer ? `FINAL ANSWER · ${step.answer}` : 'Answer revealed at the final step';
  $('walkthrough-answer').classList.toggle('answer-revealed', Boolean(step.answer));
  $('walkthrough-duration').textContent = clock(video.duration);
  $('walkthrough-prev').disabled = stepIndex === 0;
  $('walkthrough-next').disabled = stepIndex === video.steps.length - 1;

  const nav = $('walkthrough-step-nav');
  nav.replaceChildren();
  video.steps.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${String(index + 1).padStart(2, '0')} ${item.label}`;
    button.className = index === stepIndex ? 'active' : '';
    button.setAttribute('aria-current', index === stepIndex ? 'step' : 'false');
    button.addEventListener('click', () => { stopAutoplay(); stepIndex = index; render(); });
    nav.append(button);
  });

  const hasFrames = step.frames.length > 0;
  $('walkthrough-empty').hidden = hasFrames;
  $('walkthrough-image').hidden = !hasFrames;
  $('walkthrough-frame-time').hidden = !hasFrames;
  $('walkthrough-thumbs').hidden = !hasFrames;
  const thumbs = $('walkthrough-thumbs');
  thumbs.replaceChildren();
  step.frames.forEach((frame, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.title = `${clock(frame.time)} · ${frame.caption}`;
    button.setAttribute('aria-label', `Show frame at ${clock(frame.time)}: ${frame.caption}`);
    const image = document.createElement('img');
    image.src = frame.src;
    image.alt = '';
    const label = document.createElement('span');
    label.textContent = clock(frame.time);
    button.append(image, label);
    button.addEventListener('click', () => { stopAutoplay(); showFrame(index); });
    thumbs.append(button);
  });
  if (hasFrames) showFrame(step.defaultFrame ?? 0);
  else $('walkthrough-range-playhead').hidden = true;

  if (step.range) {
    const [start, end] = step.range;
    const left = 100 * start / video.duration;
    const width = Math.min(100 - left, 100 * (end - start) / video.duration);
    $('walkthrough-range-window').style.left = `${left}%`;
    $('walkthrough-range-window').style.width = `${width}%`;
    $('walkthrough-range-window').hidden = false;
    $('walkthrough-range-label').textContent = `QUERY ${clock(start)}–${clock(end)}`;
  } else {
    $('walkthrough-range-window').hidden = true;
    $('walkthrough-range-label').textContent = 'No query yet';
  }
}
function selectVideo(key, focus = false) {
  stopAutoplay();
  videoKey = key;
  stepIndex = 0;
  tabs.forEach(tab => {
    const active = tab.dataset.video === key;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  render();
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
  if (stepIndex > 0) { stepIndex--; render(); }
});
$('walkthrough-next').addEventListener('click', () => {
  stopAutoplay();
  if (stepIndex < walkthroughs[videoKey].steps.length - 1) { stepIndex++; render(); }
});
function cycleObservedFrames() {
  if (frameAutoplay) clearInterval(frameAutoplay);
  const frames = walkthroughs[videoKey].steps[stepIndex].frames;
  if (frames.length > 1) {
    frameAutoplay = setInterval(() => showFrame((frameIndex + 1) % frames.length), 1100);
  }
}
function startAutoplay() {
  if (autoplay) { stopAutoplay(); return; }
  const last = walkthroughs[videoKey].steps.length - 1;
  if (stepIndex === last) stepIndex = 0;
  stepIndex++;
  render();
  if (stepIndex === last) return;
  cycleObservedFrames();
  $('walkthrough-play').textContent = 'Ⅱ Pause';
  $('walkthrough-play').setAttribute('aria-label', 'Pause walkthrough');
  autoplay = setInterval(() => {
    if (stepIndex < last) { stepIndex++; render(); cycleObservedFrames(); }
    if (stepIndex === last) stopAutoplay();
  }, 4500);
}
$('walkthrough-play').addEventListener('click', startAutoplay);
$('walkthrough-start').addEventListener('click', startAutoplay);
document.querySelectorAll('.teaser-tile[data-demo]').forEach(tile => {
  tile.addEventListener('click', () => selectVideo(tile.dataset.demo));
});
const initial = new URLSearchParams(window.location.search);
if (Object.hasOwn(walkthroughs, initial.get('demo'))) {
  videoKey = initial.get('demo');
  const requested = Number(initial.get('step'));
  stepIndex = Number.isInteger(requested) ? Math.max(0, Math.min(3, requested)) : 0;
  tabs.forEach(tab => {
    const active = tab.dataset.video === videoKey;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
}
render();
