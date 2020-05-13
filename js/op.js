//TODO GAME   
//viz  EVENT HOVER

//Biased Collection: local -d -p %l+u （2） ++2
//P0 recalculation: -p （2） ++2
//Weighted Average: -p -d （2） ++1
//Redesign Standards: -p -d %m+u (4) ++3
//Regression: -p -d （2） *2
//Interpolation: -p -d （2） *2
//
//Public Attention Redirection -d %m+u (1) ++2
//Online Propagation -d %h+u (1) ++1 
//Authorities -d %m+u (1) ++2
//
//Speech Regulation %-d +u ++1
//Arrest %-d +u local ++1
//Internet Shutdown local %-d +u ++1
cost = [2, 2, 2, 4, 2, 2, 1, 1, 1, 1, 1, 1]
op = [0,0,0,0,0,0,0,0,0,0,0,0]
spc = [0,0,0,0,0,0,0,0,0,0,0,0]
spcr = [0,0,0,0,0,0,0,0,0,0,0,0]

function onmap(x){
	for(i = 0; i < 12; i++){
		if(op[i] != 0){
			x = opsmap[i](x, op[i])
		}
	}
	return x
}

function ondatac(x){
	for(i = 0; i < 12; i++){
		if(op[i] != 0){
			x = opsmap[i](x, op[i])
		}
	}
	return x
}


function onuntrust(x){
	for(i = 0; i < 12; i++){
		if(op[i] != 0){
			x = opsuntrust[i](x, op[i])
		}
	}
	console.log(x)
	return x
}

function onpanic(x){
	for(i = 0; i < 12; i++){
		if(op[i] != 0){
			x = opspanic[i](x, op[i])
		}
	}
	//console.log(x)
	return x
}


opsmap = {
	0: (data, i) => data - Math.sqrt(data) *( i * i * Math.floor(Math.random()) + 10*i + 2),
	1: (data, i) => data - Math.floor(0.01 / i / i * data), 
	2: (data, i) => data - Math.floor(Math.random() * 10)*Math.sqrt(data),
	3: (data, i) => data - Math.floor(Math.random() * i * Math.sqrt(data)) * 10 * Math.pow(i, 0.3),
	4: (data, i) => data - i*i*i, 
	5: (data, i) => data - i*i*i*i*0.8 + i*i*i*i,
	6: (data, i) => data,
	
	7: (data, i) => data,
	8: (data, i) => data,
	9: (data, i) => data,
	
	10: (data, i) => data,
	11: (data, i) => data,
	12: (data, i) => data
}

opspanic = {
	0: (data, i) => data - 0.1,
	1: (data, i) => data * 2 / (Math.floor(Math.random() * 1.3)*i+0.1),
	2: (data, i) => data - Math.floor(Math.random() * 0.4 * Math.random() * 1 * i + 0.8),
	3: (data, i) => data - Math.floor(Math.random() * i * 0.2 + 1) * 0.3 * Math.pow(i, 0.2),
	4: (data, i) => data - i - data/20,
	5: (data, i) => data - 0.5 * i,
	6: (data, i) => data - 2 * Math.floor(Math.random() * i + 1 - i) * Math.pow(i, 0.1),
	
	7: (data, i) => data - 0.1*i*i/data,
	8: (data, i) => data - Math.floor(30/data/i + Math.pow(data, 0.3)),
	9: (data, i) => data - Math.sqrt(data),
	
	10: (data, i) => {if ( Math.floor(Math.random())*Math.floor(Math.random()) ) { return data - 10*i}
						else{return data + i}
					},
	11: (data, i) => data, // event specific
	12: (data, i) => {if ( Math.floor(Math.random()))  { return data/10}
						else{return data*2}
					}
}

opsuntrust = {
	0: (data, i) => data + Math.floor(Math.random() * (1 + Math.pow(i, data/10))),
	1: (data, i) => data + 0.1 * Math.floor(Math.random() * 1) * Math.floor(Math.random() * (1 + Math.pow(i, data/10))),
	2: (data, i) => data + 0.05,
	3: (data, i) => data + Math.floor(Math.random() * i + i) * Math.pow(i, 1.3),
	4: (data, i) => data + Math.floor(Math.random() * i),
	5: (data, i) => data,
	6: (data, i) => data + i*Math.floor(Math.random()*i),
	
	7: (data, i) => data - data * 0.1 * (3 - i) * Math.floor(Math.random() + 1),
	8: (data, i) => data - Math.floor(data*i + Math.floor(Math.random() * i) - data - 3),
	9: (data, i) => data - Math.floor(Math.random()),
	
	10: (data, i) => {if ( Math.floor(Math.random()))  { return data + 4*i}
						else{return data + 0.4*i}
					},
	11: (data, i) => data, // Event
	12: (data, i) => {if ( Math.floor(Math.random())*Math.floor(Math.random()) ) { return data*2}
		else{return data*1.1}
	}
}


document.getElementById("Biased Collection").addEventListener("click", () =>{op[0]++;token -= cost[0]*op[0];opsound.play();})
document.getElementById("P0 recalculation").addEventListener("click", () =>{op[1]++;token -= cost[1]*op[1];opsound.play()})
document.getElementById("Weighted Average").addEventListener("click", () =>{op[2]++;token -= cost[2]*op[2];opsound.play()})
document.getElementById("Redesign Standards").addEventListener("click", () =>{op[3]++;token -= cost[3]*op[3];opsound.play()})
document.getElementById("Regression").addEventListener("click", () =>{op[4]++;token -= cost[4]*op[4];opsound.play()})
document.getElementById("Interpolation").addEventListener("click", () =>{op[5]++;token -= cost[5]*op[5];opsound.play()})
document.getElementById("Public Attention Redirection").addEventListener("click", () =>{op[6]++;token -= cost[6]*op[6];opsound.play()})
document.getElementById("Online Propaganda").addEventListener("click", () =>{op[7]++;token -= cost[7]*op[7];opsound.play()})
document.getElementById("Authorities").addEventListener("click", () =>{op[8]++;token -= cost[8]*op[8];opsound.play()})
document.getElementById("Speech Regulation").addEventListener("click", () =>{op[9]++;token -=cost[9]*op[0];opsound.play()})
document.getElementById("Arrest").addEventListener("click", () =>{op[10]++;token -=cost[10]*op[10];opsound.play()})
document.getElementById("Internet Shutdown").addEventListener("click", () =>{op[11]++;token -= cost[11]*op[11];opsound.play()})




