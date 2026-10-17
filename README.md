# SAVE project website

A standalone, static project page for **SAVE: Less is More in Agentic Video Reasoning**. The evaluation code lives in the [separate code repository](https://github.com/TymoTymo1/save).

## Preview locally

```bash
python -m http.server 8000
```

Open <http://localhost:8000>. No build step or package installation is needed.

## Publish with GitHub Pages

Create a new GitHub repository for this directory, push it to `main`, then open **Settings → Pages** and choose **Deploy from a branch → main → /(root)**. The site uses relative asset paths and works at either a project or account Pages URL.

The paper PDF is copied from the local manuscript. `assets/demos/traces.json` contains three original correct evaluation records; the WebP stills were extracted from the corresponding Minerva videos at recorded timestamps. The interactive walkthroughs replay each record’s query, observation, follow-up, and answer. Their text is a concise summary of the original model messages; Play advances automatically and the frame thumbnails show the actual observed timestamps. Paper statistics in the results section are separate from these individual saved runs.

The current manuscript is under double-blind review; review the site and paper before making this repository public.
