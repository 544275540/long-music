<template>
  <div >
      <!-- 搜索框  -->
        <div class="seek">
            <input type="text" >
            <div class="fdj"><i class=" iconfont icon-fangdajing"></i></div>
        </div>
       <!-- 链接源选址 -->
      <div class="music_y">
          <div @click="List=1"><i class="iconfont icon-yinleliebiao"></i></div>
          <div @click="List=2"><i class="iconfont icon-shoucangdaogedan"></i></div>
      </div> 
    
    <!-- 歌曲源获取 -->
    <div class="sourceFile">
        <!-- 歌曲列表 -->
            <theSongList v-if="List==1"   ref="mychild"></theSongList>
        <!-- 添加播放歌曲 -->
            <addTheSongs v-if="List==2"></addTheSongs>
    </div>
  </div>
</template>

<script>
import fs from 'fs';


import theSongList  from  './theSongList/theSongList';
import addTheSongs  from  './addTheSongs/addTheSongs';


  export default {
    data() {
        return {
            List:1,
        }
    },
    components:{theSongList,addTheSongs},
    created:function(){
      this.driveTest()
        
    },
    methods: {
        driveTest(){//盘符检测
            for(var i=0;i<25;i++){
                // let drive=String.fromCharCode((65+i))+':';
                // let that=this;
                // fs.readdir(drive, function(err, data){
                //     if(err){
                //     // console.log(err);
                //     }else{  
                //         that.drives.push(drive.slice(0,1)+':')
                //     // console.log(data,'cg');
                //     }
                // });
            }  
        },
        seekPf(){
            for(var i=0;i<25;i++){
                let drive=String.fromCharCode((65+i))+':';
                let that=this;
                fs.readdir(drive, function(err, data){
                    if(err){
                    // console.log(err);
                    }else{  
                        that.drives.push(drive.slice(0,1)+':')
                    // console.log(data,'cg');
                    }
                });
            }
        },
        nextMusic(){//下一曲
          this.$refs.mychild.nextMusic();
        }
    }
  }
</script>

<style lang="scss">
    
    //查找歌曲
    .seek{
        width:100%;
        height: 40px;
        background: #fff;
        position: relative;
        input{
            width: 100%;
            height: 100%;
            background: #fff;
            border: none;
            outline:none;
            padding-left: 20px;
            box-sizing:border-box;
            font-size:20px;
            color:#333;
        }
        .fdj{
            position: absolute;
            right: 0px;
            
            top:0px;
            text-align: center;
            border: none;
            
            width: 40px;
            height: 40px;
            cursor: pointer;
            i{
                
                font-size: 20px;
                line-height: 40px;
            }
        }
    }
    //歌曲源
    .music_y{
        width: 100%;
        height: 30px;
        position: relative;
        margin-top:20px; 
        div{
            background: #93d5dc;
            width:150px;
            height: 100%;
            float: left;
            text-align: center;
            line-height: 30px;
            color: #fff;
            cursor: pointer;
            border: 1px solid #f1f0ed;
            box-sizing: border-box;
            
            i{
               font-size: 20px;
                margin-right:15px; 
                line-height: 30px;
                color: #fff;
            }
        }
        div:nth-child(2){
            border-right: none;
            
        }
        
    }
    .sourceFile{
        width: 300px;
        height: 100%;
       
    }
</style>
