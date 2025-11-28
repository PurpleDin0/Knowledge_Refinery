
export interface PromptStrategy {
  role: string;
  example: string;
  strategy: string;
}

export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  goal: string;
  inputs: string[];
  outputs: string[];
  prompt: PromptStrategy;
  aiJobs: string[];
  humanJobs: string[];
  bestTool: string;
  toolIcon?: string;
}

export interface Tool {
  name: string;
  role: string;
  bestUse: string;
  cost: string;
  contextWindow: string;
  score: 'Gold' | 'Green' | 'Grey' | 'Red'; // Based on the matrix colors
}

export type Rating = 'Gold' | 'Green' | 'Grey' | 'Red' | 'Unknown';

export interface MatrixCell {
  rating: Rating;
  text: string;
}

export interface MatrixRow {
  task: string;
  notebookLM: MatrixCell;
  gpt51: MatrixCell;
  claude: MatrixCell;
  gemini: MatrixCell;
  perplexity: MatrixCell;
}

export interface Tip {
  title: string;
  icon: string;
  content: string;
}

export type ViewState = 'workflow' | 'matrix' | 'checklist' | 'philosophy' | 'library';
