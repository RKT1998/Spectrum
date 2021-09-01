import React, { Component } from 'react'

export default class Constellation extends Component {
    
	initCanvas =()=> {// 初始化各个画布和绘画环境
		// 基础环境
		var element = document.createElement('canvas');
		element.style.position = 'absolute';
		element.style.backgroundColor = 'rgb(0,0,0)';
		element.width = this.width;
		element.height = this.height;
		element.id = 'canvas' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(element);
		this.canvas = document.getElementById(element.id);
		this.canvas_cxt_base = this.canvas.getContext('2d');
		this.canvas_cxt_base.translate(0, this.canvas.height);
		this.canvas_cxt_base.scale(1, -1);

		// x轴刻度 y轴刻度
		var elementXY = document.createElement('canvas');
		elementXY.style.position = 'absolute';
		elementXY.style.backgroundColor = 'translate';
		elementXY.width = this.width;
		elementXY.height = this.height;
		elementXY.id = 'canvasXY' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(elementXY);
		this.canvas_XY = document.getElementById(elementXY.id);
		this.canvas_cxt_XY = this.canvas_XY.getContext('2d');

		// 数据层
		var elementData = document.createElement('canvas');
		elementData.style.position = 'absolute';
		elementData.style.backgroundColor = 'translate';
		elementData.width = this.width;
		elementData.height = this.height;
		elementData.id = 'canvasData' + this.casvas_mainID;
		document.getElementById(this.contentname).appendChild(elementData);
		this.canvas_Data = document.getElementById(elementData.id);
		this.canvas_cxt_Data = this.canvas_Data.getContext('2d');
		this.canvas_cxt_Data.translate(0, this.canvas_Data.height);
		this.canvas_cxt_Data.scale(1, -1);
    }
    drawBase =() =>{
		this.canvas_cxt_base.beginPath();
		this.canvas_cxt_base.strokeStyle = "rgba(255,255,255,1)";
        this.canvas_cxt_base.lineWidth = 2;
        
        // 绘制x轴
        this.canvas_cxt_base.moveTo(10, 10);
        this.canvas_cxt_base.lineTo(this.width - this.margin_x +35, 10);
        this.canvas_cxt_base.stroke();
        this.canvas_cxt_base.moveTo(this.width - this.margin_x+35, 10);
        this.canvas_cxt_base.lineTo(this.width - this.margin_x+35, this.height
                - this.margin_y+35);
        this.canvas_cxt_base.stroke();

        // 绘制y轴
        this.canvas_cxt_base.moveTo(10,10);
        this.canvas_cxt_base.lineTo(10, this.height - this.margin_y+35);
        this.canvas_cxt_base.stroke();
        this.canvas_cxt_base.moveTo(10, this.height - this.margin_y+35);
        this.canvas_cxt_base.lineTo(this.width - this.margin_x+35, this.height
                - this.margin_y+35);
        this.canvas_cxt_base.stroke();

        // 绘制网格线
        this.canvas_cxt_base.strokeStyle = "rgba(255,255,255,1)";
        this.canvas_cxt_base.lineWidth = 1;
        this.canvas_cxt_base.moveTo(10,(this.height - 2 * this.margin_y) / 2 + this.margin_y);
        this.canvas_cxt_base.lineTo(this.width - this.margin_x+35,(this.height - 2 * this.margin_y) / 2 + this.margin_y);
        this.canvas_cxt_base.stroke();
        this.canvas_cxt_base.moveTo((this.width - 2 * this.margin_x) / 2+ this.margin_x, 10);
        this.canvas_cxt_base.lineTo((this.width - 2 * this.margin_x) / 2+ this.margin_x, this.height - this.margin_y+35);
        this.canvas_cxt_base.stroke();
        this.canvas_cxt_base.closePath();
	}
	
