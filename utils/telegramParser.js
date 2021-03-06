const db = require('../db/databaseManager');
const fs = require('fs');

module.exports = {

  parseGroupJSON: async (groupID, path) => {

    let groupChat = await db.findGroupByID(groupID);

    if(!groupChat)
      throw new Error(`Unable to find a group with groupID: ${groupID}`);

    const JSONFile = await JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }));

    const parsedMessages = JSONFile.messages
      .filter((msg) => msg.type == 'message' && typeof msg.text == 'string' && msg.text != '')
      .map((msg) => msg.text);

    // console.log(parsedMessages.length);

    for(let msg of parsedMessages) {

      groupChat.messages.push(msg);

    }

    groupChat.save();

  }

}