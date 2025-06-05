🔍 Quick Review – Chrome Extension
Quick Review is a Chrome extension that enhances the YouTube learning experience by showing interactive MCQs (Multiple Choice Questions) based on the content of the video. It's designed to help students and learners test their understanding in real time.

🧠 Features
📌 Contextual MCQs: Automatically displays questions related to the current YouTube video.

💬 Interactive UI: Floating question box that stays on top of the video.

❤️ Engagement Options: Like, comment or report questions on any question.

📊 MCQ Result View: Shows percentage of correct responses.

🔐 User Auth: Sign in with Google using Firebase Authentication.

☁️ Cloud Backend: Questions and user actions are stored with Firebase.

⚙️ Tech Stack
React.js

Vite

CSS (custom styling)

Firebase (Auth + Firestore)

🚀 Installation (For Developers)
Clone the repo


git clone [https://github.com/your-username/quick-review-extension.git](https://github.com/devendradhare/QuickReview.git)
cd quick-review-extension
Install dependencies


npm install
Build the extension


npm run build
Load the extension in Chrome

Go to chrome://extensions

Enable Developer Mode

Click Load unpacked

Select the dist folder inside your project

🧪 How It Works
When a YouTube video is opened, the extension fetches or generates MCQs relevant to the video.

It overlays a floating window where users can answer or interact with the questions.

✨ What's Next
🧠 Smarter question generation using LLMs (AI)

📬 Feedback
I’d love to hear your feedback or feature suggestions!
Feel free to connect with me on LinkedIn or open an issue.
