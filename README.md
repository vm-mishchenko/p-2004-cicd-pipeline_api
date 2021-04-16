## Command

`gcloud builds submit` - test gcp build.

Trigger master build locally
```shell
gcloud builds submit --config cloudbuild-master-push.yaml --substitutions COMMIT_SHA=123
```

## Google Build service:
[Existing Google builders](https://github.com/GoogleCloudPlatform/cloud-builders)

- [Mastering Google Cloud Build Config Syntax](https://davidstanke.medium.com/mastering-google-cloud-build-config-syntax-8c3024607daf)
- [GCP - Running bash scripts](https://cloud.google.com/build/docs/configuring-builds/run-bash-scripts)
- [How to pass data between Cloud Build steps](https://medium.com/google-cloud/how-to-pass-data-between-cloud-build-steps-de5c9ebc4cdd)

Builder service account roles to Deploy to Cloud Run:
- Cloud Build Service Account
- Service Account User
- Cloud Run Admin 
