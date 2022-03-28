<!--
SPDX-FileCopyrightText: 2020-present Open Networking Foundation <info@opennetworking.org>

SPDX-License-Identifier: Apache-2.0
-->

# Services

Services are Angular service files that can be accessed by the Components, Modules and othe services to perform certain action.

- Services in general have functions with a common logic that can be accessed from anywhere in the application.
- Using services the developers can store and pass information from one component to other.
- Which means Services can be used as a medium for communication between components.

## Developer Information

### Implementation

- Services are created by using Angular CLI command ng generat service <- service name ->.
- A service will be created in the location specified by the developers.
- Behaviour Subjects can be used for communicating between components.
- When a component subscribe to a behaviour subject it will keep listening to the changes.
- HTTP requests that are commonly used in the application are written in the services.
