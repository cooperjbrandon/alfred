# Alfred

Some person firebase/google functions for my personal google home. Each `intent` is something you want google home to do.
* intent: `train`: tells me when the next 4 inbound N's are at 4th and Irving
* intent: `findPhone`: calls your phone when you can't find it

## Getting Started

This package uses node 8.11.1, google cloud functions, and google actions (with dialog flow).


### Prerequisites

This package assumes you have the following accounts:
twilio, google cloud functions, google actions.

### Installing

Install the packages:

```
yarn global add firebase-cli && cd functions && yarn
```

### Running locally

Google cloud functions only runs Node 6. However this package uses certain newer features of javascript, such as async/await. Therefore, this package uses babel to transpile into google-cloud-function readable code.

Fill out `secrets.json`. (See `secrets-example.json` for correct structure of the secrets file). Then run

```
cd functions && yarn practice
```

### Deploying to firebase

From the root of alfred folder, initially run

```
firebase login
firebase use <google_action_project_id>
```

Then, every time you want to deploy, run
```
firebase deploy
```

### Other

Next bus api: https://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf
