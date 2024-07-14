#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const apiLink = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let quizFetch = await fetch(data);
    let res = await quizFetch.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is your Name?"
        }]);
    for (let i = 1; i < 10; i++) {
        let answer = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt([{
                type: "list",
                name: "quiz",
                message: data[i].question,
                choices: answer.map((val) => val)
            }]);
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.italic.bold.blue("Corret"));
        }
        else {
            console.log(`Correct Answer is ${chalk.italic.bold.red(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.green.bold(name.name)}, 
  Your Score is ${chalk.red.bold(score)}, out of ${chalk.red.bold("10")}`);
};
startQuiz();
