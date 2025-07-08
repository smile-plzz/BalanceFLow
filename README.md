# Work-Break Balance App

A single-tap web app for balancing work and break cycles to enhance productivity and well-being. This app is designed for simplicity and can be easily deployed to GitHub Pages.

## Features

- **Single-Tap Control**: Start and end work/break sessions with a single button.
- **1:1 Work-Break Ratio**: Break time is automatically set to match the duration of the preceding work session.
- **Real-Time Digital Timer**: Displays elapsed and remaining time with millisecond precision.
- **Analog Second Hand**: Visualizes time progress with a sweeping second hand on an analog clock face.
- **Color-Coded Modes**: The UI changes color to indicate whether you are in a "Work" (blue) or "Break" (green) session.
- **Persistent State**: Automatically saves and restores your current timer progress and session data, even if the app is closed.
- **Daily Session Log**: Tracks and displays a log of all completed work and break sessions for the current day.
- **Improved Labeling**: Clear and descriptive button labels guide you through the app's flow.
- **PWA Support**: Installable on mobile devices and works offline.
- **Keyboard Shortcuts**: Use the spacebar to toggle sessions.

## How to Use

1.  **Open the App**: Open the `index.html` file in your web browser, or access it via the deployed GitHub Pages link.
2.  **Start Working**: Click the "Start Work" button to begin your first work session.
3.  **End Work Session**: When you're ready for a break, click the "End Work, Start Break" button. The app will automatically start a break session of equal duration.
4.  **Take a Break**: The timer will count down your break time.
5.  **Resume Work**: Once the break is over, the app will notify you. Click "End Break, Start Work" to begin the next cycle.
6.  **Pause/Resume**: You can pause and resume the timer at any point without losing your progress.
7.  **Session Log**: View your completed sessions for the day in the "Today's Sessions" log at the bottom of the page.

## Deployment to GitHub Pages

1.  **Create a Repository**: Create a new public repository on GitHub.
2.  **Upload Files**: Push the following files to your repository:
    - `index.html`
    - `manifest.json`
    - `service-worker.js`
    - `README.md`
    - (Optional) `icon-192.png` and `icon-512.png` for the PWA icons.
3.  **Enable GitHub Pages**:
    - Go to your repository's "Settings" tab.
    - In the "Pages" section, select the `main` branch as the source.
    - Save your changes.
4.  **Access Your App**: Your app will be live at `https://<your-username>.github.io/<your-repository-name>`.