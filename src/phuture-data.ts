export type CurveStage = {
  label: "Now" | "Soon" | "Later" | "Older You";
  horizon: string;
  pathA: string;
  pathB: string;
};

export type DecisionPath = {
  label: string;
  title: string;
  summary: string;
  gives: string;
  asks: string;
};

export type DecisionScenario = {
  id: string;
  prompt: string;
  requiresSafetyCheck?: boolean;
  interpretation: string;
  pathA: DecisionPath;
  pathB: DecisionPath;
  curve: CurveStage[];
  reflection: string;
  experiment: string;
  supportNote?: string;
};

export const exampleQuestions = [
  "Should I join the army when I really want to be a musician?",
  "I love learning and playing guitar, but I hate school. What should I do?",
  "Should I move out of my parents’ home?",
  "Should I start this new relationship?",
  "Should I tell someone what is happening at home?",
  "Should I join this gang?",
] as const;

const scenarios: Record<string, DecisionScenario> = {
  armyMusic: {
    id: "army-music",
    prompt: exampleQuestions[0],
    interpretation:
      "This may be less about choosing a job and more about choosing what will shape your identity: structure, service and stable direction—or creative autonomy, uncertainty and a life built around music. It is also worth asking whether these futures truly have to cancel each other out.",
    pathA: {
      label: "Possible Path A",
      title: "Choose military structure",
      summary:
        "Training, service and a defined role may bring belonging, discipline and a clearer financial path. The trade-offs can include reduced autonomy, physical risk, relocation and less control over your creative time.",
      gives: "Structure, team, service, steady direction",
      asks: "Autonomy, physical safety, creative time",
    },
    pathB: {
      label: "Possible Path B",
      title: "Build a serious music path",
      summary:
        "A self-directed music life may protect creativity and personal expression. It can also ask you to tolerate uneven income, create your own routines and keep going without a guaranteed ladder.",
      gives: "Creative identity, autonomy, self-direction",
      asks: "Financial certainty, external structure, patience",
    },
    curve: [
      {
        label: "Now",
        horizon: "The first step",
        pathA: "A clear intake process and demanding preparation may simplify the next move.",
        pathB: "A self-made practice and work routine may feel exciting, but less certain.",
      },
      {
        label: "Soon",
        horizon: "The rhythm forms",
        pathA: "Your days may be highly structured, with less choice over time and place.",
        pathB: "Your days may offer freedom, while requiring discipline no one else supplies.",
      },
      {
        label: "Later",
        horizon: "Identity deepens",
        pathA: "Service, skills and team identity may grow; creative work may need protecting.",
        pathB: "A body of work and community may grow; income pressure may shape decisions.",
      },
      {
        label: "Older You",
        horizon: "What remains",
        pathA: "You may value service and stability—or wonder about the music not tested.",
        pathB: "You may value creative ownership—or wish you had built more security beside it.",
      },
    ],
    reflection:
      "Which future feels more like the person you want to become—and which sacrifice deserves more honest attention?",
    experiment:
      "Before making the largest version of either choice, speak to one current and one former service member, then run a six-week music routine with fixed practice, recording and paid-work hours. Compare the lived routines, not just the ideas.",
  },
  guitarSchool: {
    id: "guitar-school",
    prompt: exampleQuestions[1],
    interpretation:
      "The real question may not be ‘school or music.’ It may be whether you dislike learning itself, or the classroom, pressure, pace, subjects, social conditions—or the feeling that your talent is invisible.",
    pathA: {
      label: "Possible Path A",
      title: "Protect education, redesign the experience",
      summary:
        "Staying connected to education can keep future options open. That does not mean accepting the current setup unchanged: subjects, pace, learning format and support may be negotiable.",
      gives: "Options, qualifications, wider foundations",
      asks: "Energy, patience, a better support plan",
    },
    pathB: {
      label: "Possible Path B",
      title: "Test music as serious work",
      summary:
        "Treating guitar as a craft means more than playing when inspired. It means deliberate practice, finishing work, finding teachers and audiences, and learning the practical side of a creative life.",
      gives: "Momentum, identity, real-world evidence",
      asks: "Consistency, feedback, commercial reality",
    },
    curve: [
      {
        label: "Now",
        horizon: "Name the friction",
        pathA: "You identify what is actually making school hard instead of rejecting all learning.",
        pathB: "You give music protected time and measurable goals instead of only wishing for it.",
      },
      {
        label: "Soon",
        horizon: "A six-month test",
        pathA: "A changed subject load, format or support person may reduce pressure.",
        pathB: "Regular lessons, recordings and performances show whether the work still fits.",
      },
      {
        label: "Later",
        horizon: "Evidence replaces fantasy",
        pathA: "You may retain more routes into work, training or further study.",
        pathB: "You may build skill, collaborators and a clearer view of creative income.",
      },
      {
        label: "Older You",
        horizon: "A wider identity",
        pathA: "Education may become one tool you used, rather than the thing that defined you.",
        pathB: "Music may remain a profession, a serious practice—or both—without being abandoned.",
      },
    ],
    reflection:
      "What do you hate about school specifically, and what would serious commitment to music look like on an ordinary Tuesday?",
    experiment:
      "Run a protected six-month trial: keep an agreed education pathway, schedule five focused guitar sessions a week, finish one recording each month, work with a teacher or mentor, and review the evidence with a trusted adult before making a bigger change.",
  },
  movingOut: {
    id: "moving-out",
    prompt: exampleQuestions[2],
    interpretation:
      "You may be reaching for freedom, privacy or safer boundaries. The useful version of the question may be: ‘What would leaving safely, with a plan, actually require?’",
    pathA: {
      label: "Possible Path A",
      title: "Prepare, then move",
      summary:
        "A planned move can create privacy and independence while making rent, food, transport, work and backup support visible before they become emergencies.",
      gives: "Freedom, clearer boundaries, ownership",
      asks: "Money, domestic work, planning, support",
    },
    pathB: {
      label: "Possible Path B",
      title: "Stay briefly, change the terms",
      summary:
        "A time-limited stay may let you save money and prepare. It only works if boundaries, contribution, privacy and a real review date can be made clearer.",
      gives: "Savings, preparation time, lower risk",
      asks: "Patience, boundary conversations, a deadline",
    },
    curve: [
      {
        label: "Now",
        horizon: "Make it concrete",
        pathA: "You price rent, bond, food, transport and utilities against reliable income.",
        pathB: "You name the boundaries that must change and set a preparation timeline.",
      },
      {
        label: "Soon",
        horizon: "The daily reality",
        pathA: "Privacy may increase alongside chores, budgeting and possible loneliness.",
        pathB: "Savings may grow, while old family patterns may continue to test you.",
      },
      {
        label: "Later",
        horizon: "Stability is tested",
        pathA: "Work, housemates and transport may matter more than the feeling of escape.",
        pathB: "A stronger financial base may widen your choices if the exit date stays real.",
      },
      {
        label: "Older You",
        horizon: "Boundaries become skills",
        pathA: "You may remember learning independence through responsibility and support.",
        pathB: "You may value the preparation—or regret waiting if the plan kept moving.",
      },
    ],
    reflection:
      "Are you mostly moving toward a life you can support, or moving away from a feeling that needs attention now?",
    experiment:
      "Build a real one-month budget, inspect two realistic housing options, practise paying the full weekly cost into savings, and identify one person you could call if the plan became unstable.",
  },
  relationship: {
    id: "relationship",
    prompt: exampleQuestions[3],
    interpretation:
      "Attraction may be only one part of this. The deeper question is whether this connection makes room for respect, safety, boundaries, confidence, friendships and the person you already are.",
    pathA: {
      label: "Possible Path A",
      title: "Begin slowly and stay visible",
      summary:
        "You can explore the relationship without handing it your whole life. Keep your friendships, routines and boundaries, and notice how the other person responds to ‘no’, time apart and honest disagreement.",
      gives: "Connection, discovery, shared experience",
      asks: "Clear boundaries, honesty, careful attention",
    },
    pathB: {
      label: "Possible Path B",
      title: "Pause and learn more",
      summary:
        "Waiting can protect space to notice patterns without the pressure of a label. A pause is information, not a failure—and a respectful person can tolerate your pace.",
      gives: "Perspective, time, protected identity",
      asks: "Uncertainty, a direct conversation, patience",
    },
    curve: [
      {
        label: "Now",
        horizon: "Watch the small moments",
        pathA: "Early warmth may grow; pay attention to respect for your pace and boundaries.",
        pathB: "Distance may feel awkward, but can reveal whether interest comes with respect.",
      },
      {
        label: "Soon",
        horizon: "Patterns appear",
        pathA: "You may feel more supported—or begin shrinking routines to avoid conflict.",
        pathB: "You may gain clarity while keeping friendships and confidence steady.",
      },
      {
        label: "Later",
        horizon: "Lives start to overlap",
        pathA: "Healthy interdependence can grow if both people stay whole and heard.",
        pathB: "The connection may return with clearer terms, change shape, or naturally end.",
      },
      {
        label: "Older You",
        horizon: "The lesson carried forward",
        pathA: "You may remember becoming more yourself—or the signs that you became smaller.",
        pathB: "You may value learning that care and boundaries can exist together.",
      },
    ],
    reflection:
      "Around this person, do you become more yourself—or do you gradually become smaller?",
    experiment:
      "Choose one honest boundary and one important existing friendship or routine to protect for a month. Notice the response without explaining the boundary away.",
  },
  homeSafety: {
    id: "home-safety",
    prompt: exampleQuestions[4],
    requiresSafetyCheck: true,
    interpretation:
      "Part of you may want support while another part fears what could happen if you speak. You do not have to tell everyone or solve everything at once. The next question is who could help you make a safer telling plan.",
    pathA: {
      label: "Safer Path A",
      title: "Tell one trusted person with a plan",
      summary:
        "Choose someone whose role and behaviour make them more likely to act carefully: a trusted adult, teacher, health professional, youth worker or family member outside the situation.",
      gives: "Support, witnesses, more options",
      asks: "Courage, choosing the person and moment carefully",
    },
    pathB: {
      label: "Safer Path B",
      title: "Ask for help planning what to say",
      summary:
        "If telling the full story feels unsafe, a support service or trusted adult can help you think through who to contact, what you want them to understand and what support you need next.",
      gives: "Preparation, control over the first step",
      asks: "Reaching beyond the situation, accepting support",
    },
    curve: [
      {
        label: "Now",
        horizon: "Protection first",
        pathA: "One safe person learns enough to help you think about the next step.",
        pathB: "You get support choosing how and where to speak without facing it alone.",
      },
      {
        label: "Soon",
        horizon: "Support gathers",
        pathA: "The person may help connect you with professional or protective support.",
        pathB: "A careful plan may make the first disclosure feel more manageable.",
      },
      {
        label: "Later",
        horizon: "Responsibility is shared",
        pathA: "More adults or services may become involved; their job is to help protect you.",
        pathB: "You may choose a supported disclosure when the safer conditions are in place.",
      },
      {
        label: "Older You",
        horizon: "You were not meant to hold it alone",
        pathA: "You may remember that asking for help was a protective act, not betrayal.",
        pathB: "You may carry forward the knowledge that your safety deserved support.",
      },
    ],
    reflection:
      "Who has shown, through their actions, that they take your safety seriously?",
    experiment:
      "Write only the first sentence you want a trusted person to hear, such as ‘Something at home is making me feel unsafe and I need help thinking about what to do.’ Keep it private until you are with someone safe.",
    supportNote:
      "If you become unsafe or unsure, stop exploring and contact a trusted person, professional support or emergency service.",
  },
  gangSafety: {
    id: "gang-safety",
    prompt: exampleQuestions[5],
    requiresSafetyCheck: true,
    interpretation:
      "This question can be about belonging, protection, pressure, fear or identity—not simply a lifestyle choice. The risk and consequences are real, so the useful comparison is between safer ways to find connection and support.",
    pathA: {
      label: "Safer Path A",
      title: "Build belonging somewhere safer",
      summary:
        "A trusted coach, youth worker, cultural group, music crew, training program or community team may offer connection without requiring harm, secrecy or criminal risk.",
      gives: "Belonging, mentors, identity, future options",
      asks: "A first approach, patience, trying more than one place",
    },
    pathB: {
      label: "Safer Path B",
      title: "Get help with pressure or threats",
      summary:
        "If someone is pressuring, coercing or threatening you, involve a trusted adult or professional. You deserve help thinking about safety; you do not need to manage the pressure alone.",
      gives: "Backup, protection, choices beyond the group",
      asks: "Telling someone, accepting immediate human help",
    },
    curve: [
      {
        label: "Now",
        horizon: "Name the real need",
        pathA: "You look for belonging and respect without owing anyone harm or secrecy.",
        pathB: "A trusted person helps you understand the pressure and immediate safety needs.",
      },
      {
        label: "Soon",
        horizon: "A different circle forms",
        pathA: "Regular shared work may build genuine connection and confidence.",
        pathB: "Support may reduce isolation and create safer practical options.",
      },
      {
        label: "Later",
        horizon: "Options stay open",
        pathA: "Skills, references and friendships may widen education and work paths.",
        pathB: "Distance from coercion may protect relationships, freedom and future choices.",
      },
      {
        label: "Older You",
        horizon: "Belonging without surrender",
        pathA: "You may remember finding people who valued you without shrinking your future.",
        pathB: "You may value the moment you let other people help carry the danger.",
      },
    ],
    reflection:
      "What are you hoping this group would give you—and who else might help you find that without asking you to risk your safety or future?",
    experiment:
      "Tell one trusted adult or youth professional what is drawing or pushing you toward the group. Ask them to help you try one safer place for belonging this week.",
    supportNote:
      "If anyone is pressuring or threatening you, pause here and involve a trusted person or professional support now.",
  },
};

