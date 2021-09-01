import React, { Component } from 'react'

export default class Spectrum extends Component {

    initCanvas =()=> {

		// 基础环境
		let element = document.createElement('canvas');
		element.style.position = 'absolute';
		element.style.backgroundColor = '#000';
		element.width = this.width;
		element.height = this.height;
		element.id = 'canvaspinpu' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(element);
		this.canvas = document.getElementById(element.id);
		this.canvas_cxt_base = this.canvas.getContext('2d');

		// 瞬时谱
		let elementValue = document.createElement('canvas');
		elementValue.style.position = 'absolute';
		elementValue.style.backgroundColor = 'translate';
        elementValue.width = this.width ;
        elementValue.height = this.height ;

		elementValue.id = 'canvasValue' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(elementValue);
		this.canvas_value = document.getElementById(elementValue.id);
		this.canvas_cxt_value = this.canvas_value.getContext('2d');

		// 最大值谱
		let elementMaxValue = document.createElement('canvas');
		elementMaxValue.style.position = 'absolute';
		elementMaxValue.style.backgroundColor = 'translate';
		elementMaxValue.style.top = (this.margin_y +50)+ "px";
		elementMaxValue.style.left = this.margin_x + "px";
		elementMaxValue.width = this.width - 2 * this.margin_x;
		elementMaxValue.height = this.height - 2 * this.margin_y;
		elementMaxValue.id = 'canvasMaxValue' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(elementMaxValue);
		this.canvas_maxvalue = document.getElementById(elementMaxValue.id);
		this.canvas_cxt_maxvalue = this.canvas_maxvalue.getContext('2d');

		// 比对谱
		let elementBiduiValue = document.createElement('canvas');
		elementBiduiValue.style.position = 'absolute';
		elementBiduiValue.style.backgroundColor = 'translate';
		elementBiduiValue.style.top = (this.margin_y +50) + "px";
		elementBiduiValue.style.left = this.margin_x + "px";
		elementBiduiValue.width = this.width - 2 * this.margin_x;
		elementBiduiValue.height = this.height - 2 * this.margin_y;
		elementBiduiValue.id = 'canvasBiduiValue' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(elementBiduiValue);
		this.canvas_biduivalue = document.getElementById(elementBiduiValue.id);
		this.canvas_cxt_biduivalue = this.canvas_biduivalue.getContext('2d');
        
		// 最小值谱
		let elementMinValue = document.createElement('canvas');
		elementMinValue.style.position = 'absolute';
		elementMinValue.style.backgroundColor = 'translate';
		elementMinValue.style.top = (this.margin_y +50) + "px";
		elementMinValue.style.left = this.margin_x + "px";
		elementMinValue.width = this.width - 2 * this.margin_x;
		elementMinValue.height = this.height - 2 * this.margin_y;
		elementMinValue.id = 'canvasMinValue' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(elementMinValue);
		this.canvas_minvalue = document.getElementById(elementMinValue.id);
		this.canvas_cxt_minvalue = this.canvas_minvalue.getContext('2d');
        
		// 平均值谱
		let elementAvgValue = document.createElement('canvas');
		elementAvgValue.style.position = 'absolute';
		elementAvgValue.style.backgroundColor = 'translate';
		elementAvgValue.style.top = (this.margin_y +50) + "px";
		elementAvgValue.style.left = this.margin_x + "px";
		elementAvgValue.width = this.width - 2 * this.margin_x;
		elementAvgValue.height = this.height - 2 * this.margin_y;
		elementAvgValue.id = 'canvasAvgValue' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(elementAvgValue);
		this.canvas_avgvalue = document.getElementById(elementAvgValue.id);
		this.canvas_cxt_avgvalue = this.canvas_avgvalue.getContext('2d');

		// x轴
		let elementXLable = document.createElement('canvas');
		elementXLable.style.position = 'absolute';
		elementXLable.width = this.width;
		elementXLable.height = this.height;
		elementXLable.style.backgroundColor = 'translate';
		elementXLable.id = 'canvasXLable' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(elementXLable);
		this.canvax_xLable = document.getElementById(elementXLable.id);
		this.canvas_cxt_xLable = this.canvax_xLable.getContext('2d');

		// y轴
		let elementyLable = document.createElement('canvas');
		elementyLable.style.position = 'absolute';
		elementyLable.style.backgroundColor = 'translate';
		elementyLable.width = this.width;
		elementyLable.height = this.height;
		elementyLable.id = 'canvasYLable' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(elementyLable);
		this.canvas_yLable = document.getElementById(elementyLable.id);
		this.canvas_cxt_yLable = this.canvax_xLable.getContext('2d');

		// 鼠标
		let elementMouse = document.createElement('canvas');
		elementMouse.style.position = 'absolute';
		elementMouse.style.cursor = 'crosshair';
		elementMouse.width = this.width;
		elementMouse.height = this.height;
		elementMouse.id = 'canvasMouse' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(elementMouse);
		this.canvas_mouse = document.getElementById(elementMouse.id);
		this.canvas_cxt_mouse = this.canvas_mouse.getContext('2d');
		this.canvas_cxt_mouse.globalAlpha = 0.6; // 全局透明度
    }
    
	resetCanvas =()=> { // (基础环境)重绘画布大小,用于在数据更新时，清除原有的数据
		if (document.getElementById('canvaspinpu' + this.casvas_mainID) != null) {
			this.canvas.width = this.canvas.width;
			this.canvas.height = this.canvas.height;
		}
		this.drawBase();
    }
    
	resetCanvasValue =()=> { // (瞬时谱)重绘画布大小,用于在数据更新时，清除原有的数据
		if (document.getElementById('canvasValue' + this.casvas_mainID) != null) {
			this.canvas_value.width = this.canvas_value.width;
			this.canvas_value.height = this.canvas_value.height;
			this.canvas_cxt_value.translate(0, this.canvas_value.height);
			this.canvas_cxt_value.scale(1, -1);
		}
	}
	
	resetCanvasMaxValue =()=> {// (最大值谱)重绘画布大小,用于在数据更新时，清除原有的数据
		if (document.getElementById('canvasMaxValue' + this.casvas_mainID) != null) {
			this.canvas_maxvalue.width = this.canvas_maxvalue.width;
			this.canvas_maxvalue.height = this.canvas_maxvalue.height;
			this.canvas_cxt_maxvalue.translate(0, this.canvas_maxvalue.height);
			this.canvas_cxt_maxvalue.scale(1, -1);
		}
	}

	resetCanvasBiduiValue =()=> {// (比对谱)重绘画布大小,用于在数据更新时，清除原有的数据
		if (document.getElementById('canvasBiduiValue' + this.casvas_mainID) != null) {
			this.canvas_biduivalue.width = this.canvas_biduivalue.width;
			this.canvas_biduivalue.height = this.canvas_biduivalue.height;
			this.canvas_cxt_biduivalue.translate(0, this.canvas_biduivalue.height);
			this.canvas_cxt_biduivalue.scale(1, -1);
		}
	}
	
	resetCanvasMinValue =()=> {// (最小值谱)重绘画布大小,用于在数据更新时，清除原有的数据
		if (document.getElementById('canvasMinValue' + this.casvas_mainID) != null) {
			this.canvas_minvalue.width = this.canvas_minvalue.width;
			this.canvas_minvalue.height = this.canvas_minvalue.height;
			this.canvas_cxt_minvalue.translate(0, this.canvas_minvalue.height);
			this.canvas_cxt_minvalue.scale(1, -1);
		}
	}
	
	resetCanvasAvgValue =()=> {// (平均值谱) 重绘画布大小,用于在数据更新时，清除原有的数据
		if (document.getElementById('canvasAvgValue' + this.casvas_mainID) != null) {
			this.canvas_avgvalue.width = this.canvas_avgvalue.width;
			this.canvas_avgvalue.height = this.canvas_avgvalue.height;
			this.canvas_cxt_avgvalue.translate(0, this.canvas_avgvalue.height);
			this.canvas_cxt_avgvalue.scale(1, -1);
		}
	}
   
