Wordle Clone Game
A fun, interactive Wordle-inspired game built with React.js. Guess the 5-letter word in 6 attempts while receiving feedback on each guess!

Demo:
https://guessing-game-praveen.vercel.app
Features
Interactive grid showing guesses with color-coded feedback.
On-screen keyboard with status updates for letters (correct, present, absent).

Correct word Indicate Green
Prresent Word Indicate Yellow
Absent Word Indicate Black

Theme toggle (Light/Dark mode).
Persistent theme settings using localStorage.
Animated confetti on win.
Reset and start a new game.
Fully responsive design for desktop and mobile.

Setup and Installation
git clone https://github.com/Kurubasaipraveen/word-guessing-game
cd gussing-game
npm install
npm start

Components:

1. App.js
Description: The main component managing the state of the game and handling interactions like input, feedback, and game reset.

2. Header.js
Description: Contains the game title and theme toggle button.

3. WordGrid.js
Description: Displays the guesses grid with feedback (correct, present, absent) for each letter.

4. Tile.js
Description: A single tile in the WordGrid showing the letter and its feedback status.

5. Keyboard.js
Description: On-screen keyboard showing the status of each letter (color-coded based on feedback).

6. Message.js
Description: Displays messages like errors or game status updates.

7. Confetti.js
Description: Confetti animation triggered on winning.

Technologies Used
Frontend: React.js
Styling: CSS, local state for theme handling
Animation: Confetti.js
Utilities: JavaScript array and string methods for game logic
Deployment: Vercel


How to Play :
Start the game and guess the 5-letter word.
Use the keyboard or your keyboard keys to type a word.
Press Enter to submit your guess.
Feedback:
Green: Correct letter and position.
Yellow: Correct letter but wrong position.
Gray: Letter not in the word.
Win or lose based on your guesses!
Toggle between light/dark mode for better visibility.


Screenshorts=>:
![Image](https://github.com/user-attachments/assets/0566e3bf-68b2-457a-bb99-4317eebb1f73)

Correct word ANimation winning;
![Video](https://github.com/Kurubasaipraveen/word-guessing-game/blob/main/Wordle%20Clone%20-%20Google%20Chrome%202025-02-06%2007-36-28.mp4)
