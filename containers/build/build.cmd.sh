#!/usr/bin/env bash

function exit_with_error {
	echo "$1" 1>&2
	exit 1
}

echo "Building artifact <${ARTIFACT_NAME}>"

npm run build || exit_with_error "Could not build project!"
tar -cvf ${OUTPUT_DIR}/${ARTIFACT_NAME}.tar -C public . || exit_with_error "Could not save artifact!"

echo "Successfully built and stored artifact <${ARTIFACT_NAME}>"
echo "${OUTPUT_DIR}/${ARTIFACT_NAME}.tar"
