import express from 'express'
import openAI from 'openai'
import cors from 'cors'
import bodyParser from 'body-parser';

const openai = new openAI({
  apiKey: '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',
});

const app = express();
const port = 5123;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.send("Server is up & running");
});

app.post('/api/chat', async (req, res) => {
  const question = req.body["prompt"];
  const response = await getAnswer(question);
  res.send(response);

});

app.listen(port, ()=>{
    console.log("Server is started",port);
});

async function getAnswer(question) {
  console.log(question);
    var chat = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:personal:travel-gpt:95dtfUqE",
  messages: [
    {
      "role": "system",
      "content": "you are a helpful travel assistant and you are helping a user plan a trip.You don't know about other things except travel.split the data datewise"
    },
    {
      "role": "user",
      "content": `<${question}>` 
    }
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

      console.log(chat.choices[0].message.content);

  return chat;
  }
