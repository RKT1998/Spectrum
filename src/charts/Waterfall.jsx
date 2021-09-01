import React, { Component } from 'react'

export default class Waterfall extends Component {

    initCanvas =()=> {
        // 数据画布
        let element = document.createElement('canvas');
        element.style.position = 'absolute';
        element.style.backgroundColor = 'rgb(0,0,0)';
        element.width = this.width;
        element.height = this.height;
        element.id = 'canvas' + this.casvas_mainID;
        document.getElementById(this.contentname).appendChild(element);
        this.canvas = document.getElementById(element.id);
        this.canvas_cxt_base = this.canvas.getContext('2d');

        // 渐变条画布
        let elementcolor = document.createElement('canvas');
        elementcolor.style.position = 'absolute';
        elementcolor.style.backgroundColor = 'absolute';
        elementcolor.width = this.width;
        elementcolor.height = this.height;
        elementcolor.id = 'canvascolor' + this.casvas_mainID;
        document.getElementById(this.contentname).appendChild(elementcolor);
        this.canvas_color = document.getElementById(elementcolor.id);
        this.canvas_cxt_color = this.canvas_color.getContext('2d');

        // 离线渐变条画布
        this.canvas_color_offline = document.createElement("canvas");
        this.canvas_color_offline.width = 1;
        this.canvas_color_offline.height = this.height - 2 * this.margin_y;
        this.canvas_color_cxt_offline = this.canvas_color_offline.getContext('2d');

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

        // 时间轴
        let elementTimeLable = document.createElement('canvas');
        elementTimeLable.style.position = 'absolute';
        elementTimeLable.style.backgroundColor = 'translate';
        elementTimeLable.width = this.width;
        elementTimeLable.height = this.height;
        elementTimeLable.id = 'canvasTimeLable' + this.casvas_mainID;
        document.getElementById(this.contentname).appendChild(elementTimeLable);
        this.canvas_time = document.getElementById(elementTimeLable.id);
        this.canvas_cxt_time = this.canvas_time.getContext('2d');

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

        // 瀑布图离线画布数组
        this.canvas_data_offline = document.createElement("canvas");
        this.canvas_data_offline.width = this.width - 2 * this.margin_x;
        this.canvas_data_offline.height = this.height - 2 * this.margin_y;
        this.canvas_data_cxt_offline = this.canvas_data_offline.getContext('2d');
        this.m_imagedata = this.canvas_data_cxt_offline.getImageData(0, 0, this.width - 2 * this.margin_x, this.height- 2 * this.margin_y);
        let val = this.height - 2 * this.margin_y;
        let  ac =val-0;
        if (val-0>0)
		{
            this.m_pubutu_data = new Array(val);
		}
    }
    	
	resetX =()=> {// 清理游标所在的X轴
		this.canvax_xLable.width = this.canvax_xLable.width;
		this.canvax_xLable.height = this.canvax_xLable.height;
        this.drawXLable();
        this.drawYLable();
    }
   
    resetCurse =()=> { // 清理游标所在的X轴
        this.canvax_xLable.width = this.canvax_xLable.width;
        this.canvax_xLable.height = this.canvax_xLable.height;
        this.drawXLable();
        this.drawYLable();
    }

	resetColor =()=> {
		this.canvas_color.width = this.canvas_color.width;
		this.canvas_color.height = this.canvas_color.height;
		this.drawPix();
	}
	
