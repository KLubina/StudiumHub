
function autoSubmit(pFormName) {
	var lInput = document.createElement("input");
	lInput.type = "hidden";
	lInput.name = "refresh";
	lInput.value = "on";
	var form = document.getElementsByName(pFormName)[0];
	form.appendChild(lInput);
	form.submit();
}

function showWait(pName) {
	try {
		document.getElementById(pName).style.display = "inline";
	} catch (ex) {
	}
}

