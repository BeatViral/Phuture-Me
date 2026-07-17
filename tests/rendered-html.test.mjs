import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { exampleQuestions, scenarioForInput } from "../src/phuture-data.ts";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Phuture Me experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Phuture Me/);
  assert.match(html, /Meet the life growing behind your/);
  assert.match(html, /What decision are you carrying/);
  assert.match(html, /Explore my possible futures/);
  assert.match(html, /Explore more questions people carry/);
  assert.match(html, /Friends, belonging and pressure/);
  assert.match(html, /The quiet questions/);
  assert.match(html, /not connected to full journeys yet/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("unknown routes do not blank the application shell", async () => {
  const response = await render("/a-decision-to-explore");
  assert.ok([200, 404].includes(response.status));
  const html = await response.text();
  assert.match(html, /Phuture Me|404/);
});

test("the branch-published fallback uses built browser assets", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const script = html.match(/src="\/Phuture-Me\/(assets\/[^"]+\.js)"/);
  const stylesheet = html.match(/href="\/Phuture-Me\/(assets\/[^"]+\.css)"/);

  assert.doesNotMatch(html, /src="\/src\/[^"']+\.(?:ts|tsx)"/);
  assert.ok(script, "index.html should load a production JavaScript bundle");
  assert.ok(stylesheet, "index.html should load a production stylesheet");
  await access(new URL(`../${script[1]}`, import.meta.url));
  await access(new URL(`../${stylesheet[1]}`, import.meta.url));
});

test("dangerous prompts use the correct safety route", () => {
  const harmToOthers = [
    "Should I hurt someone?",
    "Should I kill someone?",
    "Should I attack him?",
    "Should I beat him up?",
    "I want to hurt my boss.",
    "I might kill someone.",
  ];

  for (const prompt of harmToOthers) {
    const scenario = scenarioForInput(prompt);
    assert.ok(scenario, prompt);
    assert.equal(scenario.safetyKind, "harm-to-others", prompt);
    assert.equal(scenario.safetyOnly, true, prompt);
    assert.equal(scenario.requiresSafetyCheck, true, prompt);
  }

  for (const prompt of ["Should I hurt myself?", "I want to end my life.", "I feel suicidal."]) {
    const scenario = scenarioForInput(prompt);
    assert.ok(scenario, prompt);
    assert.equal(scenario.safetyKind, "self-harm", prompt);
    assert.equal(scenario.safetyOnly, true, prompt);
    assert.equal(scenario.requiresSafetyCheck, true, prompt);
  }

  const homeSafety = scenarioForInput("Should I tell someone what is happening at home?");
  const generalSafety = scenarioForInput("Someone is threatening me.");
  assert.ok(homeSafety);
  assert.ok(generalSafety);
  assert.equal(homeSafety.safetyKind, "home");
  assert.equal(generalSafety.safetyKind, "general");
});

test("ordinary emotional language does not trigger violence routing", () => {
  const scenario = scenarioForInput("Should I tell the truth if it will hurt someone?");
  assert.equal(scenario, null);
});

test("only featured questions receive complete prototype journeys", () => {
  for (const question of exampleQuestions) {
    assert.ok(scenarioForInput(question), question);
  }

  assert.equal(scenarioForInput("Should I end this relationship?"), null);
  assert.equal(scenarioForInput("Should I take a job in another city?"), null);
});
