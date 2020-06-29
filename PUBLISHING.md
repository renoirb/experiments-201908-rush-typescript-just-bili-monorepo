

```terminal
rush change -v
set -gx REGISTRY https://registry.npmjs.org/
npm login
rush publish --apply -b master --add-commit-details --publish
rush publish --publish --apply --include-all --set-access-level public --registry https://registry.npmjs.com/ --npm-auth-token 3811f41f-ab33-4805-a714-cfc2cfbe98bb
```