const unsafeTerms = [
  "suicide",
  "kill myself",
  "end my life",
  "self harm",
  "self-harm",
  "hurt myself",
  "abuse",
  "abusive",
  "violence",
  "violent",
  "threat",
  "threatened",
  "coercion",
  "coerced",
  "run away",
  "running away",
  "gang",
  "crime",
  "criminal",
  "not safe",
  "unsafe at home",
];

export function sanitizeDecisionInput(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 600);
}

export function scenarioForInput(rawInput: string): DecisionScenario {
  const input = sanitizeDecisionInput(rawInput);
  const lower = input.toLowerCase();

  if (lower.includes("gang")) return scenarios.gangSafety;
  if (
    (lower.includes("happening at home") || lower.includes("tell someone")) &&
    (lower.includes("home") || lower.includes("abuse") || lower.includes("unsafe"))
  ) {
    return scenarios.homeSafety;
  }
  if (unsafeTerms.some((term) => lower.includes(term))) {
    return {
      ...scenarios.homeSafety,
      id: "custom-safety",
      prompt: input,
      interpretation:
        "Your question may involve danger, harm, pressure or coercion. Protection comes before exploring possible futures, and you do not have to handle this alone.",
    };
  }
  if (
    (lower.includes("army") || lower.includes("military")) &&
    (lower.includes("music") || lower.includes("musician"))
  ) {
    return scenarios.armyMusic;
  }
  if (
    (lower.includes("guitar") || lower.includes("music")) &&
    (lower.includes("school") || lower.includes("study"))
  ) {
    return scenarios.guitarSchool;
  }
  if (
    (lower.includes("move out") || lower.includes("moving out") || lower.includes("leave home")) &&
    !lower.includes("unsafe")
  ) {
    return scenarios.movingOut;
  }
  if (lower.includes("relationship") || lower.includes("dating")) {
    return scenarios.relationship;
  }

  return {
    id: "open-question",
    prompt: input,
    interpretation:
      "There may be two questions living together here: what gives you relief or momentum now, and what kind of daily life each option may quietly build over time. Making the trade-offs concrete can create room to think.",
    pathA: {
      label: "Possible Path A",
      title: "Move toward the change",
      summary:
        "This path may bring movement, new information and a stronger sense of agency. It may also introduce costs, commitments and consequences that are easy to overlook while the idea is still new.",
      gives: "Momentum, learning, a different routine",
      asks: "Preparation, uncertainty, accepting trade-offs",
    },
    pathB: {
      label: "Possible Path B",
      title: "Pause, prepare or reshape it",
      summary:
        "A pause can protect stability and create time for a smaller test. It can also become avoidance if there is no date, evidence or condition that would let the decision move.",
      gives: "Time, stability, a lower-risk test",
      asks: "A deadline, honest criteria, patience",
    },
    curve: [
      {
        label: "Now",
        horizon: "The first move",
        pathA: "Energy may rise as the decision becomes real; practical gaps also become visible.",
        pathB: "Pressure may ease while you collect facts and define a smaller experiment.",
      },
      {
        label: "Soon",
        horizon: "The routine arrives",
        pathA: "The choice starts to feel less like an idea and more like ordinary days.",
        pathB: "Preparation may build confidence—or delay may begin to repeat itself.",
      },
      {
        label: "Later",
        horizon: "Compounding effects",
        pathA: "Skills, relationships, money and identity may begin reinforcing the new path.",
        pathB: "Options may stay open, while the cost of not choosing may become clearer.",
      },
      {
        label: "Older You",
        horizon: "The meaning you carry",
        pathA: "You may value having tested the future directly, even if you later adjust it.",
        pathB: "You may value protecting what mattered—or wish the test had begun sooner.",
      },
    ],
    reflection:
      "Which future feels more like the person you want to become, and which loss would be harder to live with?",
    experiment:
      "Design a two-week version that is safe, legal, low-cost and reversible. Decide in advance what you will observe about energy, stress, time, money and identity before reviewing what you learned.",
  };
}

