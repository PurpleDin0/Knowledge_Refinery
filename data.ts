
import { Phase, Tool, MatrixRow, Tip } from './types';

export const PHASES: Phase[] = [
  {
    id: 0,
    title: "Course & Intent Framing",
    subtitle: "Pre-Task Cognition",
    goal: "Establish the Human Command Intent. Do not ask AI to 'find a topic'. Define victory conditions.",
    inputs: [
      "Assignment Rubric (CLOs, grading weights)",
      "The Budget: Time constraints & Word Count",
      "Human Intent: Area of interest"
    ],
    outputs: [
      "Working Thesis",
      "Resource Check (Viability)",
      "Decoded Checklist (Rubric requirements)"
    ],
    prompt: {
      role: "Act as a Senior Academic Advisor.",
      example: "I have 8 hours to write a 2,000-word paper on [Topic X]. Review the attached rubric. Refine my topic to ensure it is narrow enough to meet the 'Analysis' criteria but broad enough to find data. What are the specific 'Victory Conditions' for an A- grade based on this rubric text?",
      strategy: "Scope Alignment. Force the AI to tell you if your topic is too big before you start."
    },
    aiJobs: ["Constraint Analysis (Flagging scope issues)", "Rubric Decoding (Jargon to plain English)"],
    humanJobs: ["Topic Selection (What you care about)", "Intent Definition (Why you are writing this)"],
    bestTool: "GPT-5.1 (Logic & Constraints)"
  },
  {
    id: 1,
    title: "Thesis Architecture",
    subtitle: "Strategy & Logic Mapping",
    goal: "Structure the argument and generate the search queries to mine data.",
    inputs: ["Working Thesis", "Rubric Requirements"],
    outputs: ["Refined Thesis Statement", "Argument Map (Drivers → Mechanisms → Outcomes)", "Evidence Requirements List", "Draft Search Prompts"],
    prompt: {
      role: "Act as a Research Librarian.",
      example: "Review my working thesis. 1) Create a high-level Argument Map. 2) Write 3 specific search prompts I can use in NotebookLM/Perplexity to find evidence for these claims. Do not summarize; give me the queries.",
      strategy: "Prompt Engineering. Ask the AI to write search queries for the next phase."
    },
    aiJobs: ["Logic Mapping (Visualizing causal chains)", "Query Generation (Precise search strings)"],
    humanJobs: ["Hypothesis Check (Does it make sense?)", "Gap Analysis (What is missing?)"],
    bestTool: "Claude Sonnet 4.5 (Reasoning)"
  },
  {
    id: 2,
    title: "Evidence Mining",
    subtitle: "Extraction Operations",
    goal: "Tear through reading lists to build a structured dataset. Extract specific ammunition.",
    inputs: ["Draft Prompts", "NotebookLM (PDFs)", "Perplexity (External Data)"],
    outputs: ["The Corpus (Filled Notebook)", "Evidence Table (Quotes linked to Argument Map)", "New Sources"],
    prompt: {
      role: "Act as a Data Analyst.",
      example: "Search for sources addressing [Topic]. Look for claims about [Innovation Cycles]. OUTPUT FORMAT: Source: [Filename] | Contribution: [One sentence] | Key Evidence: [Stat/Page#] | Section Utility: [Support/Counter]",
      strategy: "Structured Extraction. Force AI to output data tables, not paragraphs."
    },
    aiJobs: ["Ingestion (Reading 1000s of pages)", "Pattern Recognition (Connecting cross-source claims)"],
    humanJobs: ["Sourcing Quality (Credibility check)", "'Stop' Signal (Deciding when you have enough)"],
    bestTool: "NotebookLM + Perplexity"
  },
  {
    id: 3,
    title: "Argument Architecture",
    subtitle: "Structural Planning & Red Teaming",
    goal: "Design narrative flow and 'Steelman' the counter-argument.",
    inputs: ["Evidence Table", "Refined Thesis", "Rubric Weights"],
    outputs: ["Annotated Outline (with word budget)", "Counterargument Plan (Steelman)"],
    prompt: {
      role: "Act as a Structural Editor.",
      example: "Review my draft outline and incorporate the evidence table. Allocate word counts to ensure I spend effort based on the grading rubric. [Skeptic Mode]: Attack my thesis. What is the strongest counterargument? How do I refute it?",
      strategy: "Steelman & Budgeting. Use word counts to force discipline."
    },
    aiJobs: ["Budgeting (Allocating words per section)", "Adversarial Review (Simulating a skeptic)"],
    humanJobs: ["Narrative Flow (Storytelling)", "Trade-offs (Cutting arguments to save space)"],
    bestTool: "Claude Sonnet 4.5 (Long Context)"
  },
  {
    id: 4,
    title: "Drafting & Stitching",
    subtitle: "Assembly Line",
    goal: "Turn outline into prose. Don't have AI write the paper; use it for flow and transitions.",
    inputs: ["Annotated Outline", "Evidence Snippets", "Rough Paragraphs"],
    outputs: ["Full Draft", "Wired Citations", "'Discomfort List' (Weak points)"],
    prompt: {
      role: "Act as a Developmental Editor.",
      example: "I wrote this rough paragraph [text]. It transitions from A to B but feels clunky. Suggest 3 ways to improve flow while maintaining my voice. Do not rewrite the whole thing—show phrase alternatives.",
      strategy: "Chain of Thought. Draft section-by-section. Ask for options, not solutions."
    },
    aiJobs: ["Stitching (Smooth transitions)", "Voice Matching (Adapting to tone)"],
    humanJobs: ["The 'Hook' (Intro/Thesis)", "Nuance (Quote vs Paraphrase decisions)"],
    bestTool: "Claude Sonnet 4.5 (Drafting) + GPT-5.1 (Line Edits)"
  },
  {
    id: 5,
    title: "Quality Control",
    subtitle: "Logic & Logistics",
    goal: "Rigorous logic checking and rubric adherence. The 'Murder Board'.",
    inputs: ["Full Draft", "The Rubric (Distinguished Column)"],
    outputs: ["Logic Gap Report", "Rubric Alignment Check (Pass/Fail)", "Revision List"],
    prompt: {
      role: "Act as a Ruthless Grader.",
      example: "Evaluate this draft against the rubric's criteria. Did I explicitly answer all the requirements? Quote where I did that. If you can't find it, tell me I failed.",
      strategy: "Quote-Back. Force AI to cite your own text as evidence."
    },
    aiJobs: ["Grading (Objective assessment)", "Consistency Check"],
    humanJobs: ["Arbitration (Which critiques to accept)", "Sanity Check (Does it sound like you?)"],
    bestTool: "GPT-5.1 (Logic Adherence)"
  },
  {
    id: 6,
    title: "Final Polish",
    subtitle: "Thematic Resonance",
    goal: "Elevate from 'passable' to 'compelling'. Ensure Intro and Conclusion rhyme.",
    inputs: ["Revised Draft", "Intro & Conclusion"],
    outputs: ["Final Polish", "Thematic Resonance (Connected arc)", "Final Graded Pass"],
    prompt: {
      role: "Act as a Senior Editor.",
      example: "Read my Intro and Conclusion. Do they align? Suggest some thematic metaphors in the Intro that I can 'call back' to in the Conclusion so they rhyme.",
      strategy: "Thematic Tying. Tighten the narrative arc."
    },
    aiJobs: ["Stylistic Polish (Metaphors, Alliteration)", "Compression (Reducing word count)"],
    humanJobs: ["Final Approval", "Ethics Check"],
    bestTool: "Gemini 2.5 (Creative Polish)"
  },
  {
    id: 7,
    title: "AI Disclosure",
    subtitle: "Integrity & Compliance",
    goal: "Document AI usage per NDU Instruction 9000.01. Methodological rigor, not confession.",
    inputs: ["Final Paper", "Detailed Workflow"],
    outputs: ["Disclosure Statement", "Citation Additions"],
    prompt: {
      role: "Act as a Technical Editor for Academic Integrity.",
      example: "I used [Tools] in [Phases]. Draft a disclosure statement that: 1) specifies cognitive tasks delegated vs retained, 2) identifies AI-generated content vs original. Make it compliant with NDU standards.",
      strategy: "Transparency with Context. Frame as a methodological choice."
    },
    aiJobs: ["Formatting", "Compliance Check"],
    humanJobs: ["Honesty", "Final Accountability"],
    bestTool: "GPT-5.1 (Compliance)"
  }
];

