"use client";

import { FormEvent, useRef, useState } from "react";
import {
  DecisionScenario,
  exampleQuestions,
  questionGroups,
  sanitizeDecisionInput,
  SafetyKind,
  scenarioForInput,
} from "./phuture-data";

type SafetyState = "idle" | "checking" | "support";

type SafetyPresentation = {
  checkHeading: string;
  checkBody: string;
  safeLabel: string;
  urgentLabel: string;
  supportHeading: string;
  urgentSupportHeading: string;
  steps: { title: string; body: string }[];
};

const safetyPresentations: Record<SafetyKind, SafetyPresentation> = {
  "self-harm": {
    checkHeading: "Are you in immediate danger of hurting yourself?",
    checkBody:
      "If you might act on this now, pause here. Move away from anything you could use to hurt yourself and get another person with you.",
    safeLabel: "I am not in immediate danger",
    urgentLabel: "I might act on this now",
    supportHeading: "Please bring another person into this now.",
    urgentSupportHeading: "Stay with another person and contact urgent support now.",
    steps: [
      {
        title: "Create immediate distance",
        body: "Move away from anything you could use to hurt yourself and go where another person is present.",
      },
      {
        title: "Say it plainly",
        body: "Tell someone: ‘I am worried I might hurt myself. Please stay with me while we get help.’",
      },
      {
        title: "Use crisis support",
        body: "If you may act now, call emergency services. Otherwise contact a crisis line or qualified professional today.",
      },
    ],
  },
  "harm-to-others": {
    checkHeading: "Could you act on this—or is someone in immediate danger?",
    checkBody:
      "Do not approach or confront the person. Create distance from them and anything you could use to cause harm, then involve someone who can help.",
    safeLabel: "No one is in immediate danger",
    urgentLabel: "Someone may be in danger",
    supportHeading: "Pause the situation and involve someone before you act.",
    urgentSupportHeading: "Create distance and get urgent human help now.",
    steps: [
      {
        title: "Create distance",
        body: "Do not meet, follow, message or confront the person. Move away from them and anything you could use to cause harm.",
      },
      {
        title: "Tell someone now",
        body: "Contact a trusted adult, qualified professional or calm person who can stay with you and help de-escalate.",
      },
      {
        title: "Protect everyone",
        body: "If anyone may be in immediate danger, contact emergency services and follow their instructions.",
      },
    ],
  },
  home: {
    checkHeading: "Before we look ahead, are you safe right now?",
    checkBody:
      "Your question may involve danger at home. You do not have to explain everything or handle it alone.",
    safeLabel: "Yes, I am safe right now",
    urgentLabel: "No—or I am not sure",
    supportHeading: "Please involve a person who can help now.",
    urgentSupportHeading: "Please involve a person who can help now.",
    steps: [
      { title: "Move toward safety", body: "If you can, go to a safer place or stay near a trusted person." },
      { title: "Contact someone", body: "Tell a trusted adult, trusted person or qualified professional now." },
      { title: "Use urgent support", body: "If anyone is in immediate danger, contact your local emergency number." },
    ],
  },
  gang: {
    checkHeading: "Before we look ahead, are you safe from pressure or threats right now?",
    checkBody:
      "If anyone is pressuring, coercing or threatening you, you deserve backup and do not need to manage it alone.",
    safeLabel: "Yes, I am safe right now",
    urgentLabel: "No—or I am not sure",
    supportHeading: "Please involve a person who can help now.",
    urgentSupportHeading: "Create distance and get human help now.",
    steps: [
      { title: "Move toward safety", body: "Avoid meeting the group alone and stay near a trusted person if you can." },
      { title: "Bring in backup", body: "Tell a trusted adult, youth worker or qualified professional what is happening." },
      { title: "Use urgent support", body: "If anyone is in immediate danger, contact your local emergency number." },
    ],
  },
  general: {
    checkHeading: "Before we look ahead, is anyone in immediate danger?",
    checkBody:
      "Your question may involve danger, violence, threats, pressure or coercion. Protection comes before exploration.",
    safeLabel: "No one is in immediate danger",
    urgentLabel: "Someone may be in danger",
    supportHeading: "Pause and involve someone who can help.",
    urgentSupportHeading: "Move toward safety and get human help now.",
    steps: [
      { title: "Create distance", body: "Pause contact and move toward a safer place or trusted person." },
      { title: "Contact someone", body: "Tell a trusted adult, trusted person or qualified professional what is happening." },
      { title: "Use urgent support", body: "If anyone is in immediate danger, contact your local emergency number." },
    ],
  },
};

