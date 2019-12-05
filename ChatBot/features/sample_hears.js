/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function (controller) {
    var axios = require('axios');
    var token;
    var projects;
    // use a function to match a condition in the message
    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
        await bot.reply(message, 'I heard "foo" via a function test');
    });
    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'projects', ['message'], async (bot, message) => {
        axios({
            "method": "POST",
            "url": "http://localhost:7001/cpms/api/v1/login",
            "params": {
                login: 'admin',
                password: 'admin'
            },
        }).then(function (response) {
            console.log(response.data);
            token = response.data.authToken;
            if (token != null) {
                console.log(token);
                axios({
                    "method": "GET",
                    "url": "http://localhost:7001/cpms/api/v1/projects",
                    "params": {
                        "authToken": token
                    },
                }).then(function (responseProjects) {
                    console.log(responseProjects.data);
                    projects = responseProjects.data;
                    bot.reply(message, projects.toString());
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }).catch(function (error) {
            console.log(error);
        });
    //    await bot.reply(message, projects.toString());
    });

    // use a regular expression to match the text of the message
    controller.hears(new RegExp(/^\d+$/), ['message', 'direct_message'], async function (bot, message) {
        await bot.reply(message, {text: 'I heard a number using a regular expression.'});
    });

    // match any one of set of mixed patterns like a string, a regular expression
    controller.hears(['allcaps', new RegExp(/^[A-Z\s]+$/)], ['message', 'direct_message'], async function (bot, message) {
        await bot.reply(message, {text: 'I HEARD ALL CAPS!'});
    });

};