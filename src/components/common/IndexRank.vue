<template>

<div class="bang">
      <div class="playlist-song" v-for="(item, i) in top_list" :key="i">
        <div class="tops_imgs">
            <el-image class="img" :src="item.coverImgUrl"></el-image>
            <span>{{ item.name }}</span>
        </div>
        <div class="item_1">
          <ol>
            <li v-for="(songItem, i) in songList[item.id]" :key="i">
              <i>{{ i + 1 }}</i>
              <div class="info">
                 <router-link :to="{ path: '/song', query: { id: songItem.id }}" class="song_name">{{songItem.name}}</router-link>
               
              </div>
              
            </li>
          </ol>
        </div>
    </div>
    </div>
</template>

<script>
    import {listDetail, topList} from "../../networks";
    export default {
        name: "IndexRank",
        data(){
            return{
                top_list:[],
                songList: {},
            }
        },
        created() {
            this.getToplist();
        },
        methods:{
            //排行榜
            getToplist () {
                topList().then((r) => {
                    this.top_list = r.list.splice(0, 4)
                    this.top_list.forEach( item => {
                        listDetail({ id: item.id }).then(res =>{
                            this.$set(this.songList,item.id,res.playlist.tracks.splice(0, 6))
                        })
                    })
                })
            },
        }
    }
</script>

<style scoped lang="scss">
@import "src/assets/css/indexrank";
</style>
