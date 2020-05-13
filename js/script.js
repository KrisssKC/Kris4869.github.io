var gamespeed = 1000;
var token = 10;
var w = 380;
var h = 380;
var padding = 5;
var xPadding = 50;
var yPadding = 50;

var infected = []
var untrustIndex = [0]
var panicIndex = [0]
var datemap = ['0115','0116','0117','0118','0119','0120','0121','0122','0123','0124','0125','0126','0127','0128','0129','0130','0131','0201','0202','0203','0204','0205','0206','0207','0208','0209','0210','0211','0212','0213','0214','0215','0216','0217','0218','0219','0220','0221','0222','0223','0224','0225','0226','0227','0228','0229','0301','0302','0303','0304','0305','0306','0307','0308','0309','0310','0311','0312','0313','0314','0315','0316','0317','0318','0319','0320','0321','0322','0323','0324','0325','0326','0327','0328','0329','0330','0331','0401','0402','0403','0404','0405','0406','0407','0408','0409','0410','0411','0412','0413','0414','0415','0416','0417','0418','0419'];
var date = 0;

var vizm = d3.select("#map")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

var vizg = d3.select("#graph")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

var vizp= d3.select("#panic")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

var vizu = d3.select("#untrust")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;


buildXAndYAxis(d3.scaleTime(), d3.scaleLinear(), vizg)
buildXAndYAxis(d3.scaleTime(), d3.scaleLinear(), vizp)
buildXAndYAxis(d3.scaleTime(), d3.scaleLinear(), vizu)


function panicNormal(){
	let now = infected[infected.length - 1]
	let prev = 0
	if (infected.length > 1){prev = infected[infected.length - 2]}
	let m = d3.max(infected)
	let hi = infected.length-1-infected.indexOf(m)
	let next1 = (now - m)/(hi) 
	let next2 = now - prev
	let next3 = panicIndex[panicIndex.length - 1]
	if (isNaN(next1)){next1 = 1}
	if (isNaN(next2)){next2 = 1}
	if (isNaN(next3)){next3 = 1}
	//console.log(next1, next2, next3)
	return Math.sqrt(next1 + next2 + next3)/5
}

function untrustNormal(){
	if (infected[infected.length - 1] > infected[infected.length - 2]){
		return untrustIndex[untrustIndex.length - 1] + 0.02
	} else {return untrustIndex[untrustIndex.length - 1] + 0}
}

function objDate(datex){
	let month = Number(datex.slice(0, 2))-1
	let date = Number(datex.slice(2, 4))
	let i = new Date(2022, month, date)
	return i
}

function getDates(){
	let p = []
	for(i = 0; i < date; i++){
		p.push(objDate(datemap[i]))
	}
	return p
}

function reformData(l1, l2){
	let len = l1.length
	let p = []
	for(i = 0; i < len; i++){
		p.push([Number(l1[i]), Number(l2[i])])
	}
	return p
}

function buildXAndYAxis(xScale, yScale, viz){
  let xAxisGroup = viz.append("g").attr("class", 'xaxis');
  let xAxis = d3.axisBottom(xScale).ticks(5)
  xAxisGroup.call(xAxis)
  xAxisGroup.attr("transform", "translate(0, "+ (h-yPadding) +")")


  let yAxisGroup = viz.append("g").attr("class", 'yaxis');
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate("+xPadding+", 0)")

}

function drawP(){
	let dates = getDates() 
	//console.log(d3.extent(dates))
	//console.log(d3.extent(panicIndex))
	let xScale = d3.scaleTime()
					.domain(d3.extent(dates))
					.range([xPadding, w-xPadding])
	let yScale = d3.scaleLinear()
					.domain([0, d3.max(panicIndex)])
					.range([w - yPadding, yPadding])
	//buildXAndYAxis(xScale, yScale, vizp)
	let lineMaker = d3.line()
		.x(d=>xScale(d[0]))
		.y(d=>yScale(d[1]))
	;
	
	xAxisGroup = vizp.select(".xaxis")
	yAxisGroup = vizp.select(".yaxis")
	let xAxis = d3.axisBottom(xScale).ticks(5)
  	xAxisGroup.transition().duration(gamespeed).call(xAxis)
	let yAxis = d3.axisLeft(yScale);
  	yAxisGroup.transition().duration(gamespeed).call(yAxis)
	
	let data = reformData(dates, panicIndex)
	//let data = [dates, panicIndex]
	//console.log(dates)
	//console.log(panicIndex)
	let x = vizp.selectAll(".panicpoint").data([data])
	x.transition().duration(gamespeed).attr("d", lineMaker).delay(gamespeed)
	x.enter()
		.append("path")
		.attr("class", "panicpoint")
		.transition().duration(gamespeed)
		.attr("d", lineMaker)
		.attr("stroke-width", 2)
		.attr("fill", "none")
		.attr("stroke", ()=>"red")
	}




