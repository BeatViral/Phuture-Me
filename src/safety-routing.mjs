/** @typedef {"self-harm" | "harm-to-others" | "home" | "gang" | "general"} SafetyKind */

const selfHarmPatterns = [
  /\bsuicid(?:e|al)\b/,
  /\b(?:kill|hurt|harm) myself\b/,
  /\bself[ -]?harm\b/,
  /\b(?:end|take) my (?:own )?life\b/,
  /\b(?:want|wish) to die\b/,
  /\b(?:do not|don't) want to (?:live|be alive)\b/,
  /\bend it all\b/,
];

const otherPerson =
  "(?:someone|somebody|a person|people|him|her|them|my (?:friend|partner|boyfriend|girlfriend|wife|husband|mother|father|mum|mom|dad|brother|sister|child|boss|teacher|neighbou?r))";
const harmVerb = "(?:hurt|harm|kill|murder|attack|stab|shoot|hit|punch|kick|choke|strangle|assault)";
const harmToOthersPatterns = [
  new RegExp(`\\b(?:should|could|might|will|would|do|can) i (?:really |physically )?${harmVerb} ${otherPerson}\\b`),
  new RegExp(`\\bi (?:want|plan|intend|am going) to ${harmVerb} ${otherPerson}\\b`),
  new RegExp(`\\bi (?:might|could|will) ${harmVerb} ${otherPerson}\\b`),
  new RegExp(`\\bi(?:'m| am) going to ${harmVerb} ${otherPerson}\\b`),
  new RegExp(`\\bi feel like (?:hurting|harming|killing|attacking|stabbing|shooting|hitting|punching|kicking|choking|strangling|assaulting) ${otherPerson}\\b`),
  new RegExp(`\\b(?:should|could|might|will|would|do|can) i beat ${otherPerson} up\\b`),
];

const homeContext = /\b(?:home|family|parent|mother|father|mum|mom|dad|guardian|brother|sister|relative)\b/;
const homeRisk = /\b(?:abuse|abusive|unsafe|not safe|violence|violent|hurt me|hits? me|hitting me|threatens? me|threatened me|happening at home)\b/;
const generalRisk = /\b(?:abuse|abusive|violence|violent|threat|threatened|threatening|coercion|coerced|coercing|blackmail|blackmailed|weapon|immediate danger)\b/;

/**
 * Classify only the safety route. Ordinary decisions return null.
 * Specific self-harm and harm-to-others signals are checked before broader danger language.
 * @param {string} rawInput
 * @returns {SafetyKind | null}
 */
export function detectSafetyKind(rawInput) {
  const input = rawInput.toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ").trim();

  if (selfHarmPatterns.some((pattern) => pattern.test(input))) return "self-harm";
  if (harmToOthersPatterns.some((pattern) => pattern.test(input))) return "harm-to-others";
  if (/\bgangs?\b/.test(input)) return "gang";
  if (/\b(?:run|running) away\b/.test(input) || /\bdomestic violence\b/.test(input)) return "home";
  if (homeContext.test(input) && homeRisk.test(input)) return "home";
  if (generalRisk.test(input)) return "general";

  return null;
}
