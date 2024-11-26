import React, { useEffect, useState } from 'react';
import { RefreshCw, Settings } from 'lucide-react';
import { PreferencesModal } from './components/PreferencesModal';
import { MemeCard } from './components/MemeCard';
import { fetchMemes } from './utils/redditApi';
import { storage } from './utils/chrome';
import type { Meme, UserPreferences } from './types';

export function App() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    subreddits: ['memes', 'dankmemes', 'wholesomememes']
  });

  const loadMemes = async () => {
    setLoading(true);
    try {
      const newMemes = await fetchMemes(preferences.subreddits);
      setMemes(newMemes.slice(0, 2));
    } catch (error) {
      console.error('Error loading memes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializePreferences = async () => {
      storage.get(['memePreferences'], (result) => {
        if (result.memePreferences) {
          setPreferences(result.memePreferences);
        } else {
          setShowPreferences(true);
        }
      });
    };

    initializePreferences();
  }, []);

  useEffect(() => {
    if (preferences.subreddits.length > 0) {
      loadMemes();
    }
  }, [preferences]);

  const savePreferences = (newPreferences: UserPreferences) => {
    storage.set({ memePreferences: newPreferences });
    setPreferences(newPreferences);
    setShowPreferences(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 flex flex-col">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 mb-2">
          Meme Break
        </h1>
        <p className="text-gray-300 text-sm">Your daily dose of happiness</p>
      </header>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-white/80 text-xl flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin" />
            Loading fresh memes...
          </div>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-7xl mx-auto w-full">
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
          {memes.length === 0 && (
            <div className="col-span-2 text-center text-white/80 text-xl bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              No memes found. Try refreshing or selecting different subreddits.
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center gap-4 pt-8">
        <button
          onClick={loadMemes}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
          disabled={loading}
          title="Refresh"
        >
          <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={() => setShowPreferences(true)}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
          title="Preferences"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {showPreferences && (
        <PreferencesModal
          preferences={preferences}
          onSave={savePreferences}
          onClose={() => setShowPreferences(false)}
        />
      )}
    </div>
  );
}