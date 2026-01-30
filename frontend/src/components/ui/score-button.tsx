'use client';

import { clsx } from 'clsx';

interface ScoreButtonProps {
  score: 1 | 2 | 3;
  selected: boolean;
  onClick: () => void;
  criteria: string;
  disabled?: boolean;
}

const scoreConfig = {
  1: {
    label: 'Non-Compliant',
    shortLabel: '1',
    bgColor: 'bg-red-100 hover:bg-red-200',
    selectedBg: 'bg-red-500',
    textColor: 'text-red-700',
    selectedText: 'text-white',
    borderColor: 'border-red-300',
    selectedBorder: 'border-red-600',
    ringColor: 'ring-red-500',
  },
  2: {
    label: 'Partially Compliant',
    shortLabel: '2',
    bgColor: 'bg-yellow-100 hover:bg-yellow-200',
    selectedBg: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    selectedText: 'text-white',
    borderColor: 'border-yellow-300',
    selectedBorder: 'border-yellow-600',
    ringColor: 'ring-yellow-500',
  },
  3: {
    label: 'Fully Compliant',
    shortLabel: '3',
    bgColor: 'bg-green-100 hover:bg-green-200',
    selectedBg: 'bg-green-500',
    textColor: 'text-green-700',
    selectedText: 'text-white',
    borderColor: 'border-green-300',
    selectedBorder: 'border-green-600',
    ringColor: 'ring-green-500',
  },
};

export function ScoreButton({ score, selected, onClick, criteria, disabled }: ScoreButtonProps) {
  const config = scoreConfig[score];

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          'score-button flex flex-col items-center justify-center p-4 rounded-lg border-2 min-w-[100px] transition-all',
          selected
            ? `${config.selectedBg} ${config.selectedBorder} ${config.selectedText} ring-2 ring-offset-2 ${config.ringColor}`
            : `${config.bgColor} ${config.borderColor} ${config.textColor}`,
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className="text-2xl font-bold">{config.shortLabel}</span>
        <span className="text-xs mt-1">{config.label}</span>
      </button>

      {/* Tooltip with criteria */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-64 z-10">
        <div className="font-medium mb-1">{config.label}</div>
        <div className="text-gray-300 text-xs">{criteria}</div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}

interface ScoreGroupProps {
  value?: 1 | 2 | 3;
  onChange: (score: 1 | 2 | 3) => void;
  criteria: {
    score1: string;
    score2: string;
    score3: string;
  };
  disabled?: boolean;
}

export function ScoreGroup({ value, onChange, criteria, disabled }: ScoreGroupProps) {
  return (
    <div className="flex gap-4 justify-center">
      <ScoreButton
        score={1}
        selected={value === 1}
        onClick={() => onChange(1)}
        criteria={criteria.score1}
        disabled={disabled}
      />
      <ScoreButton
        score={2}
        selected={value === 2}
        onClick={() => onChange(2)}
        criteria={criteria.score2}
        disabled={disabled}
      />
      <ScoreButton
        score={3}
        selected={value === 3}
        onClick={() => onChange(3)}
        criteria={criteria.score3}
        disabled={disabled}
      />
    </div>
  );
}
