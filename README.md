
## Upgrade to Polymer 2
> This is only a proof of concept!

1. clone this repo
2. run `npm install && bower install`
3. during bower installation choose dependencies with 2.0-preview suffix
3. run `npm run start`
4. page is served at on localhost:5005

## Quick start with Vagrant
> Requires Vagrant, Ansible and VirtualBox

**Run it with virtualbox**

1. `vagrant up`
2. `vagrant ssh`
3. `run`
4. `open browser on localhost:5000`

**Run it with LXC**

1. `vagrant up --provider=lxc`
2. `vagrant ssh`
3. `run`
4. `open browser on localhost:5000`

## Quick start without Vagrant
- git clone git@github.com:unicef/unicef-innovation-fund.git
- cd unicef-innovation-fund
- sudo npm install -g gulp bower && npm install && bower install
- gulp serve

## Data Source
Data is served to browsers from a [Firebase](firebase.google.com)  account using [Polymerfire](https://github.com/firebase/polymerfire).

## Firebase Credentials
The Firebase credentials are kept in the firebase.json file. By using gulp the {app,dist}/config/firebase-config.html file is created, to be used by the web application:

`gulp firebase` -- uses staging configuration
`gulp firebase --production` -- uses staging configuration
`gulp` -- builds the application with staging configuration
`gulp --production` -- builds the application with production configuration
`gulp serve` -- locally serves the application with staging configuration
`gulp serve --production` -- locally serves the application with production configuration

## Firebase deployment
> Deploy to [staging server](https://innovation-fund2.firebaseapp.com/) hosted on [Firebase](firebase.google.com)
> [Deploy to multiple environments with Firebase Hosting](https://firebase.googleblog.com/2016/07/deploy-to-multiple-environments-with.html)

> Requires Google account with access to Firebase project

- sudo npm install -g firebase-tools
- firebase use staging - for staging settings
- firebase use production - for production settings
- firebase deploy


## Unicef Innovation Fund Site

Please see this [slide deck](https://docs.google.com/presentation/d/1HbaZBWy66uNeN2QR21K9LZ1WvLyM8hGFpEEAK4GxuS0/edit#slide=id.g1364efe171_0_1) for web component details.

## Getting Started

To install the UNICEF Innovation Fund website you will need:

1. Get a copy of the code.
2. Install the dependencies if you don't already have them.
3. Modify the application to your liking.
4. Deploy your production code.

### Install dependencies

#### Quick-start (for experienced users)

With Node.js installed, run the following one liner from the root of your Polymer Starter Kit download:

```sh
npm install -g gulp bower && npm install && bower install
```

#### Prerequisites (for everyone)

The project requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- gulp, a Node.js-based build tool.
- bower, a Node.js-based package manager used to install front-end packages (like Polymer).
- The starter kit gulp build process uses platform specific tools which is handled by node-gyp which is included in node.js. See https://github.com/nodejs/node-gyp/blob/master/README.md for additional platform specific dependencies.

**To install dependencies:**

1)  Check your Node.js version.

```sh
node --version
```

The version should be at or above 0.12.x.

2)  If you don't have Node.js installed, or you have a lower version, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

3)  Install `gulp` and `bower` globally.

```sh
npm install -g gulp bower
```

This lets you run `gulp` and `bower` from the command line.

4)  Install local `npm` and `bower` dependencies.

```sh
npm install && bower install
```

This installs the element sets (Paper, Iron, Platinum) and tools the starter kit requires to build and serve apps.

### Development workflow

#### Serve / watch

```sh
gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices connected to your network.

#### Run tests

```sh
gulp test:local
```

This runs the unit tests defined in the `app/test` directory through [web-component-tester](https://github.com/Polymer/web-component-tester).

To run tests Java 7 or higher is required. To update Java go to http://www.oracle.com/technetwork/java/javase/downloads/index.html and download ***JDK*** and install it.

#### Build & Vulcanize

```sh
gulp
```

Build and optimize the current project, ready for deployment. This includes vulcanization, image, script, stylesheet and HTML optimization and minification.

## Polymer Starter Kit

This project has been based on the Polymer Starter Kit for Polymer 1.0

[Read more](https://github.com/PolymerElements/polymer-starter-kit)
