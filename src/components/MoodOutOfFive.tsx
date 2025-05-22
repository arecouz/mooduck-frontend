import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/auth/useAuth'; // Assuming you have this

export const MoodOutOfFive = () => {
  const { user } = useAuth(); // Get the current user
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (!user || rating === null) return;

    setLoading(true);
    const { error } = await supabase.from('mood_out_of_five').insert([
      {
        user_id: user.id,
        rating,
      },
    ]);
    setLoading(false);

    if (error) {
      console.error('Insert error:', error.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xl font-semibold">How are you feeling?</p>
      <div className="flex gap-4">
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            onClick={() => handleSelect(num)}
            className={`text-3xl px-3 py-2 rounded-full border transition ${
              rating === num
                ? 'bg-yellow-400 border-yellow-600 dark:text-black'
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {rating && <p className="text-lg">You selected: {rating}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading || rating === null}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {submitted && <p className="text-green-600">Thanks for your response!</p>}
    </div>
  );
};
