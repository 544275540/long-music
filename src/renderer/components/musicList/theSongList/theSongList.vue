<template>
  <div id="songList">
      <div class="line" v-for="(v,k,i) in  nList">
          <span @dblclick="neM(v,i)">{{$tool.fileName(v)}}</span>
      </div>
  </div>
</template>

<script>
import fs from 'fs'//系统fs板块
import path from 'path'
import { setTimeout, setInterval } from 'timers';



  export default {
    data() {
        return {
           nList:{},
           index:null,
        }
	},
    created:function(){
        let that=this;   
        setTimeout(function(){that.seekMusic()},0)
    },
    mounted:function(){
        // setInterval(this.seekMusic(),5000)
        
    },
    methods: {
        
        //获取歌曲列表
        seekMusic(){
            let fileContents = fs.readFileSync(path.join(__static, '/json/music.json'), 'utf8')
            this.nList=JSON.parse(fileContents)
            this.nextMusic()
        },

        //向播放器提交播放文件
        neM(file_n,i){
            this.$store.commit('nextMusic',file_n);
           this.index=i
        },
        nextMusic(){
            let obj=this.nList;
            if(this.index+1==Object.values(obj).length){
                this.$store.commit('nextMusic',Object.values(obj)[0]);
            }else{
                this.$store.commit('nextMusic',Object.values(obj)[this.index+1]);
            }
            
        }
    }
  }
</script>

<style lang="scss">
    .line{
        width:100%;
        height: 50px;
        line-height: 50px;
        padding-left:30px;
        color: #fff;
        span{
            cursor: pointer;
        }  
    }
</style>