    resetX =()=> { // 清理游标所在的X轴
        this.canvax_xLable.width = this.canvax_xLable.width;
        this.canvax_xLable.height = this.canvax_xLable.height;
        this.drawYLable();
        this.drawXLable();
    }
	
	resetCurse =()=> {// 清理游标所在的X轴
		this.canvax_xLable.width = this.canvax_xLable.width;
		this.canvax_xLable.height = this.canvax_xLable.height;
		this.drawXLable();
		this.drawYLable();
	}
	
	removeOldCanvas =()=> {// 删除上一次的旧画布
		if (document.getElementById('canvaspinpu' + this.canvas_old_mainID) != null) {
            
			document.getElementById(this.contentname).removeChild(
					document.getElementById('canvaspinpu' + this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(
					document.getElementById('canvasXLable'
							+ this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(
					document.getElementById('canvasYLable'
							+ this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(
					document.getElementById('canvasMouse'
							+ this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(
					document.getElementById('canvasValue'
							+ this.canvas_old_mainID));
		}
    }
    
    drawBase =()=> {// 绘制画布基础内容，包括x轴，y轴，网格线
        
		// 转换原点坐标 数据画布
		this.canvas_cxt_base.translate(0, this.canvas.height);
		this.canvas_cxt_base.scale(1, -1);

		// 转换原点坐标 鼠标画布
		this.canvas_cxt_mouse.translate(0, this.canvas_cxt_mouse.height);
		this.canvas_cxt_mouse.scale(1, -1);

		// 画坐标轴
		this.canvas_cxt_base.strokeStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_base.lineWidth = 2;

		// 绘制x轴 xia 20200213  显示线上的
		this.canvas_cxt_base.moveTo(this.margin_x-3, this.margin_y);
		this.canvas_cxt_base.lineTo(this.width - this.margin_x+3, this.margin_y);
		this.canvas_cxt_base.stroke();

        // 绘制y轴you
		this.canvas_cxt_base.moveTo(this.width - this.margin_x+3, this.margin_y);
		this.canvas_cxt_base.lineTo(this.width - this.margin_x+3, this.height - this.margin_y);
        this.canvas_cxt_base.stroke();
		// 绘制y轴zuo
		this.canvas_cxt_base.moveTo(this.margin_x-3, this.margin_y);
		this.canvas_cxt_base.lineTo(this.margin_x-3, this.height - this.margin_y);
		this.canvas_cxt_base.stroke();

        // 绘制x轴 shang
		this.canvas_cxt_base.moveTo(this.margin_x-3, this.height - this.margin_y);
		this.canvas_cxt_base.lineTo(this.width - this.margin_x+3, this.height - this.margin_y);
		this.canvas_cxt_base.stroke();

		// 绘制网格线
		this.canvas_cxt_base.fillStyle = "#ffffff";
		this.canvas_cxt_base.lineWidth = 1;
		let xtemp = (this.width - 2 * this.margin_x) / 10;
		for ( let i = 0; i <= 10; i++) {
			this.canvas_cxt_base.fillRect(this.margin_x + i * xtemp,
					this.margin_y, 0.5, this.height - 2 * this.margin_y);
		}

		let ytemp = (this.height - 2 * this.margin_y) / 10;
		for ( let i = 0; i < 10; i++) {
			this.canvas_cxt_base.fillRect(this.margin_x, this.margin_y
					+ (i + 1) * ytemp, this.width - 2 * this.margin_x, 0.5);
		}
		this.canvas_cxt_base.stroke();
	}
	
	drawXLable =()=> {// 绘制x轴标识 刻度，默认初始化时设置的起始终止频率值
		this.canvas_cxt_xLable.beginPath();
		this.canvas_cxt_xLable.fillStyle = "rgba(255,47,47,1)";
		this.canvas_cxt_xLable.font = "13px normal";
		this.canvas_cxt_xLable.fillText(this.xunit, this.width - this.margin_y- 30, this.height - this.margin_y + 30);
		this.canvas_cxt_xLable.strokeStyle = "#ffffff";
		this.canvas_cxt_xLable.lineWidth = 2;
        this.canvas_cxt_yLable.stroke();
        this.canvas_cxt_xLable.font = "13px Arial";
		this.canvas_cxt_xLable.fillStyle = "#ffffff";
		let xpervalue = (this.width - 2 * this.margin_x)/ (this.x_max - this.x_min);
		let xperfrq = (this.x_max - this.x_min) / this.xcount;
		this.canvas_cxt_xLable.textAlign = 'center';
		this.canvas_cxt_xLable.textBaseline = 'middle';
		for ( let i = 0; i < this.xcount + 1; i++) {
			let frqtemp = this.x_min + i * xperfrq;
			this.canvas_cxt_xLable.fillText(
                Math.round(frqtemp * 10000) / 10000, this.margin_x
                    + (frqtemp - this.x_min) * xpervalue, this.height
                     - this.margin_y + 15);
			if (i <= this.xcount) {
				this.canvas_cxt_xLable.fillRect(this.margin_x
                    + (frqtemp - this.x_min) * xpervalue, this.height
                    - this.margin_y, 2, 6);
			}
		}
		this.canvas_cxt_xLable.stroke();
    }
    
    drawYLable =()=> {// 绘制y轴标识 刻度
		this.canvas_cxt_yLable.beginPath();
        this.canvas_up_x = this.margin_x-40;// x轴 幅度上箭头
        this.canvas_up_y = this.margin_y ;// y轴 幅度上箭头
        this.canvas_down_x = this.margin_x-40;// x轴 幅度上箭头
        this.canvas_down_y = this.height - this.margin_y;// y轴 幅度上箭头
        this.canvas_cxt_yLable.fillText("▲", this.canvas_up_x, this.canvas_up_y );
        this.canvas_cxt_yLable.fillText("▼", this.canvas_down_x,  this.canvas_down_y);
        this.canvas_cxt_yLable.fillStyle = "rgba(255,255,47,1)";
        this.canvas_cxt_yLable.font = "30px KaiTi";
        this.canvas_cxt_yLable.fillText("+", this.canvas_up_x, this.canvas_up_y+50 );
        this.canvas_cxt_yLable.fillText("-", this.canvas_down_x,  this.canvas_down_y-50);
        this.canvas_cxt_yLable.fillStyle = "rgba(255,255,47,1)";
        this.canvas_cxt_yLable.font = "13px normal";
        this.canvas_cxt_yLable.strokeStyle = "#ff00ff";
        this.canvas_cxt_yLable.lineWidth = 15;
        this.canvas_cxt_yLable.stroke();
		this.canvas_cxt_yLable.fillText(this.yunit, this.margin_x - 30,	this.margin_y - 10);
		this.canvas_cxt_yLable.strokeStyle = "#ffffff";
		this.canvas_cxt_yLable.lineWidth = 2;
		this.canvas_cxt_yLable.stroke();
		this.canvas_cxt_yLable.fillStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_xLable.font = "14px Arial";
		let ypervalue = (this.height - 2 * this.margin_y)/ (this.y_max - this.y_min);
		let xperamp = (this.y_max - this.y_min) / this.ycount;
		this.canvas_cxt_yLable.textAlign = 'right';
		this.canvas_cxt_yLable.textBaseline = 'middle';
		for ( let i = 0; i < this.ycount + 1; i++) {
			let rangetemp = this.y_min + i * xperamp;
			this.canvas_cxt_yLable.fillText(Math.round(rangetemp * 10) / 10,
            this.margin_x - 6, this.height - this.margin_y
                    - (rangetemp - this.y_min) * ypervalue);
			this.canvas_cxt_yLable.fillRect(this.margin_x - 6, this.height
					- this.margin_y - (rangetemp - this.y_min) * ypervalue, 6,2);
		}
		this.canvas_cxt_yLable.stroke();
		if(this.name){
			this.canvas_cxt_yLable.fillText(this.name, this.margin_x + (this.name.length*9),
				15);
			this.canvas_cxt_yLable.fillStyle = "rgba(255,255,255,1)";
			this.canvas_cxt_yLable.font = "20px KaiTi";
		}
	}

    drawPinpuData =(data)=> { // 绘制频谱数据
        this.resetCanvasValue();
        this.canvas_cxt_value.stroke();
        this.canvas_cxt_value.beginPath();
        this.canvas_cxt_value.strokeStyle =  "rgba(0,255,0,1)";
        for ( let i = 0; i < data[0].length; i++) {
            let x = this.freqToPoint(data[0][i]);
            let y = this.rangeToPoint(data[1][i]);
            if (data[0][i] >= this.x_min && data[0][i] <= this.x_max) {// 如果频率在x轴的坐标范围内
                this.canvas_cxt_value.lineTo(x+this.margin_x, y+this.margin_y);
            }
        }
       this.canvas_cxt_value.stroke();

    }
	
	drawPinpuDataMax =(data)=> {// 绘制最大值谱数据
		this.resetCanvasMaxValue();
		this.canvas_cxt_maxvalue.stroke();
		this.canvas_cxt_maxvalue.beginPath();
		this.canvas_cxt_maxvalue.strokeStyle = "rgba(255,47,47,1)";
        for ( let i = 0; i < data[0].length; i++) {
            let x = this.freqToPoint(data[0][i]);
            let y = this.rangeToPoint(data[1][i]);
            if (data[0][i] >= this.x_min && data[0][i] <= this.x_max) {// 如果频率在x轴的坐标范围内
                this.canvas_cxt_maxvalue.lineTo(x+this.margin_x, y+this.margin_y);
            }
        }
		this.canvas_cxt_maxvalue.stroke();
    }
    
	drawPinpuBidui =(data)=> {// 绘制比对值谱数据
		this.resetCanvasBiduiValue();
		this.canvas_cxt_biduivalue.stroke();
		this.canvas_cxt_biduivalue.beginPath();
		this.canvas_cxt_biduivalue.strokeStyle = "rgba(128,0,255,1)";
        for ( let i = 0; i < data[0].length; i++) {
            let x = this.freqToPoint(data[0][i]);
            let y = this.rangeToPoint(data[1][i]);
            if (data[0][i] >= this.x_min && data[0][i] <= this.x_max) {// 如果频率在x轴的坐标范围内
                this.canvas_cxt_biduivalue.lineTo(x+this.margin_x, y+this.margin_y);
            }
        }
		this.canvas_cxt_biduivalue.stroke();
	}
	
	drawPinpuDataMin =(data)=> {// 绘制最小值谱数据
		this.resetCanvasMinValue();
		this.canvas_cxt_minvalue.stroke();
		this.canvas_cxt_minvalue.beginPath();
		this.canvas_cxt_minvalue.strokeStyle = "rgba(255,128,255,1)";
		this.canvas_cxt_minvalue.moveTo(this.margin_x, this.rangeToPoint(data[1][0]));
		this.canvas_cxt_minvalue.moveTo(0, this.margin_y);
        for ( let i = 0; i < data[0].length; i++) {
            let x = this.freqToPoint(data[0][i]);
            let y = this.rangeToPoint(data[1][i]);
            if (data[0][i] >= this.x_min && data[0][i] <= this.x_max) {// 如果频率在x轴的坐标范围内
                this.canvas_cxt_minvalue.lineTo(x+this.margin_x, y+this.margin_y);
            }
        }
		this.canvas_cxt_minvalue.stroke();
	}
	
	drawPinpuDataAvg =(data)=> {// 绘制平均值谱数据
		this.resetCanvasAvgValue();
		this.canvas_cxt_avgvalue.stroke();
		this.canvas_cxt_avgvalue.beginPath();
		this.canvas_cxt_avgvalue.strokeStyle = "rgba(0,128,255,0.7)";
		this.canvas_cxt_avgvalue.moveTo(this.margin_x, this.rangeToPoint(data[1][0]));
		this.canvas_cxt_avgvalue.moveTo(0, this.margin_y);
		for ( let i = 0; i < data[0].length; i++) {
			let x = this.freqToPoint(data[0][i]);
			let y = this.rangeToPoint(data[1][i]);
			if (data[0][i] >= this.x_min && data[0][i] <= this.x_max) {// 如果频率在x轴的坐标范围内
				this.canvas_cxt_avgvalue.lineTo(x + 0.5, y);
			}
    
		}
		this.canvas_cxt_avgvalue.stroke();
	}
	
	drawDashedLine =(context, x1, y1, x2, y2, dashlength)=> {// 绘制虚线
		context.beginPath();
		context.lineWidth = 2;
		context.strokeStyle = 'rgba(180,164,253,1)';
		dashlength = dashlength === undefined ? 3 : dashlength;
		let deltaX = x2 - x1;
		let deltaY = y2 - y1;
		let numDashed = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashlength);
		for ( let i = 0; i < numDashed; i++) {
			if (i % 2 == 0) {
				context.moveTo(x1 + (deltaX / numDashed) * i, y1+ (deltaY / numDashed) * i);
			} else {
				context.lineTo(x1 + (deltaX / numDashed) * i, y1+ (deltaY / numDashed) * i);
			}
		}
		context.closePath();
		context.stroke();
    }

	initMouseEvent =(obj)=> {// 初始化鼠标事件
		obj.canvas_mouse.addEventListener('mousedown', onMouseDown, false);
		obj.canvas_mouse.addEventListener('mouseup', onMouseup, false);
        obj.canvas_mouse.addEventListener('click', onMouseClick, false);
        obj.canvas_mouse.addEventListener('mousemove', onMouseCursorMove, false);
	 	obj.canvas_mouse.addEventListener('contextmenu', onContextmenu, false);
		obj.canvas.focus();

		function onMouseDown(e) {// 鼠标按下事件
			if (e.button == 1 || e.button == 2) {// 屏蔽鼠标右键按钮
				return;
			}
			// 获取鼠标在Canvas对象上坐标
			var x = e.clientX;
			var y = e.clientY;
			e.preventDefault();
			// 执行一次清空操作，擦除旧图形
			if (document.getElementById('canvasMouse' + obj.casvas_mainID) != null) {
				obj.canvas_mouse.width = obj.canvas_mouse.width;
				obj.canvas_mouse.height = obj.canvas_mouse.height;
				obj.canvas_mouse.removeEventListener('mousemove', onMouseMove,false);
			}
			var bbox = obj.canvas_mouse.getBoundingClientRect();
			var loc = {
				x : x - bbox.left * (obj.canvas_mouse.width / bbox.width),
				y : y - bbox.top * (obj.canvas_mouse.height / bbox.height)
			};
			var heightmin = obj.margin_y;
			var heightmax = obj.canvas_mouse.height - obj.margin_y;
			var widthmin = obj.margin_x;
			var widthmax = obj.canvas_mouse.width - obj.margin_x;

			if (loc.x >= widthmin && loc.x <= widthmax && loc.y >= heightmin
					&& loc.y <= heightmax) {
				if (obj.mouse_command == 7)// 获取X轴位置数据
				{
					obj.xrangePointX1 = loc.x;
					obj.drawDashedLine(obj.canvas_cxt_mouse, loc.x,
							obj.margin_y, loc.x, obj.canvas_mouse.height
									- obj.margin_y);
					obj.canvas_cxt_mouse.stroke();
					obj.canvas_mouse.addEventListener('mousemove', onMouseMove,
							false);
				} else {
					obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";
					obj.canvas_cxt_mouse.font = "13px normal";
					var lable = '频率：'
					+ Math.round(obj.pointToFreq(loc.x) * 1000)
					/ 1000 +" MHz "+ ' 幅度：'
					+ Math.round(obj.pointToRange(loc.y) * 10) / 10+" dBm";
					var tempxloc;
					var tempyloc;
					if ((obj.width - obj.margin_x) - loc.x <= 160) {
						tempxloc = loc.x - 165;
					} else {
						tempxloc = loc.x + 5;
					}
					if (loc.y - obj.margin_y <= 30) {
						tempyloc = loc.y + 10;
					} else {
						tempyloc = loc.y - 10;
					}
					obj.canvas_cxt_mouse.fillText(lable, tempxloc, tempyloc);
					obj.canvas_cxt_mouse.stroke();
					if (obj.mouse_command == 1)// 网格标绘功能
					{
						if (loc.x >= widthmin && loc.x <= widthmax
								&& loc.y >= heightmin && loc.y <= heightmax) {
							obj.drawDashedLine(obj.canvas_cxt_mouse, loc.x,
									obj.margin_y, loc.x,
									obj.canvas_mouse.height - obj.margin_y);
							obj.drawDashedLine(obj.canvas_cxt_mouse,
									obj.margin_x, loc.y, obj.canvas_mouse.width
											- obj.margin_x, loc.y);
						}
						obj.canvas_cxt_mouse.stroke();
					} else if (obj.mouse_command == 2)// 游标一 框选功能
					{
						obj.FirstPointx1 = loc.x;
						obj.FirstPointy1 = loc.y;
					} else if (obj.mouse_command == 3)// 游标二 框选功能
					{
						obj.LasterPointx1 = loc.x;
						obj.LasterPointy1 = loc.y;
					} else if (obj.mouse_command == 4) {// 缩放功能

						obj.drawDashedLine(obj.canvas_cxt_mouse, loc.x,
							obj.margin_y, loc.x,
							obj.canvas_mouse.height - obj.margin_y);
						obj.drawDashedLine(obj.canvas_cxt_mouse,
							obj.margin_x, loc.y, obj.canvas_mouse.width
							- obj.margin_x, loc.y);
						obj.canvas_cxt_mouse.stroke();
						obj.suofangPointx1 = loc.x;
						obj.suofangPointy1 = loc.y;
					} else if (obj.mouse_command == 5)// 框选数据
					{
						obj.kuangxuanDataPointx1 = loc.x;
						obj.kuangxuanDataPointy1 = loc.y;
					} else if (obj.mouse_command == 6)// 回调函数
					{
						obj.huidiaoPointx1 = loc.x;
						obj.huidiaoPointy1 = loc.y;
					}
					obj.canvas_mouse.addEventListener('mousemove', onMouseMove,
							false);
				}
			}
		}
		
		function onMouseup(e) {// 鼠标释放事件
			// 屏蔽鼠标右键按钮
			if (e.button == 1 || e.button == 2) {
				return;
			}
			e.preventDefault();
			if (obj.mouse_command == 2)// 游标一 框选功能
			{
				obj.curse_frqmin = obj.FirstPointx1 <= obj.FirstPointx2 ? obj.pointToFreq(obj.FirstPointx1) : obj.pointToFreq(obj.FirstPointx2);
				obj.curse_frqmax = obj.FirstPointx1 >= obj.FirstPointx2 ? obj.pointToFreq(obj.FirstPointx1) : obj.pointToFreq(obj.FirstPointx2);
			} else if (obj.mouse_command == 3)// 游标二 框选功能
			{
				obj.curse2_frqmin = obj.LasterPointx1 <= obj.LasterPointx2 ? obj.pointToFreq(obj.LasterPointx1) : obj.pointToFreq(obj.LasterPointx2);
				obj.curse2_frqmax = obj.LasterPPointx1 >= obj.LasterPointx2 ? obj.pointToFreq(obj.LasterPointx1): obj.pointToFreq(obj.LasterPointx2);
			} else if (obj.mouse_command == 4)// 缩放功能
			{
				if (obj.suofangPointx1 != 0 && obj.suofangPointy1 != 0 && obj.suofangPointx2 != 0 && obj.suofangPointy2 != 0) {
					obj.suofang_frqmin = obj.suofangPointx1 <= obj.suofangPointx2 ? obj.pointToFreq(obj.suofangPointx1) : obj.pointToFreq(obj.suofangPointx2);
					obj.suofang_frqmax = obj.LasterPPointx1 >= obj.suofangPointx2 ? obj.pointToFreq(obj.suofangPointx1) : obj.pointToFreq(obj.suofangPointx2);
					if (obj.suofangPointx2 - obj.suofangPointx1 >= 0) {// 如果终止点的横坐标大于起始点的横坐标，进行缩放功能
						if (obj.suofangPointx2 - obj.suofangPointx1 >= 10)// 当大于10像素时，进行缩放，避免误操作
						{
							obj.x_min = obj.suofang_frqmin;
							obj.x_max = obj.suofang_frqmax;
							obj.resetCurse();
							var now=Date.now();
							var strnow=now.toString();
							if (obj.old_data != null)
								obj.SetValue(obj.old_data);
							if (obj.old_MaxData != null)
								obj.SetMaxValue(obj.old_MaxData);
							if (obj.old_MinData != null)
								obj.SetMinValue(obj.old_MinData);
							if (obj.old_AvgData != null)
								obj.SetAvgValue(obj.old_AvgData);
							if (obj.old_BiduiData != null)
								obj.SetBiduiValue(obj.old_BiduiData);
						}
					} else {// 如果终止点的横坐标小于起始点的横坐标，还原到最开始初始化时的频率访问
						if (obj.suofangPointx1 - obj.suofangPointx2 >= 10)// 当大于10像素时，进行缩放，避免误操作
						{
							obj.x_min = obj.x_old_min;
							obj.x_max = obj.x_old_max;
							obj.resetCurse();
							var now=Date.now();
							var strnow=now.toString();
							if (obj.old_data != null)
								obj.SetValue(obj.old_data);
							if (obj.old_MaxData != null)
								obj.SetMaxValue(obj.old_MaxData);
							if (obj.old_MinData != null)
								obj.SetMinValue(obj.old_MinData);
							if (obj.old_AvgData != null)
								obj.SetAvgValue(obj.old_AvgData);
							if (obj.old_BiduiData != null)
								obj.SetBiduiValue(obj.old_BiduiData);
						}
					}
					obj.suofangPointx1 = 0;
					obj.suofangPointy1 = 0;
					obj.suofangPointx2 = 0;
					obj.suofangPointy2 = 0;
				}
			} else if (obj.mouse_command == 5)// 框选数据
			{
				obj.kuangxuanData_frqmin = obj.kuangxuanDataPointx1 <= obj.kuangxuanDataPointx2 ? obj
						.pointToFreq(obj.kuangxuanDataPointx1)
						: obj.pointToFreq(obj.kuangxuanDataPointx2);
				obj.kuangxuanData_frqmax = obj.LasterPPointx1 >= obj.kuangxuanDataPointx2 ? obj
						.pointToFreq(obj.kuangxuanDataPointx1)
						: obj.pointToFreq(obj.kuangxuanDataPointx2);
				var minfrqtemp = obj.kuangxuanData_frqmin >= obj.kuangxuanData_frqmax ? obj.kuangxuanData_frqmax
						: obj.kuangxuanData_frqmin;
				var maxfrqtemp = obj.kuangxuanData_frqmax >= obj.kuangxuanData_frqmin ? obj.kuangxuanData_frqmax
						: obj.kuangxuanData_frqmin;

				var tempdata = obj.old_data;
				if (tempdata != null) {
					var count = 0;
					for ( var i = 0; i < tempdata[0].length; i++) {
						if (tempdata[0][i] >= minfrqtemp
								&& tempdata[0][i] <= maxfrqtemp) {
							count++;
						}
					}
					var datatemp = new Array(2);
					for ( var i = 0; i < datatemp.length; i++) {
						datatemp[i] = new Array(count);
					}
					var ktemp = 0;
					for ( var i = 0; i < tempdata[0].length; i++) {
						if (tempdata[0][i] >= minfrqtemp
								&& tempdata[0][i] <= maxfrqtemp) {
							var f = tempdata[0][i];
							var r = tempdata[1][i];
							datatemp[0][ktemp] = f;
							datatemp[1][ktemp] = r;
							ktemp++;
						}
					}
					obj.new_kuangxuandata = datatemp;
				}
			} else if (obj.mouse_command == 6)// 回调函数
			{
				obj.huidiao_frqmin = obj.huidiaoPointx1 <= obj.huidiaoPointx2 ? obj
						.pointToFreq(obj.huidiaoPointx1)
						: obj.pointToFreq(obj.huidiaoPointx2);
				obj.huidiao_frqmax = obj.LasterPPointx1 >= obj.huidiaoPointx2 ? obj
						.pointToFreq(obj.huidiaoPointx1)
						: obj.pointToFreq(obj.huidiaoPointx2);
				var minfrqtemp = obj.huidiao_frqmin >= obj.huidiao_frqmax ? obj.huidiao_frqmax
						: obj.huidiao_frqmin;
				var maxfrqtemp = obj.huidiao_frqmax >= obj.huidiao_frqmin ? obj.huidiao_frqmax
						: obj.huidiao_frqmin;
				if (obj.callbackmethod != null) {
					obj.callbackmethod(obj, minfrqtemp, maxfrqtemp);
				}
			} else if (obj.mouse_command == 7)// 获取X轴位置数据
			{
				var xrange = (obj.xrangePointX1 - obj.margin_x)
						/ (obj.width - 2 * obj.margin_x);
				if (obj.callbackGetXRange != null) {
					obj.callbackGetXRange(obj, xrange);
				}
			}
			if (document.getElementById('canvasMouse' + obj.casvas_mainID) != null) {
				obj.canvas_mouse.width = obj.canvas_mouse.width;
				obj.canvas_mouse.height = obj.canvas_mouse.height;
				obj.canvas_mouse.removeEventListener('mousemove', onMouseMove,
						false);
			}
		}

		function onMouseClick(e) {// 鼠标按下事件
			// 获取鼠标在Canvas对象上坐标
			var x = e.clientX;
			var y = e.clientY;
			e.preventDefault();
			if (document.getElementById('canvasMouse' + obj.casvas_mainID) != null) {
				obj.canvas_mouse.width = obj.canvas_mouse.width;
				obj.canvas_mouse.height = obj.canvas_mouse.height;
				var bbox = obj.canvas_mouse.getBoundingClientRect();
				var canvas_up_x_begin=bbox.left+obj.canvas_up_x-10;//- obj.margin_x;// x轴 幅度上箭头
				var canvas_up_y_begin=bbox.top+obj.canvas_up_y-10 ;//- obj.margin_y;// y轴 幅度上箭头
				var canvas_down_x_begin=bbox.left+obj.canvas_down_x-10;//- obj.margin_x;// x轴 幅度上箭头
				var canvas_down_y_begin=bbox.top+obj.canvas_down_y-10;//- obj.margin_y ;// y轴 幅度上箭头
				var canvas_up_x_end=canvas_up_x_begin+20;// x轴 幅度上箭头
				var canvas_up_y_end=canvas_up_y_begin +20;// y轴 幅度上箭头
				var canvas_down_x_end=canvas_down_x_begin+20;// x轴 幅度上箭头
				var canvas_down_y_end=canvas_down_y_begin +20;// y轴 幅度上箭头
			}

			if(x>=canvas_up_x_begin&&
				x<=canvas_up_x_end&&
				y>=(canvas_up_y_begin+50)&&
				y<=(canvas_up_y_end+50)
			)
			{obj.canvas_mouse.style.cursor = 'pointer';
				var amp=Math.abs( obj.y_max-  obj.y_min);
				if(amp>50) {
					obj.y_max = obj.y_max - 5;
					obj.y_min = obj.y_min + 5;
				}
				obj.setAmplitude( obj.y_min, obj.y_max);
			}
			if(x>=canvas_down_x_begin&&
				x<=canvas_down_x_end&&
				y>=(canvas_down_y_begin-50)&&
				y<=(canvas_down_y_end-50)
			)
			{ obj.canvas_mouse.style.cursor = 'pointer';
				var amp=Math.abs( obj.y_max-  obj.y_min);
				if(amp<150)
				{
					obj.y_max=  obj.y_max+5;
					obj.y_min= obj.y_min-5;
				}
				obj.setAmplitude(obj.y_min, obj.y_max);
			}
			if(x>=canvas_up_x_begin&&
			x<=canvas_up_x_end&&
				y>=canvas_up_y_begin&&
				y<=canvas_up_y_end
			)
			{obj.canvas_mouse.style.cursor = 'pointer';
				if( obj.y_max<25 ) {
					obj.y_max = obj.y_max + 10;
					obj.y_min = obj.y_min + 10;
				}
				obj.setAmplitude( obj.y_min, obj.y_max);
			}
			if(x>=canvas_down_x_begin&&
				x<=canvas_down_x_end&&
				y>=canvas_down_y_begin&&
				y<=canvas_down_y_end
			)
			{ obj.canvas_mouse.style.cursor = 'pointer';
				if(obj.y_min>-150 )
				{
					obj.y_max=  obj.y_max-10;
					obj.y_min= obj.y_min-10;

				}
				obj.setAmplitude(obj.y_min, obj.y_max);
			}

			obj.canvas_mouse.style.cursor = 'crosshair';
		}

		function onMouseCursorMove(e) {// 获取鼠标在Canvas对象上坐标
            var x = e.clientX;
            var y = e.clientY;
            e.preventDefault();
            if (document.getElementById('canvasMouse' + obj.casvas_mainID) != null) {
                obj.canvas_mouse.width = obj.canvas_mouse.width;
                obj.canvas_mouse.height = obj.canvas_mouse.height;
                var bbox = obj.canvas_mouse.getBoundingClientRect();
                var canvas_up_x_begin=bbox.left+obj.canvas_up_x-10;//- obj.margin_x;// x轴 幅度上箭头
                var canvas_up_y_begin=bbox.top+obj.canvas_up_y-10 ;//- obj.margin_y;// y轴 幅度上箭头
                var canvas_down_x_begin=bbox.left+obj.canvas_down_x-10;//- obj.margin_x;// x轴 幅度上箭头
                var canvas_down_y_begin=bbox.top+obj.canvas_down_y-10;//- obj.margin_y ;// y轴 幅度上箭头
                var canvas_up_x_end=canvas_up_x_begin+20;// x轴 幅度上箭头
                var canvas_up_y_end=canvas_up_y_begin +20;// y轴 幅度上箭头
                var canvas_down_x_end=canvas_down_x_begin+20;// x轴 幅度上箭头
                var canvas_down_y_end=canvas_down_y_begin +20;// y轴 幅度上箭头
            }
            if(x>=canvas_up_x_begin&&
                x<=canvas_up_x_end&&
                y>=(canvas_up_y_begin+60)&&
                y<=(canvas_up_y_end+60)
            )
            {obj.canvas_mouse.style.cursor = 'pointer';
            }
            if(x>=canvas_down_x_begin&&
                x<=canvas_down_x_end&&
                y>=(canvas_down_y_begin-50)&&
                y<=(canvas_down_y_end-50)
            )
            { obj.canvas_mouse.style.cursor = 'pointer';
            }
            if(x>=canvas_up_x_begin&&
                x<=canvas_up_x_end&&
                y>=canvas_up_y_begin&&
                y<=canvas_up_y_end
            )
            {obj.canvas_mouse.style.cursor = 'pointer';
            }
            if(x>=canvas_down_x_begin&&
                x<=canvas_down_x_end&&
                y>=canvas_down_y_begin&&
                y<=canvas_down_y_end
            )
            { obj.canvas_mouse.style.cursor = 'pointer'}
		}
		
		function onContextmenu(e) {// 获取鼠标在Canvas对象上坐标
			var x = e.clientX;
			var y = e.clientY;
			e.preventDefault();
			// 执行一次清空操作，擦除旧图形
			if (document.getElementById('canvasMouse' + obj.casvas_mainID) != null) {
				obj.canvas_mouse.width = obj.canvas_mouse.width;
				obj.canvas_mouse.height = obj.canvas_mouse.height;
				obj.canvas_mouse.removeEventListener('mousemove', onMouseMove,
					false);
			}
			var bbox = obj.canvas_mouse.getBoundingClientRect();
			var loc = {
				x : x - bbox.left * (obj.canvas_mouse.width / bbox.width),
				y : y - bbox.top * (obj.canvas_mouse.height / bbox.height)
			};
			var pd=Math.round(obj.pointToFreq(loc.x)*1000 )/1000
			var lable =' 频率：' + pd+"MHz "      ;
			localStorage.setItem('decode-pd',pd)
		}

		function onMouseMove(e) {// 鼠标移动事件
			// 屏蔽鼠标右键按钮
			if (e.button == 1 || e.button == 2) {
				return;
			}
			// 获取鼠标在Canvas对象上坐标
			var x = e.clientX;
			var y = e.clientY;
			e.preventDefault();
			// 执行一次清空操作，擦除旧图形
			if (document.getElementById('canvasMouse' + obj.casvas_mainID) != null) {
				obj.canvas_mouse.width = obj.canvas_mouse.width;
				obj.canvas_mouse.height = obj.canvas_mouse.height;
			}
			var bbox = obj.canvas_mouse.getBoundingClientRect();
			var loc = {
				x : x - bbox.left * (obj.canvas_mouse.width / bbox.width),
				y : y - bbox.top * (obj.canvas_mouse.height / bbox.height)
			};
			var heightmin = obj.margin_y;
			var heightmax = obj.canvas_mouse.height - obj.margin_y;
			var widthmin = obj.margin_x;
			var widthmax = obj.canvas_mouse.width - obj.margin_x;

			if (loc.x >= widthmin && loc.x <= widthmax && loc.y >= heightmin
					&& loc.y <= heightmax) {
				if (obj.mouse_command == 7)// 获取X轴位置数据
				{
					obj.xrangePointX1 = loc.x;
					obj.drawDashedLine(obj.canvas_cxt_mouse, loc.x,
							obj.margin_y, loc.x, obj.canvas_mouse.height
									- obj.margin_y);
					obj.canvas_cxt_mouse.stroke();
				} else {
					obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";
					obj.canvas_cxt_mouse.font = "13px normal";
					var lable = '频率：'
							+ Math.round(obj.pointToFreq(loc.x) * 1000)
							/ 1000 +" MHz "
						+ ' 幅度：'
							+ Math.round(obj.pointToRange(loc.y) * 10) / 10+" dBm";
					var tempxloc;
					var tempyloc;
					if ((obj.width - obj.margin_x) - loc.x <= 160) {
						tempxloc = loc.x - 165;
					} else {
						tempxloc = loc.x + 5;
					}
					if (loc.y - obj.margin_y <= 30) {
						tempyloc = loc.y + 15;
					} else {
						tempyloc = loc.y - 10;
					}
					obj.canvas_cxt_mouse.fillText(lable, tempxloc, tempyloc);
					obj.canvas_cxt_mouse.stroke();

					if (obj.mouse_command == 1)// 网格标绘功能
					{
						if (loc.x >= widthmin && loc.x <= widthmax
								&& loc.y >= heightmin && loc.y <= heightmax) {
							obj.drawDashedLine(obj.canvas_cxt_mouse, loc.x,
									obj.margin_y, loc.x,
									obj.canvas_mouse.height - obj.margin_y);
							obj.drawDashedLine(obj.canvas_cxt_mouse,
									obj.margin_x, loc.y, obj.canvas_mouse.width
											- obj.margin_x, loc.y);

							obj.canvas_cxt_mouse.stroke();
						}
					} else if (obj.mouse_command == 2)// 游标一 框选功能
					{
						obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";
						obj.canvas_cxt_mouse.font = "13px normal";
						var lable = '频率：'
								+ Math
										.round(obj
												.pointToFreq(obj.FirstPointx1) * 10000)
								/ 10000+" MHz "
								+ ' 幅度：'
								+ Math
										.round(obj
												.pointToRange(obj.FirstPointy1) * 10)
								/ 10+" dBm";
						obj.canvas_cxt_mouse.fillText(lable,
								obj.FirstPointx1 + 5, obj.FirstPointy1 - 10);
						obj.canvas_cxt_mouse.stroke();

						obj.FirstPointx2 = loc.x;
						obj.FirstPointy2 = loc.y;
						obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";

						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.FirstPointx1,
										obj.FirstPointy1,
										obj.FirstPointx1,
										obj.FirstPointy1
												- (obj.FirstPointy1 - obj.FirstPointy2));
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.FirstPointx1,
										obj.FirstPointy1
												- (obj.FirstPointy1 - obj.FirstPointy2),
										obj.FirstPointx2, obj.FirstPointy2);
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.FirstPointx2,
										obj.FirstPointy2,
										obj.FirstPointx2,
										obj.FirstPointy2
												+ (obj.FirstPointy1 - obj.FirstPointy2));
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.FirstPointx2,
										obj.FirstPointy2
												+ (obj.FirstPointy1 - obj.FirstPointy2),
										obj.FirstPointx1, obj.FirstPointy1);
						obj.canvas_cxt_mouse.fill();
						obj.canvas_cxt_mouse.stroke();
					} else if (obj.mouse_command == 3) {// 游标二 框选功能
						obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";
						obj.canvas_cxt_mouse.font = "13px normal";
						var lable = '频率：'
								+ Math
										.round(obj
												.pointToFreq(obj.LasterPointx1) * 10000)
								/ 10000+" MHz "
								+ ' 幅度：'
								+ Math
										.round(obj
												.pointToRange(obj.LasterPointy1) * 10000)
								/ 10000+" dBm";
						obj.canvas_cxt_mouse.fillText(lable,
								obj.LasterPointx1 + 5, obj.LasterPointy1 - 10);
						obj.canvas_cxt_mouse.stroke();
						obj.LasterPointx2 = loc.x;
						obj.LasterPointy2 = loc.y;

						obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";

						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.LasterPointx1,
										obj.LasterPointy1,
										obj.LasterPointx1,
										obj.LasterPointy1
												- (obj.LasterPointy1 - obj.LasterPointy2));
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.LasterPointx1,
										obj.LasterPointy1
												- (obj.LasterPointy1 - obj.LasterPointy2),
										obj.LasterPointx2, obj.LasterPointy2);
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.LasterPointx2,
										obj.LasterPointy2,
										obj.LasterPointx2,
										obj.LasterPointy2
												+ (obj.LasterPointy1 - obj.LasterPointy2));
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.LasterPointx2,
										obj.LasterPointy2
												+ (obj.LasterPointy1 - obj.LasterPointy2),
										obj.LasterPointx1, obj.LasterPointy1);
						obj.canvas_cxt_mouse.fill();
						obj.canvas_cxt_mouse.stroke();
					} else if (obj.mouse_command == 4) {// 缩放功能
						obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";
						obj.canvas_cxt_mouse.font = "13px normal";
						var lable = '频率：'
								+ Math
										.round(obj
												.pointToFreq(obj.suofangPointx1) * 1000)
								/ 1000+" MHz "
								+ ' 幅度：'
								+ Math.round(obj.pointToRange(obj.suofangPointy1) * 10)
								/ 10+" dBm"+ ' 幅度差：'
                       +Math.abs( Math.round((obj.pointToRange(obj.suofangPointy1) * 10-obj.pointToRange(loc.y) * 10))/10)
                            +" dBm";
						obj.canvas_cxt_mouse
								.fillText(lable, obj.suofangPointx1 + 5,
										obj.suofangPointy1 - 10);
						obj.canvas_cxt_mouse.stroke();
						obj.suofangPointx2 = loc.x;
						obj.suofangPointy2 = loc.y;
						obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.suofangPointx1,
										obj.suofangPointy1,
										obj.suofangPointx1,
										obj.suofangPointy1
												- (obj.suofangPointy1 - obj.suofangPointy2));
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.suofangPointx1,
										obj.suofangPointy1
												- (obj.suofangPointy1 - obj.suofangPointy2),
										obj.suofangPointx2, obj.suofangPointy2);
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.suofangPointx2,
										obj.suofangPointy2,
										obj.suofangPointx2,
										obj.suofangPointy2
												+ (obj.suofangPointy1 - obj.suofangPointy2));
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.suofangPointx2,
										obj.suofangPointy2
												+ (obj.suofangPointy1 - obj.suofangPointy2),
										obj.suofangPointx1, obj.suofangPointy1);
						obj.canvas_cxt_mouse.fill();
						obj.canvas_cxt_mouse.stroke();
					} else if (obj.mouse_command == 5)// 框选数据功能
					{
						obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";
						obj.canvas_cxt_mouse.font = "13px normal";
						var lable = '频率：'
								+ Math
										.round(obj
												.pointToFreq(obj.kuangxuanDataPointx1) * 100)
								/ 100+" MHz "
								+ ' 幅度：'
								+ Math
										.round(obj
												.pointToRange(obj.kuangxuanDataPointy1) * 100)
								/ 100+" dBm";
						obj.canvas_cxt_mouse.fillText(lable,
								obj.kuangxuanDataPointx1 + 5,
								obj.kuangxuanDataPointy1 - 10);
						obj.canvas_cxt_mouse.stroke();
						obj.kuangxuanDataPointx2 = loc.x;
						obj.kuangxuanDataPointy2 = loc.y;
						obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.kuangxuanDataPointx1,
										obj.kuangxuanDataPointy1,
										obj.kuangxuanDataPointx1,
										obj.kuangxuanDataPointy1
												- (obj.kuangxuanDataPointy1 - obj.kuangxuanDataPointy2));
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.kuangxuanDataPointx1,
										obj.kuangxuanDataPointy1
												- (obj.kuangxuanDataPointy1 - obj.kuangxuanDataPointy2),
										obj.kuangxuanDataPointx2,
										obj.kuangxuanDataPointy2);
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.kuangxuanDataPointx2,
										obj.kuangxuanDataPointy2,
										obj.kuangxuanDataPointx2,
										obj.kuangxuanDataPointy2
												+ (obj.kuangxuanDataPointy1 - obj.kuangxuanDataPointy2));
						obj
								.drawDashedLine(
										obj.canvas_cxt_mouse,
										obj.kuangxuanDataPointx2,
										obj.kuangxuanDataPointy2
												+ (obj.kuangxuanDataPointy1 - obj.kuangxuanDataPointy2),
										obj.kuangxuanDataPointx1,
										obj.kuangxuanDataPointy1);
						obj.canvas_cxt_mouse.fill();
						obj.canvas_cxt_mouse.stroke();
					} else if (obj.mouse_command == 6)// 回调功能
					{
						obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";
						obj.canvas_cxt_mouse.font = "13px normal";
						var lable = '频率：'
								+ Math
										.round(obj
												.pointToFreq(obj.huidiaoPointx1) * 10000)
								/ 10000+" MHz "
								+ ' 幅度：'
								+ Math
										.round(obj
												.pointToRange(obj.huidiaoPointy1) * 10000)
								/ 10000+" dBm";
						obj.canvas_cxt_mouse
								.fillText(lable, obj.huidiaoPointx1 + 5,
										obj.huidiaoPointy1 - 10);
						obj.canvas_cxt_mouse.stroke();
						obj.huidiaoPointx2 = loc.x;
						obj.huidiaoPointy2 = loc.y;
						obj.canvas_cxt_mouse.fillStyle = "rgba(255,255,255,1)";
						obj.drawDashedLine(
								obj.canvas_cxt_mouse,
								obj.huidiaoPointx1,
								obj.huidiaoPointy1,
								obj.huidiaoPointx1,
								obj.huidiaoPointy1
										- (obj.huidiaoPointy1 - obj.huidiaoPointy2));
						obj.drawDashedLine(
							obj.canvas_cxt_mouse,
							obj.huidiaoPointx1,
							obj.huidiaoPointy1
									- (obj.huidiaoPointy1 - obj.huidiaoPointy2),
							obj.huidiaoPointx2, obj.huidiaoPointy2);
						obj.drawDashedLine(
							obj.canvas_cxt_mouse,
							obj.huidiaoPointx2,
							obj.huidiaoPointy2,
							obj.huidiaoPointx2,
							obj.huidiaoPointy2
									+ (obj.huidiaoPointy1 - obj.huidiaoPointy2));
						obj.drawDashedLine(
							obj.canvas_cxt_mouse,
							obj.huidiaoPointx2,
							obj.huidiaoPointy2
									+ (obj.huidiaoPointy1 - obj.huidiaoPointy2),
							obj.huidiaoPointx1, obj.huidiaoPointy1);
						obj.canvas_cxt_mouse.fill();
						obj.canvas_cxt_mouse.stroke();
					}
				}
			}
		}

	}

     freqToPoint =(freq)=> {// 频谱值转换为画布坐标位置
        let x = (freq - this.x_min) * (this.width - 2 * this.margin_x)/(this.x_max - this.x_min);
        return x;
    }

    rangeToPoint =(range)=> { // 幅度值转换为画布坐标位置
        let y = (range - this.y_min) * (this.height - 2 * this.margin_y)/(this.y_max - this.y_min);
        return y;
    }

	pointToFreq =(x)=> {// 画布坐标位置转换为频率值
		let k = (this.x_max - this.x_min) / (this.width - 2 * this.margin_x);// 每个刻度代表的频率值
		let freq = this.x_min + (x - this.margin_x) * k;
		return freq;
	}
	
	pointToRange = (y)=> {// 画布坐标位置转换为幅度值
		let k = (this.y_max - this.y_min) / (this.height - 2 * this.margin_y);// 每个刻度代表的幅度值
		let range = this.y_min + (this.height - y - this.margin_y) * k;
		return range;
	}
