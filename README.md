# aether-enterprise-portal
Aether Enterprise Portal

This is new/future Aether Enterprise Portal.

## Licensing
Please add the ONF Member Only license to all files

For typescript and CSS like:
```typescript
/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: LicenseRef-ONF-Member-Only-1.0
 */
```

For html like
```html
<!--
~ SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
~
~ SPDX-License-Identifier: LicenseRef-ONF-Member-Only-1.0
-->
```

## CI and build automation
This repo uses Jenkins for CI. A new version is published to Docker Hub when the file
`VERSION` is changed from `<n.n.n>-dev` to just `<n.n.n>`. After publishing
Jenkins will change the VERSION file to `<n.n.n+1>`.

## Other
Please add in more details and links here as they develop.

Follow this developer workflow, with your own Fork, where Pull Requests should be from your fork to master.

https://docs.onosproject.org/onos-docs/docs/content/developers/contributing/#1-fork-on-github 
