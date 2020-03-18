<template>
  <div id="music">
      <musicList id="musicList" ref="mychild"></musicList>

      <div id="nav_music">
          <musicMenu id="musicMenu"></musicMenu>
          <musicPlay id="musicPlay"  :next="newMus"></musicPlay>
      </div>
  </div>
</template>

<script>
import musicList from './musicList/musicList'
import musicMenu from './menu/menu'
import musicPlay from './musicPlay/musicPlay'


  export default {
      components:{
        musicList,musicMenu,musicPlay
      },
    created:function(){
      
        
    },
    methods: {
        newMus(){//下一曲
          this.$refs.mychild.nextMusic();
        }
    }
  }
</script>

<style>
#music{
  height: 100%;
  background:rgb(77, 203, 214) ;
  position: relative;
  display:-webkit-flex;
  display:flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:flex-start;
}




#musicList{
    width:300px;
    height: 100%; 
    background:rgb(45, 175, 187);
    z-index: 100;
}
#nav_music{
  flex: 1;

  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  
}



#musicMenu{
  width: 100%;
  height:40px;
  -webkit-app-region: drag;
}
#musicPlay{
  flex:1;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
}


 
</style>