	removeOldCanvas =()=> {// 删除上一次的旧画布
		if (document.getElementById('canvas' + this.canvas_old_mainID) != null) {
			document.getElementById(this.contentname).removeChild(document.getElementById('canvas' + this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(document.getElementById('canvasXLable'+ this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(document.getElementById('canvasYLable'+ this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(document.getElementById('canvasMouse'+ this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(document.getElementById('canvascolor'+ this.canvas_old_mainID));
			document.getElementById(this.contentname).removeChild(document.getElementById('canvasTimeLable'+ this.canvas_old_mainID));
		}
	}
	
	drawBase =()=> {// 绘制画布基础内容，包括x轴，y轴，网格线
		this.canvas_cxt_base.translate(0, this.canvas.height);
		this.canvas_cxt_base.scale(1, -1);
		this.canvas_cxt_color.translate(0, this.canvas_color.height);
		this.canvas_cxt_color.scale(1, -1);
		this.canvas_color_cxt_offline.translate(0,
		this.canvas_color_offline.height);
		this.canvas_color_cxt_offline.scale(1, -1);
		this.canvas_cxt_mouse.translate(0, this.canvas_cxt_mouse.height);
		this.canvas_cxt_mouse.scale(1, -1);
	}
	
	drawDashedLine =(context, x1, y1, x2, y2, dashlength)=> {// 绘制虚线
		context.beginPath();
		context.lineWidth = 2;
		context.strokeStyle = 'rgba(255,255,255,1)';
		dashlength = dashlength === undefined ? 3 : dashlength;
		let deltaX = x2 - x1;
		let deltaY = y2 - y1;
		let numDashed = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY)/ dashlength);
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
    
	
	drawXLable =()=> {// 绘制x轴标识 刻度，默认初始化时设置的起始终止频率值

		// 绘制x轴
		this.canvas_cxt_xLable.beginPath();
		this.canvas_cxt_xLable.fillStyle = "rgba(255,47,47,1)";
		this.canvas_cxt_xLable.font = "13px normal";
		this.canvas_cxt_xLable.fillText(this.xunit, this.width - this.margin_y- 30, this.height - this.margin_y + 30);
		this.canvas_cxt_xLable.strokeStyle = "#ffffff";
		this.canvas_cxt_xLable.lineWidth = 2;
		this.canvas_cxt_xLable.stroke();
		this.canvas_cxt_xLable.font = "13px Arial";
		this.canvas_cxt_xLable.fillStyle = "#ffffff";
		let xpervalue = (this.width - 2 * this.margin_x)/ (this.x_max - this.x_min);
		let xperfrq = (this.x_max - this.x_min) / this.xcount;
		this.canvas_cxt_xLable.textAlign = 'center';
		this.canvas_cxt_xLable.textBaseline = 'top';
		for ( let i = 0; i < this.xcount + 1; i++) {
			let frqtemp = this.x_min + i * xperfrq;
			this.canvas_cxt_xLable.fillText(
				Math.round(frqtemp * 10000) / 10000, this.margin_x+ (frqtemp - this.x_min) * xpervalue, this.height- this.margin_y + 10);
			if (i <= this.xcount) {
				this.canvas_cxt_xLable.fillRect(this.margin_x+ (frqtemp - this.x_min) * xpervalue, this.height- this.margin_y, 2, 8);
			}
		}
		let xtemp = (this.width - 2 * this.margin_x)/ (this.xcount * this.xfrq_count);
		for ( let i = 0; i < (this.xcount * this.xfrq_count); i++) {
			this.canvas_cxt_xLable.fillRect(this.margin_x + i * xtemp,
				this.height - this.margin_y, 2, 4);
		}
		this.canvas_cxt_xLable.stroke();
		this.canvas_cxt_xLable.strokeStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_xLable.lineWidth = 2;
		this.canvas_cxt_xLable.moveTo(this.margin_x, this.margin_y);
		this.canvas_cxt_xLable.lineTo(this.width - this.margin_x, this.margin_y);
		this.canvas_cxt_xLable.moveTo(this.margin_x, this.height- this.margin_y);
		this.canvas_cxt_xLable.lineTo(this.width - this.margin_x, this.height- this.margin_y);
		this.canvas_cxt_xLable.stroke();
	}
	
	drawYLable =() =>{// 绘制y轴标识 刻度
		this.canvas_cxt_yLable.beginPath();
        this.canvas_up_x = this.margin_x-40;// x轴 幅度上箭头
        this.canvas_up_y = this.margin_y ;// y轴 幅度上箭头
        this.canvas_down_x = this.margin_x-40;// x轴 幅度上箭头
        this.canvas_down_y = this.height - this.margin_y;// y轴 幅度上箭头
		this.canvas_cxt_yLable.fillStyle = "rgba(255,255,255,1)";
        this.canvas_cxt_yLable.font = "20px KaiTi";
        
		// 绘制图表名称
		this.canvas_cxt_yLable.fillText(this.name, this.margin_x - 10,15);
		this.canvas_cxt_yLable.stroke();
		this.canvas_cxt_yLable.closePath();
		this.canvas_cxt_yLable.beginPath();
		this.canvas_cxt_yLable.fillStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_yLable.font = "12px Arial";
		let ypervalue = (this.height - 2 * this.margin_y)/ (this.y_max - this.y_min);
		let xperamp = (this.y_max - this.y_min) / this.ycount;
		this.canvas_cxt_yLable.textAlign = 'right';
		this.canvas_cxt_yLable.textBaseline = 'middle';
		for ( let i = 0; i < this.ycount + 1; i++) {
			let rangetemp = this.y_min + i * xperamp;
			this.canvas_cxt_yLable.fillText(Math.round(rangetemp * 10) / 10,
			this.margin_x - 8, this.height - this.margin_y- (rangetemp - this.y_min) * ypervalue);
			this.canvas_cxt_yLable.fillRect(this.margin_x - 8, this.height- this.margin_y - (rangetemp - this.y_min) * ypervalue, 8,2);
		}
		this.canvas_cxt_yLable.stroke();
		this.canvas_cxt_yLable.closePath();

		// 绘制y轴幅度轴的辅助刻度线
		let fztemp = (this.height - 2 * this.margin_y)/ (this.ycount * this.yrange_count);
		this.canvas_cxt_yLable.beginPath();
		for ( let i = 0; i < (this.ycount * this.yrange_count); i++) {
			this.canvas_cxt_yLable.fillRect(this.margin_x - 4, this.height- this.margin_y - i * fztemp, 4, 2);
			this.canvas_cxt_yLable.fillRect(this.width - this.margin_x,this.height - this.margin_y - i * fztemp, 4, 2);
			if (i % 5 == 0) {
				this.canvas_cxt_yLable.fillRect(this.width - this.margin_x,this.height - this.margin_y - i * fztemp, 8, 2);
			}
		}
		this.canvas_cxt_yLable.fillRect(this.width - this.margin_x,this.margin_y, 8, 2);
		this.canvas_cxt_yLable.stroke();
        this.canvas_cxt_yLable.closePath();
        
		// 绘制y轴
		this.canvas_cxt_yLable.strokeStyle = "rgba(255,255,255,1)";
		this.canvas_cxt_yLable.lineWidth = 2;
		this.canvas_cxt_yLable.moveTo(this.margin_x, this.margin_y);
		this.canvas_cxt_yLable.lineTo(this.margin_x, this.height
				- this.margin_y);
		this.canvas_cxt_yLable
				.moveTo(this.width - this.margin_x, this.margin_y);
		this.canvas_cxt_yLable.lineTo(this.width - this.margin_x, this.height
				- this.margin_y);
		this.canvas_cxt_yLable.stroke();
	}
	
	drawValue =(data) =>{// 绘制数据
		if (!this.isReceiveData) {
			return;// 如果不接收数据，直接返回
		}
		// 清空数据画布
		this.canvas.height = this.canvas.height;
		this.canvas.width = this.canvas.width;
		this.canvas_cxt_base.translate(0, this.canvas.height);
		this.canvas_cxt_base.scale(1, -1);

		// 清空时间轴画布
		this.canvas_time.height = this.canvas_time.height;
		this.canvas_time.width = this.canvas_time.width;

		// 执行数据归并算法
		let param = parseFloat((this.width - 2 * this.margin_x))/ parseFloat(data[1].length);
		let newdata = new Array(2);
		for ( let i = 0; i < 2; i++) {
			newdata[i] = new Array(this.width - 2 * this.margin_x);
		}
		for ( let i = 0; i < this.width - 2 * this.margin_x; i++) {
			newdata[0][i] = 0;
			newdata[1][i] = -16000;
		}
		for ( let i = 0; i < data[1].length; i++) {
			let value = data[1][i];
			let index = Math.round(parseFloat(i * param));
			if (value >= newdata[1][index]) {
				newdata[0][index] = data[0][i];
				newdata[1][index] = value;
			}
		}
		// 数据归并后，进行频率数据扩展
		for ( let i = 0; i <= (this.width - 2 * this.margin_x); i++) {
			// 如果该x轴像素，没有设置幅度值
			if (newdata[1][i] == -16000) {
				// 向下取整
				let _index = Math.floor(i * data[1].length/ (this.width - 2 * this.margin_x));
				newdata[0][i] = data[0][_index];
				newdata[1][i] = data[1][_index];
			}
        }
        
		// 将幅度值保存到缓存数组内
		this.m_pubutu_data[this.m_currentline + 1] = newdata[1];

		// 动态调整瀑布图数据数组
		let linePixCount = (this.width - 2 * this.margin_x);// 每行像素颜色点个数（RGBA）
		for ( let i = 0; i < this.width - 2 * this.margin_x; i++) {
			let dataindex = i;
			let value = newdata[1][dataindex];
			let pixindex = 0;
			// 如果超出y轴范围，使用黑色（0，0，0，0）进行填充
			if (value > this.y_max || value < this.y_min) {
				pixindex = 0;
				this.m_imagedata.data[(this.m_currentline * linePixCount + i) * 4 + 0] = 0;
				this.m_imagedata.data[(this.m_currentline * linePixCount + i) * 4 + 1] = 0;
				this.m_imagedata.data[(this.m_currentline * linePixCount + i) * 4 + 2] = 0;
				this.m_imagedata.data[(this.m_currentline * linePixCount + i) * 4 + 3] = 0;
			} else {
				pixindex = Math.round((value - this.y_min)
						* (this.pix.length / 4) / (this.y_max - this.y_min));
				pixindex = this.pix.length / 4 - pixindex;
				this.m_imagedata.data[(this.m_currentline * linePixCount + i) * 4 + 0] = this.pix[pixindex * 4 + 0];
				this.m_imagedata.data[(this.m_currentline * linePixCount + i) * 4 + 1] = this.pix[pixindex * 4 + 1];
				this.m_imagedata.data[(this.m_currentline * linePixCount + i) * 4 + 2] = this.pix[pixindex * 4 + 2];
				this.m_imagedata.data[(this.m_currentline * linePixCount + i) * 4 + 3] = this.pix[pixindex * 4 + 3];
			}
		}
		this.canvas_data_cxt_offline.putImageData(this.m_imagedata, 0, 0);

		// 瀑布图上半部分绘制在基础画布的下半部分
        this.canvas_cxt_base.drawImage(this.canvas_data_offline,
        0,// 开始剪切的x坐标位置
		this.m_currentline,// 开始剪切的y坐标位置
		this.canvas_data_offline.width,// 被剪切图像的宽度
		this.canvas_data_offline.height - this.m_currentline, // 被剪切图像的高度
		this.margin_x,// 在画布上放置图像的x坐标位置
		this.margin_y,// 在画布上放置图像的y坐标位置
		this.canvas_data_offline.width,// 要使用的图像宽度
		this.canvas_data_offline.height - this.m_currentline// 要使用的图像高度
		);

		// 瀑布图下半部分绘制在基础画布的下半部分
		this.canvas_cxt_base.drawImage(this.canvas_data_offline,// 画布
		0,// 开始剪切的x坐标位置
		0,// 开始剪切的y坐标位置
		this.canvas.width - 2 * this.margin_x,// 被剪切图像的宽度
		this.m_currentline , // 被剪切图像的高度
		this.margin_x,// 在画布上放置图像的x坐标位置
		this.height - this.margin_y - this.m_currentline ,// 在画布上放置图像的y坐标位置
		this.canvas.width - 2 * this.margin_x,// 要使用的图像宽度
		this.m_currentline // 要使用的图像高度
		);
        this.m_currentline++;
		if (this.m_currentline >= this.height - 2 * this.margin_y) {// 如果行数超过最大行数，从0重新开始
			this.m_currentline = 0;
		}
		let i = 0;
		let timetemp = (this.height - 2 * this.margin_y) / 10;
		if(this.canvas_cxt_time){
			this.canvas_cxt_time.beginPath();
		}
		while (i <= 10) {
			if (this.currentdate.getMinutes() < 10) {
				this.minutetime = "0" + this.currentdate.getMinutes();
			} else {
				this.minutetime = this.currentdate.getMinutes();
			}
			if (this.currentdate.getSeconds() < 10) {
				this.secondtime = "0" + this.currentdate.getSeconds();
			} else {
				this.secondtime = this.currentdate.getSeconds();
			}
			if (i == 0) {
				let str = this.currentdate.getHours().toString() + ":" + this.minutetime
						+ ":" + this.secondtime;
				let pretemp = this.receiveTimeArray[0];
				let nowtemp = '';
				for ( let k = 1; k < this.receiveTimeArray.length; k++) {
					nowtemp = this.receiveTimeArray[k];
					this.receiveTimeArray[k] = pretemp;
					pretemp = nowtemp;
				}
				this.receiveTimeArray[0] = str;
			}
			if(this.canvas_cxt_time){
				this.canvas_cxt_time.font = "12px normal";
				this.canvas_cxt_time.fillStyle = "#ffffff";
			}
			if (this.receiveTimeArray == null || this.receiveTimeArray[Math.round(this.height- (2 * this.margin_y + i * timetemp))] == null) {
				if (this.receiveTimeArray != null&& this.receiveTimeArray[this.receiveTimeArray.length - 1] != null) {
                    if(this.canvas_cxt_time){
                        this.canvas_cxt_time.fillText(
                            this.receiveTimeArray[this.receiveTimeArray.length - 1],
                            this.width - this.margin_x + 10,
                            this.height - (this.margin_y + i * timetemp - 3));
                    }
				} else {
					if(this.canvas_cxt_time){
						this.canvas_cxt_time.fillText('00:00:00', this.width- this.margin_x + 10, this.height- (this.margin_y + i * timetemp - 3));
					}
				}
			} else {
				if(this.canvas_cxt_time){
					this.canvas_cxt_time.fillText(
					this.receiveTimeArray[Math.round(this.height- (2 * this.margin_y + i * timetemp))],
					this.width - this.margin_x + 10, this.height- (this.margin_y + i * timetemp - 3));
				}
				
			}
			let currentseconds = this.currentdate.getSeconds() - this.time * 0.1;
			this.currentdate.setSeconds(currentseconds);
			if(this.canvas_cxt_time){
				this.canvas_cxt_time.closePath();
			}
			i++;
		}
		if(this.canvas_cxt_time){
			this.canvas_cxt_time.stroke();
		}
    }
    
	drawPix =() =>{// 绘制渐变条
		this.clearColorCanvas();
		this.canvas_cxt_color.beginPath();
		this.canvas_cxt_color.translate(0, this.canvas.height);
		this.canvas_cxt_color.scale(1, -1);
		this.canvas_color_cxt_offline.translate(0, this.canvas.height);
		this.canvas_color_cxt_offline.scale(1, -1);
		let imgData1 = this.canvas_cxt_color.createImageData(1, this.height - 2* this.margin_y);
		let key = this.pix.length / 4 / (this.height - 2 * this.margin_y);
		for ( let i = 0; i < this.height - 2 * this.margin_y; i++) {
			let index = Math.round(i * key);
			imgData1.data[i * 4 + 0] = this.pix[index * 4];
			imgData1.data[i * 4 + 1] = this.pix[index * 4 + 1];
			imgData1.data[i * 4 + 2] = this.pix[index * 4 + 2];
			imgData1.data[i * 4 + 3] = this.pix[index * 4 + 3];
		}
		this.canvas_color_cxt_offline.putImageData(imgData1, 0, 0);
		this.canvas_cxt_color.drawImage(this.canvas_color_offline, 0, 0, 1,
			this.height - 2 * this.margin_y, this.margin_x - 30,
			this.margin_y, 30, this.height - 2 * this.margin_y);
		this.canvas_cxt_color.stroke();
		this.canvas_cxt_color.closePath();
    }
    
	freqToPoint =(freq) =>{// 频谱值转换为画布坐标位置
		let x = (freq - this.x_min) * (this.width - 2 * this.margin_x)/ (this.x_max - this.x_min) + this.margin_x;
		return x;
    }
    
	rangeToPoint =(range)=> {// 幅度值转换为画布坐标位置
		let y = (range - this.y_min) * (this.height - 2 * this.margin_y)/ (this.y_max - this.y_min) + this.margin_y;
		return y;
	}
	
	pointToFreq =(x) =>{// 画布坐标位置转换为频率值
		let k = (this.x_max - this.x_min) / (this.width - 2 * this.margin_x);// 每个刻度代表的频率值
		let freq = this.x_min + (x - this.margin_x) * k;
		return freq;
	}
	
	pointToRange =(y) =>{// 画布坐标位置转换为幅度值
		let k = (this.y_max - this.y_min) / (this.height - 2 * this.margin_y);// 每个刻度代表的幅度值
		let range = this.y_min + (this.height - y - this.margin_y) * k;
		return range;
    }
    
/*----------------对外接口-------------------*/
	
	Initialize =(contentpubu) =>{// 画布初始化
		this.contentname = contentpubu;
		this.width = document.getElementById(contentpubu).clientWidth;
		this.height = document.getElementById(contentpubu).clientHeight;
		this.casvas_mainID = Number((Math.random() * 100000).toFixed(0));
		if (this.canvas_old_mainID == -1) {// 如果是首次加载
			this.canvas_old_mainID = this.casvas_mainID;
		} else {// 如果不是首次加载，需要删除旧画布
			this.removeOldCanvas();
			this.canvas_old_mainID = this.casvas_mainID;
		}
		
		document.oncontextmenu =() =>{// 屏蔽屏幕上下文菜单
			return false;
		};
		this.initCanvas();
		// this.initMouseEvent(this);
		this.drawBase();
		this.drawPix();
		this.drawXLable();
		this.drawYLable();
		this.receiveTimeArray = null;
        this.height = document.getElementById(contentpubu).clientHeight;
        let   val=this.height - 2 * this.margin_y;
        if((val-0>0)){
            this.receiveTimeArray = new Array(val);// 保存接收时间
            this.m_pubutu_data = new Array(val);
		}
	}
	
	SetValue =(data)=> {// 绘制瞬时谱数据
		this.drawValue(data);
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
	
	setAmplitude =(y_minValue, y_maxValue) =>{// 设置幅度范围
		this.y_min = y_minValue;
		this.y_max = y_maxValue;
		if (this.canvax_xLable != null) {
            this.resetCurse();
		}
	}
	
	SetXUnit =(xname) =>{// 设置x轴,y轴单位
		this.xunit = xname;
		if (this.canvax_xLable != null) {
			this.resetX();
		}
	}
	
	setLeftBottom =(marginX, marginY) =>{// 设置y轴距离左边的距离，x轴距离底边的距离
		this.margin_x = marginX;
		this.margin_y = marginY;
	}
	
	setXYCount =(x_count, y_count)=> {// 设置x,y轴刻度个数
		this.xcount = x_count;
		this.ycount = y_count;
	}
	
	SetColorRange =(colorRange) =>{// 设置渐变条颜色分割
		this.range = colorRange;
	}
	
	BeginReceive =() =>{// 接收数据进行刷新
		this.isReceiveData = true;
	}
	
	EndReceive =() =>{// 终止接收数据,不刷新图层
		this.isReceiveData = false;
	}
	
	setMouseFunction =(commandKey) =>{// 设置鼠标功能
		this.mouse_command = commandKey;
	}
	
	RegeditMethod =(method) =>{// 注册回调函数
		this.callbackmethod = method;
	}
	
	SetName =(nametemp) =>{// 设置图表名称
		this.name = nametemp;
		if (this.canvax_xLable != null) {
			this.resetX();
		}
	}
	
	SetColor =(color) =>{// 设置颜色数组
		this.pix = new Array(color.length);
		this.pix = color;
		if (this.canvas_color != null) {
			this.resetColor();
		}
    }
    
	clearColorCanvas =() =>{
		this.canvas_color_offline.width = this.canvas_color_offline.width;
		this.canvas_color_offline.height = this.canvas_color_offline.height;
    }
    
    onsetcolor =() =>{
        let data = new Array(362 * 4);
        for ( let i = 2; i < 362; i++) {
            let temp = this.getColor(i);
            data[i * 4] = temp[0];
            data[i * 4 + 1] = temp[1];
            data[i * 4 + 2] = temp[2];
            data[i * 4 + 3] = temp[3];
        }
        this.SetColor(data);
    }

    getColor = (i)=> {
		let r = 0.0
		let g = 0.0
		let b = 0.0;
		let h = 1.1
		let s = 1.1
		let v = 1.1;
		let p = 0.1
		let q = 0.1
		let t = 0.1
		let f = 0.1;
		let k = 12;
		h = i * 1;// 行数
		v = 0.18 + (300 - i) * 0.0072;
		k = Math.floor(h / 90);
		f = h / 90 - k;
		p = (1 - s) * v;
		q = (1 - s * f) * v;
		t = (1 - s * (1 - f)) * v;
		switch (k) {
		case 0:
			r = v * 255;
			g = t * 255;
			b = p * 255;
			break;
		case 1:
			r = q * 255;
			g = v * 255;
			b = p * 255;
			break;
		case 2:
			r = p * 255;
			g = v * 255;
			b = t * 255;
			break;
		case 3:
			r = p * 255;
			g = q * 255;
			b = v * 255;
			break;
		default:
			r = g = b = 0;
			break;
		}
		let datas = [];
		datas.push(Math.round(r));
		datas.push(Math.round(g));
		datas.push(Math.round(b));
		datas.push(230);
		return datas;
	}

	componentDidMount(){
		const {frqmin,frqmax} =this.props
		
		this.onsetcolor();
		this.setAmplitude(-130, -20);
		this.setLeftBottom(50, 30);
		this.setFrequency(frqmin, frqmax);
		this.setXYCount(10, 10);
		this.Initialize('waterfall');
	}

    render() {
	/*----------------内部变量-------------------*/
		// ------------------------------------------------------------时频瀑布图API
		/* 显示时间轴右侧时间文字 */
		this.currentdate = new Date(); // 获取当前时间；
		this.minutetime ='';
		this.secondtime =''; // 时间、秒

        // ------------------------------------------------------------画布基本属性
        this.width = 0;// 画布宽度
        this.height = 0;// 画图高度
        this.margin_x = 49;// y轴距离画布左边的距离 默认49
        this.margin_y = 49;// x轴距离画布底边的距离 默认49
        this.name = "";// 图表名称，默认为空
        
        // -------------------------------------------------------------绘图环境属性
        this.contentname = "";// 画布容器标签名
        this.canvas_old_mainID = -1;// 画布上一次的主标识
        this.casvas_mainID = -1;// 画布相关对象主标识
        this.canvas_color = null;// 渐变条画布对象
        this.canvas_cxt_color = null;// 画布绘画环境，包括x轴、y轴、网格线、数据
        this.canvas_color_offline = null;// 渐变条离线画布对象
        this.canvas_color_cxt_offline = null;// 渐变条离线绘画环境
        this.canvas = null;// 数据画布对象
        this.canvas_cxt_base = null;// 画布绘画环境，包括x轴、y轴、网格线、数据
        this.canvax_xLable = null;// x轴 画布对象
        this.canvas_cxt_xLable = null;// 绘制x轴标识 刻度
        this.canvas_yLable = null;// y轴 画布对象
        this.canvas_cxt_yLable = null;// 绘制y轴标识 刻度
        this.canvas_mouse = null;// 鼠标操作 画布对象
        this.canvas_cxt_mouse = null;// 进行鼠标操作
        this.canvas_time = null;// 时间轴画布
        this.canvas_cxt_time = null;// 时间轴绘图环境
        
        // ---------------------------------------------------------------业务属性
        this.x_min = 0;// x轴，起始频率值
        this.x_max = 0;// x轴，终止频率值
        this.x_old_min = 0;// x轴，记录最开始初始化时的起始频率值
        this.x_old_max = 0;// x轴，记录最开始初始化时的终止频率值
        this.y_min = 0;// y轴，起始幅度值
        this.y_max = 0;// y轴，终止幅度值
        this.xunit = 'MHz';// x轴单位，默认为MHz
        this.mouse_command = 1;// 鼠标功能 1:网格标绘功能 2:缩放功能 3:回调功能
        this.suofangPointx1 = 0;// 缩放功能起始点横坐标
        this.suofangPointy1 = 0;// 缩放功能起始点纵坐标
        this.suofangPointx2 = 0;// 缩放功能终止点横坐标
        this.suofangPointy2 = 0;// 缩放功能终止点纵坐标
        this.suofang_frqmin = 0;// 缩放功能频率起始值
        this.suofang_frqmax = 0;// 缩放功能频率终止值
        this.huidiaoPointx1 = 0;// 回调功能起始点横坐标
        this.huidiaoPointy1 = 0;// 回调功能起始点纵坐标
        this.huidiaoPointx2 = 0;// 回调功能终止点横坐标
        this.huidiaoPointy2 = 0;// 回调功能终止点纵坐标
        this.huidiao_frqmin = 0;// 回调功能频率起始值
        this.huidiao_frqmax = 0;// 回调功能频率终止值
        
        // ---------------------------------------------------------------功能属性
        this.PIX_COUNT = 200;// 电平渐变色个数，默认为254
        this.time = 100; // 缓存时间（秒）；
        this.xcount = 10;// x轴主刻度个数，默认10个
        this.ycount = 10;// y轴主刻度个数，默认10个
        this.ytime_count = 5;// y轴 时间轴的刻度数，每个分隔为5个刻度
        this.yrange_count = 5;// y轴 幅度轴的刻度数，每个分割为5个刻度
        this.xfrq_count = 5;// x轴 频率轴的辅助刻度数，每个分隔为5个刻度
        this.isReceiveData = true;// 是否接收数据
        this.receiveTimeArray = null;// 保存接收时间
        this.callbackmethod = null;// 回调函数变量
        this.currentPixIndex = 0;// 保存当前数据接收的索引值
        this.m_pubutu_data = null;// 保存瀑布图缓存数据

        // ---------------------------------------------------------------瀑布图图片像素点
        this.m_imagedata = null;// 瀑布图图片数组
        this.m_currentline = 0;// 瀑布图当前更新行数
        this.canvas_data_offline = null;// 瀑布图离线画布
		this.canvas_data_cxt_offline = null;// 瀑布图离线画布绘画环境
		
        return (
            <div>
                <div id="waterfall" style={{width:1200,height:250}}></div>
            </div>
        )
    }
}
