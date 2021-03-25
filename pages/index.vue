<template>
  <div class="container" :class="{ darkMode : darkMode }">
    <div class="leftSide">
      <a href="javascript:;" class="darkModeBtn" @click="darkMode = !darkMode">
        <span v-if="!darkMode">Dark mod</span>
        <span v-if="darkMode">Light mod</span>
      </a>
      <div class="content">
        <img class="logo" src="@/assets/images/head.jpg" alt="Dedikodu Yay">
        <h1 class="headline">
          Dedikodu Yay!
        </h1>
        <h2 class="description">
          İçinde tutma, şişersin. Yay gitsin :)
        </h2>
        <form @submit.prevent="newGossip()">
          <div v-if="!postSent" class="formWrap">
            <input v-model="name" class="name" type="text" placeholder="İsim? (Zorunlu değil, salla gitsin)">
            <textarea v-model="gossip" maxlength="500" required class="newGossip" placeholder="Ne olmuş, ne demiş ki?" />
            <button type="submit" class="send">
              YAY GİTSİN
            </button>
          </div>
        </form>
        <div v-if="postSent" class="gossipSuccessed">
          Dedikodu uçtu gitti, bunu herkes duymalıydı..
        </div>
        <div v-if="!timer" class="newGossipCounter">
          <span>Yeni dedikodu için beklemen gereken süre: {{ minutes }}:{{ seconds }}</span>
        </div>
        <span class="info">
          İsim vermeden tamamen anonim bir şekilde dedikodu yayabilirsin, en azından içinde kalmaz. Arkadaşlarınla paylaşabilirsin. Kimin yazdığı belli değil sonuçta :)
        </span>
      </div>
    </div>
    <div class="rightSide">
      <div class="headline">
        Son dedikolular
      </div>
      <div class="gossips">
        <div v-for="(g, index) in gossipList" :key="index" class="gossip">
          <span class="msg">{{ g.gossip }}</span>
          <span class="dateName">
            <span v-if="g.name" class="name">{{ g.name.charAt(0).toUpperCase() + g.name.slice(1) }}</span>
            <span v-if="!g.name" class="name">Anonim</span> {{ g.date }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  data () {
    return {
      gossipList: [],
      name: '',
      gossip: '',
      countdownDate: '',
      postSent: false,
      timer: true,
      id: null,
      now: Math.trunc((new Date()).getTime() / 1000),
      darkMode: false
    }
  },
  computed: {
    dateInMilliseconds () {
      return Math.trunc(Date.parse(this.countdownDate) / 1000)
    },
    seconds () {
      return (this.dateInMilliseconds - this.now) % 60
    },
    minutes () {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
    }
  },
  mounted () {
    this.getGossips()
  },
  methods: {
    setTimer () {
      window.setInterval(() => {
        if ((new Date()).getTime() > this.countdownDate.getTime()) {
          this.timer = true
          this.postSent = false
        } else {
          this.timer = false
        }
      }, 1000)
    },
    getGossips () {
      firebase.firestore().collection('dedikodular').orderBy('id', 'desc').onSnapshot((querySnapshot) => {
        const allMessages = []
        querySnapshot.forEach((doc) => {
          allMessages.push(doc.data())
        })
        this.gossipList = allMessages
      })
    },
    getCurentDateTime () {
      const today = new Date()
      const date = `${today.getFullYear()}/${(today.getMonth() + 1)}/${today.getDate()}`
      const time = `${today.getHours()}:${today.getMinutes()}`
      return `${time} - ${date}`
    },
    newGossip () {
      const d = new Date()
      this.countdownDate = new Date(d.getTime() + 1 * 10000)
      window.setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000)
      }, 1000)

      firebase.firestore().collection('dedikodular').add({
        name: this.name,
        gossip: this.gossip,
        date: this.getCurentDateTime(),
        id: Date.now()
      }).then(() => {
        this.postSent = true
        this.setTimer()
        this.name = ''
        this.gossip = ''
      })
    }
  }
}
</script>
