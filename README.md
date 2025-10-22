# 🇺🇸 N-400 Interview Preparation

A modern, responsive web application for studying the 100 civics questions required for the U.S. Citizenship (N-400) interview.

## Features

### 📚 Study Modes
- **Paginated View**: Study 10 questions at a time with easy navigation
- **Full View**: View all 100 questions on a single scrollable page
- **Sequential Learning**: Go through questions in order
- **Progress Tracking**: See how many questions you've viewed

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
├── index.html          # Main HTML structure
├── css/
│   └── styles.css      # All styling and responsive design
├── js/
│   ├── questions.js    # Official USCIS 100 civics questions data
│   └── app.js          # Application logic and state management
└── README.md           # This file
```

## File Organization

### `index.html`
Clean, semantic HTML structure with proper meta tags and comments. Contains the DOM structure for the application.

### `css/styles.css`
- Reset and base styles
- Component-specific styles (header, cards, buttons, etc.)
- Mobile-responsive media queries
- Animations and transitions

### `js/questions.js`
- Contains all 100 official USCIS N-400 civics questions
- Structured as an array of objects with question and answer properties
- Easy to update and maintain

### `js/app.js`
- Application state management
- View rendering logic
- Event handlers
- localStorage integration
- Pagination system
- Bookmark functionality

## How to Use

### Getting Started
1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build process or dependencies required!

### Study Features

#### **View Modes**
- Click **"Show All 100 Questions"** to see everything at once
- Click **"Show Pages (10 per page)"** to return to paginated view

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
