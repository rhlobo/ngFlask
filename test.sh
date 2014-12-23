#!/bin/bash


export CURRDIR="$(pwd)"
export PROJECT_LOCATION="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PYTHONPATH="${PROJECT_LOCATION}"


run_tests() {
	echo "TESTS"
	echo "--------------------------------------------------------------------------------"
	nosetests --with-coverage --cover-erase --cover-inclusive --cover-branches --cover-package="server" --cover-html --cover-html-dir="../coverage/" -w "server" || return 1
	echo
}

pep8_style_check() {
	echo "PEP8 CODE STYLE CHECK"
	echo "--------------------------------------------------------------------------------"
	find "server" -type f -name "*.py" -exec pep8 --first --max-line-length=160 {} \; || return 1
	echo
}

pep8_statistics() {
	echo "PEP8 STATISTICS"
	echo "#     Err  Description"
	echo "--------------------------------------------------------------------------------"
	pep8 --statistics --max-line-length=160 -qq "./server" | sort -nr || return 1
	echo
}

exit_failure() {
	cd "${CURRDIR}"
	exit 1
}


cd "${PROJECT_LOCATION}"
run_tests || exit_failure
pep8_style_check || exit_failure
pep8_statistics || exit_failure
cd "${CURRDIR}"