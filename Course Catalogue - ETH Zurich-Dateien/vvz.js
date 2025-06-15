// remove all <noscript> tags from page when JS is active
// ------------------------------------------------------
const noscriptTag = document.querySelectorAll('.noscript');
for (let i = 0; i < noscriptTag.length; i++) {
	noscriptTag[i].remove();
}

// eventListener for selects with 
// CSS class "waitImage" that trigger a page reload
// ------------------------------------------------
const divEvents = document.querySelectorAll('.waitImage');
if (divEvents) {
	for (let i = 0; i < divEvents.length; i++) {
		divEvents[i].addEventListener('change', selectTrigger, false);
	}
}

function selectTrigger () {
    let idWaitImage = this.dataset.wait;
	let elemInput   = document.createElement("input");
	
	elemInput.type  = "hidden";
	elemInput.name  = "refresh";
	elemInput.value = "on";
	
	try {
		document.getElementById(idWaitImage).style.display = "inline";
	} 
	catch (ex) {
	}
	
	let form = document.forms[0];	
	form.appendChild(elemInput);
	form.submit();
}


// unclear, to be checked
// ------------------------
function popUp(windowname) {
	var config = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=700,height=500";
	if (windowname == "Anfangszeit") {
		var config = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no,width=1000,height=220";
	} else if (windowname == "Studienplanangaben") {
		var config = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=1000,height=400";
	} else if (windowname == "LerneinheitUmfang") {
		var config = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no,width=1000,height=550";
	} else if (windowname == "Lehrveranstaltung") {
		var config = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=1010,height=310";
	} else if (windowname == "Rauminfo") {
		var config = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=900,height=900";
	}

	newwin = window.open("about:blank", windowname, config);
	newwin.focus(self);
}


