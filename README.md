## Instructions to run the code

Make sure you have Node.js (>= 10.13.0, except for v13) and npm installed on your operating system.

[How to install node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

First of all, install the dependencies, running

`npm install`

Now, you should be able to start the application!

`npm run start`

The server will be runing on _localhost:3000_ so make a POST request to `localhost:3000/user/risk/calculate` with the following request body:

```JSON
{
  "age": 35,
  "dependents": 2,
  "house": {"ownership_status": "owned"},
  "income": 0,
  "marital_status": "married",
  "risk_questions": [0, 1, 0],
  "vehicle": {"year": 2018}
}
```

## Tests

Unit and integration tests are being executed separatedly, using the following commands:

## Unit tests

`npm run test:unit`

## Integration tests

`npm run test:integration`

If you prefer, you can also run them all at once:

`npm run test`

## Main technical decisions

### Technologies

Since I was informed that I could use any set of technologies, I choose to use NodeJS and TypeScript with NestJS framework, which I am more familiar with.
NestJS is built on top of two popular Node.js frameworks (express and fastify) but provides a level of abstraction above those.
As a developer, I enjoy the fact that NestJS make things easir and imposes since the beginning an clearly architecture to be followed.

### Architecture

![alt text](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

The image above represents the architecture concept used in the project, Clean Architecture.

The intention was to separate each responsability of the application into different layers.

This brings us many benefits, such as testing. It gets a lot easier since business rules can be tested without a user interface, database connection or any other external dependency.

This architecture have something called dependency rule, that means that code dependencies can only point inwards.

## Comments about the project

It was created a entity called Insurance that gives life to another insurance lines: auto, disability, home and life.
That way, to add a new insurance line, we just need to create based on Insurance entity and add the necessary rules.

I choosed to use the class-validator library with NestJS decorators to validate the data input provided at API's endpoint and make sure that all properties is being passed as expected due the documentation.

## Thank you!

I would like to thank you who are analyzing this implementation and say that this process has been an incredible learning experience for me.
I hope you enjoyed. Thank you very much!

# Origin Backend Take-Home Assignment

Origin offers its users an insurance package personalized to their specific needs without requiring the user to understand anything about insurance. This allows Origin to act as their _de facto_ insurance advisor.

Origin determines the user’s insurance needs by asking personal & risk-related questions and gathering information about the user’s vehicle and house. Using this data, Origin determines their risk profile for **each** line of insurance and then suggests an insurance plan (`"economic"`, `"regular"`, `"responsible"`) corresponding to her risk profile.

For this assignment, you will create a simple version of that application by coding a simple API endpoint that receives a JSON payload with the user information and returns her risk profile (JSON again) – you don’t have to worry about the frontend of the application.

## The input

First, the would-be frontend of this application asks the user for her **personal information**. Then, it lets her add her **house** and **vehicle**. Finally, it asks her to answer 3 binary **risk questions**. The result produces a JSON payload, posted to the application’s API endpoint, like this example:

```JSON
{
  "age": 35,
  "dependents": 2,
  "house": {"ownership_status": "owned"},
  "income": 0,
  "marital_status": "married",
  "risk_questions": [0, 1, 0],
  "vehicle": {"year": 2018}
}
```

### User attributes

All user attributes are required:

- Age (an integer equal or greater than 0).
- The number of dependents (an integer equal or greater than 0).
- Income (an integer equal or greater than 0).
- Marital status (`"single"` or `"married"`).
- Risk answers (an array with 3 booleans).

### House

Users can have 0 or 1 house. When they do, it has just one attribute: `ownership_status`, which can be `"owned"` or `"mortgaged"`.

### Vehicle

Users can have 0 or 1 vehicle. When they do, it has just one attribute: a positive integer corresponding to the `year` it was manufactured.

## The risk algorithm

The application receives the JSON payload through the API endpoint and transforms it into a _risk profile_ by calculating a _risk score_ for each line of insurance (life, disability, home & auto) based on the information provided by the user.

First, it calculates the _base score_ by summing the answers from the risk questions, resulting in a number ranging from 0 to 3. Then, it applies the following rules to determine a _risk score_ for each line of insurance.

1. If the user doesn’t have income, vehicles or houses, she is ineligible for disability, auto, and home insurance, respectively.
2. If the user is over 60 years old, she is ineligible for disability and life insurance.
3. If the user is under 30 years old, deduct 2 risk points from all lines of insurance. If she is between 30 and 40 years old, deduct 1.
4. If her income is above \$200k, deduct 1 risk point from all lines of insurance.
5. If the user's house is mortgaged, add 1 risk point to her home score and add 1 risk point to her disability score.
6. If the user has dependents, add 1 risk point to both the disability and life scores.
7. If the user is married, add 1 risk point to the life score and remove 1 risk point from disability.
8. If the user's vehicle was produced in the last 5 years, add 1 risk point to that vehicle’s score.

This algorithm results in a final score for each line of insurance, which should be processed using the following ranges:

- **0 and below** maps to **“economic”**.
- **1 and 2** maps to **“regular”**.
- **3 and above** maps to **“responsible”**.

## The output

Considering the data provided above, the application should return the following JSON payload:

```JSON
{
    "auto": "regular",
    "disability": "ineligible",
    "home": "economic",
    "life": "regular"
}
```

## Criteria

You may use any language and framework provided that you build a solid system with an emphasis on code quality, simplicity, readability, maintainability, and reliability, particularly regarding architecture and testing. We'd prefer it if you used Python, but it's just that – a preference.

Be aware that Origin will mainly take into consideration the following evaluation criteria:

- How clean and organized your code is;
- If you implemented the business rules correctly;
- How good your automated tests are (qualitative over quantitative).

Other important notes:

- Develop a extensible recommendation engine
- Add to the README file: (1) instructions to run the code; (2) what were the main technical decisions you made; (3) relevant comments about your project
- You must use English in your code and also in your docs

This assignment should be doable in less than one day. We expect you to learn fast, **communicate with us**, and make decisions regarding its implementation & scope to achieve the expected results on time.

It is not necessary to build the screens a user would interact with, however, as the API is intended to power a user-facing application, we expect the implementation to be as close as possible to what would be necessary in real-life. Consider another developer would get your project/repository to evolve and implement new features from exactly where you stopped.
