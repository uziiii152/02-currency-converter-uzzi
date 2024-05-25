#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let api = "https://v6.exchangerate-api.com/v6/3310b616edd02905b27f1f71/latest/PKR";
let fetchData = async () => {
    let fetchData = await fetch(api);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData();
let countries = Object.keys(data);
let currency = await inquirer.prompt([
    { name: "cur1", type: "list",
        message: "From which Currency you want to convert :",
        choices: countries
    }, {
        name: "amount", type: "number",
        message: "Enter the amount : "
    },
    { name: "cur2", type: "list",
        message: "At which Currency you want to convert .....",
        choices: countries
    }
]);
let conApi = `https://v6.exchangerate-api.com/v6/e51c5d041b6abccbb224dff1/pair/${currency.cur1}/${currency.cur2}`;
let con_rates = async () => {
    let con_rates = await fetch(conApi);
    let resp = await con_rates.json();
    return resp.conversion_rate;
};
let conversion_rates = await con_rates();
let converted_amount = currency.amount * conversion_rates;
console.log(chalk.greenBright.bold(`your ${currency.amount} ${currency.cur1} in ${currency.cur2} is ${converted_amount}`));
