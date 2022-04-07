<template>
    <v-container>
        <v-row>
            <v-col xs="6" sm="3" md="3">
                <v-btn
                        class="mx-2"
                        dark
                        small
                        color="primary"
                        @click="generateLoremIpsun"
                >Generate LoremIpsum
                </v-btn>
            </v-col>
            <v-col xs="6" sm="3" md="3">
                <v-btn
                        class=" "
                        dark
                        small
                        color="warning"
                        @click="clearEditor"
                >Clear
                </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-show="toggleShowEditor"  :cols="!isMobile() ? 8 : 12">
                <v-textarea
                        solo
                        label="Word Counter"
                        counter="true"
                        messages="Word Counter"
                        @keyup="onChangeEditor"
                        v-model="contentEditor"
                        id="editor"
                ></v-textarea>
            </v-col>
            <v-col :cols="!isMobile() ? 4 : 12" v-show="!isMobile() || isMobile() && !toggleShowEditor">
                <template>
                    <v-card
                            max-width="400"
                            tile
                    >
                        <v-list-item  v-show="items.length > 0">
                            <v-list-item-content >
                                <v-list-item-title>
                                    <span class="word" >{{items.length}} words </span>
                                    <span class="float-end">
                                         <v-btn
                                                 class="mx-2"
                                                 fab
                                                 dark
                                                 x-small
                                                 color="success"
                                         >{{totalWords}}
                                         </v-btn>
                                    </span>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <transition-group name="flip-list"  tag="div" class="list">
                            <template v-if="items.length > 0" >
                                <v-list-item  v-for="(item,index) in items" :key="index+item.word" >
                                    <v-list-item-content >
                                        <v-list-item-title>
                                            <span class="word" >{{item.word}}</span>
                                            <span class="float-end">
                                         <v-btn
                                                 class="mx-2"
                                                 fab
                                                 dark
                                                 x-small
                                                 color="primary"
                                         >{{item.count}}
                                         </v-btn>
                                    </span>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </transition-group>

                    </v-card>
                </template>
            </v-col>

        </v-row>
        <template v-if="isMobile()">
            <vue-fab mainBtnColor="#3599DB"   fabItemAnimate="default"  id="mobile_float_menu" icon="*" active-icon="*">
                <fab-item v-if="!toggleShowEditor" @clickItem="onClickMobileMenu" :idx="0"  icon="Show Text Editor" />
                <fab-item v-else @clickItem="onClickMobileMenu" :idx="0"  icon="Hide Text Editor" />
            </vue-fab>
        </template>


    </v-container>
</template>
<style>
    #editor{
        min-height: 750px;
    }
    .word{
        position: relative;
        top: 5px;
    }
    .list{
        max-height: 708px;
        overflow-y: scroll;
    }

    ::-webkit-scrollbar {
        display: none;
    }
    /*TRANSITION EFFECTS*/
    .flip-list-move {
        transition: transform 1s;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }


    /*MOBILE VERSION*/
    @media (max-width: 600px) {
        #editor{
            min-height: 750px;
            font-size: 30px;
        }
        #mobile_float_menu{
            display: block !important;
        }
    }
</style>
<script>
    import LoremIpsum from "../Utils/LoremIpsum";
    import StringNormalizer from "../Utils/StringNormalizer";

    export default {
        name: 'Editor',

        data: () => ({
            contentEditor:'',
            loading:false,
            stringNormalizer:null,
            showWordCounter:false,
            toggleShowEditor:true,

            items: [
                // {
                //     word:'hola',
                //     count:12
                // },
            ],
        }),

        methods:{
             async loadItems(){
                this.items = [];

                 const  splittedText = this.contentEditor.split(' ');

                //Creating data structure
                splittedText.forEach((word)=>{

                    //prepare word
                    word = this.stringNormalizer.normalize(word);

                    if (word.length > 0){
                        let exists = this.items.filter((data)=>{
                            return data.word === word;
                        }).length > 0;

                        if (exists){
                            this.items.find(item => item.word === word).count ++;
                        }else{
                            this.items.push({
                                word,
                                count:1
                            });
                        }
                    }
                });

                //Sorting array.
                this.items = this.sortByKey(this.items,'count');

             },
             async onChangeEditor(){
                 await this.loadItems();
              },

            //Function to sord words by counts
             sortByKey(array, key) {
                return array.sort(function(a, b) {
                    var x = a[key];
                    var y = b[key];
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });
            },

            //Function to generate test text
            generateLoremIpsun(){
                this.contentEditor = LoremIpsum.generateText();
                this.onChangeEditor();
            },
            //Clear Editor
            clearEditor(){
                 this.contentEditor = '';
                 this.onChangeEditor();
            },

            //MOBILE MENU
            onClickMobileMenu(){
                console.log('click mobile menu !')
                this.toggleShowEditor = !this.toggleShowEditor;
            },
            isMobile() {
                let widthPixels = window.screen.width * window.devicePixelRatio;
                if (widthPixels <= 760) {
                    return true
                } else {
                    return false
                }
            },
        },
        computed: {
            totalWords() {
                let total = 0;

                this.items.forEach((item)=>{
                   total += item.count;
                });
                return total;
            },

        },
        beforeMount() {
            this.stringNormalizer = new StringNormalizer();
            this.showWordCounter = !this.isMobile();

        }
    }
</script>
