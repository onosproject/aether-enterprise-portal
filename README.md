<!--
SPDX-FileCopyrightText: 2022-present Open Networking Foundation <info@opennetworking.org>

SPDX-License-Identifier: Apache-2.0
-->

# aether-enterprise-portal

Aether Enterprise Portal

This is new/future Aether Enterprise Portal.

## Licensing

Please add the Apache 2 license to all files

For typescript and CSS like:

```typescript
/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
```

For html like

```html
<!--
~ SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
~
~ SPDX-License-Identifier: Apache-2.0
-->
```

## CI and build automation

This repo uses Jenkins for CI. A new version is published to Docker Hub when the file
`VERSION` is changed from `<n.n.n>-dev` to just `<n.n.n>`. After publishing
Jenkins will change the VERSION file to `<n.n.n+1>-dev`.

## Other

Please add in more details and links here as they develop.

Follow this developer workflow, with your own Fork, where Pull Requests should be from your fork to master.

https://docs.onosproject.org/onos-docs/docs/content/developers/contributing/#1-fork-on-github

## Index of Content

Please find the Components in the application here.

- [Login](./src/app/Modules/auth/pages/login/README.md)
- [Forgot Password](./src/app/Modules/auth/pages/forgot-password/README.md)
- [Header](./src/app/components/header/navbar/README.md)
- [Dashboard](./src/app/Modules/dashboard/README.md)
- [Admin](./src/app/Modules/settings/admin/README.md)
- [Device/SIM](./src/app/Modules/settings/device-sim/README.md)
- [Services](./src/app/Modules/settings/services/README.md)
- [Small Cells](./src/app/Modules/settings/small-cell/README.md)
- [Slices](./src/app/Modules/settings/slices/README.md)
