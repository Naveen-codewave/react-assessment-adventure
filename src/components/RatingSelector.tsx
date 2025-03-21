
import React from 'react';
import { cn } from '@/lib/utils';
import { SatisfactionRating, getRatingDescription } from '@/lib/questions';

interface RatingSelectorProps {
  value?: SatisfactionRating;
  onChange: (rating: SatisfactionRating) => void;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({ value, onChange }) => {
  const ratings: SatisfactionRating[] = [1, 2, 3, 4, 5];
  
  const getRatingColor = (rating: SatisfactionRating) => {
    switch (rating) {
      case 1:
        return 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200';
      case 2:
        return 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200';
      case 3:
        return 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200';
      case 4:
        return 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200';
      case 5:
        return 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {ratings.map((rating) => (
          <button
            key={rating}
            type="button"
            className={cn(
              "px-4 py-2 rounded-md border transition-colors",
              "flex flex-col items-center justify-center text-center",
              "min-w-[120px]",
              getRatingColor(rating),
              value === rating && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => onChange(rating)}
          >
            <span className="text-xl font-bold">{rating}</span>
            <span className="text-xs font-medium">{getRatingDescription(rating)}</span>
          </button>
        ))}
      </div>
      
      <div className="text-sm text-muted-foreground mt-2">
        {value ? (
          <p>Selected: <strong>{value} - {getRatingDescription(value)}</strong></p>
        ) : (
          <p>Select a rating to evaluate the candidate's response</p>
        )}
      </div>
    </div>
  );
};

export default RatingSelector;
