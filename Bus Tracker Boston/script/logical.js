function compareDesc(a, b) {
	if (a < b) return 1;
	if (a > b) return -1;
	if (a === b) return 0;
}

function compareAsc(a, b) {
	if (a < b) return -1;
	if (a > b) return 1;
	if (a === b) return 0;
}
