# 🇺🇸 N-400 Interview Preparation

A modern, responsive web application for studying the 100 civics questions required for the U.S. Citizenship (N-400) interview.

## Features

### 📚 Two Learning Formats

#### Question & Answer Format (`index.html`)
Practice with traditional Q&A format - perfect for simulating the actual interview.

#### Study Sentences Format (`sentences.html`)
Learn with complete sentences - easier to read and memorize!
- All questions and answers rephrased as declarative sentences
- Example: "The supreme law of the land is the Constitution."
- Simpler format for studying and retention
- Easy navigation between both formats

### 📖 Study Modes
- **Paginated View**: Study 10 items at a time with easy navigation
- **Full View**: View all 100 items on a single scrollable page
- **Sequential Learning**: Go through content in order
- **Shuffle Mode**: Randomize all 100 questions for varied practice
- **Progress Tracking**: See how many items you've viewed

### ⭐ Bookmark System
- **Mark Questions**: Click the star (☆) to bookmark difficult questions
- **Filter Marked**: View only your marked questions for focused review
- **Persistent Storage**: Bookmarks are saved automatically using localStorage

### 📱 Mobile Optimized
- Fully responsive design
- Optimized for iPhone and mobile devices
- Touch-friendly controls
- Adaptive layouts for small screens

### 🎯 User Interface
- Clean, modern design with gradient background
- Progress bar showing overall completion
- Show/hide individual answers
- Bulk show/hide all answers on current view
- Page-by-page navigation with visual indicators
- Real-time statistics (current page, marked count, viewed count)

## Project Structure

```
n400-study/
├── index.html              # Question & Answer format page
├── sentences.html          # Study Sentences format page
├── css/
│   ├── styles.css          # Main styling and responsive design
│   └── sentences.css       # Sentences page specific styles
├── js/
│   ├── questions.js        # Official USCIS 100 civics questions (Q&A format)
│   ├── app.js              # Q&A page application logic
│   ├── sentences.js        # 100 civics facts as complete sentences
│   └── sentences-app.js    # Sentences page application logic
└── README.md               # This file
```

## File Organization

### HTML Files

**`index.html`**
- Question & Answer format page
- Clean, semantic HTML structure
- Traditional interview-style Q&A practice

**`sentences.html`**
- Study Sentences format page
- Simplified learning with complete sentences
- Same features as Q&A format (bookmarks, filtering, pagination)

### CSS Files

**`css/styles.css`**
- Reset and base styles
- Component-specific styles (header, cards, buttons, etc.)
- Mobile-responsive media queries
- Animations and transitions

**`css/sentences.css`**
- Sentences page specific styling
- Navigation links styling
- Sentence item layout

### JavaScript Files

**`js/questions.js`**
- Contains all 100 official USCIS N-400 civics questions
- Structured as an array of objects with question and answer properties
- Easy to update and maintain

**`js/app.js`**
- Q&A page application logic
- State management and view rendering
- Event handlers and localStorage integration
- Pagination and bookmark functionality

**`js/sentences.js`**
- Contains all 100 civics facts as complete sentences
- Rephrased from Q&A format for easier learning
- Example: "The supreme law of the land is the Constitution."

**`js/sentences-app.js`**
- Sentences page application logic
- Similar to app.js but adapted for sentence format
- Bookmark and filtering functionality

## How to Use

### Getting Started
1. Clone or download this repository
2. Choose your learning format:
   - Open `index.html` for Question & Answer format
   - Open `sentences.html` for Study Sentences format
3. No build process or dependencies required!
4. Switch between formats anytime using the navigation link

### Choosing a Format

**Use Q&A Format (`index.html`) when:**
- Practicing for the actual interview
- Testing your knowledge
- Want to see how questions are asked

**Use Sentences Format (`sentences.html`) when:**
- First learning the material
- Memorizing facts
- Want simpler, easier-to-read content
- Prefer declarative statements

### Study Features

#### **View Modes**
- Click **"Show All 100 Questions"** (or Sentences) to see everything at once
- Click **"Show Pages (10 per page)"** to return to paginated view

#### **Shuffle Mode**
- Click **"Shuffle Questions"** (or Sentences) to randomize the order
- Questions maintain their original numbering (e.g., #42 might appear first)
- Perfect for avoiding memorization by sequence
- Click **"Show Original Order"** to return to normal sequence
- Works with all filters (All Questions, Marked Only)

#### **Filtering**
- **All Questions**: View all 100 questions
- **Marked Only**: View only bookmarked questions

#### **Answering Questions**
- Click **question text** to toggle answer visibility
- Click **"Show"/"Hide"** button next to each question
- Use **"Show All Answers"** button to toggle all at once

#### **Bookmarking**
- Click the **☆** star to mark a question
- Marked questions show a filled **★** star
- Use **"Marked Only"** filter to review bookmarked questions

### Navigation
- Use **page numbers** (1-10) to jump to specific pages
- Use **← →** arrows for previous/next page
- Progress bar shows overall completion

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Uses standard HTML5, CSS3, and ES6 JavaScript

### Data Persistence
- Bookmarks stored in browser's localStorage
- Data persists across sessions
- No server or database required

### Responsive Breakpoints
- **Mobile**: < 600px (optimized for phones)
- **Small Devices**: < 400px (extra small screens)
- **Desktop**: > 600px (full features)

## Customization

### Updating Questions
Edit `js/questions.js` to update question content. Each question follows this format:

```javascript
{
    q: "Question text here?",
    a: "Answer text here (can include HTML for lists)"
}
```

### Styling
Modify `css/styles.css` to change:
- Color scheme (update gradient and accent colors)
- Fonts and typography
- Spacing and layout
- Mobile breakpoints

### Configuration
In `js/app.js`, modify the `CONFIG` object:

```javascript
const CONFIG = {
    QUESTIONS_PER_PAGE: 10,  // Change questions per page
    STORAGE_KEY: 'n400-marked'  // LocalStorage key for bookmarks
};
```

## About the N-400 Test

This application contains the official 100 civics questions from the **USCIS 2008 Naturalization Test**. During the actual N-400 interview:

- USCIS officer asks up to **10 questions**
- Must answer **6 correctly** to pass
- Questions cover American government, history, and civics

### Current Officials (as of 2025)
- **President**: Donald Trump
- **Vice President**: J.D. Vance
- **Speaker of the House**: Mike Johnson
- **Chief Justice**: John Roberts

*Note: Questions 28, 29, and 47 contain names of current officials that may change over time.*

## Contributing

To contribute improvements:
1. Fork the repository
2. Make your changes
3. Submit a pull request

## License

This is an educational tool for U.S. citizenship test preparation. The civics questions are from official USCIS resources and are in the public domain.

## Resources

- [Official USCIS Study Materials](https://www.uscis.gov/citizenship/find-study-materials-and-resources)
- [USCIS 100 Civics Questions PDF](https://www.uscis.gov/sites/default/files/document/questions-and-answers/100q.pdf)
- [Find Your Senators and Representatives](https://www.uscis.gov/citizenship/find-study-materials-and-resources)

## Support

For issues or questions:
- Open an issue in this repository
- Review the USCIS official website for test updates
- Consult with an immigration attorney for legal advice

---

**Good luck with your citizenship interview!** 🎉
