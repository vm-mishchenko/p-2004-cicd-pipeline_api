## What
Repo contains simple nodejs app with CI process. CD part described
in [p-2004-cicd-pipeline_api-infrastructure](https://github.com/vm-mishchenko/p-2004-cicd-pipeline_api-infrastructure).

https://api-7tt2isxsdq-wl.a.run.app

## Why
To explore several ideas:
- How application can be design and structured when CI/CD configuration lives in a different repo
- Set up checks on Pull requests, e.g. build project, run tests
- Build Docker image on each commit
- Deploy image on each commit
- 

## How
### How application can be design and structured when CI/CD configuration lives in a different repo
On each commit to master Google Cloud Build creates a new Docker image and sends a request
to [p-2004-cicd-pipeline_api-infrastructure](https://github.com/vm-mishchenko/p-2004-cicd-pipeline_api-infrastructure)
repo to update current App version.

### Set up checks on Pull requests, e.g. build project, run tests
- Install GitHub Google Cloud Build application
- It listens to Pull request notification, then [it runs tests](./cloudbuild-pull-request.yaml) for the last commit in
  this Pull request and send back Status
- Mark master branch as protected, and set Google Cloud Build Status as required step

### Build Docker image on each commit
Google Cloud Build allows listening to repository branch and execute build [pipeline](./cloudbuild-master-push.yaml)

### Deploy image on each commit
CD part covered
by [p-2004-cicd-pipeline_api-infrastructure](https://github.com/vm-mishchenko/p-2004-cicd-pipeline_api-infrastructure)
repo.

## Tech details
`gcloud builds submit` - test gcp build.

Trigger master build locally
```shell
gcloud builds submit --config cloudbuild-master-push.yaml --substitutions COMMIT_SHA=123
```

### Google Build service:
- [Existing Google builders](https://github.com/GoogleCloudPlatform/cloud-builders)
- [Mastering Google Cloud Build Config Syntax](https://davidstanke.medium.com/mastering-google-cloud-build-config-syntax-8c3024607daf)
- [GCP - Running bash scripts](https://cloud.google.com/build/docs/configuring-builds/run-bash-scripts)
- [How to pass data between Cloud Build steps](https://medium.com/google-cloud/how-to-pass-data-between-cloud-build-steps-de5c9ebc4cdd)
- [One build call another build](https://stackoverflow.com/questions/59282760/how-to-link-cloudbuild-yaml-from-different-repository-google-cloud-build-trigge)
- [How to pass API parameters to GCP cloud build triggers](https://stackoverflow.com/questions/59804109/how-to-pass-api-parameters-to-gcp-cloud-build-triggers)

Builder service account roles to Deploy to Cloud Run:
- Cloud Build Service Account
- Service Account User
- Cloud Run Admin
