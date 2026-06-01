# Company

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Technical issue

Remove the cache from CloudFront first and then replace the file stored from S3

Steps to deploy:

cd /Users/Alex/Dev/lexoft

# 1) Upload the static site to your S3 bucket
aws s3 sync dist/[CERTIFICATION_MEDAL_SILVER_01_06_2026_2135.pdf](../../Downloads/CERTIFICATION_MEDAL_SILVER_01_06_2026_2135.pdf)browser/ s3://www.lexoft-eurl.com/ --delete

# 2) Invalidate CloudFront so visitors get the new bundle immediately
aws cloudfront create-invalidation --distribution-id <YOUR_DISTRIBUTION_ID> --paths "/*"

If you don't remember the bucket / distribution ID:
aws s3 ls   # lists your buckets
aws cloudfront list-distributions \
--query "DistributionList.Items[].{Id:Id,Domain:DomainName,Aliases:Aliases.Items}" --output table
(The distribution whose Aliases include lexoft-eurl.com is the one.)

After the invalidation completes (~1–2 min), verify on the live site:
1. Hard-refresh https://www.lexoft-eurl.com/fr, scroll to the contact form — you should see the Turnstile check render.
2. Submit a real message → you should receive the email at lexoft.eurl@gmail.com.
