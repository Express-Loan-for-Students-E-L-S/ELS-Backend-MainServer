# Express Loans Backend Main Server

# Installation and Setup Instructions

## Clone the latest version of this repository.

```
git clone https://github.com/Express-Loan-for-Students-E-L-S/ELS-Backend-MainServer.git
```

## Installation

> This module is distributed via [npm][npm] which is bundled with [node][node] and
> should be installed as one of your project's `dependencies`:

```
npm install
```

## Setup Enviornment Variables:
> The project is using AWS-S3 and MongoDB so in order to set them up
> you need to add the AWS API Keys and Mongo URL to your enviornment variables

`Create a .env file in root of this directory`
`and add following to the file`
```
MONGOURL={Your MongoDB url}
AWS_ID={Your aws ID}
AWS_SECRET={Your AWS secret key}
AWS_BUCKET_NAME={Your AWS bucket name}
```

## To Start Server:

```
node index.js
```

> The server will run on default port 8080, 
> to specify a different port add 'PORT' to the enviornment variables