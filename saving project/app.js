const app = Vue.createApp({
    data(){
        return{
            inputSaving: 0,
            toolsarray: [[0],[0]],
            boolresult: false,
        }
    },
    methods: {
        seeResult(array){
            this.toolsarray = array
            this.boolresult = true
        }
    }
})


app.component('tools',{
    template:
    /*html*/
    `
    <div id='tools'>
        <h2>Tools</h2>
        <div>
            Projectory Year : <input v-model="year" type="text"> <button @click="yearInp">OK</button>
        </div>
        <div>
            <button>-</button> Normal Saving
        </div>
        <div v-for="(int,index) in arrInterest">
            <button>-</button> Saving with <input v-model="arrInterest[index]" type="text" placeholder="___">% interest
        </div>
        <div>
            <button @click="arrInterest.push(0)">+</button>
        </div>
        <br><br>
        <div>
            <button @click="seeResult">See Result!</button>
        </div>
    </div>
    `,
    data(){
        return{
            arrInterest: [0,],
            year: null,
            arrYear: []
        }
    },
    methods : {
        yearInp(){
            this.arrYear = []
            for (let i=0; i < this.year; i++){
                this.arrYear.push(0)
            }
        },
        seeResult(){
            let toolsReturn = [
                this.arrInterest,
                this.arrYear
            ]
            this.$emit('seeResult', toolsReturn)
        }
    }
})


app.component('result',{
    template:
    /*html*/
    `
    <div v-if="boolresult" id='result'>
        <h2>Result</h2>
        <div class='year' v-for="(year,index) in toolsarray" :key="index">
            <h4> Year {{index+1}}</h4>
            <p v-for="(int,index2) in arrInterest" :key="index2">
            {{int}}
            </p>
        </div>
    </div>
    `,
    props: {
        boolresult: Boolean,
        toolsarray: Array,
    },
    data(){
        return{
            arrInterest: this.toolsarray[0],
            arrYear: this.toolsarray[1],
        }
    }
})










app.mount('#app')