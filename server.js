require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const port = process.env.PORT || 5000;

const allowedOrigins = [
	'http://localhost:5173',
	process.env.NETLIFY_URL,
].filter(Boolean);

app.use(
	cors({
		origin: (origin, callback) => {
			// Allow requests with no origin (e.g. curl, Postman, server-to-server)
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error(`CORS: origin ${origin} not allowed`));
			}
		},
	})
);
app.use(express.json());

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/art-guide', async (req, res) => {
	const { title, artist_title, date_display, place_of_origin, medium_display, description } =
		req.body;

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

	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');

	try {
		const stream = await client.messages.create({
			model: process.env.ANTHROPIC_MODEL,
			max_tokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS),
			messages: [{ role: 'user', content: prompt }],
			stream: true,
		});

		for await (const event of stream) {
			if (
				event.type === 'content_block_delta' &&
				event.delta.type === 'text_delta'
			) {
				res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
			}
		}

		res.write('data: [DONE]\n\n');
		res.end();
	} catch (error) {
		console.error(error);
		res.write(`data: ${JSON.stringify({ error: 'Failed to generate art guide.' })}\n\n`);
		res.end();
	}
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
