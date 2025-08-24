# 🚀 Quick Start Guide

## ⚡ Immediate Setup (2 minutes)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Add Animal Images
Download and place these images in `static/images/`:
- `cat.jpg` - A beautiful cat photo
- `dog.jpg` - A handsome dog photo  
- `elephant.jpg` - A majestic elephant photo

**Quick Image Sources:**
- [Unsplash Cats](https://unsplash.com/s/photos/cat)
- [Unsplash Dogs](https://unsplash.com/s/photos/dog)
- [Unsplash Elephants](https://unsplash.com/s/photos/elephant)

### 3. Run the App
```bash
python app.py
```

### 4. Open Browser
Go to: [http://127.0.0.1:5000](http://127.0.0.1:5000)

## 🎯 What You'll See

- **Left Side**: Animal selector with Cat/Dog/Elephant checkboxes
- **Right Side**: File upload zone with drag & drop
- **Premium Dark UI**: Neon glows, smooth animations, glass morphism

## 🧪 Test the Features

1. **Animal Selection**: Click any animal checkbox → see instant image reveal with smooth animation
2. **File Upload**: Drag any file onto the upload zone → see metadata (name, size, MIME type)
3. **Responsive**: Resize browser window to see mobile-friendly layout

## 🐛 Troubleshooting

- **Images not showing?** Make sure you have `cat.jpg`, `dog.jpg`, `elephant.jpg` in `static/images/`
- **Port already in use?** Change port in `app.py` line 52: `app.run(host="0.0.0.0", port=5001, debug=True)`
- **Import errors?** Run `pip install -r requirements.txt` again

---

**Ready to go!** 🎉 The app will automatically create the `uploads/` directory when you first upload a file.