export function PhutureMeApp() {
  const [decision, setDecision] = useState("");
  const [result, setResult] = useState<DecisionScenario | null>(null);
  const [pendingScenario, setPendingScenario] = useState<DecisionScenario | null>(null);
  const [safetyState, setSafetyState] = useState<SafetyState>("idle");
  const [supportUrgent, setSupportUrgent] = useState(false);
  const [unconnectedQuestion, setUnconnectedQuestion] = useState<string | null>(null);
  const resultRef = useRef<HTMLElement>(null);
  const prototypeBoundaryRef = useRef<HTMLElement>(null);
  const questionLibraryRef = useRef<HTMLDetailsElement>(null);

  const activeSafetyKind = pendingScenario?.safetyKind ?? "general";
  const safetyPresentation = safetyPresentations[activeSafetyKind];

  const revealResult = (scenario: DecisionScenario) => {
    setResult(scenario);
    setPendingScenario(null);
    setSafetyState("idle");
    setSupportUrgent(false);
    setUnconnectedQuestion(null);
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
    if (!scenario) {
      setResult(null);
      setPendingScenario(null);
      setSafetyState("idle");
      setSupportUrgent(false);
      setUnconnectedQuestion(cleanDecision);
      window.setTimeout(() => {
        prototypeBoundaryRef.current?.focus();
        prototypeBoundaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 40);
      return;
    }

    setUnconnectedQuestion(null);
    if (scenario.requiresSafetyCheck) {
      setResult(null);
      setPendingScenario(scenario);
      setSafetyState("checking");
      setSupportUrgent(false);
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
    setSupportUrgent(false);
    setUnconnectedQuestion(null);
    if (questionLibraryRef.current) questionLibraryRef.current.open = false;
    document.getElementById("decision")?.focus();
  };

  const showSupport = (urgent: boolean) => {
    setSupportUrgent(urgent);
    setSafetyState("support");
    window.setTimeout(() => {
      document.getElementById("safety-check")?.focus();
      document.getElementById("safety-check")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 40);
  };

  const confirmImmediateSafety = () => {
    if (!pendingScenario) return;
    if (pendingScenario.safetyOnly) {
      showSupport(false);
      return;
    }
    revealResult(pendingScenario);
  };

  const reset = () => {
    setDecision("");
    setResult(null);
    setPendingScenario(null);
    setSafetyState("idle");
    setSupportUrgent(false);
    setUnconnectedQuestion(null);
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
                <div className="form-footer-copy">
                  <p>Nothing you write leaves this page or is stored.</p>
                  <p>Complete journeys are currently available for the six featured questions below.</p>
                </div>
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
              <details className="question-library" ref={questionLibraryRef}>
                <summary>
                  <span>Explore more questions people carry</span>
                  <i aria-hidden="true">→</i>
                </summary>
                <p className="library-note">
                  A glimpse of where Phuture Me is growing next. These questions are not
                  connected to full journeys yet.
                </p>
                <div className="question-groups">
                  {questionGroups.map((group) => {
                    const groupId = `questions-${group.title.toLowerCase().replace(/[^a-z]+/g, "-")}`;

                    return (
                      <section key={group.title} aria-labelledby={groupId}>
                        <h3 id={groupId}>{group.title}</h3>
                        <ul>
                          {group.questions.map((question) => (
                            <li className="library-question" key={question}>
                              <span aria-hidden="true">•</span>
                              {question}
                            </li>
                          ))}
                        </ul>
                      </section>
                    );
                  })}
                </div>
              </details>
            </div>
          </div>
        </section>

        {unconnectedQuestion && (
          <section
            className="prototype-boundary-wrap section-wrap"
            id="prototype-boundary"
            ref={prototypeBoundaryRef}
            tabIndex={-1}
            aria-live="polite"
            aria-labelledby="prototype-boundary-heading"
          >
            <div className="prototype-boundary-card">
              <p className="step-label">HONEST PROTOTYPE BOUNDARY</p>
              <h2 id="prototype-boundary-heading">
                This question deserves a properly connected response.
              </h2>
              <blockquote>“{unconnectedQuestion}”</blockquote>
              <p>
                Phuture Me does not yet have a complete journey written for this
                question. Rather than give you a generic answer that could feel
                personal, this prototype stops here.
              </p>
              <div className="prototype-boundary-note">
                <strong>What works today</strong>
                <span>
                  Choose one of the six featured questions above for a complete
                  two-path exploration and Aging Curve.
                </span>
              </div>
              <button type="button" className="text-button" onClick={reset}>
                Choose a connected question
              </button>
            </div>
          </section>
        )}

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
              <h2 id="safety-heading">{safetyPresentation.checkHeading}</h2>
              <p>{safetyPresentation.checkBody}</p>
              <div className="safety-actions">
                <button
                  type="button"
                  className="primary-button safety-yes"
                  onClick={confirmImmediateSafety}
                >
                  {safetyPresentation.safeLabel}
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => showSupport(true)}
                >
                  {safetyPresentation.urgentLabel}
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
              <h2 id="support-heading">
                {supportUrgent
                  ? safetyPresentation.urgentSupportHeading
                  : safetyPresentation.supportHeading}
              </h2>
              <div className="support-grid">
                {safetyPresentation.steps.map((step, index) => (
                  <div key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                ))}
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
