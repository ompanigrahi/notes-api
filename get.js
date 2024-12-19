import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        //'Key'definesthepartitionkeyandsortkeyoftheitemtoberetrieved
        Key: {
            userId: "123", //Theidof the author
            noteId: event.pathParameters.id, //Theidofthenotefromthepath
        },
    };
    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("Item not found.");
    }
    //Returntheretrieveditem
    return result.Item;
});