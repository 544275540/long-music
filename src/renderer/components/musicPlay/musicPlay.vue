<template>
  <div >
      <div class="play_graphic">
          <canvas id='canvas' width="200" height="200"></canvas>

      </div>

      <div class="play_nav">
         <!-- 进度条 -->
          <div class="play_progressBar">
              
              <span class="left">{{palyName}}</span>
               
                
                 

                 
              <span class="right">{{time.currentTime}}/{{time.palyTime}}</span>
              
              <div class="progress_playMusic">
                  <span :style="{'width': time.percent+'%'}"><b class="point"></b></span>
                  
              </div>
          </div>

          <!-- 基础播放按钮 -->
          <div class="play_basic">
              <!-- 前一首 -->
              <i class="iconfont icon-ziyuanldpi4" @click="forward"></i>
              <!-- 播放暂停 -->
              <i class="iconfont icon-ziyuanldpi7 noblock" @click="playFun(1)" :class="musicPlay==true?'':'play'"></i>
              <i class="iconfont icon-ziyuanldpi2 noblock" @click="playFun(2)" :class="musicPlay==true?'play':''"></i>
              <!-- 后一首 -->
              <i class="iconfont icon-ziyuanldpi5" @click="next"></i>
          </div>
         
          <!-- 其他按钮 -->
          <div class="play_other">

          </div>
      </div>
  </div>
</template>

<script>
import fs from 'fs'//系统fs板块
import { clearInterval } from 'timers';

  export default {
    
    data() {
        return {
            palyName:'',//播放文件名
            time:{
              palyTime:0,//播放文件总时长
              currentTime:0,//当前播放时长

              sumTime:0,//总时长秒数
              current:0,//当前播放秒数
              percent:0,//播放百分比
            },
            plan:null,//进度条
            

            playBuff:null,//要播放的音乐
            ac:null,//音频实例
            ana:null,//音频频率


            musicPlay:false,//音乐播放暂停
        }
	},
    created:function(){
      
        
    },
    methods: {
      //音频数据源解析
        buffer(music){
          //获取音乐文件本体
          const buf = fs.readFileSync(music);
          //创建bufferArray，用来装音频数据
          const uint8Buffer = Uint8Array.from(buf);
          // 寄存音频数据
          this.playBuff=uint8Buffer;
        },
      //音频播放控件启用
        analyMusic(){
          //创建音频实例
          const AC = new window.AudioContext();
          //实例挂载
          this.ac=AC;
          // createAnalyser它可以用来显示音频时间和频率的数据
          const analyser = AC.createAnalyser();
          analyser.fftSize = 512;
          // 寄存音频频率及其他
          this.ana=analyser

        },
        playMusic(){
          // 音频解码
          let that = this;
          
          this.ac.decodeAudioData(this.playBuff.buffer)
          .then(audioBuf => {
            
              // 创建播放音轨
              const bs = that.ac.createBufferSource();
              // 音频源信息获取   时长/字节长/信号通道/抽样率
              bs.buffer = audioBuf;
              //播放时长秒数
              that.time.palyTime= this.$tool.musicTime(bs.buffer.duration);
              that.time.sumTime= bs.buffer.duration;

              
              //歌曲计时器
              that.plan=setInterval(() => {
                
                if(that.time.current<that.time.sumTime){
                    that.time.current=that.time.current+0.1;
                    that.time.percent=(that.time.current/that.time.sumTime)*100
                    that.time.currentTime=that.$tool.musicTime(that.time.current.toFixed(0))
                }else{
                  if(that.palyName!=''){
                    that.$parent.newMus()
                  }
                }
                 
              },100)  
             

              // 将解析的音频源信息附加到音频上
              bs.connect(that.ana);
              that.ana.connect(that.ac.destination);
              bs.start();
          });

            
            // const audio = this.$refs.audio;
            // const source = that.ac.createMediaElementSource(this.$refs.audio);
            // source.connect(this.ana);
            // this.ana.connect(that.ac.destination);
        },
        // 结束音乐源
        close(){
          this.ac.close()
        },
        // 播放暂停
        playFun(v){
            if(v==1){
                this.musicPlay=true;
            }else{
                this.musicPlay=false;
                this.ac.close()
            }
        },
        forward(){

        },
        next(){
          this.$parent.newMus()
        }

    },
    
		watch: {
			'$store.state.music.current'(n){
        //n当前音乐文件路径    
          if(this.palyName!=''){
              this.close();//关闭上一个音乐
              this.$tool.clear(this.plan)
                   
          }
          this.time.current=0;
          this.time.percent=0;
          


          this.palyName=this.$tool.fileName(n);//获取文件名
          this.buffer(n);//创建音乐实例
          this.analyMusic();//创建音频播放解析
          this.playMusic();//播放音乐
          
      }
		}
  }
</script>

<style lang="scss">
    .play_graphic{
      flex: 1;
    }
    
    .play_nav{
      height: 100px;
      width: 100%;
      display:flex;
      flex-direction:row;
      justify-content:flex-start;
      .play_basic{
        width: 180px;
        height: 100%;
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        i{
          font-size: 30px;
          line-height: 100px;
          color: #fff;
          cursor: pointer;
        }
        .noblock{
          display: none
        }
        .play{
          display: inline-block!important;
        }
      }
      .play_progressBar{
        flex: 1;
        height: 100%;
        position: relative;
      
        .progress_playMusic{
          border-radius:4px;
          
          width: 90%;
          height: 8px;
          background: #fff;
          position: absolute;
          top: 60px;
          left:20px;
          span{
            border-radius:4px;
            display: inline-block;
            height: 8px;
            background: #666;
            float: left;
            transition: 100ms;
            position: relative;
            .point{
              border-radius:50%; 
              width: 8px;
              height: 8px;
              display: inline-block;
              background: #000;
              position: absolute;
              right: -4px;
              top: 0px;
              transition: 60ms;
              cursor: pointer;
            }
            .point:hover{
              transform: scale(1.3)
            }
          }
        }
        .left{
          position: absolute;
          top: 35px;
          left:20px;
        }
        .right{
          position: absolute;
          top: 35px;
          right: 20px;
        }
        span{
          font-size: 12px;
          color: #fff;
        }
      }
      .play_other{
        width: 180px;
        height: 100%;
      }
    }
    
</style>