	drawXY =()=> {// 归一化显示“1，0，-1”
		this.canvas_cxt_XY.beginPath();
		this.canvas_cxt_XY.fillStyle = "rgba(255,255,255,1)"; // 
		this.canvas_cxt_XY.font = "20px KaiTi";
		this.canvas_cxt_XY.fillText(this.name, this.margin_x,this.margin_y - 20);
		this.canvas_cxt_XY.stroke();
		this.canvas_cxt_XY.closePath();
		// 绘制x轴刻度
		this.canvas_cxt_XY.beginPath();
		this.canvas_cxt_XY.font = "14px Linrial";
		this.canvas_cxt_XY.fillStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_XY.lineWidth = 2;
		var xpervalue = (this.width - 2 * this.margin_x) / 2;		
		for ( var i = -1; i < 2; i++) {
			this.canvas_cxt_XY.fillText(i, this.margin_x + (i + 1) * xpervalue- 2, this.height - 2 * this.margin_y + this.margin_y + 20);
			this.canvas_cxt_XY.fillRect(this.margin_x + (i + 2) * xpervalue / 2- 1, this.height - 2 * this.margin_y + this.margin_y, 2, 6);
			this.canvas_cxt_XY.fillRect(this.margin_x + (i + 1) * xpervalue - 1, this.height - 2* this.margin_y + this.margin_y, 2, 7);
		}
		this.canvas_cxt_XY.stroke();
		this.canvas_cxt_XY.closePath();
		// 绘制y轴刻度
		this.canvas_cxt_XY.beginPath();
		this.canvas_cxt_XY.font = "14px Linrial";
		this.canvas_cxt_XY.fillStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_XY.lineWidth = 2;
		var ypervalue = (this.height - 2 * this.margin_y) / 2;
		for ( var i = -1; i < 2; i++) {
			this.canvas_cxt_XY.fillText(i, this.margin_x - 20, this.margin_y+ (i + 1) * ypervalue + 5);
			this.canvas_cxt_XY.fillRect(this.margin_x - 6, this.margin_y+ (i + 2) * ypervalue / 2 - 1, 6, 2);
			this.canvas_cxt_XY.fillRect(this.margin_x - 7, this.margin_y+ (i + 1) * ypervalue - 1, 7, 2);
		}
		this.canvas_cxt_XY.stroke();
		this.canvas_cxt_XY.closePath();
	}
	
	drawOriginnalXY =(x1, x2, y1, y2) =>{// 原始数据显示，“最大值，中间值，最小值”
		this.canvas_cxt_XY.beginPath();
		this.canvas_cxt_XY.fillStyle = "rgba(255,255,255,1)"; // 
		this.canvas_cxt_XY.font = "20px KaiTi";
		this.canvas_cxt_XY.fillText(this.name, this.margin_x,
				this.margin_y - 20);
		this.canvas_cxt_XY.stroke();
		this.canvas_cxt_XY.closePath();
		// 绘制x轴刻度
		this.canvas_cxt_XY.beginPath();
		this.canvas_cxt_XY.font = "14px Linrial";
		this.canvas_cxt_XY.fillStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_XY.lineWidth = 2;
		var xpervalue = (this.width - 2 * this.margin_x) / 2;
		for ( var i = -1; i < 2; i++) {
			if (i == -1) {
				this.canvas_cxt_XY.fillText(x2, this.margin_x + (i + 1)* xpervalue - 20, this.height - 2 * this.margin_y+ this.margin_y + 20);
			} else if (i == 0) {
				this.canvas_cxt_XY.fillText(Math.round((x1 + x2) / 2 * 10) / 10, this.margin_x+ (i + 1) * xpervalue - 10, this.height - 2* this.margin_y + this.margin_y + 20);
			} else if (i == 1) {
				this.canvas_cxt_XY.fillText(x1, this.margin_x + (i + 1)* xpervalue - 20, this.height - 2 * this.margin_y+ this.margin_y + 20);
			}
			this.canvas_cxt_XY.fillRect(this.margin_x + (i + 2) * xpervalue / 2- 1, this.height - 2 * this.margin_y + this.margin_y, 2, 6);
			this.canvas_cxt_XY.fillRect(this.margin_x + (i + 1) * xpervalue - 1, this.height - 2* this.margin_y + this.margin_y, 2, 7);
		}
		this.canvas_cxt_XY.stroke();
		this.canvas_cxt_XY.closePath();
		// 绘制y轴刻度
		this.canvas_cxt_XY.beginPath();
		this.canvas_cxt_XY.font = "14px Linrial";
		this.canvas_cxt_XY.fillStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_XY.lineWidth = 2;
		var ypervalue = (this.height - 2 * this.margin_y) / 2;
		for ( var i = -1; i < 2; i++) {
			if (i == -1) {
				this.canvas_cxt_XY.fillText(y1, this.margin_x - 45,this.margin_y + (i + 1) * ypervalue + 5);
			} else if (i == 0) {
				this.canvas_cxt_XY.fillText(Math.round((y1 + y2) / 2 * 10) / 10,this.margin_x - 35, this.margin_y + (i + 1) * ypervalue+ 5);
			} else if (i == 1) {
				this.canvas_cxt_XY.fillText(y2, this.margin_x - 45,this.margin_y + (i + 1) * ypervalue + 5);
			}
			this.canvas_cxt_XY.fillRect(this.margin_x - 6, this.margin_y+ (i + 2) * ypervalue / 2 - 1, 6, 2);
			this.canvas_cxt_XY.fillRect(this.margin_x - 7, this.margin_y+ (i + 1) * ypervalue - 1, 7, 2);
		}
		this.canvas_cxt_XY.stroke();
		this.canvas_cxt_XY.closePath();
	}
	
