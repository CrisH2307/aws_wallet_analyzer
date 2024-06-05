## Create bucket
aws s3 mb s3://kendra-exp-223 --region us-east-1

``` sh
## Creating Index
aws kendra create-index \
--edition DEVELOPER_EDITION \
--name my-index \
--description "My Index" \
--region us-east-1 \
--role-arn arn:aws:iam::786741774457:role/KendraIndexRole
```

``` sh
## Creating Data Source
aws kendra create-data-source \
--index-id 319efa3d-0269-4606-9212-1611e63fe3d1 \
--name my-data-source \
--role-arn arn:aws:iam::786741774457:role/KendraDataSourceRole \
--type S3 \
--configuration '{"S3Configuration":{"BucketName": "kendra-exp-223"}}' \
--region us-east-1
```