/*----------------对外接口-------------------*/

    Initialize = (content)=> {// 画布初始化
        this.contentname = content;
        this.width = document.getElementById(content).clientWidth;
        this.height = document.getElementById(content).clientHeight;
        this.casvas_mainID = Number((Math.random() * 100000).toFixed(0));
        if (this.canvas_old_mainID == -1) {// 如果是首次加载
            this.canvas_old_mainID = this.casvas_mainID;
        } else {// 如果不是首次加载，需要删除旧画布
            this.removeOldCanvas();
            this.canvas_old_mainID = this.casvas_mainID;
        }
        // 屏蔽屏幕上下文菜单
        document.oncontextmenu = () =>{
            return false;
        };
        this.old_AvgData = null;
        this.old_data = null;
		this.old_MaxData = null;
		this.old_BiduiData = null;
        this.old_MinData = null;
        this.initCanvas();
        this.initMouseEvent(this);
        this.drawBase();
        this.drawXLable();
        this.drawYLable();
    }
	
	GetData =() => {// 获取框选数据
		return this.new_kuangxuandata;
	}
	
	SetValue =(data) => {// 绘制瞬时谱数据
		this.old_data = data;
        this.drawPinpuData(data);
	}
	
	SetMaxValue =(data) =>{// 绘制最大值谱数据
		this.old_MaxData = data;
		this.drawPinpuDataMax(data);
	}
	
	SetBiduiValue =(data) =>{// 绘制比对数据
		this.old_BiduiData = data;
		this.drawPinpuBidui(data);
	}
	
	SetMinValue =(data) =>{// 绘制最小值谱数据
		this.old_MinData = data;
		this.drawPinpuDataMin(data);
	}
	
	SetAvgValue =(data) =>{// 绘制平均值谱数据
		this.old_AvgData = data;
		this.drawPinpuDataAvg(data);
	}
	
	SetImportanceFrequency =(frqmin, frqmax) =>{// 设置重点频率
		this.importance_frqmin[this.importance_frq_count] = frqmin;
		this.importance_frqmax[this.importance_frq_count] = frqmax;
		this.importance_frq_count++;
		this.drawPinpuImportanceFrequency(frqmin, frqmax);
	}
	
	SetProtectedFrequency =(frqmin, frqmax) =>{// 设置保护频率
		this.protected_frqmax[this.protected_frq_count] = frqmax;
		this.protected_frqmin[this.protected_frq_count] = frqmin;
		this.protected_frq_count++;
		this.drawPinpuProtectedFrequency(frqmin, frqmax);
	}
	
	SetSpecialFrequency =(frqmin, frqmax) =>{// 设置专用频率
		this.special_frqmax[this.special_frq_count] = frqmax;
		this.special_frqmin[this.special_frq_count] = frqmin;
		this.special_frq_count++;
		this.drawPinpuSpecialFrequency(frqmin, frqmax);
	}
	
	setFrequency =(x_minValue, x_maxValue) =>{// 设置频率范围
		this.x_min = x_minValue;
		this.x_max = x_maxValue;
		this.x_old_min = x_minValue;
		this.x_old_max = x_maxValue;
		if (this.canvax_xLable != null) {
			this.resetCurse();
		}
	}
	
	setMouseFunction =(commandKey) =>{// 设置鼠标功能
		this.mouse_command = commandKey;
	}
	
	setAmplitude =(y_minValue, y_maxValue) =>{// 设置幅度范围
		this.y_min = y_minValue;
		this.y_max = y_maxValue;
		if (this.canvax_xLable != null) {
			this.resetCurse();
		}
	}
	
    GetAmplitudeDataMin =() =>{
        return this.y_min;
    }
    GetAmplitudeDataMax =() =>{
        return this.y_max;
    }
	
	setLeftBottom =(marginX, marginY) =>{// 设置y轴距离左边的距离，x轴距离底边的距离
		this.margin_x = marginX;
		this.margin_y = marginY;
	}
	
	setXYCount =(x_count, y_count) =>{// 设置x,y轴刻度个数
		this.xcount = x_count;
		this.ycount = y_count;
	}
	
	RegeditMethod =(method) =>{// 注册回调函数
		this.callbackmethod = method;
	}

	RegeditXRangeMethod =(method) =>{// 注册X轴位置比例函数
		this.callbackGetXRange = method;
	}
	
	SetXYUnit =(xname, yname) =>{// 设置x轴,y轴单位
		this.xunit = xname;
		this.yunit = yname;
		if (this.canvax_xLable != null) {
			this.resetCurse();
		}
	}

    SetName =(nametemp) =>{    // 设置图表名称
        this.name = nametemp;
        if (this.canvax_xLable != null) {
            this.resetX();
        }
	}
	
	SetYouBiaoDisplay =(display) =>{// 设置默认是否显示游标
		this.isDrawYouBiao = display;// 显示游标
	}
   
	componentDidMount(){
		const {frqmin,frqmax} =this.props
		this.setAmplitude(-130, -20);
		this.setLeftBottom(50, 30);
		this.setFrequency(frqmin, frqmax);
		this.setXYCount(10, 10);
        this.Initialize('spectrum');
	}

    render() {
    /*----------------内部变量-------------------*/

        // ------------------------------------------------------------画布基本属性
        this._div_ID = null;// 包含容器
        this.width = 0;// 画布宽度
        this.height = 0;// 画图高度
        this.margin_x = 50;// y轴距离画布左边的距离 默认49
        this.margin_y = 50;// x轴距离画布底边的距离 默认49
        this.xcount = 10;// x轴刻度个数，默认10个
        this.ycount = 10;// y轴刻度个数，默认10个
        this.xrangePointX1 = 0;// 获取X轴位置比例横坐标

        // --------------------------------------------------------------------------------绘图环境属性
        this.contentname = "";// 画布容器标签名
        this.canvas = null;// 瞬时谱画布对象
        this.canvas_cxt_base = null;// 画布绘画环境，包括x轴、y轴、网格线、瞬时谱
        this.canvas_value = null;// 瞬时谱画布对象
        this.canvas_cxt_value = null;// 瞬时谱绘画环境
        this.canvas_up_x = null;// x轴 幅度上箭头
        this.canvas_up_y = null;// y轴 幅度上箭头
        this.canvas_down_x = null;// x轴 幅度上箭头
        this.canvas_down_y = null;// y轴 幅度上箭头
        this.canvax_xLable = null;// x轴 画布对象
        this.canvas_cxt_xLable = null;// 绘制x轴标识 刻度
        this.canvas_yLable = null;// y轴 画布对象
        this.canvas_cxt_yLable = null;// 绘制y轴标识 刻度
        this.canvas_mouse = null;// 鼠标操作 画布对象
        this.canvas_cxt_mouse = null;// 进行鼠标操作
        this.canvas_old_mainID = -1;// 画布上一次的主标识
        this.casvas_mainID = -1;// 画布相关对象主标识

        // ---------------------------------------------------------------------------------------业务属性
        this.isDrawYouBiao = true;
        this.x_min = 0;// x轴，起始频率值
        this.x_max = 0;// x轴，终止频率值
        this.x_old_min = 0;// x轴，记录最开始初始化时的起始频率值
        this.x_old_max = 0;// x轴，记录最开始初始化时的终止频率值
        this.y_min = 0;// y轴，起始幅度值
        this.y_max = 0;// y轴，终止幅度值
        this.mouse_command = 4;// 鼠标功能 1:网格标绘功能 2:游标一 框选功能 3：游标二 框选功能 4：缩放功能
        this.xunit = 'MHz';// x轴单位，默认为MHz
        this.yunit = 'dBm';// y轴单位，默认为dBm

        // ---------------------------------------------------------------------------------------功能属性
        this.old_data = null;// 记录最后一次上报的瞬时数据
        this.old_MaxData = null;// 记录最后一次上报的最大值数据
        this.old_BiduiData = null;// 记录最后一次上报的最大值数据
        this.old_MinData = null;// 记录最后一次上报的最小值数据
        this.old_AvgData = null;// 记录最后一次上报的平均值数据
        this.new_kuangxuandata = null;// 记录最后一次框选的数据，用于分析
        this.callbackmethod = null;// 回调函数变量
        this.callbackGetXRange = null;// 获取X轴位置比例方法变量

        return (
            <div>
                <div id="spectrum" style={{width:1200,height:250}}></div>
            </div>
        )
    }
}