	drawFirstOriginnalXY =(x1, x2, y1, y2) =>{// 第一次显示时，需要特别设定显示位置 原始数据显示，“最大值，中间值，最小值”
		// 绘制x轴刻度
		this.canvas_cxt_XY.beginPath();
		this.canvas_cxt_XY.font = "14px Linrial";
		this.canvas_cxt_XY.fillStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_XY.lineWidth = 2;
		var xpervalue = (this.width - 2 * this.margin_x) / 2;
		for ( var i = -1; i < 2; i++) {
			this.canvas_cxt_XY.fillText(0, this.margin_x + (i + 1) * xpervalue- 2, this.height - 2 * this.margin_y + this.margin_y + 20);
			this.canvas_cxt_XY.fillRect(this.margin_x + (i + 2) * xpervalue / 2- 1, this.height - 2 * this.margin_y + this.margin_y, 2, 6);
			this.canvas_cxt_XY.fillRect(this.margin_x + (i + 1) * xpervalue - 1, this.height - 2* this.margin_y + this.margin_y, 2, 7);
		}
		this.canvas_cxt_XY.stroke();
		this.canvas_cxt_XY.closePath();
		this.canvas_cxt_XY.beginPath();
		this.canvas_cxt_XY.font = "14px Linrial";
		this.canvas_cxt_XY.fillStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_XY.lineWidth = 2;
		var ypervalue = (this.height - 2 * this.margin_y) / 2;
		for ( var i = -1; i < 2; i++) {
			this.canvas_cxt_XY.fillText(0, this.margin_x - 20, this.margin_y+ (i + 1) * ypervalue + 5);
			this.canvas_cxt_XY.fillRect(this.margin_x - 6, this.margin_y+ (i + 2) * ypervalue / 2 - 1, 6, 2);
			this.canvas_cxt_XY.fillRect(this.margin_x - 7, this.margin_y+ (i + 1) * ypervalue - 1, 7, 2);
		}
		this.canvas_cxt_XY.stroke();
		this.canvas_cxt_XY.closePath();
	}
	
	resetCanvasValue =() =>{// (数据画布)重绘画布大小,用于在数据更新时，清除原有的数据
		if (document.getElementById('canvasData' + this.casvas_mainID) != null) {
			this.canvas_Data.width = this.canvas_Data.width;
			this.canvas_Data.height = this.canvas_Data.height;
			this.canvas_cxt_Data.translate(0, this.canvas_Data.height);
			this.canvas_cxt_Data.scale(1, -1);
		}
	}
	
	resetCanvasXY =() =>{// (x轴，y轴)重绘画布大小,用于在数据更新时，清除原有的数据
		if (document.getElementById('canvasXY' + this.casvas_mainID) != null) {
			this.canvas_XY.width = this.canvas_XY.width;
			this.canvas_XY.height = this.canvas_XY.height;
		}
	}
	
