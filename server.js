require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.NETLIFY_URL || 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/art-guide', async (req, res) => {
	const { title, artist_title, date_display, place_of_origin, medium_display, description } =
		req.body;

	try {
		const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

		const prompt = [
			`You are an engaging museum audio guide. Write 2–3 paragraphs about the following artwork that would fascinate and educate a visitor.`,
			`Include historical context, what makes this piece artistically significant, and something surprising or personal about it.`,
			`Keep the tone conversational and accessible — no jargon. Respond with only the narrative, no headings or labels.\n`,
			`Title: ${title}`,
			artist_title ? `Artist: ${artist_title}` : null,
			date_display ? `Date: ${date_display}` : null,
			place_of_origin ? `Place of Origin: ${place_of_origin}` : null,
			medium_display ? `Medium: ${medium_display}` : null,
			description ? `Museum Description: ${description.replace(/<[^>]*>/g, '')}` : null,
		]
			.filter(Boolean)
			.join('\n');

		const message = await client.messages.create({
			model: process.env.ANTHROPIC_MODEL,
			max_tokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS),
			messages: [{ role: 'user', content: prompt }],
		});

		res.json({ guide: message.content[0].text });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to generate art guide.' });
	}
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
