/***
 * @author Mohammed Shuaib A T
 */
/**Load ASS SDK */
const AWS = require('aws-sdk');
/**Update AWS Region to Deploy*/
AWS.config.update({region:'us-east-1'});
/**Import DynamoDn Using AWS SDK */
const dynamodb = new AWS.DynamoDB.DocumentClient();
/**Lambda Handler Function For Delete Program */
module.exports.deleteProgram = async (event, context, callback) => {
   /**Call the DynamoDb and use delete to delete the Data from the Table */
   await dynamodb.delete({
        TableName: "program",
        Key : {
            id : event.pathParameters.id,
        }
    }).promise()
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: `Program Deletion Successfull`,
        })
    }
    callback(null, response);
};