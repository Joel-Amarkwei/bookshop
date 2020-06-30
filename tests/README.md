
    **TODO**
Unit Test => token-generation.test.js
Things to do before you can run these tests,...
-   Install the following node modules -> jwt(javascript webtoken), mongoose, config
-   Require User from the users model as shown in the code and run npm test.
-   To make sure that you're only focusing on only this test kindly comment out the integration test.
-   You can other test cases and see how they work out. 

Integration Test => authors.test.js
Things to do before you can run these tests,...
-   After installing each of the necessary node modules ie the modules that have been required into the test file at the top; you'll also to import the User and the Author property from the respective folder. 
-   The links to the respective folders have been added together with this link.
-   You'll also need the database to run the base on some fed in data, the database configuration link is also added. I used mongodb and the mongodb-compass to view everything more clearly.
-   Connect to mongo demon and everything will follow from there once you run npm test.
-   You'll also need need the generateAuthToken from the User model file.
*NB*: There're lots of test that can be performed using this, these samples tests are just a few.
    Questions for more clarifications are humbly welcomed.

Integration Test => login.test.js
Things to do before you can run these tests,...
-   Due to some complications I created a new server rather than import in the main one
-   Create a new express app and all so you can use that one for the server variable.
-   The rest is just model importation
-   You can use the dummy data I used to populate your database and use it.