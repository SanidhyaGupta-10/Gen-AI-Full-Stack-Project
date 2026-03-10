export interface TechnicalQuestion {
    question: string;
    intention: string;
    answer: string;
}

export interface BehavioralQuestion {
    question: string;
    intention: string;
    answer: string;
}

export interface SkillGap {
    skill: string;
    severity: "low" | "medium" | "high";
}

export interface PreparationPlan {
    day: number;
    tasks: string[];
    focus: string;
}

export interface InterviewReport {
    _id: string;
    title: string;
    matchScore?: number;
    jobDescription: string;
    technicalQuestions: TechnicalQuestion[];
    behavioralQuestions: BehavioralQuestion[];
    skillGaps: SkillGap[];
    preparationPlan: PreparationPlan[];
    createdAt: string;
}

export type SectionId = "technical" | "behavioral" | "roadmap";
