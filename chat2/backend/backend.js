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
    console.log("Server is started");
});

async function getAnswer(question) {
    var chat = await openai.chat.completions.create({
        messages: [
            { role: "user", content: 'Hi im prudhvi' },
            { role: "assistant", content: 'Hey Prudhvi, How can I help you ?'},
            { role: "user", content: 'for every message address me with my name'},
            { role: "assistant", content: 'Sure Prudhvi'},
            { role: "user", content: `<${question}>` }
        ],
        model: "gpt-3.5-turbo"
    });
  console.log(chat.choices[0].message.content)
  return chat;
  }