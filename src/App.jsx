import React, { Component } from 'react';
import Spectrum from './charts/Spectrum'
import Waterfall from './charts/Waterfall'
import Constellation from './charts/Constellation'



export default class App extends Component {

    randomNum =(min, max) =>{//设置随机数
		let range = max - min;
		let rand = Math.random();
		let num = min + rand * range;
		return num;
    }
    
    onloadall = ()=>{//频谱瀑布图加载数据方法
        let k = 0;
        if (k <= 3000) {
			let count = 3000;
			let data = new Array(2);
			for ( let i = 0; i < data.length; i++) {
				data[i] = new Array(count);
			}
			let frqtemp = (this.frqmax - this.frqmin) / count;
			for ( let i = 0; i < count; i++) {
				data[0][i] = this.frqmin + i * frqtemp;
				data[1][i] = this.randomNum(-110, -90);
			}
			data[1][k] = this.randomNum(-70, -75);
            this.spectrumCom.SetValue(data);
            this.waterfallCom.SetValue(data)
			k += 1;
			setTimeout(this.onloadall, 100);
		} else {
			k = 0;
		}
    }

    xingzuoData = ()=>{//星座图加载数据方法
        let count = 100;
		let data = new Array(2);
		for ( let i = 0; i < data.length; i++) {
			data[i] = new Array(count);
		}
		let perkey = count / 5;
		for ( let i = 0; i < count; i++) {
			if (i <= perkey) {
				data[0][i] = this.randomNum(800, 825);//x
				data[1][i] = this.randomNum(700, 725);//y
			} else if (i > perkey && i <= 2 * perkey) {
				data[0][i] = this.randomNum(400, 425);//x
				data[1][i] = this.randomNum(400, 425);//y
			} else if (i > 2 * perkey && i <= 3 * perkey) {
				data[0][i] = this.randomNum(0, 25);//x
				data[1][i] = this.randomNum(0, 25);//y
			} else if (i > 3 * perkey && i <= 4 * perkey) {
				data[0][i] = this.randomNum(-400, -425);//x
				data[1][i] = this.randomNum(-400, -425);//y
			} else if (i > 4 * perkey && i <= 5 * perkey) {
				data[0][i] = this.randomNum(-800, -825);//x
				data[1][i] = this.randomNum(-700, -725);//y
			}
        }
        this.constellationCom.SetValue(data);
        setTimeout(this.xingzuoData,100);
    }

    render(){
        this.frqmin = 900;//频谱图与瀑布图X轴坐标
        this.frqmax = 1000;//频谱图与瀑布图X轴坐标

        return(
            <div style={{display:'flex'}}>
                <div style={{width:'65%',height:'100%'}}>
                    <h1>频谱图：</h1>
                    <Spectrum 
                        ref={c => this.spectrumCom = c}
                        frqmin = {this.frqmin}
                        frqmax = {this.frqmax}
                    />
                    <h1>瀑布图：</h1>
                    <Waterfall 
                        ref={c => this.waterfallCom = c}
                        frqmin = {this.frqmin}
                        frqmax = {this.frqmax}
                    />
                    <br/><br/>

                    <h1>频谱图瀑布图操作：</h1>
                    <button onClick = {this.onloadall}>加载频谱瀑布图数据</button>
                </div>

                <div style={{width:'35%',height:'100%'}}>
                    <br/><br/><br/><br/><br/><br/>
                    <h1>星座图：</h1>
                    <Constellation 
                        ref={c => this.constellationCom = c}
                    />
                    <br/><br/>
                    <h1>星座图操作：</h1>
                    <button onClick = {this.xingzuoData}>加载星座图数据</button>
                </div>
            </div>
        )
    }
}
