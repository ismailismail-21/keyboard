# TypingMaster - Dynamic Typing Practice App

A beautiful, feature-rich typing practice application with **dynamic programming language support**. Practice typing with custom text and automatically-loaded programming language examples.

## 🚀 Features

### Practice Modes
- **Text Practice**: Practice with random motivational texts or your custom text
- **Dynamic Programming Languages**: Practice typing code with automatically detected languages

### Dynamic Language System
- **Automatic Language Detection**: Languages are loaded dynamically from JSON files
- **Easy Language Addition**: Simply add a new JSON file to add a new programming language
- **Extensible Architecture**: No code changes needed to support new languages

### Currently Supported Languages
- **JavaScript** - Functions, classes, async operations
- **Python** - Classes, comprehensions, file handling
- **C++** - Templates, STL, memory management
- **PHP** - Classes, arrays, API responses  
- **CSS** - Flexbox, Grid, dark mode
- **HTML** - Forms, navigation, semantic markup
- **C#** - LINQ, properties, async operations

### Interactive Features
- **MonkeyType-style Interface**: Direct typing with character-by-character feedback
- **Sound Effects**: Teletype sounds for correct typing and error sounds for mistakes
- **Real-time Statistics**: 
  - Words Per Minute (WPM)
  - Accuracy percentage
  - Elapsed time
  - Progress tracking
- **Text Customization**: 
  - Enter your own custom text
  - Shuffle option for both custom text and code snippets
  - Generate new random snippets
- **Beautiful Dark UI**: Modern, responsive design with smooth animations

### Audio Features
- **Web Audio API**: Custom sound generation for typing feedback
- **Typing Sounds**: Pleasant 800Hz tone for correct keystrokes
- **Error Sounds**: Distinctive 300Hz tone for mistakes
- **Sound Toggle**: Turn sound effects on/off with the floating sound button

## 🔧 Adding New Programming Languages

### Step 1: Create JSON File
Create a new file in the `code-examples/` directory named after your language (e.g., `java.json`, `ruby.json`):

```json
[
  {
    "title": "Hello World Example",
    "code": "public class HelloWorld {\\n\\tpublic static void main(String[] args) {\\n\\t\\tSystem.out.println(\\"Hello, World!\\");\\n\\t}\\n}"
  },
  {
    "title": "Array Example", 
    "code": "import java.util.Arrays;\\n\\nint[] numbers = {1, 2, 3, 4, 5};\\nArrays.stream(numbers)\\n\\t.filter(n -> n % 2 == 0)\\n\\t.forEach(System.out::println);"
  }
]
```

### Step 2: That's It!
The app will automatically:
- Detect the new JSON file
- Create a language button with the formatted name
- Load examples and make them available for practice

### JSON Structure
Each language file contains an array of objects with:
- `title`: Descriptive name for the code example
- `code`: The actual code with `\\t` for tabs and `\\n` for newlines

### Customizing Language Display
To customize language names and icons, edit the `formatLanguageName()` and `getLanguageIcon()` functions in `script.js`:

```javascript
function formatLanguageName(lang) {
    const nameMap = {
        'java': 'Java',
        'rust': 'Rust',
        'golang': 'Go',
        // Add your language here
    };
    return nameMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
}

function getLanguageIcon(lang) {
    const iconMap = {
        'java': 'fab fa-java',
        'rust': 'fas fa-cog',
        'golang': 'fab fa-google',
        // Add your language icon here
    };
    return iconMap[lang] || 'fas fa-code';
}
```

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
2. Choose from the automatically detected languages
3. Options:
   - Check "Shuffle code" to randomize the code structure
   - Click "New Snippet" to get a different code example
   - Click "Start Practice" to begin

### During Practice
- **Type directly**: Characters appear as you type with visual feedback
- **Visual Feedback**: 
  - Current character highlighted in blue
  - Correct characters become dimmed
  - Incorrect characters highlighted in red
- **Special Keys**: Tab and Enter keys work properly for code indentation
- **Backspace**: Fix mistakes by pressing backspace
- **Statistics**: Watch your WPM, accuracy, and time in real-time

### After Practice
- View detailed results including final WPM, accuracy, time, and total characters
- Choose to practice again with the same text or return to the main menu

## 🏗️ Technical Architecture

### Project Structure
```
keyboard/
├── index.html          # Main application structure
├── styles.css          # Complete dark theme styling
├── script.js           # Dynamic language loading & typing logic
├── README.md           # This documentation
└── code-examples/      # Programming language examples
    ├── javascript.json # JavaScript examples
    ├── python.json     # Python examples
    ├── cpp.json        # C++ examples
    ├── php.json        # PHP examples
    ├── css.json        # CSS examples
    ├── html.json       # HTML examples
    ├── csharp.json     # C# examples
    └── [language].json # Add more languages here
```

### Technologies Used
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Audio**: Web Audio API for custom sound generation
- **Data**: JSON files for language examples
- **Styling**: CSS Grid/Flexbox, CSS Custom Properties
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)

### Key Features
- **Dynamic Loading**: Languages loaded asynchronously from JSON files
- **ModularArchitecture**: Easy to extend with new features and languages
- **Performance Optimized**: Minimal DOM manipulation for smooth typing
- **Responsive Design**: Works on all screen sizes
- **Browser Compatibility**: Modern browsers with ES6+ support

## 🌟 Benefits of Dynamic System

### For Users
- **More Languages**: Easy for developers to add new programming languages
- **Fresh Content**: New code examples can be added without app updates
- **Customization**: Users can create their own language files
- **Community-Driven**: Language packs can be shared and distributed

### For Developers
- **Zero Configuration**: No code changes needed to add languages
- **Maintainable**: Language examples separated from application logic
- **Extensible**: Easy to add features like language-specific themes or difficulty levels
- **Scalable**: Can support unlimited programming languages

## 🎨 Features in Detail

### Visual Feedback System
- **Character States**: Each character has visual states (current, correct, incorrect, typed)
- **Smooth Transitions**: CSS animations for all state changes
- **Progress Indication**: Real-time progress bar and statistics
- **Scroll Behavior**: Auto-scroll to keep current character in view

### Audio System
- **Web Audio API**: Custom tone generation for responsive feedback
- **Dual Sound Types**: Different tones for correct typing and errors
- **Performance**: Minimal latency for real-time feedback
- **User Control**: Toggle sound on/off without affecting functionality

### Statistics Engine
- **Real-time Calculation**: WPM and accuracy updated as you type
- **Character Counting**: Precise tracking of typed vs correct characters
- **Time Tracking**: Millisecond precision for accurate WPM calculation
- **Progress Tracking**: Visual progress bar with percentage completion

## 🚀 Getting Started

1. **Clone or Download**: Get the project files
2. **Open in Browser**: Open `index.html` in any modern web browser
3. **Start Typing**: Choose your mode and begin practicing!

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Web Audio API support (for sound effects)

## 🤝 Contributing

### Adding Languages
1. Create a JSON file in `code-examples/`
2. Follow the existing JSON structure
3. Include diverse, well-formatted code examples
4. Test that examples type smoothly without formatting issues

### Adding Features  
1. The modular design makes it easy to add new features
2. Key areas for enhancement: new practice modes, additional statistics, themes
3. All language-specific logic is centralized for easy modification

## 📄 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute according to the license terms.

---

**Dynamic Typing Practice - Where adding new programming languages is as easy as creating a JSON file!** 🎯
