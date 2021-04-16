## Command

`gcloud builds submit` - test gcp build.

Trigger master build locally
```shell
gcloud builds submit --config cloudbuild-master-push.yaml --substitutions COMMIT_SHA=123
```