function drawData(){
	d3.csv("dataverse_files/Prov_Confirmed_0115_0419.csv").then(incomingData => {
		let dates = getDates() 
		let data = incomingData.find(d=>d.ProvEN == "SUM")
		data = d3.values(data).slice(1, date+1)
		data = data.map(d=>{
			let ddd = Number(d)
			let dd = ondatac(Number(d))
			if(isNaN(dd)){console.log("NaN on data");dd=ddd}
			return dd
		})
		infected = data
		var xScale = d3.scaleTime()
					.domain(d3.extent(dates))
					.range([xPadding, w-xPadding])
		//console.log(d3.extent(data))
		var yScale = d3.scaleLinear()
					.domain([0, d3.max(data)])
					.range([w - yPadding, yPadding])
		//buildXAndYAxis(xScale, yScale, vizg)
		let lineMaker = d3.line()
			.x(d=>xScale(d[0]))
			.y(d=>yScale(d[1]))
		;
		data = reformData(dates, data)
		//data = [dates, data]
		//console.log(data)
		
		xAxisGroup = vizg.select(".xaxis")
		yAxisGroup = vizg.select(".yaxis")
		let xAxis = d3.axisBottom(xScale).ticks(5)
		xAxisGroup.transition().duration(gamespeed).call(xAxis)
		let yAxis = d3.axisLeft(yScale);
		yAxisGroup.transition().duration(gamespeed).call(yAxis)
		let x = vizg.selectAll(".datapointc").data([data])
		
			x.transition().duration(gamespeed).attr("d", lineMaker)
			x.enter()
			.append("path")
			.attr("class", "datapointc")
			.transition().duration(gamespeed)
			.attr("d", lineMaker)
			.attr("stroke-width", 2)
			.attr("fill", "none")
			.attr("stroke", ()=>"red")
		
		
			d3.csv("dataverse_files/Prov_Death_0115_0419.csv").then(incomingData => {
				let dates = getDates() 
				let data = incomingData.find(d=>d.ProvEN == "SUM")
				data = d3.values(data).slice(1, date+1)
				data = data.map(d=>Number(d)*Math.sqrt(Number(d))/10)
				let lineMaker = d3.line()
					.x(d=>xScale(d[0]))
					.y(d=>yScale(d[1]))
				;
				data = reformData(dates, data)
				let y = vizg.selectAll(".datapointd").data([data])
				y.attr("d", lineMaker).attr("stroke", ()=>"black")
				y.enter()
					.append("path")
					.attr("class", "datapointd")
					.attr("d", lineMaker)
					.attr("stroke-width", 2)
					.attr("fill", "none")
					.attr("stroke", ()=>"black")
			});
	});
	
}

function drawMap(){
	d3.json("dataverse_files/mainland.geojson").then(geoData => {
		d3.csv("dataverse_files/Prov_Confirmed_0115_0419.csv").then(incomingData => {
			let dateformat = "T_C_" + datemap[date]  
			let projection = d3.geoEqualEarth()
				.translate(w/2,h/2)
				.fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
			let pathMaker = d3.geoPath(projection)
			
			//console.log(incomingData)

			let minpop = d3.min(incomingData, d => d.dateformat)
			let maxpop = d3.max(incomingData, d => d.dateformat)
			let colorScale = d3.scaleLinear().domain([0, 800]).range(["white", "red"])
		
			let x = vizm.selectAll(".province").data(geoData.features)
			
			
					x.transition().duration(gamespeed).attr("fill", d => {
				
				
					let corres = incomingData.find(datapoint => datapoint.ProvEN == d.properties.name)
					if(corres != undefined){
						return colorScale(corres[dateformat])
					} else {
						//console.log(d.properties.name)
						return "blue";
					}
				
					})
			
					x.enter()
					.append("path")
					.attr("class", "province")
					.transition().duration(gamespeed)
					.attr("d", pathMaker)
					.attr("stroke", "black")
					.transition()
					.attr("fill", d => {
				
				
					let corres = incomingData.find(datapoint => datapoint.ProvEN == d.properties.name)
					if(corres != undefined){
						return colorScale(corres[dateformat])
					} else {
						//console.log(d.properties.name)
						return "blue";
					}
				
			})
		})

	});
}


