'use client';

import { clsx } from 'clsx';
import { HelpCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScoreGroup } from '@/components/ui/score-button';

export interface Question {
  id: string;
  questionNumber: string;
  questionText: string;
  guidance?: string | null;
  standardReference?: string | null;
  score1Criteria: string;
  score2Criteria: string;
  score3Criteria: string;
}

export interface QuestionResponse {
  score: 1 | 2 | 3 | null;
  justification?: string;
  isDraft?: boolean;
}

interface QuestionCardProps {
  question: Question;
  response?: QuestionResponse;
  onScoreChange: (score: 1 | 2 | 3) => void;
  disabled?: boolean;
  showGuidance?: boolean;
  className?: string;
}

const scoreColors = {
  1: 'border-l-red-500 bg-red-50/30',
  2: 'border-l-yellow-500 bg-yellow-50/30',
  3: 'border-l-green-500 bg-green-50/30',
};

const scoreLabels = {
  1: 'Non-Compliant',
  2: 'Partially Compliant',
  3: 'Fully Compliant',
};

export function QuestionCard({
  question,
  response,
  onScoreChange,
  disabled = false,
  showGuidance = true,
  className,
}: QuestionCardProps) {
  const currentScore = response?.score;
  const hasScore = currentScore !== null && currentScore !== undefined;

  // Determine if justification is required (score < 3)
  const requiresJustification = hasScore && currentScore < 3;
  const hasJustification = response?.justification && response.justification.trim().length > 0;
  const showJustificationWarning = requiresJustification && !hasJustification;

  return (
    <Card
      className={clsx(
        'border-l-4 transition-colors',
        hasScore ? scoreColors[currentScore] : 'border-l-gray-300',
        className
      )}
    >
      <CardContent className="pt-6">
        {/* Question Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                {question.questionNumber}
              </span>
              {question.standardReference && (
                <span className="text-xs text-gray-500">
                  Ref: {question.standardReference}
                </span>
              )}
            </div>
            <p className="text-gray-900 font-medium">{question.questionText}</p>
          </div>

          {/* Current Score Badge */}
          {hasScore && (
            <div
              className={clsx(
                'flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium',
                currentScore === 1 && 'bg-red-100 text-red-700',
                currentScore === 2 && 'bg-yellow-100 text-yellow-700',
                currentScore === 3 && 'bg-green-100 text-green-700'
              )}
            >
              {scoreLabels[currentScore]}
            </div>
          )}
        </div>

        {/* Guidance Section */}
        {showGuidance && question.guidance && (
          <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-blue-700 mb-1">Auditor Guidance</p>
                <p className="text-sm text-blue-600">{question.guidance}</p>
              </div>
            </div>
          </div>
        )}

        {/* Score Buttons */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-3 text-center">
            Select Compliance Score
          </p>
          <ScoreGroup
            value={currentScore ?? undefined}
            onChange={onScoreChange}
            criteria={{
              score1: question.score1Criteria,
              score2: question.score2Criteria,
              score3: question.score3Criteria,
            }}
            disabled={disabled}
          />
        </div>

        {/* Justification Warning */}
        {showJustificationWarning && (
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                Justification required for scores below "Fully Compliant"
              </p>
            </div>
          </div>
        )}

        {/* Draft Indicator */}
        {response?.isDraft && (
          <div className="mt-4 flex items-center justify-end">
            <span className="text-xs text-gray-500 italic">Draft - not yet saved</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compact variant for list views
interface QuestionCardCompactProps {
  question: Question;
  response?: QuestionResponse;
  onClick?: () => void;
  className?: string;
}

export function QuestionCardCompact({
  question,
  response,
  onClick,
  className,
}: QuestionCardCompactProps) {
  const currentScore = response?.score;
  const hasScore = currentScore !== null && currentScore !== undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-full text-left p-4 rounded-lg border-l-4 bg-white border border-gray-200 transition-all',
        'hover:shadow-md hover:border-gray-300',
        hasScore ? scoreColors[currentScore] : 'border-l-gray-300',
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
              {question.questionNumber}
            </span>
            {hasScore && (
              <span
                className={clsx(
                  'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                  currentScore === 1 && 'bg-red-100 text-red-700',
                  currentScore === 2 && 'bg-yellow-100 text-yellow-700',
                  currentScore === 3 && 'bg-green-100 text-green-700'
                )}
              >
                Score: {currentScore}
              </span>
            )}
            {!hasScore && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                Not scored
              </span>
            )}
          </div>
          <p className="text-sm text-gray-900 truncate">{question.questionText}</p>
        </div>
        <div className="flex-shrink-0">
          <div
            className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
              !hasScore && 'bg-gray-100 text-gray-400',
              currentScore === 1 && 'bg-red-500 text-white',
              currentScore === 2 && 'bg-yellow-500 text-white',
              currentScore === 3 && 'bg-green-500 text-white'
            )}
          >
            {hasScore ? currentScore : '-'}
          </div>
        </div>
      </div>
    </button>
  );
}
