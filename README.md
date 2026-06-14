# PageSnap

PageSnap is a React-based web app for previewing, loading, and exporting document content in JPG format on the browser. It is built with Vite, React, Tailwind CSS.

Live demo: https://nishpagesnap.netlify.app

## Features

- Load and preview document files in the browser
- Export document pages or content using browser-native exports
- Support for PDF and DOCX rendering

## Major Contribution Opportunity

One of the major open contribution areas for PageSnap is implementing a robust **DOCX to JPG conversion flow**. This would allow users to convert Word documents to JPEG images directly within the browser, expanding the app's export capabilities and making it even more useful for content sharing and archiving.

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Clone Repository
```bash
git clone https://github.com/NishantMoolya/pagesnap
```

### Install Dependencies

```bash
cd pagesnap
npm install
```

### Run locally

```bash
npm run dev
```

Then open the URL shown in your browser to view the app.

## Contribution

Contributions are welcome! If you want to help improve PageSnap, consider working on:

- DOCX to JPG conversion flow
- PDF export improvements
- UI/UX polish and accessibility
- adding more file format support

Feel free to open issues, submit pull requests, or suggest enhancements.

## Project Structure

- `src/` - main application source code
  - `components/` - React UI components
  - `context/` - app context providers
  - `hooks/` - custom hooks for file loading and export
  - `utils/` - document loader utilities and exporter logic

## License

This project is currently open for contribution.