function drawUntrust(){
	let dates = getDates() 
	let xScale = d3.scaleTime()
					.domain(d3.extent(dates))
					.range([xPadding, w-xPadding])
	let yScale = d3.scaleLinear()
					.domain([0, d3.max(untrustIndex)])
					.range([w - yPadding, yPadding])
	//buildXAndYAxis(xScale, yScale, vizu)
	let lineMaker = d3.line()
		.x(d=>xScale(d[0]))
		.y(d=>yScale(d[1]))
	;
	xAxisGroup = vizu.select(".xaxis")
	yAxisGroup = vizu.select(".yaxis")
	let xAxis = d3.axisBottom(xScale).ticks(5)
  	xAxisGroup.call(xAxis)
	let yAxis = d3.axisLeft(yScale);
  	yAxisGroup.transition().duration(gamespeed).call(yAxis)
	let data = reformData(dates, untrustIndex)
	let x = vizu.selectAll(".untrustpoint").data([data])
	x.transition().duration(gamespeed).attr("d", lineMaker)
	x.enter()
		.append("path")
		.attr("class", "untrustpoint")
		.transition().duration(gamespeed)
		.attr("d", lineMaker)
		.attr("stroke-width", 2)
		.attr("fill", "none")
		.attr("stroke", ()=>"red")
}

function updateDate(){
	let reald = datemap[date] 
	document.getElementById("timer").innerHTML = "<h4>2022" + "/" + reald.slice(0,2) + "/"+ reald.slice(2,4)  + "</h4>"
}


function checkEvent(){
	if (date == 20){
		document.getElementById("news").innerHTML = "<p>WHO plans to dispatch investigators</p>"
		newsound.play()
		
	}
	if (date == 10){
		document.getElementById("news").innerHTML = "<p>Doctors are spreading real situation of the disease in social media</p>"
		newsound.play()
		
	}
	
	if (date == 30){
		document.getElementById("news").innerHTML = "<p>People start to doubt the official data</p>"
		newsound.play()
		
	}
	
	if (date == 40){
		document.getElementById("news").innerHTML = "<p>Foreign media are reporting the real situation in the country</p>"
		newsound.play()
		
	}
	
	if (untrustIndex[untrustIndex.length-1] > 5){
		document.getElementById("news").innerHTML = "<p>many citizens are showing their untrust of government on social media</p>"
		newsound.play()
		
	}
	
	if (untrustIndex[untrustIndex.length-1] > 8){
		document.getElementById("news").innerHTML = "<p>many citizens are gathering and  protesting against the governemnt</p>"
		newsound.play()
		
	}
	//complexEvents()
}

function updateToken(){
	document.getElementById("tokennum").innerHTML = token;
}

var refreshIntervalId = setInterval(()=>{
	if (date > 95) {clearInterval(refreshIntervalId); alert("win")}
	drawData()
	drawMap()
	
	
	let ppp = panicNormal()
	let pp = onpanic(ppp)
		console.log("p", pp)
	if(isNaN(pp)){pp = ppp}
	if(pp<0){pp = 1}

	panicIndex.push(pp)
	
	let qqq = untrustNormal()
	let qq = onuntrust(qqq)
		console.log("q", qq)
	if(isNaN(qq)){qq = qqq}
	if(qq<0){qq = 0}
	
	untrustIndex.push(qq)
	//console.log(panicIndex)
	
	drawP()
	drawUntrust()
	
	date++
	token += 10
	updateDate()
	updateToken()
	
	checkEvent();
	//console.log(op)
}, gamespeed)
