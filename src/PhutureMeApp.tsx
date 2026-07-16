"use client";

import { FormEvent, useRef, useState } from "react";
import {
  DecisionScenario,
  exampleQuestions,
  sanitizeDecisionInput,
  scenarioForInput,
} from "./phuture-data";

type SafetyState = "idle" | "checking" | "support";

export function PhutureMeApp() {
  const [decision, setDecision] = useState("");
  const [result, setResult] = useState<DecisionScenario | null>(null);
  const [pendingScenario, setPendingScenario] = useState<DecisionScenario | null>(null);
  const [safetyState, setSafetyState] = useState<SafetyState>("idle");
  const resultRef = useRef<HTMLElement>(null);

  const revealResult = (scenario: DecisionScenario) => {
    setResult(scenario);
    setPendingScenario(null);
    setSafetyState("idle");
    window.setTimeout(() => {
      resultRef.current?.focus();
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanDecision = sanitizeDecisionInput(decision);
    if (!cleanDecision) return;

    setDecision(cleanDecision);
    const scenario = scenarioForInput(cleanDecision);
    if (scenario.requiresSafetyCheck) {
      setResult(null);
      setPendingScenario(scenario);
      setSafetyState("checking");
      window.setTimeout(() => {
        document.getElementById("safety-check")?.focus();
        document.getElementById("safety-check")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 40);
      return;
    }

    revealResult(scenario);
  };

  const chooseExample = (question: string) => {
    setDecision(question);
    setResult(null);
    setPendingScenario(null);
    setSafetyState("idle");
    document.getElementById("decision")?.focus();
  };

  const reset = () => {
    setDecision("");
    setResult(null);
    setPendingScenario(null);
    setSafetyState("idle");
    window.setTimeout(() => document.getElementById("decision")?.focus(), 20);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Phuture Me home">
          <span className="seed-mark" aria-hidden="true">•</span>
          Phuture Me™
        </a>
        <p>A human decision companion</p>
      </header>

      <main id="top">
        <section className="hero section-wrap" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow">Sow Clever. Reap Well.</p>
            <h1 id="hero-heading">
              Meet the life growing behind your <em>decision.</em>
            </h1>
            <p className="hero-description">
              Phuture Me helps people explore where their choices might lead—without
              telling them what to choose.
            </p>
            <ul className="promise-list" aria-label="What Phuture Me helps you do">
              <li>Explore your choices.</li>
              <li>See your Aging Curve.</li>
              <li>Meet your Phuture Me.</li>
            </ul>
          </div>

          <div className="decision-card" id="explore">
            <div className="card-heading">
              <div>
                <p className="step-label">MESSY IN</p>
                <h2>What decision are you carrying?</h2>
              </div>
              <span className="private-note">Private by design</span>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="decision">
                Describe the decision you are carrying
              </label>
              <textarea
                id="decision"
                name="decision"
                value={decision}
                maxLength={600}
                onChange={(event) => setDecision(event.target.value)}
                placeholder="Say it exactly as it feels. You do not need to make it sound sensible."
                rows={5}
              />
              <div className="form-footer">
                <p>Nothing you write leaves this page or is stored.</p>
                <button className="primary-button" type="submit" disabled={!decision.trim()}>
                  Explore my possible futures <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>

            <div className="examples">
              <p>Or begin with an example</p>
              <div className="chip-list">
                {exampleQuestions.map((question, index) => (
                  <button
                    type="button"
                    className="question-chip"
                    key={question}
                    onClick={() => chooseExample(question)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {safetyState === "checking" && (
          <section
            className="safety-wrap section-wrap"
            id="safety-check"
            tabIndex={-1}
            aria-live="polite"
            aria-labelledby="safety-heading"
          >
            <div className="safety-card">
              <p className="step-label">PROTECTION BEFORE EXPLORATION</p>
              <h2 id="safety-heading">Before we look ahead, are you safe right now?</h2>
              <p>
                Your question may involve danger, harm, pressure or coercion. You do
                not have to handle that alone.
              </p>
              <div className="safety-actions">
                <button
                  type="button"
                  className="primary-button safety-yes"
                  onClick={() => pendingScenario && revealResult(pendingScenario)}
                >
                  Yes, I am safe right now.
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setSafetyState("support")}
                >
                  No—or I am not sure.
                </button>
              </div>
            </div>
          </section>
        )}

        {safetyState === "support" && (
          <section
            className="safety-wrap section-wrap"
            id="safety-check"
            tabIndex={-1}
            aria-live="assertive"
            aria-labelledby="support-heading"
          >
            <div className="safety-card support-card">
              <p className="step-label">YOUR SAFETY COMES FIRST</p>
              <h2 id="support-heading">Please involve a person who can help now.</h2>
              <div className="support-grid">
                <div>
                  <span>01</span>
                  <h3>Move toward safety</h3>
                  <p>If you can, go to a safer place or stay near a trusted person.</p>
                </div>
                <div>
                  <span>02</span>
                  <h3>Contact someone</h3>
                  <p>Tell a trusted adult, trusted person or qualified professional now.</p>
                </div>
                <div>
                  <span>03</span>
                  <h3>Use urgent support</h3>
                  <p>If anyone is in immediate danger, contact your local emergency number.</p>
                </div>
              </div>
              <div className="australia-support">
                <p>If you are in Australia</p>
                <a href="tel:000"><strong>Immediate danger</strong><span>Call Triple Zero (000)</span></a>
                <a href="tel:131114"><strong>Lifeline · 24/7</strong><span>13 11 14</span></a>
                <a href="tel:1800551800"><strong>Kids Helpline · ages 5–25 · 24/7</strong><span>1800 55 1800</span></a>
              </div>
              <p className="support-boundary">
                Phuture Me is a concept prototype. It cannot see your situation, contact
                services for you or replace human help.
              </p>
              <button type="button" className="text-button" onClick={reset}>
                Start again with another question
              </button>
            </div>
          </section>
        )}

        {result && (
          <section
            className="result-section section-wrap"
            ref={resultRef}
            tabIndex={-1}
            aria-live="polite"
            aria-labelledby="result-heading"
          >
            <div className="result-intro">
              <div>
                <p className="step-label">BEAUTIFUL OUT</p>
                <h2 id="result-heading">A clearer view, not an answer.</h2>
              </div>
              <button type="button" className="text-button" onClick={reset}>
                Explore another decision
              </button>
            </div>

            <div className="question-echo">
              <span>You are carrying</span>
              <p>“{result.prompt}”</p>
            </div>

            {result.supportNote && <p className="result-support-note">{result.supportNote}</p>}

            <article className="interpretation-card">
              <p className="card-number">01 · WHAT MAY BE UNDERNEATH</p>
              <p>{result.interpretation}</p>
            </article>

            <div className="path-grid">
              {[result.pathA, result.pathB].map((path, index) => (
                <article className={`path-card path-${index === 0 ? "a" : "b"}`} key={path.title}>
                  <p className="card-number">0{index + 2} · {path.label}</p>
                  <h3>{path.title}</h3>
                  <p>{path.summary}</p>
                  <dl>
                    <div>
                      <dt>May give you</dt>
                      <dd>{path.gives}</dd>
                    </div>
                    <div>
                      <dt>May ask of you</dt>
                      <dd>{path.asks}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>

            <section className="curve-card" aria-labelledby="curve-heading">
              <div className="curve-heading">
                <div>
                  <p className="card-number">04 · THE AGING CURVE</p>
                  <h3 id="curve-heading">How ordinary days may compound.</h3>
                </div>
                <p>This is not a prediction. It is a plausible path to explore.</p>
              </div>
              <div className="curve-legend" aria-hidden="true">
                <span><i className="dot-a" />Path A</span>
                <span><i className="dot-b" />Path B</span>
              </div>
              <ol className="curve-list">
                {result.curve.map((stage, index) => (
                  <li key={stage.label}>
                    <div className="stage-marker">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <i aria-hidden="true" />
                    </div>
                    <div className="stage-copy">
                      <p>{stage.horizon}</p>
                      <h4>{stage.label}</h4>
                      <div className="stage-path stage-path-a"><i />{stage.pathA}</div>
                      <div className="stage-path stage-path-b"><i />{stage.pathB}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <div className="closing-grid">
              <article>
                <p className="card-number">05 · HOLD THIS QUESTION</p>
                <blockquote>{result.reflection}</blockquote>
              </article>
              <article>
                <p className="card-number">06 · A SMALL REVERSIBLE EXPERIMENT</p>
                <p>{result.experiment}</p>
              </article>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer section-wrap">
        <div>
          <p className="footer-brand">Phuture Me™</p>
          <p>Based on the concept Messy In → Beautiful Out™ by Mahmood Matloob.</p>
        </div>
        <p className="disclaimer">
          Concept prototype only. Phuture Me does not replace a trusted adult,
          qualified professional, emergency service or crisis support.
        </p>
      </footer>
    </div>
  );
}

