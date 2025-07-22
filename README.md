# TypingMaster - Advanced Typing Practice App

A beautiful and feature-rich typing practice application that helps you improve your typing skills with custom text and programming languages.

## 🚀 Features

### Practice Modes
- **Text Practice**: Practice with random motivational texts or your custom text
- **Programming Languages**: Practice typing code in 6 different languages:
  - JavaScript
  - Python
  - C++
  - PHP
  - CSS
  - HTML

### Interactive Features
- **Sound Effects**: Teletype sounds when typing correctly and error sounds for mistakes
- **Real-time Statistics**: 
  - Words Per Minute (WPM)
  - Accuracy percentage
  - Elapsed time
  - Progress tracking
- **Text Customization**: 
  - Enter your own custom text
  - Shuffle option for both custom text and code snippets
  - Generate new random snippets
- **Beautiful UI**: Modern, responsive design that looks wonderful and is centered

### Audio Features
- **Typing Sounds**: Pleasant teletype sound for correct keystrokes
- **Error Sounds**: Distinctive error sound for mistakes
- **Sound Toggle**: Turn sound effects on/off with the floating sound button

## 🎯 How to Use

### Getting Started
1. Open `index.html` in your web browser
2. Choose your practice mode: **Text Practice** or **Programming Languages**

### Text Practice
1. Select **Text Practice**
2. Choose between:
   - **Random Text**: Practice with pre-loaded motivational quotes and passages
   - **Custom Text**: Enter your own text to practice with
3. Options:
   - Check "Shuffle text" to randomize word order
   - Click "New Snippet" to get a different random text
   - Click "Start Practice" to begin

### Programming Language Practice
1. Select **Programming Languages** 
2. Choose from 6 languages: JavaScript, Python, C++, PHP, CSS, or HTML
3. Options:
   - Check "Shuffle code" to randomize the code structure
   - Click "New Snippet" to get a different code example
   - Click "Start Practice" to begin

### During Practice
- **Real-time feedback**: Characters turn green for correct typing, red for errors
- **Live statistics**: Monitor your WPM, accuracy, and time
- **Progress bar**: Visual indication of completion progress
- **Controls**: Reset current practice or go back to main menu

### After Practice
- **Detailed Results**: View final WPM, accuracy, time, and characters typed
- **Actions**: Practice the same text again or return to main menu

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Elegant transitions and hover effects
- **Visual Feedback**: Color-coded typing feedback (green for correct, red for errors)
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔧 Technical Details

### Files Structure
```
keyboard/
├── index.html      # Main HTML structure
├── styles.css      # All CSS styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This documentation
```

### Technologies Used
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript ES6+**: Interactive functionality and Web Audio API
- **Web Audio API**: Real-time sound generation for typing effects
- **Google Fonts**: Beautiful Poppins font family
- **Font Awesome**: Professional icons throughout the interface

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎵 Audio System

The app uses the Web Audio API to generate:
- **Typing Sound**: 800Hz sine wave, 0.05s duration
- **Error Sound**: 300Hz sine wave, 0.15s duration

If audio is not supported in your browser, the app will work normally without sound effects.

## 📱 Responsive Design

The app is fully responsive and adapts to different screen sizes:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adjusted grid layouts and touch-friendly controls
- **Mobile**: Stacked layouts and larger touch targets

## 🛠️ Customization

### Adding New Text Samples
Edit the `textSamples` array in `script.js` to add new practice texts.

### Adding New Code Samples
Edit the `codeSamples` object in `script.js` to add new programming language examples.

### Styling
All styles are contained in `styles.css` with CSS custom properties for easy theming.

## 🚀 Getting Started

1. **Download**: Clone or download all files to a folder
2. **Open**: Open `index.html` in your web browser
3. **Practice**: Choose your mode and start typing!

## 🎯 Tips for Better Practice

1. **Start with Text**: Begin with simple text practice before moving to code
2. **Focus on Accuracy**: Aim for high accuracy before speed
3. **Use Shuffle**: Randomize content to avoid memorization
4. **Regular Practice**: Short, frequent sessions are more effective
5. **Sound Feedback**: Use audio cues to develop muscle memory

## 📈 Tracking Progress

The app provides real-time statistics:
- **WPM**: Words per minute calculation based on 5 characters per word
- **Accuracy**: Percentage of correct characters typed
- **Time**: Elapsed time since starting
- **Progress**: Visual progress bar showing completion

Enjoy improving your typing skills! 🎯⌨️
