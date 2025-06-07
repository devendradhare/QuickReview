#  Quick Review – Chrome Extension
![Screenshot 2025-06-05 163234](https://github.com/user-attachments/assets/12dfcb92-4d2b-4b21-8515-90d234372039)

Quick Review is a Chrome extension that enhances the YouTube learning experience by showing interactive MCQs (Multiple Choice Questions) based on the content of the video. It's designed to help students and learners test their understanding in real time.

## Features -
📌 Contextual MCQs: Automatically displays questions related to the current YouTube video.

💬 Interactive UI: Floating question box that stays on top of the video.

❤️ Engagement Options: Like, comment, or report question on any question.

📊 MCQ Result View: Shows percentage of correct responses.

🔐 User Auth: Sign in with Google using Firebase Authentication.

☁️ Cloud Backend: Questions and user actions are stored with Firebase.


## Tech Stack -
React.js, Vite, CSS (custom styling), Firebase (Auth + Firestore)


## Installation (For Developers)
Clone the repo

```bash
git clone https://github.com/devendradhare/QuickReview.git
```
```bash
cd QuickReview
```

Install dependencies
```bash
npm install
```
Build the extension

```bash
npm run build
```
Load the extension in Chrome

Go to ```chrome://extensions ```

Enable Developer Mode

Click Load unpacked

Select the dist folder inside your project

## Upcoming Improvements
comment section, report question
