const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const tayi = async (req, res) => {
  let prompt = `Write a ${req.query.name} song like Taylor Swift's style`;
  const gptResponse = await openai.complete({
    engine: 'text-davinci-002',
    prompt: prompt,
    maxTokens: 1024,
    temperature: 0.7,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    // bestOf: 1,
    // n: 1
});

  res.status(200).json({text: `${gptResponse.data.choices[0].text}`})
}
export default tayi