export const TOOLS: Tool[] = [
  {
    name: "NotebookLM",
    role: "The Library",
    bestUse: "Ingesting PDFs; Grounded evidence extraction with source attribution.",
    cost: "Free (Student)",
    contextWindow: "High Source Count",
    score: "Gold"
  },
  {
    name: "GPT-5.1 Thinking",
    role: "The Editor/Grader",
    bestUse: "Rubric decoding, logic checking, adversarial grading.",
    cost: "Free (Enterprise)",
    contextWindow: "~128k - 196k",
    score: "Gold"
  },
  {
    name: "Claude Sonnet 4.5",
    role: "The Architect",
    bestUse: "Long-context thesis development, sustained analytical dialogue.",
    cost: "$20/mo",
    contextWindow: "200k - 1M",
    score: "Gold"
  },
  {
    name: "Perplexity",
    role: "The Scout",
    bestUse: "Real-time web search for recent reports/stats.",
    cost: "Free (Gov)",
    contextWindow: "8k per search",
    score: "Green"
  },
  {
    name: "Gemini 2.5",
    role: "The Polisher",
    bestUse: "Prose refinement, creative metaphor generation.",
    cost: "Free (Student)",
    contextWindow: "1M+ (Flash/Pro)",
    score: "Green"
  },
  {
    name: "Gemini 3.0",
    role: "Prototype",
    bestUse: "Complex reasoning tasks, multimodal analysis.",
    cost: "Preview",
    contextWindow: "1M+",
    score: "Grey"
  }
];

