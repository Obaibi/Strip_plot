  (function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory(global.Splot = global.Splot || {}); // remplace myLib par le nom de ta librairie
}) (this, function(exports) {
  'use strict';
 
  // Functions to define
	 function stripPlot(obj){
	 

			var title = obj.axis.y.label; 
			var data = obj.data; 
			var height = d3.select(obj.bindto).node().offsetHeight;
			var width = d3.select(obj.bindto).node().offsetWidth;

			d3.select(obj.bindto).style("height","100%").style("width","100%");

			var colors = [];
			var motLePlusLong = "" 
			for(i=0;i<title.length;i++)
			{ 
				colors.push(obj.color[i%obj.color.length]) 
				if(title[i].length > motLePlusLong.length)
				{
					motLePlusLong = title[i]	
				}		
			}

			var translate = motLePlusLong.length * 10;


			title = [""].concat(title); 
			title = title.concat([""]);
			var sizeTitle = title.length;




			var Valeur = [];
			//On va chercher le maximum pour créer une échelle
			for(var i=0; i<data.length;i++){
				for(var j=0; j<data[i].length;j++){
						data[i][j][1] = parseFloat(data[i][j][1]);
						Valeur.push(data[i][j][1]);
				}
			}

			var max = Math.max.apply(Math,Valeur);

			//DEBUT DU CODE

			var graph = d3.select(obj.bindto).append("svg").attr('width',width).attr("height", height)
			//.attr("preserveAspectRatio","xMinYMin meet").attr("viewBox", "0 0 "+ width + " " + height).classed("svg-content", true); 

			var category = graph.selectAll("g").data(d3.entries(data)).enter().append("g");

			category.each(function(d,i){
											var points = d3.select(this).selectAll("circle").data(d3.entries(data)[i].value).enter().append("circle").attr("r",5).attr("fill",colors[i]).attr("cy",(i+1)*((height-height*0.1)/(sizeTitle-1))).attr("cx", function(d){
											return d[1]*width/(max+max*0.1) + translate; }).on("mouseover",
											function (d,id){
															d3.select(this).attr("fill","orange");
															d3.select(this).attr("r",7);
															graph.append("text").attr("x", echelleX(d[1])+10).attr("id","point"+parseInt(d[1])+i).attr("y", d3.select(this).attr("cy")-10).text(d[0]+ ":" + d[1]);})
															.on("mouseout", function(d,id){
																							d3.select(this).attr("fill",colors[i]).attr("r",5);
																							d3.select("#point"+ parseInt(d[1]) + i).remove();
																 																		})
						
											points.each(function(d,i){
																		d3.select(this).attr("cy",parseFloat(d3.select(this).attr("cy"))+Math.random()*30-15);
																	 })
									  })

		//Label General 
		graph.append("text").attr("transform","translate("+width*0.1 +"," + height*0.05 + ")").text(obj.title.label).style("font-size",obj.title.font_size)	;
		//Label Axe x
		graph.append("text").attr("transform","translate(" + width*0.5 + "," + (height-(height*0.1)+50) +")").text(obj.axis.x.label)
		//Label Axe y
		graph.append("text").attr("transform","translate(10,200) rotate(250)").text("");

		var echelleX = d3.scale.linear().domain([0,max+max*0.1]).range([0,width]);
		//Création rangeY
		var rangeY = [];
		for(var i=0;i<sizeTitle;i++){
									if(i==0){
												rangeY.push(50);		
											}
									else    {
												rangeY.push(i*((height-(height*0.1) )/(sizeTitle-1)));			
										    }
								}
								
		var echelleY = d3.scale.ordinal().domain(title).range(rangeY);

		var x_axis = d3.svg.axis().scale(echelleX).orient("bottom");
		var y_axis = d3.svg.axis().scale(echelleY).orient("left");


  
		//Axe x
		var xaxis = graph.append("g").attr('transform', 'translate('+ translate +','+ (height - (height*0.1)) +')').classed('x axis', true).call(x_axis);
		xaxis.select("path").style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'})

		//Axe y gauche
		var yaxis = graph.append("g").attr("transform", "translate("+ translate +", 0)").call(y_axis);
		yaxis.select("path").style({'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'})
		yaxis.selectAll("text").attr('font-size','14px')
	}
  // Ici tu fais les exports
  exports.stripPlot = stripPlot;
 
  Object.defineProperty(exports, '__esModule', { value: true });
});









