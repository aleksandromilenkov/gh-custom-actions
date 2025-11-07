const core = require('@actions/core');
const github = require('@actions/github');// can communicate with github API
const exec = require('@actions/exec');

function run() {
    // 1) Get some input values
    const bucketName = core.getInput('bucket-name', { required: true });
    const region = core.getInput('region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    // 2) Upload files to S3
    const bucketUri = `s3://${bucketName}`;
    // will be executed in a regular shell in our runner
    // will automatically look for aws access key and secret key in the environment variables
    exec.exec(`aws s3 sync ${distFolder} ${bucketUri} --region ${region}`);
    core.notice('Hello from my custom JavaScript action!');
}

run();