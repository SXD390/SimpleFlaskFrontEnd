# 🎭 Neon Menagerie — Flask App with Premium Dark UI

A beautiful Flask application featuring an animal selector with smooth animations and a file upload system with drag & drop functionality.

## ✨ Features

- **Animal Selector**: Choose between Cat, Dog, or Elephant with instant image reveal and smooth fade/scale animations
- **File Upload**: Drag & drop or click to upload files, displaying metadata (filename, size, MIME type)
- **Premium Dark Theme**: Deep dark background with vibrant neon accents (purple, cyan, rose)
- **Smooth Animations**: Micro-interactions, glowing borders, and buttery-smooth transitions
- **Responsive Design**: Works perfectly on both mobile and desktop

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Add Animal Images
Place three attractive animal images into `static/images/` with these exact filenames:
- `cat.jpg`
- `dog.jpg` 
- `elephant.jpg`

### 3. Run the Application
```bash
python app.py
```

### 4. Open in Browser
Navigate to [http://127.0.0.1:5000](http://127.0.0.1:5000)

## 📁 Project Structure

```
FlaskFrontEnd/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── styles.css    # Custom animations & neon components
│   ├── js/
│   │   └── script.js     # Animal selection & file upload logic
│   └── images/           # Animal images (cat.jpg, dog.jpg, elephant.jpg)
└── uploads/              # Auto-created directory for uploaded files
```

## 🧪 Manual QA Checklist

- [ ] Selecting **Cat/Dog/Elephant** shows the correct image with fade/scale and floating micro-animation
- [ ] Unchecking the selected option hides the image
- [ ] Drag & drop a file → metadata card shows **filename**, **size (KB/MB)**, **MIME type**
- [ ] Clicking upload zone opens file picker (works same as drag/drop)
- [ ] Large files (e.g., 10–20MB) still show proper sizes
- [ ] Layout is responsive (mobile → desktop)

## 🎨 Design Features

- **Glass Morphism**: Semi-transparent cards with backdrop blur effects
- **Neon Glows**: Vibrant border effects on hover and selection
- **Smooth Transitions**: 200-350ms easing for all interactive elements
- **Background Orbs**: Animated gradient orbs for visual depth
- **Typography**: Inter font family with gradient text effects

## 🔧 Technical Details

- **Backend**: Flask with file upload handling and metadata extraction
- **Frontend**: HTML5, CSS3 with Tailwind CSS via CDN
- **JavaScript**: ES6+ with modern async/await patterns
- **File Handling**: Secure filename processing and MIME type detection
- **Size Limits**: 50MB maximum file upload size

## 🌐 Deployment

The app is configured to bind to all interfaces (`host="0.0.0.0"`) for easy deployment to cloud platforms like EC2.

---

Built with ❤️ — dark mode, neon glows, and tasteful micro-interactions.