	drawData =(data) =>{// 绘制星座图数据
		if (this.showMode == 0) {
			var maxX1 = Math.max.apply(Math, data[0]);
			var minX1 = Math.min.apply(Math, data[0]);
			var maxY1 = Math.max.apply(Math, data[1]);
			var minY1 = Math.min.apply(Math, data[1]);
			var absx1 = Math.abs(maxX1);
			var absx2 = Math.abs(minX1);
			var absy1 = Math.abs(maxY1);
			var absy2 = Math.abs(minY1);
			var xx = Math.max(absx1, absx2);
			var yy = Math.max(absy1, absy2);
			if (xx >= yy) {
				maxX1 = xx;
				minX1 = 0 - xx;
				maxY1 = xx;
				minY1 = 0 - xx;
			} else {
				maxX1 = yy;
				minX1 = 0 - yy;
				maxY1 = yy;
				minY1 = 0 - yy;
			}
			this.lenBetweenX = maxX1 - minX1;
			this.lenBetweenY = maxY1 - minY1;
			if (this.lenBetweenX > this.lenBetweenY) {
				this.minY = minX1;
				this.maxY = maxX1;
				this.minX = minX1;
				this.maxX = maxX1;
				this.lenBetweenY = this.lenBetweenX;
			} else {
				this.minX = minY1;
				this.maxX = maxY1;
				this.minY = minY1;
				this.maxY = maxY1;
				this.lenBetweenX = this.lenBetweenY;
			}
			if (data.length != 2 && data[0].length != data[1].length) {
				return;
			}
			this.resetCanvasValue();
			for ( var i = 0; i < data[0].length; i++) {
				this.canvas_cxt_Data.beginPath();
				this.canvas_cxt_Data.strokeStyle ="rgba(0,255,0,1)";// "green";
				var pointX = this.margin_x + (this.width - 2 * this.margin_x)/ 2;
				var pointY = this.margin_y + (this.height - 2 * this.margin_y)/ 2;
				if (this.lenBetweenX != 0) {
					pointX = this.iToPoint(data[0][i]);
				}
				if (this.lenBetweenY != 0) {
					pointY = this.qToPoint(data[1][i]);
				}
				this.canvas_cxt_Data.lineWidth = 2;
                this.canvas_cxt_Data.arc(pointX, pointY,5,0,2*Math.PI);
				this.canvas_cxt_Data.stroke();
			}
		}
		
		if (this.showMode == 1) {// 原始数据显示模式
			this.resetCanvasXY();
			var maxX1 = Math.max.apply(Math, data[0]);
			var minX1 = Math.min.apply(Math, data[0]);
			var maxY1 = Math.max.apply(Math, data[1]);
			var minY1 = Math.min.apply(Math, data[1]);
			var absx1 = Math.abs(maxX1);
			var absx2 = Math.abs(minX1);
			var absy1 = Math.abs(maxY1);
			var absy2 = Math.abs(minY1);
			var xx = Math.max(absx1, absx2);
			maxX1 = xx;
			minX1 = 0 - xx;
			var yy = Math.max(absy1, absy2);
			maxY1 = yy;
			minY1 = 0 - yy;
			this.lenBetweenX = maxX1 - minX1;
			this.lenBetweenY = maxY1 - minY1;
			maxX1 = Math.round(maxX1 * 10) / 10;
			minX1 = Math.round(minX1 * 10) / 10;
			maxY1 = Math.round(maxY1 * 10) / 10;
			minY1 = Math.round(minY1 * 10) / 10;
			this.maxX = maxX1;
			this.minX = minX1;
			this.maxY = maxY1;
			this.minY = minY1;
			this.drawOriginnalXY(this.maxX, this.minX, this.maxY, this.minY);
			this.resetCanvasValue();
			for ( var i = 0; i < data[0].length; i++) {
				this.canvas_cxt_Data.beginPath();
				this.canvas_cxt_Data.strokeStyle = "yellow";
				var pointX = this.margin_x + (this.width - 2 * this.margin_x)/ 2;
				var pointY = this.margin_y + (this.height - 2 * this.margin_y)/ 2;
				if (this.lenBetweenX != 0) {
					pointX = this.iToPointOriginal(data[0][i]);
				}
				if (this.lenBetweenY != 0) {
					pointY = this.qToPointOriginal(data[1][i]);
				}
				this.canvas_cxt_Data.lineWidth = 2;
				this.canvas_cxt_Data.moveTo(pointX - 1, pointY - 1);
				this.canvas_cxt_Data.lineTo(pointX, pointY);

				this.canvas_cxt_Data.stroke();
			}
		}
	}
	
