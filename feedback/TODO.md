# Docs Iteration To-Do List

Based on the feedback conversation between Etan, Andrea, and Nick on 2026-03-13.

---

## 1. Add a new "LLM Setup" section before the Develop page

**Decision:** Create a new page (or prominent section on the landing page) that sits *before* the Develop step in the left nav. It should serve as a prerequisite: before you develop an agent, you need to decide how your LLM endpoints will work.

**What it should cover:**
- Agents rely on LLMs — you need an LLM endpoint before you start developing.
- **Choose-your-adventure format:** either (a) use an external provider (Bedrock, Azure OpenAI, Anthropic API, etc.) or (b) self-host a model in Domino.
- For external providers: explain that Domino environment variables can store API keys; mention how to install provider packages in the Domino environment.
- For self-hosted: link to the existing [Register and deploy LLMs](https://docs.dominodatalab.com/en/cloud/user_guide/e7befd/register-and-deploy-llms/) page.
- **Minimum bar (Nick):** everywhere the docs say "your agent depends on an LLM," don't imply self-hosting is the only option — acknowledge external providers too.

**Also update:** the landing page (`index.html`) currently links to "Register and deploy LLMs" as the only LLM path. Update this reference to point to the new LLM setup section instead.

**Ref:** Transcript ~10:20–14:58

---

## 2. Transfer sample repos to the DominoDataLab GitHub org

**Decision:** All repos referenced in the docs should live under `github.com/dominodatalab`, not under Etan's personal account.

**Action items:**
- [ ] Transfer `simple_domino_agent` repo to the DominoDataLab org (Etan needs IT help for permissions).
- [ ] The `rag-agent-demo` repo is already under DominoDataLab — confirm it's up to date.
- [ ] Update all GitHub links in the docs (`index.html`, `develop.html`) once the transfer is done.

**Ref:** Transcript ~5:56–8:00

---

## 3. Add actual screenshot of the "Run Job" button in a Workspace

**Decision:** Replace the placeholder in the Develop page (`develop.html`, Step 3) with a real screenshot showing the Domino workspace UI with the Run Job button.

**Context:** Users will naturally develop and test in a workspace. They need a visual cue showing how to kick off a Job directly from the workspace. Currently the page has a `<div class="screenshot-placeholder">` that needs to be filled. I already put a screenshot for this in the assets folder.

**Ref:** Transcript ~19:55–21:57

---

## 4. Add a note + linked notebook for programmatic trace analysis

**Decision:** In the Experiment Manager page (`experiment.html`), near the "Export results" or "Manual annotations" section, add a brief note saying:

> "You can also pull trace data programmatically using the MLflow APIs for custom aggregation and analysis — for example, breaking down token usage, latency, and tool calls by span type."

Then link to an example notebook in the GitHub repo (rather than embedding code snippets in the docs, which Etan felt would be overwhelming).

**Action items:**
- [ ] Andrea creates a simple analysis notebook and adds it to the `rag-agent-demo` repo.
- [ ] Add a one-paragraph note + link to that notebook in `experiment.html`.

**Ref:** Transcript ~22:45–27:29

---

## 5. Add screenshot showing agent ID and version after deployment

**Decision:** In the Deploy page (`deploy.html`) or Monitor page (`monitor.html`), add a screenshot that clearly shows where to find the **agent ID** and **agent version** in the UI after deployment. This is currently not spelled out and will be a common pain point.

**Also:** Make sure the `search_agent_traces()` code example in `monitor.html` ties back to this — users need to know where to get the `agent_id` value they'll pass to the API. See the assets folder which has a screenshot and sample code for this now. Also can have a little note that links to the github repo file here for a complete example for doing production evaluations. Also very important to mention early on in this section that production evals are meant to run out of band with the real-time agent app and run as a scheduled job powered script. Maybe its already in there, but mention if not.

**Ref:** Transcript ~28:20–29:13

---

## 6. Add "Advanced" section for manual span instrumentation

**Decision:** At the bottom of the Develop page (`develop.html`), add an **Advanced** section covering:

1. Which frameworks have been tested with auto-tracing (the comma-delimited list already in the docs).
2. How to manually instrument spans when auto-tracing doesn't cover everything (e.g., custom tool calls, non-framework LLM calls).
3. Use the MLflow `@mlflow.trace` decorator approach for now (the "ugly MLflow stuff"), with the intent to swap it out once the Domino SDK adds span-type support to `@add_tracing`.

**Also:** In the existing frameworks paragraph (Step 1), add a sentence like:
> "If auto-tracing doesn't capture all the steps you need, see the [Advanced: Manual span instrumentation](#advanced) section below."

**Ref:** Transcript ~30:10–32:04

---

## 7. Add an outlink to the Agent SDK reference from the docs

**Decision:** The Agent SDK docs are currently buried in the Python library docs and hard to find. Add an outlink from the relevant user-guide pages (especially Develop and Monitor) to the SDK reference.

**Options discussed:**
- Minimum: add outlinks from `develop.html` and `monitor.html` to the SDK reference page (currently `sdk-reference.html` in this project, or the live API docs equivalent).
- Stretch: ask the docs team (Sandra) to make the agent SDK its own standalone page in the API docs section, rather than being nested under the generic Python library docs. You'll have to search online to find Domino data lab's SDK docs to link to the right place.

**Ref:** Transcript ~29:20–30:09

---

## 8. Update the lifecycle diagram

**Decision:** The lifecycle diagram (`site/assets/lifecycle-diagram.svg`) needs minor tuning:

- The **Deploy** step should explicitly mention that deploying from Experiment Manager creates a **"Domino Agent"** — use those exact words.
- Etan noted the diagram is "a little small" and could use some polish.

**Ref:** Transcript ~8:33–9:27

---

## 9. Make the deploy button in Experiment Manager more obvious

**Decision:** The Experiment Manager page (`experiment.html`) already has a section on deploying from a run, but it currently describes the old "triple-dot menu" flow. Etan added a screenshot (`deploy_button.jpg`) but wants to make it "dumbly clear" that this is the button you click. (WARNING:  I think I already made this change, so don't do if I did obviously... double check)

**Action items:**
- [ ] Verify the `deploy_button.jpg` screenshot clearly shows the new deploy button (not just the old triple-dot menu).
- [ ] Update the deploy instructions in `experiment.html` to match the current UI if the button has changed.

**Ref:** Transcript ~22:03–22:45

---


## Summary — Priority Order

| # | Item | Owner | Effort |
|---|------|-------|--------|
| 1 | New LLM Setup section | Etan | Medium |
| 2 | Transfer repos to DominoDataLab org | Etan (+ IT) | Low |
| 3 | Screenshot: Run Job button in workspace | Etan | Low |
| 4 | Programmatic trace analysis note + notebook | Andrea + Etan | Medium |
| 5 | Screenshot: agent ID/version after deploy | Etan | Low |
| 6 | Advanced section: manual span instrumentation | Etan | Medium |
| 7 | Outlink to Agent SDK reference | Etan | Low |
| 8 | Update lifecycle diagram | Etan | Low |
| 9 | Verify/update deploy button screenshot | Etan | Low |