export const TOOL_MATRIX: MatrixRow[] = [
  {
    task: "Decode assignment & rubric",
    notebookLM: { rating: 'Grey', text: "Limited. Focus on your uploaded sources, include rubric and syllabus for context" },
    gpt51: { rating: 'Green', text: "Strong. Excellent at summarizing constraints; can mirror rubric language into checklists." },
    claude: { rating: 'Green', text: "Strong. Good at \"explain like X\" (e.g., \"Explain this rubric for a Joint O-5\")." },
    gemini: { rating: 'Grey', text: "Usable. Capable, but not distinctively better here." },
    perplexity: { rating: 'Red', text: "Overkill. Web search is not needed for internal rubric parsing." }
  },
  {
    task: "Ingest & search course readings",
    notebookLM: { rating: 'Gold', text: "Core Use. Grounded QA across many PDFs; notebookLM acts as your specific \"Library\"." },
    gpt51: { rating: 'Grey', text: "Limited. Can store a modest project doc set; fine for a few key PDFs." },
    claude: { rating: 'Grey', text: "Limited. Can keep a small set of reference docs in context/projects, but less robust than NotebookLM." },
    gemini: { rating: 'Red', text: "Not its lane." },
    perplexity: { rating: 'Red', text: "Wrong tool. Uses the open web, not your private PDFs." }
  },
  {
    task: "Find external sources",
    notebookLM: { rating: 'Unknown', text: "Emerging. New features are emerging, but not a primary discovery tool yet." },
    gpt51: { rating: 'Grey', text: "Generic. Can suggest general source types and keywords, but regularly hallucinates citations." },
    claude: { rating: 'Grey', text: "Generic. Can suggest general sources, but lacks access to" },
    gemini: { rating: 'Grey', text: "Generic. I haven’t tested this extensively." },
    perplexity: { rating: 'Gold', text: "Core Strength. Web-connected; surfaces real papers, reports, and stats with direct links." }
  },
  {
    task: "Summarize a single source",
    notebookLM: { rating: 'Grey', text: "Grounded. Can summarize sources you’ve uploaded; citation granularity varies by file format." },
    gpt51: { rating: 'Green', text: "Good. If you paste the full text (within ~128k context) and ask for a structured summary." },
    claude: { rating: 'Green', text: "Very Good. Handles long, complex texts (200k–1M context); preserves structure well." },
    gemini: { rating: 'Grey', text: "Okay." },
    perplexity: { rating: 'Grey', text: "Good, can summarize sources it finds, but rapidly loses context/hallucinates" }
  },
  {
    task: "Merge notes or citations into evidence table",
    notebookLM: { rating: 'Grey', text: "Recall. Can help recall where a claim is discussed across your sources." },
    gpt51: { rating: 'Green', text: "Great. Excellent at turning messy bullets into structured tables (Claim / Evidence / Source)." },
    claude: { rating: 'Green', text: "Great. Especially nice when the full note history is in the context window." },
    gemini: { rating: 'Grey', text: "Usable. Not a primary use case." },
    perplexity: { rating: 'Red', text: "Not suitable. This is an internal structuring job." }
  },
  {
    task: "Thesis refinement & causal map",
    notebookLM: { rating: 'Grey', text: "Reference. Can point to where readings support/oppose an idea." },
    gpt51: { rating: 'Green', text: "Strong. Good for logical rephrasing and quick critiques." },
    claude: { rating: 'Gold', text: "Best. Very strong at multi-step reasoning and \"what’s missing?\" critiques over long conversations." },
    gemini: { rating: 'Grey', text: "Creative. Can suggest metaphors or frames for your causal story." },
    perplexity: { rating: 'Red', text: "Not suitable." }
  },
  {
    task: "Outline design (Structure)",
    notebookLM: { rating: 'Red', text: "Not suitable." },
    gpt51: { rating: 'Green', text: "Good. Converts thesis + bullets into a clean outline with headings." },
    claude: { rating: 'Gold', text: "Best. Excellent when it holds thesis + evidence + rubric in one long context window." },
    gemini: { rating: 'Grey', text: "Stylistic. Can add stylistic flourish to headings and labels." },
    perplexity: { rating: 'Red', text: "Not suitable." }
  },
  {
    task: "Paragraph / section editing",
    notebookLM: { rating: 'Red', text: "Not suitable." },
    gpt51: { rating: 'Green', text: "Surgical. Great for tone control, passive → active voice, and tightening." },
    claude: { rating: 'Gold', text: "Flow. Strong; adapts closely to custom/personal writing styles across long drafts." },
    gemini: { rating: 'Grey', text: "Polish. Can add flair after the structure is set." },
    perplexity: { rating: 'Red', text: "Not suitable." }
  },
  {
    task: "Metaphors, alliteration, titles",
    notebookLM: { rating: 'Red', text: "Not suitable." },
    gpt51: { rating: 'Green', text: "Good. Can brainstorm titles and analogies." },
    claude: { rating: 'Green', text: "Good. Can keep metaphors consistent with earlier framing." },
    gemini: { rating: 'Gold', text: "Creative Spice. Tuned for creativity; good for alliteration and punchy headings." },
    perplexity: { rating: 'Red', text: "Not suitable." }
  },
  {
    task: "Rubric-based grading & feedback",
    notebookLM: { rating: 'Red', text: "Not suitable." },
    gpt51: { rating: 'Gold', text: "Very good. Version 5.1 thinking provides constructive feedback." },
    claude: { rating: 'Green', text: "Capable. Good second-opinion grader." },
    gemini: { rating: 'Grey', text: "Generic. Not especially rubric-focused." },
    perplexity: { rating: 'Red', text: "Not suitable." }
  },
  {
    task: "Long-context cross-checks",
    notebookLM: { rating: 'Grey', text: "Reviewer. Good \"Review Notebook\" for checking claims vs sources." },
    gpt51: { rating: 'Green', text: "Capable. If context window is large enough (~128–196k), can handle paper + rubric." },
    claude: { rating: 'Gold', text: "Deep Context. 200k–1M tokens allows for massive document retention and review." },
    gemini: { rating: 'Unknown', text: "TBD. 1M window, but logic performance for academic tasks needs testing." },
    perplexity: { rating: 'Red', text: "Not suitable." }
  }
];

