
export const WORDS = ['APPLE', 'BRAIN', 'CLOCK', 'DRINK', 'EARTH', 'FRUIT', 'GRASS', 'HONEY'];
export const MAX_ATTEMPTS = 6;

export function getFeedback(guess, targetWord) {
  const result = [];
  const targetLetters = targetWord.split('');
  const guessLetters = guess.split('');

  guessLetters.forEach((letter, i) => {
    if (letter === targetLetters[i]) {
      result[i] = { letter, status: 'correct' };
      targetLetters[i] = null;
    }
  });

  guessLetters.forEach((letter, i) => {
    if (!result[i]) {
      const foundIndex = targetLetters.indexOf(letter);
      if (foundIndex !== -1) {
        result[i] = { letter, status: 'present' };
        targetLetters[foundIndex] = null;
      } else {
        result[i] = { letter, status: 'absent' };
      }
    }
  });

  return result;
}

export function updateUsedKeys(feedback, usedKeys) {
  const newUsedKeys = { ...usedKeys };
  feedback.forEach(({ letter, status }) => {
    const currentStatus = newUsedKeys[letter];
    if (status === 'correct' || 
        (status === 'present' && currentStatus !== 'correct') ||
        (status === 'absent' && !currentStatus)) {
      newUsedKeys[letter] = status;
    }
  });
  return newUsedKeys;
}
