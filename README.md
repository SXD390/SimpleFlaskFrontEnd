# 🎭 Neon Menagerie Studio — Premium Flask App

A beautiful Flask application featuring **premium animal selector controls** with smooth animations and a file upload system with drag & drop functionality. Built with a focus on **micro-interactions** and **premium user experience**.

## ✨ Features

- **🎯 Premium Animal Selector**: Big, clickable pill buttons with icons, ripple effects, and smooth animations
- **📁 File Upload**: Drag & drop or click to upload files, displaying rich metadata
- **🎨 Premium Dark Theme**: Deep dark background with vibrant neon accents (purple, cyan, rose)
- **✨ Smooth Animations**: Micro-interactions, glowing borders, glass morphism, and buttery-smooth transitions
- **📱 Responsive Design**: Works perfectly on both mobile and desktop

## 🚀 Quick Start (2 minutes)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Add Animal Images
Download and place three attractive animal images into `static/images/` with these **exact filenames**:
- `cat.jpg` - A beautiful cat photo
- `dog.jpg` - A handsome dog photo  
- `elephant.jpg` - A majestic elephant photo

**Quick Image Sources:**
- [Unsplash Cats](https://unsplash.com/s/photos/cat)
- [Unsplash Dogs](https://unsplash.com/s/photos/dog)
- [Unsplash Elephants](https://unsplash.com/s/photos/elephant)

### 3. Run the Application
```bash
python app.py
```

### 4. Open in Browser
Navigate to [http://127.0.0.1:5000](http://127.0.0.1:5000)

## 🎯 What You'll See

- **Left Side**: Premium animal selector with Cat/Dog/Elephant pill buttons
- **Right Side**: File upload zone with drag & drop
- **Premium Dark UI**: Neon glows, smooth animations, glass morphism effects

## 🧪 Test the Features

1. **Animal Selection**: Click any animal button → see instant image reveal with smooth animation + ripple effect
2. **File Upload**: Drag any file onto the upload zone → see metadata (name, size, MIME type) with progress bar
3. **Responsive**: Resize browser window to see mobile-friendly layout

## 📁 Project Structure

```
FlaskFrontEnd/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Premium dark UI template
├── static/
│   ├── css/
│   │   └── styles.css    # Custom animations & neon components
│   ├── js/
│   │   └── script.js     # Animal selection & file upload logic
│   └── images/           # Animal images (cat.jpg, dog.jpg, elephant.jpg)
└── uploads/              # Auto-created directory for uploaded files
```

## 🎨 Premium Design Features

### **Animal Controls**
- **Big, tactile chips** that scream "click me"
- **Custom SVG icons** for each animal
- **Subtle sparkle glow** effects on hover
- **Ripple animations** on click for tactile feedback
- **Active state highlighting** with enhanced glow

### **Visual Elements**
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Neon Glows**: Vibrant border effects on hover and selection
- **Smooth Transitions**: 200-350ms easing for all interactions
- **Background Orbs**: Animated gradient orbs for visual depth
- **Typography**: Inter font family with gradient text effects

### **Micro-Interactions**
- **Hover Effects**: Scale, glow, and shadow transitions
- **Click Feedback**: Ripple animations and active states
- **Loading States**: Skeleton shimmer for images, progress bars for uploads
- **State Indicators**: "Selected: [Animal]" labels

## 🔧 Technical Details

- **Backend**: Flask with secure file handling, MIME detection, and human-readable size formatting
- **Frontend**: Modern HTML5/CSS3 with Tailwind CSS via CDN + custom animations
- **JavaScript**: ES6+ with async/await, drag & drop API, and smooth state management
- **File Handling**: Secure filename processing, file size limits (50MB), and proper error handling
- **Performance**: Optimized animations, lazy image loading, and smooth transitions

## 🧪 Manual QA Checklist

- [ ] **Animal Selection**: Clicking Cat/Dog/Elephant buttons shows correct image with fade/scale + floating animation
- [ ] **Ripple Effects**: Click anywhere on buttons for satisfying ripple animation
- [ ] **Active States**: Selected button glows and shows "Selected: [Animal]" indicator
- [ ] **File Upload**: Drag & drop files → metadata card shows filename, size (KB/MB), MIME type
- [ ] **Progress Feedback**: Upload shows progress bar and loading states
- [ ] **Responsive Layout**: Works perfectly on mobile and desktop
- [ ] **Large Files**: Handles 10–20MB files with proper size display

## 🐛 Troubleshooting

- **Images not showing?** Make sure you have `cat.jpg`, `dog.jpg`, `elephant.jpg` in `static/images/`
- **Port already in use?** Change port in `app.py`: `app.run(host="0.0.0.0", port=5001, debug=True)`
- **Import errors?** Run `pip install -r requirements.txt` again

## 🌐 Deployment

The app is configured to bind to all interfaces (`host="0.0.0.0"`) for easy deployment to cloud platforms like EC2.

---

**Built with ❤️** — premium dark mode, neon glows, and tasteful micro-interactions that users can't resist! 🎉
