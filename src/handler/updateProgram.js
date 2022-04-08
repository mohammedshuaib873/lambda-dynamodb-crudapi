/***
 * @author Mohammed Shuaib A T
 */
/**Load ASS SDK */
const AWS = require('aws-sdk');
/**Update AWS Region to Deploy*/
AWS.config.update({region:'us-east-1'});
/**Import DynamoDn Using AWS SDK */
const dynamodb = new AWS.DynamoDB.DocumentClient();
/**Lambda Handler Function For Update By Id*/
module.exports.updateProgram = (event, context, callback) => {
   /**For Getting Date & Time */
  const datetime = new Date().toISOString();
  /**To Convert string into Object */
  const data = JSON.parse(event.body);
  /**To Check Whether the Values are String or Not */ 
  if (typeof data.programmingName !== "string" ||typeof data.rating !== "string" || typeof data.description !== "string")
   {
    console.error("Value of Program is Invalid");
    const response = {
      statusCode: 400,
      body: JSON.stringify({ message: "Value of Program is  Invalid" }),
    };
    return;
  }
  const params = {
    TableName: "program",
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ":p": data.programmingName,
      ":r": data.rating,
      ":d": data.description,
      ":t": datetime
    },
    UpdateExpression: "set programmingName = :p, rating = :r, description = :d, updatedAt = :t",
  };
  /**Call the DynamoDb and use update to Update the Data in the Table */
  dynamodb.update(params, (error, data) => {
    if (error) {
      console.error(error);
      callback(new Error(error));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };

    callback(null, response);
  });
};
