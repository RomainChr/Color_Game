window.addEventListener("DOMContentLoaded", function(){
	//helpers
   var hlps = {
	   qs: function( arg ) {
    	   return document.querySelector( arg )
   		},
   		qsA: function( arg ) {
    	   return document.querySelectorAll( arg )
   		}
   }

	var mode = false;
	var nbr
	var colorSelect
	var easy = hlps.qs('#easy')
	var hard = hlps.qs('#hard')
	var newColor = hlps.qs('#newColor')
	var header = hlps.qs('header')
	var containerSquare = hlps.qs('section').firstElementChild
	var info = hlps.qs('#info')

	init()

	function init(){
		containerSquare.innerHTML = ""
		info.innerHTML = ""
		newColor.innerHTML = "NEW COLORS"
		header.style.backgroundColor = '#0984e3'
		createSquare()
	}

	function createSquare(){
		var colors = []
		nbr = mode ? 3 : 6

		for(var i=0;i<nbr;i++){
			colors.push(generatRGBcode())
			var div = document.createElement( 'div' )
			var el = containerSquare.appendChild( div )

			el.id = "square" + [i]
			el.style.backgroundColor = colors[i]
			el.classList.add("square")
			el.addEventListener('click', function(){
				checkColor(this, this.style.backgroundColor)
			}, false)
		}

		colorSelect = colors[Math.floor((Math.random() * nbr))]
		hlps.qs('h1').innerHTML = colorSelect
	}

	function changeMode(){
		mode ? easy.classList.add("modeSelect") : easy.classList.remove("modeSelect")
		mode ? hard.classList.remove("modeSelect") : hard.classList.add("modeSelect")
		init()
	}

	//function generate colors
	function genColor(){
		return Math.floor((Math.random() * 256)); 
	}

	function generatRGBcode(){
		var rgbCode = "rgb(" + genColor() + ", " + genColor() + ", " + genColor() + ")"
		return rgbCode
	}

	// CHECK CLICK OK
	function checkColor(el, color){
		if(color == colorSelect){
			info.innerHTML = "Correct !!!"
			for(var i = 0; i < nbr; i++){
				hlps.qs('#square' + [i]).style.backgroundColor = colorSelect
			}
			header.style.backgroundColor = colorSelect
			newColor.innerHTML = "Play again ?"
		}else{
			el.style.backgroundColor = "#000"
			info.innerHTML = "Try again ..."
		}
	}

	easy.addEventListener("click", function(){
		mode = true
		changeMode()
	}, false)

	hard.addEventListener("click", function(){
		mode = false
		changeMode()
	}, false)

	newColor.addEventListener("click", function(){
		init()
	}, false)

}, false)