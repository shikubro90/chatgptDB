const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express();
port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: "org-OQX9rFaJmU3LrNAqarm8RpVN",
  apiKey: "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",
});
// const response = await openai.listEngines();

const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  const { message } = req.body;
      const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100   ,
      temperature: 0.5,
    });

  res.status(200).json({
    message: response.data.choices[0].text
  });
});

app.listen(port, (req, res) => {
  console.log(`Example app listening http://localhost:${port}`);
});
