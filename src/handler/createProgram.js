/***
 * @author Mohammed Shuaib A T
 */
let response;
/**Load ASS SDK */
const AWS = require("aws-sdk");

/**Update AWS Region to Deploy*/
AWS.config.update({ region: "us-east-1" });

/**Import DynamoDn Using AWS SDK */
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**Lambda Handler Function For Create Program */
exports.createProgram = async (event, context, callback) => {
  /**For Getting Date & Time */
  const datetime = new Date().toISOString();
  /**To Convert string into Object */
  const { id, programmingName, rating, description } = JSON.parse(event.body);
  /**Call the DynamoDb and use Put to add the Data to the Table */
  await dynamodb
    .put({
      TableName: "program",
      Item: {
        id,
        programmingName,
        rating,
        description,
        createdAt : datetime,
        updatedAt: datetime
      },
    })
    .promise();
  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Program Created Successfully`,
    }),
  };
  callback(null, response);
};
