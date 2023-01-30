const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//openai require
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-OQX9rFaJmU3LrNAqarm8RpVN",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  const response = await openai.createCompletion({
    model: `${currentModel}`, //"text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.status(200).json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines()
  console.log(response.data)
  res.json({
    models : response.data
  })
});

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});
