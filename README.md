# Garur2 - Accessible Learning Platform

Garur2 is a modern, accessible learning platform designed specifically for visually impaired and blind learners. The platform provides an intuitive interface with keyboard navigation, screen reader support, and high contrast modes.

## Features

### Core Features
- **Digital Library**: Access to thousands of NCERT books and study materials
- **Interactive Tests**: Take chapter-wise tests with immediate feedback
- **PDF Reader**: Built-in PDF reader with navigation controls
- **Accessibility First**: Designed with accessibility as a core principle

### Accessibility Features
- Keyboard Navigation
- Screen Reader Support
- High Contrast Mode
- Text-to-Speech Support
- Comprehensive Keyboard Shortcuts

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS
- **PDF Handling**: react-pdf
- **Icons**: Lucide React
- **API Integration**: Google Books API

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with JavaScript enabled

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/garur2.git
cd garur2
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Google Books API key:
```
VITE_GOOGLE_BOOKS_API_KEY=your_api_key_here
```

## Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:5173`

## Keyboard Shortcuts

- **Alt + L**: Navigate to Library
- **Alt + T**: Navigate to Tests
- **Tab**: Navigate through elements
- **Enter**: Activate buttons and links
- **Space**: Toggle buttons
- **Esc**: Close modals and popups

## Project Structure

```
garur2/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Static assets
├── index.html         # HTML template
└── package.json       # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Books API for providing book data
- React PDF for PDF rendering capabilities
- Tailwind CSS for the styling framework
- Lucide for the beautiful icons

## Support

For support, email support@garur2.com or open an issue in the GitHub repository.