export const CHECKLIST_ITEMS = [
  "Did you add an AI disclosure statement per NDU Instruction 9000.01?",
  "Do you understand the rationale for each claim and source context?",
  "Could you brief and defend the thesis without using the paper as reference?",
  "Do you understand the biases or motives of your sources?",
  "Does the document feel or sound like YOU?",
  "Did you edit, critique, or modify the AI's reccomendations?",
  "Did you leave in 'imperfect' grammar or reject reccomendations to maintain your 'voice'?",
  "Did you argue and disagree with the LLM's recommendations?"
];

export const PRO_TIPS: Tip[] = [
  {
    title: "Steelman Warning",
    icon: "Shield",
    content: "When asking the AI for a counterargument, it must be a genuine test. If you find yourself immediately dismissing the AI-generated critique without engaging with it, you are performing 'adversarial theater' rather than intellectual rigor. You must temporarily adopt the opponent's view."
  },
  {
    title: "Context Windows (Memory)",
    icon: "Cpu",
    content: "A 'token' is ~0.75 words. 200k tokens ≈ 150,000 words. However, the more you chat, the more the 'context window' fills up with conversation history, which can confuse the model. Start a fresh chat for each new Phase (e.g., 'Phase 1 Chat', 'Phase 2 Chat') to keep the AI focused."
  },
  {
    title: "Voice Matching",
    icon: "Mic",
    content: "If you want the AI to suggest edits that sound like you, feed it samples of your previous writing first. Prompt: 'Analyze the following 3 paragraphs of my writing for tone, sentence structure, and vocabulary. Then, rewrite the text below to match this style.'"
  },
  {
    title: "The Stop Signal",
    icon: "StopCircle",
    content: "In Phase 2 (Evidence Mining), you must decide when to stop. The internet has infinite data. Stop searching when you have enough evidence to support your claims and defeat the counter-argument, not when you have 'read everything'."
  }
];
