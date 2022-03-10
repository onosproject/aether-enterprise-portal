# SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
#
# SPDX-License-Identifier: Apache-2.0

# set default shell
SHELL = bash -e -o pipefail

# Variables
VERSION                  ?= $(shell cat ./VERSION)

## Docker related
DOCKER_USER              ?=
DOCKER_PASSWORD          ?=
DOCKER_REGISTRY          ?=
DOCKER_REPOSITORY        ?= onosproject/
DOCKER_BUILD_ARGS        ?=
DOCKER_IMAGE			 ?= aether-enterprise-portal
DOCKER_TAG               ?= latest
DOCKER_IMAGENAME         := ${DOCKER_REGISTRY}${DOCKER_REPOSITORY}${DOCKER_IMAGE}:${DOCKER_TAG}

## Docker labels. Only set ref and commit date if committed
DOCKER_LABEL_VCS_URL     ?= $(shell git remote get-url $(shell git remote | head -n 1))
DOCKER_LABEL_BUILD_DATE  ?= $(shell date -u "+%Y-%m-%dT%H:%M:%SZ")
DOCKER_LABEL_COMMIT_DATE = $(shell git show -s --format=%cd --date=iso-strict HEAD)

NODE                = docker run --rm --user $$(id -u):$$(id -g) -v ${CURDIR}:/app $(shell test -t 0 && echo "-it") weboaks/node-karma-protractor-chrome:debian-node14

.PHONY: build

ifeq ($(shell git ls-files --others --modified --exclude-standard 2>/dev/null | wc -l | sed -e 's/ //g'),0)
  DOCKER_LABEL_VCS_REF = $(shell git rev-parse HEAD)
else
  DOCKER_LABEL_VCS_REF = $(shell git rev-parse HEAD)+dirty
endif

help:
	@grep -E '^.*: .* *# *@HELP' $(MAKEFILE_LIST) \
    | sort \
    | awk ' \
        BEGIN {FS = ": .* *# *@HELP"}; \
        {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}; \
	'

build: # @HELP build the Web GUI and run all validations (on the host machine)
build:
	npm run build:prod

build-tools: # @HELP install the build tools if needed
	@if [ ! -d "../build-tools" ]; then cd .. && git clone https://github.com/onosproject/build-tools.git; fi

coverage: # @HELP generate unit test coverage data
coverage: deps build license_check test

deps: # @HELP ensure that the required dependencies are in place
	NG_CLI_ANALYTICS=false npm install

lint: deps # @HELP calls "npm run lint" to perform static code analysis
	npm run lint

test: deps lint license_check # @HELP perform a license check on the code and then invokes "npm run test"
	npm run test

license_check: # @HELP examine and ensure license headers exist
	@if [ ! -d "../build-tools" ]; then cd .. && git clone https://github.com/onosproject/build-tools.git; fi
	./../build-tools/licensing/boilerplate.py -v --rootdir=${CURDIR} --skipped-dir=coverage --boilerplate SPDX-Apache-2.0

jenkins-test: # @HELP target used in Jenkins to run validation (these tests run in a docker container, only use on VM executors)
jenkins-test: license_check
	${NODE} bash -c "cd /app && NG_CLI_ANALYTICS=false npm install --cache /tmp/empty-cache && npm run lint && npm test"

jenkins-publish: build-tools docker-build docker-push # @HELP target used in Jenkins to publish docker images
	../build-tools/release-merge-commit

aether-enterprise-portal-docker: # @HELP build aether-enterprise-portal Docker image
	docker build . -f build/aether-enterprise-portal/Dockerfile \
        --build-arg LOCAL_ONOSAPPS=$(LOCAL_ONOSAPPS) \
        --build-arg org_label_schema_version="${VERSION}" \
        --build-arg org_label_schema_vcs_url="${DOCKER_LABEL_VCS_URL}" \
        --build-arg org_label_schema_vcs_ref="${DOCKER_LABEL_VCS_REF}" \
        --build-arg org_label_schema_build_date="${DOCKER_LABEL_BUILD_DATE}" \
        --build-arg org_opencord_vcs_commit_date="${DOCKER_LABEL_COMMIT_DATE}" \
		-t ${DOCKER_IMAGENAME}

images: # @HELP build all Docker images (the build happens inside a docker container)
images: aether-enterprise-portal-docker

docker-build: aether-enterprise-portal-docker

docker-push: # push to docker registy: use DOCKER_REGISTRY, DOCKER_REPOSITORY and DOCKER_TAG to customize
ifdef DOCKER_USER
ifdef DOCKER_PASSWORD
	echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USER} --password-stdin
else
	@echo "DOCKER_USER is specified but DOCKER_PASSWORD is missing"
	@exit 1
endif
endif
	docker push ${DOCKER_IMAGENAME}

kind: # @HELP build Docker images and add them to the currently configured kind cluster
kind: images
	@if [ `kind get clusters` = '' ]; then echo "no kind cluster found" && exit 1; fi
	kind load docker-image ${DOCKER_IMAGENAME}

all: images

publish:
	./../build-tools/publish-version ${VERSION} onosproject/aether-enterprise-portal

clean: # @HELP remove all the build artifacts
	rm -rf ./dist ./node-modules
