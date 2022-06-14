function trToggle(row) {
	var progressBarElement = row.getElementsByClassName('progress-bar-value')[0];
	var progressContinerElement = row.getElementsByClassName('progress-bar-continer')[0];
	if (row.classList.length === 0) {
		row.classList.add('tr-toggle');
		progressBarElement.style.backgroundColor = "#cd0a1c";
		progressContinerElement.classList.add('progress-bar-continer-toggle');
	}
	else {
		row.classList.remove('tr-toggle');
		progressBarElement.style.backgroundColor = null;
		progressContinerElement.classList.remove('progress-bar-continer-toggle');
	}
}

function checkboxHandleClick(event) {
	event.stopPropagation();
}