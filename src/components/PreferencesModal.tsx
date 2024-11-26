import React, { useState } from 'react';
import type { UserPreferences } from '../types';

interface PreferencesModalProps {
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
  onClose: () => void;
}

const POPULAR_SUBREDDITS = [
  'memes',
  'dankmemes',
  'wholesomememes',
  'me_irl',
  'ProgrammerHumor',
  'marvelmemes',
  'historymemes',
];

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  preferences,
  onSave,
  onClose,
}) => {
  const [selectedSubreddits, setSelectedSubreddits] = useState<string[]>(
    preferences.subreddits
  );

  const handleSave = () => {
    onSave({ subreddits: selectedSubreddits });
  };

  const toggleSubreddit = (subreddit: string) => {
    setSelectedSubreddits((prev) =>
      prev.includes(subreddit)
        ? prev.filter((s) => s !== subreddit)
        : [...prev, subreddit]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Meme Preferences</h2>
        <p className="text-gray-600 mb-4">
          Select your favorite meme subreddits:
        </p>
        <div className="space-y-2 mb-6">
          {POPULAR_SUBREDDITS.map((subreddit) => (
            <label
              key={subreddit}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSubreddits.includes(subreddit)}
                onChange={() => toggleSubreddit(subreddit)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span>r/{subreddit}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={selectedSubreddits.length === 0}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};