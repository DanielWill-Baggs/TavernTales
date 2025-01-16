# TavernTales

TavernTales is an immersive Dungeons & Dragons (D&D) companion app that uses advanced AI to empower players and Dungeon Masters (DMs). The app offers tools for designing personalized characters, generating dynamic visuals, and creating tailored one-shot adventures for a seamless D&D experience.

---

## Key Features

### For Players:

1. **Interactive Character Creator**

   - Guided forms for Race, Class, Background, Traits, and Quirks.
   - AI-generated character descriptions and backstories based on user inputs.
   - Role-play suggestions and hooks to deepen character integration.

2. **Visual Character Customization**
   - AI-powered image generation to create stunning character visuals.
   - Multiple art styles to choose from, including anime, fantasy, and pixel art.

### For Dungeon Masters:

1. **One-Off Session Generator**

   - AI-generated modular encounters, NPCs, and story arcs.
   - Adjustable parameters like theme, difficulty, and party size.

2. **Export Tools**
   - Ability to export characters and session data to existing platforms like Roll20 or D&D Beyond.

---

## Getting Started

### Prerequisites

To run TavernTales locally, you’ll need:

- Node.js (v16 or later)
- Python (v3.8 or later)
- An AI API key (e.g., OpenAI, Stability AI, or Groq Cloud)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/TavernTales.git
   cd TavernTales
   ```

2. Install dependencies:

   ```bash
   npm install
   pip install -r requirements.txt
   ```

3. Set up environment variables:

   - Create a `.env` file and include:
     ```env
     REACT_APP_API_KEY=your_api_key_here
     AI_IMAGE_API_KEY=your_image_api_key_here
     ```

4. Start the app:
   ```bash
   npm start
   ```

---

## Tech Stack

### Frontend

- **React.js**: For a dynamic and responsive UI.
- **Tailwind CSS**: For clean and customizable styling.

### Backend

- **Node.js with Express.js**: To manage API requests and backend logic.
- **Python (Flask)**: For integrating advanced AI workflows.

### AI Integration

- **Groq**: For AI-powered text generation and modular storytelling.
- **Stable Diffusion or DALL·E**: For image generation.

### Database

- **PostgreSQL**: To store user data, characters, and session configurations.

---

## Roadmap

### Phase 1: MVP (1-2 Months)

- Core features: Character Creator, basic AI descriptions, and image generation.
- Simple DM tool: One-off session generator.
- Launch with desktop and mobile compatibility.

### Phase 2: Feature Expansion (3-5 Months)

- Advanced DM tools: Modular NPC and quest generation.
- Multi-style visual outputs for characters.
- Integration with platforms like Roll20.

### Phase 3: Community Building (6+ Months)

- Community forums and sharing tools for characters and sessions.
- Live collaboration for real-time adventure planning.
- Regular updates based on user feedback.

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Added a new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For inquiries, suggestions, or support, please reach out to:

- **Email**: support@taverntales.com
- **Website**: [taverntales.com](https://taverntales.com)

Let TavernTales bring your D&D adventures to life!
