# SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
#
# SPDX-License-Identifier: Apache-2.0

# set default shell
SHELL = bash -e -o pipefail

build-tools:=$(shell if [ ! -d "./build/build-tools" ]; then cd build && git clone https://github.com/onosproject/build-tools.git; fi)
include ./build/build-tools/make/onf-common.mk

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

.PHONY: build

ifeq ($(shell git ls-files --others --modified --exclude-standard 2>/dev/null | wc -l | sed -e 's/ //g'),0)
  DOCKER_LABEL_VCS_REF = $(shell git rev-parse HEAD)
else
  DOCKER_LABEL_VCS_REF = $(shell git rev-parse HEAD)+dirty
endif

build: # @HELP build the Web GUI and run all validations (on the host machine)
build:
	npm run build:prod

npmdeps: # @HELP ensure that the required dependencies are in place
	NG_CLI_ANALYTICS=false npm install

lint: npmdeps # @HELP calls "npm run lint" to perform static code analysis
	npm run lint

test: npmdeps lint license # @HELP perform a license check on the code and then invokes "npm run test"
	npm run test

jenkins-test: # @HELP target used in Jenkins to run validation (these tests run in a docker container, only use on VM executors)
jenkins-test: test

jenkins-publish: docker-build docker-push # @HELP target used in Jenkins to publish docker images
	./build/build-tools/release-merge-commit

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
	./build/build-tools/publish-version ${VERSION} onosproject/aether-enterprise-portal

clean:: # @HELP remove all the build artifacts
	rm -rf ./dist ./node-modules
