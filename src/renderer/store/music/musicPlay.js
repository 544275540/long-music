export default {
    state:{
        dynamicList:[],//已播放列表
        conventionalList:[],//常规列表

        currentMusic:null,//当前播放音乐


        current:'',
    },
    mutations:{
    	
        nextMusic(state,musicFile){
            state.current=musicFile
        }
    },
    actions:{
    	
    },
    getters:{
    	curr: (state) => {//通过属性访问
    		return state.current
  		}

    },
}
