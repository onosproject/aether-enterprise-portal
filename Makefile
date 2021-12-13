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

help:
	@grep -E '^.*: .* *# *@HELP' $(MAKEFILE_LIST) \
    | sort \
    | awk ' \
        BEGIN {FS = ": .* *# *@HELP"}; \
        {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}; \
	'

lint: # @HELP calls "npm run lint" to perform static code analysis
	npm run lint

test: # @HELP perform a license check on the code and then invokes "npm test"
	npm test

license_check: # @HELP examine and ensure license headers exist
	@if [ ! -d "../build-tools" ]; then cd .. && git clone https://github.com/onosproject/build-tools.git; fi
	./../build-tools/licensing/boilerplate.py -v --rootdir=${CURDIR} --boilerplate LicenseRef-ONF-Member-1.0

jenkins-test: # @HELP target used in Jenkins to run validation (these tests run in a docker container, only use on VM executors)
	${NODE} bash -c "cd /app && NG_CLI_ANALYTICS=false npm install --cache /tmp/empty-cache && make test"

jenkins-publish: # @HELP target used in Jenkins to publish docker images
	@echo "Needs to be implemented once a Dockerfile is provided"
	exit 1
