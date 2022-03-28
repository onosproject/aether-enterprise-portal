<!--
SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>

SPDX-License-Identifier: Apache-2.0
-->

# Material Module

Material module is used internally by Angular.

- [`Material Module`](./material.module.ts) is imported in other modules to use various moduels that are commonly used across multiple modules.

## Developer Information

### Implementation

The usage of **Material Module** is as follows:

- `Material module` is used internally by the Angular application to minimise too many import statement in modules.
- All the commonly used modules will be exported from `Material module` and Material module is imported into the all other modules.
