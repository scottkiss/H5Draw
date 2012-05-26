(function(){
	if(!window.H5D){ window.H5D = {}}
	/*colors*/
	window.H5D.color = {
		red:"rgb(255,0,0)",
		green:"rgb(0,255,0)",
		blue:"rgb(0,0,255)",
		black:"rgb(0,0,0)"
	},
	
	/*H5D Context Object*/
	window.H5D.context = {
		/*every step for draw*/
		steps:[],
		/*every operation for draw*/
		operations:[],
		/*canvas */
		cvs:{},
		/*canvas context*/
		ctx:{},
		type:{},
		rect:{
			x:{},
			y:{},
			width:{},
			height:{}
		},
		line:{
			x1:{},
			y1:{},
			x2:{},
			y2:{}
		},
		bz2:{
			startX:{},stratY:{},cpX:{},
			cpY:{},endX:{},endY:{}
		},
		bz3:{
			startX:{},stratY:{},cpX:{},cpY:{},
			cp2X:{},cp2Y:{},endX:{},endY:{}
		},
		/*store the sharps*/
		sharps:{
			
		},
		/*fill the sharp*/
		fill:function(color){
			this.steps.push({action:"fill",args:arguments});
			this.operations.push("this.fill(\""+color+"\")");
			this.ctx.fillStyle = color;
			if(this.type==="rect"){
				
				this.ctx.fillRect(this.rect.x,this.rect.y,this.rect.width,this.rect.height);
			}

			if((this.type==="circle")||(this.type==="sector")){
				
				this.ctx.fill();
			}
			return this;
		}, 
		/*stroke the sharp*/
		stroke:function(color,lineWidth){
			this.steps.push({action:"stroke",args:arguments});
			this.operations.push("this.stroke(\""+color+"\","+lineWidth+")");
			this.ctx.strokeStyle = color;
			
			if(this.type==="rect"){
			    this.ctx.lineWidth = 1;
			    this.ctx.lineWidth = lineWidth;
				this.ctx.strokeRect(this.rect.x,this.rect.y,this.rect.width,this.rect.height);
				
			}
			if((this.type==="circle")||(this.type==="sector")){
			    this.ctx.lineWidth = 1;
			    this.ctx.lineWidth = lineWidth;
				this.ctx.stroke();
			}
			
			if(this.type==="line"){
			    this.ctx.lineWidth = 1;
			    this.ctx.lineWidth = lineWidth;
				this.ctx.beginPath();
				this.ctx.moveTo(this.line.x1,this.line.y1);
				this.ctx.lineTo(this.line.x2,this.line.y2);
				this.ctx.closePath();
				this.ctx.stroke();
				
			}
			if(this.type==="bz2"){
			    this.ctx.lineWidth = 1;
			    this.ctx.lineWidth = lineWidth;
				this.ctx.beginPath();
				this.ctx.moveTo(this.bz2.startX,this.bz2.startY);
				this.ctx.quadraticCurveTo(this.bz2.cpX,this.bz2.cpY,
				this.bz2.endX,this.bz2.endY);
				this.ctx.stroke();
				
			}
			if(this.type==="bz3"){
			    this.ctx.lineWidth = 1;
			    this.ctx.lineWidth = lineWidth;
				this.ctx.beginPath();
				this.ctx.moveTo(this.bz3.startX,this.bz3.startY);
				this.ctx.bezierCurveTo(this.bz3.cpX,this.bz3.cpY,
				this.bz3.cp2X,this.bz3.cp2Y,
				this.bz3.endX,this.bz3.endY);
				this.ctx.stroke();
				
			}
			return this;
			
		},
		
	    /*draw a rect*/
		drawRect:function (x,y,width,height){
		    this.steps.push({action:"drawRect",args:arguments});
			this.operations.push("this.drawRect("+x+","+y+","+width+","+height+")");
			this.rect.x = x;
			this.rect.y= y ;
			this.rect.width = width;
			this.rect.height = height;
			this.type = "rect";
			return this;
		},
		/*draw a line*/
		drawLine:function(x1,y1,x2,y2){
			this.steps.push({action:"drawLine",args:arguments});
			this.operations.push("this.drawLine("+x1+","+y1+","+x2+","+y2+")");
			this.line.x1 = x1;
			this.line.y1 = y1;
			this.line.x2 = x2;
			this.line.y2 = y2;
			this.type = "line";
			return this;
		},
		/*draw a circle*/
		drawCircle:function(x,y,radius){
			this.steps.push({action:"drawCircle",args:arguments});
			this.operations.push("this.drawCircle("+x+","+y+","+radius+")");
			this.ctx.beginPath();
			this.ctx.lineWidth = 1;
			this.ctx.arc(arguments[0],arguments[1],arguments[2],0,Math.PI*2,false);
			this.ctx.closePath();
			this.type="circle";
			return this;
		},
		/*draw a Sector*/	
		drawSector:function(x,y,radius,startAngle,endAngle,anticlockwise){
			this.steps.push({action:"drawSector",args:arguments});
			this.operations.push("this.drawSector("+x+","+y+","+radius+","+startAngle+","
			+endAngle+","+anticlockwise+")");
			this.ctx.beginPath();
			this.ctx.moveTo(arguments[0],arguments[1]);
			this.ctx.arc(arguments[0],arguments[1],arguments[2],
			arguments[3],arguments[4],arguments[5]);
			this.ctx.closePath();
			this.type="sector";
			return this;
		
		},
		/*draw a bezier for 2*/
		drawBz2:function(startX,startY,cpX,cpY,endX,endY){
			this.steps.push({action:"drawBz2",args:arguments});
			this.operations.push("this.drawBz2("+startX+","+startY+
			","+cpX+","+cpY+","+endX+","+endY+")");
			this.bz2.startX = startX;
			this.bz2.startY = startY;
			this.bz2.cpX = cpX;
			this.bz2.cpY = cpY;
			this.bz2.endX = endX;
			this.bz2.endY = endY;
			this.type = "bz2";
			return this;
			
		},
		/*draw a bezier for 3*/
		drawBz3:function(startX,startY,cpX,cpY,cp2X,cp2Y,endX,endY){
			this.steps.push({action:"drawBz3",args:arguments});
			this.operations.push("this.drawBz3("+startX+","+startY+
			","+cpX+","+cpY+","+cp2X+","+cp2Y+","+endX+","+endY+")");
			this.bz3.startX = startX;
			this.bz3.startY = startY;
			this.bz3.cpX = cpX;
			this.bz3.cpY = cpY;
			this.bz3.cp2X = cp2X;
			this.bz3.cp2Y = cp2Y;
			this.bz3.endX = endX;
			this.bz3.endY = endY;
			this.type = "bz3";
			return this;
			
		},
		/*clear the canvas*/
		clear:function (x,y,width,height){
			this.operations.push("this.clear("+x+","+y+","+width+","+height+")");
			if(arguments.length==0){
				this.operations.length = 0;    
				this.steps.length = 0;	
				this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height);
			}else if(arguments.length==4){
			
			  this.ctx.clearRect(arguments[0],arguments[1],arguments[2],arguments[3]);
			}
		},
		
		/*translate*/
		translate:function(x,y){
		
			var tempSteps = this.steps.slice(0);
			var prevStep = tempSteps.pop();
			var p_args = prevStep.args;
			if(arguments.length!=3){
				var pprevStep = tempSteps.pop();
			}else{
				pprevStep = prevStep;
			}

			var tempOps = this.operations.slice(0);
			//clear the operation array
			this.operations.length = 0;    
			this.steps.length = 0;		
			if(arguments.length!=3){
				tempOps.pop();
			}
			var args = pprevStep.args;
			this.clear();
			for(var i=0,size=tempOps.length;i<size;i++){
				eval(tempOps[i]);
				
			}
			this.operations.push("this.translate("+x+","+y+","+"\"a\""+")");
			if(prevStep.action === "fill"){
				
				if(pprevStep.action==="drawRect"){
					this.drawRect(args[0]+x,args[1]+y,args[2],args[3]).fill(p_args[0]);
					
				}else if(pprevStep.action==="drawCircle"){
					this.drawCircle(args[0]+x,args[1]+y,args[2]).fill(p_args[0]);
				}
			}else if(prevStep.action === "stroke"){
				if(pprevStep.action==="drawLine"){
					this.drawLine(args[0]+x,args[1]+y,args[2]+x,args[3]+y).stroke(p_args[0],p_args[1]);
				}else if(pprevStep.action==="drawRect"){
					this.drawRect(args[0]+x,args[1]+y,args[2],args[3]).stroke(p_args[0],p_args[1]);
				}else if(pprevStep.action==="drawCircle"){
					this.drawCircle(args[0]+x,args[1]+y,args[2]).stroke(p_args[0],p_args[1]);
				}
			}
			return this;
		}
	};
	
	
	
	
	/*get 2d canvas context by id*/
	function D2(canvasId){
		var canvas = document.getElementById(canvasId);
		var context = canvas.getContext("2d");
		window.H5D.context.ctx = context;
		window.H5D.context.cvs = canvas;
		
		return window.H5D.context;
	}
	window.H5D.D2 = D2;
	
	/*degrees to radians */
	function d2r(degrees){
		return degrees*(Math.PI / 180);
	}
	window.H5D.d2r= d2r;
	
})();