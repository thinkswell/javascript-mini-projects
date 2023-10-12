import OpenAI from 'openai';
import readlineSync from 'readline-sync';
import chalk from 'chalk';
import { config } from 'dotenv';

config();

// chalk with customer color: orange matte
const orange = chalk.hex('#ED944D');
const redMatte = chalk.hex('#FF1A1A');

const exec = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });

  const chatHistory = [];

  do {
    const user_input = readlineSync.question(`${chalk.blueBright('Enter your input')}: `);
    const messageList = chatHistory.map((c) => ({
      role: c.role,
      content: c.content
    }));
    messageList.push(
      { role: "user", content: user_input }
    );

    try {
      const GPTOutput = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messageList,
      });

      const output_text = GPTOutput.choices[0].message;
      const reply = `😎 ${redMatte("Jaruis")}(${orange(output_text.role)}):\n${chalk.green(output_text.content)}`;
      console.log(`\n${reply}`);

      chatHistory.push(output_text);
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
    }
  } while (readlineSync.question("\nDo you want to response? (Y/N)").toUpperCase() === "Y");
};

exec();
