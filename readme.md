# Silly Discord bot

Invoked via slash command

1. Set up Discord application
    1. https://discord.com/developers/applications
    1. You'll need to set the public key as a Lambda environment variable in the following step https://discord.com/developers/applications/831751188349190175/information
1. Set up the Lambda
    1. Create a Lambda with a HTTP API
    1. Run `zip -r function.zip .` to package this repo into a zip (required to get the npm dependencies into the Lambda)
    1. Upload to Lambda
    1. Set the environment variable `CLIENT_PUBLIC_KEY` to your Discord application's public key 
1. Update the Discord application with the Lambda URL
    1. Set the `INTERACTIONS ENDPOINT URL` value in Discord to the Lambda trigger URL
3. Register the slash command
    1. https://discord.com/developers/docs/interactions/slash-commands#registering-a-command
    1. The slash command can be whatever you want
4. Adjust Discord permissions if necessary
    1. https://discord.com/developers/docs/interactions/slash-commands#authorizing-your-application
5. Invoke whatever slash command you configured - you're done!

As of April 2021 there doesn't seem to be a way to get all Discord messages without having a server running all the time to maintain a Discord Gateway connection