	iToPoint =(datai) =>{// (归一化数据) I路转换为画布坐标位置
		var x = this.margin_x + (datai - this.minX)* (this.width - 2 * this.margin_x) / (this.maxX - this.minX);
		return x;
	}
	
	qToPoint =(dataq) =>{// (归一化数据) Q路转换为画布坐标位置
		var y = this.margin_y + (dataq - this.minY)* (this.height - 2 * this.margin_y) / (this.maxY - this.minY);
		return y;
	}
	
	iToPointOriginal =(datai) =>{// （原始数据） I路转换为画布坐标位置
		var x = this.margin_x + (datai - this.minX)* (this.width - 2 * this.margin_x) / (this.maxX - this.minX);
		return x;
	}
	
	qToPointOriginal =(dataq) =>{// (原始数据) Q路转换为画布坐标位置
		var y = this.margin_y + (dataq - this.minY)* (this.height - 2 * this.margin_y) / (this.maxY - this.minY);
		return y;
	}
	
	removeOldCanvas =() =>{// 删除上一次的旧画布
		if (document.getElementById('canvas' + this.canvas_old_mainID) != null) {
			document.getElementById(this.contentname).removeChild(document.getElementById('canvas' + this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(document.getElementById('canvasXY'+ this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(document.getElementById('canvasData'+ this.canvas_old_mainID));
		}
    }
    
/*----------------对外接口-------------------*/
	
	Initialize =(content) =>{// 画布初始化
		this.contentname = content;
		this.width = document.getElementById(content).clientWidth ;
		this.height = document.getElementById(content).clientHeight ;
		this.casvas_mainID = Number((Math.random() * 100000).toFixed(0));
        if (this.canvas_old_mainID == -1) {// 如果是首次加载
            this.canvas_old_mainID = this.casvas_mainID;
        } else {// 如果不是首次加载，需要删除旧画布
            this.removeOldCanvas();
            this.canvas_old_mainID = this.casvas_mainID;
        }
        // 屏蔽屏幕上下文菜单
        document.oncontextmenu = function() {
            return false;
        };
		this.initCanvas();
		this.drawBase();
		if (this.showMode == 1) {
			this.drawFirstOriginnalXY(0, 0, 0, 0);
		}
	}
	
	SetValue =(data) =>{// 绘制星座图数据
		this.drawData(data);
	}
	
	SetNormalizingMode =() =>{// 设置归一化显示模式
		this.showMode = 0;
		this.resetCanvasXY();
	}
	
	SetOriginalMode =() =>{// 设置原始数据显示模式
		this.showMode = 1;
		this.resetCanvasXY();
		this.drawFirstOriginnalXY(0, 0, 0, 0);
	}
	
	setLeftBottom =(marginX, marginY) =>{// 设置y轴距离左边的距离，x轴距离底边的距离
		this.margin_x = marginX;
		this.margin_y = marginY;
	}
	
	SetName =(nametemp) =>{// 设置图表名称
		this.name = nametemp;
    }
    
    componentDidMount(){
        this.setLeftBottom(45, 45);
		this.Initialize('constellation');
    }
    render() {
    /*----------------内部变量-------------------*/
        // ------------------------------------------------------------画布基本属性
        this.width = 0;// 画布宽度
        this.height = 0;// 画图高度
        this.margin_x = 49;// y轴距离画布左边的距离 默认49
        this.margin_y = 49;// x轴距离画布底边的距离 默认49
        this.name = "";// 画布名称，默认为空

        // --------------------------------------------------------------------------------绘图环境属性
        this.contentname = "";// 画布容器标签名
        this.casvas_mainID = -1;// 画布相关对象主标识

        this.canvas = null;// 基础画布对象
        this.canvas_cxt_base = null;// 画布绘画环境，包括x轴、y轴、网格线

        // --------------------------------------------------------------------------------业务属性
        this.maxX = 0;
        this.maxY = 0;
        this.minX = 0;
        this.minY = 0;
        this.lenBetweenX = 0;
        this.lenBetweenY = 0;
        this.showMode = 0;// 显示模式，0：归一化显示（默认） 1：原始数据显示

        return (
            <div>
                <div id="constellation" style={{width: 450,height:450}} />
            </div>
        )
    }
}
