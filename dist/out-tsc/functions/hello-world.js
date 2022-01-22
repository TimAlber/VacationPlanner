import * as functions from 'firebase-functions';
export const helloworld = functions.https.onRequest((request, response) => {
    response.send('Hello World!');
});
//# sourceMappingURL=hello-world.js.map