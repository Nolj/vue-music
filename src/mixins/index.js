import {getServeLikedSong, likeSongofName, songLyric, songUrl} from "../networks";
import {mapGetters} from "vuex";

export const mixin = {
    computed:{
        ...mapGetters([
            'loginIn',
            'userId',
            'AsidePlayList',
        ])
    },
    methods:{
        attachImageUrl(srcUrl){
            return srcUrl ? srcUrl : '../assets/img/user.jpg';
        },
        //模糊搜索
        getSong(){
            if(!this.$route.query.keywords){
                this.$store.commit('setListOfSongs',[])
                console.log('您输入的内容为空')
            }
            else {
                likeSongofName(this.$route.query.keywords).then(res =>{
                    if(res.length){
                        this.$store.commit('setListOfSongs',[])
                        console.log('您输入的内容为空')
                    }else{
                        this.$store.commit('setListOfSongs',res.result.songs)
                        console.log(res.result);
                        // console.log(res.result.songs[0].id);
                        // console.log(res.result.songs[0].ar[0].name);
                        // console.log(res.result.songs[0].al.picUrl);

                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        //播放
        toPlay(id,picUrl,index,name,artist,params){
            this.$store.commit('setId',id);
            this.getUrl(id);
            this.$store.commit('setPicUrl',picUrl);
            this.$store.commit('setListIndex',index);
            this.$store.commit('setTitle',name);
            this.$store.commit('setArtist',artist);
            this.getLyric(id);
            if(params){
                this.AsidePlayList.push(params)
                this.$store.commit('setAsidePlayList',this.unique(this.AsidePlayList))
            }
            if(this.loginIn){//是否收藏
                getServeLikedSong(this.userId).then(res =>{
                    for(let item of res.data){
                        if(item.tid == id){
                            this.$store.commit('setIsActive',true);
                            break;
                        }
                    }
                })
            }
        },
        //获取歌曲的url
        getUrl(id){
            songUrl(id).then(res =>{
                // console.log(res);
                this.$store.commit('setUrl',res.data[0].url);
            }).catch(err => {
                console.log(err);
            });
        },
        //获取歌词
        getLyric(id){
            songLyric(id).then(res =>{
                // console.log(res.lrc.lyric);
                this.$store.commit('setLyric',res.lrc.lyric);
            }).catch(err => {
                console.log(err);
            });
        },
        //去重
        unique(arr) {
            const strings = arr.map((item) => JSON.stringify(item));
            const removeDupList = [...new Set(strings)]; //也可以使用Array.from(new Set(strings))
            const result = removeDupList.map((item) => JSON.parse(item));
            return  result;
        },
        format(value,format){
            return this.$moment(value).format(format||'YYYY-MM-DD hh-mm-ss')
        }
    }
}
