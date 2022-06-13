<template>
  <v-row no-gutters>
    <v-col cols="12" md="6">
      <v-img src="/topSection/Hospital-Furniture.jpg" content-class="center">
        <div style="color:white; margin-left:-280px; margin-top:150px;">
          <h2>Hospital Furniture</h2>
        <v-btn v-on:click="viewMore" outlined style="color: white; margin-top: 10px" >View More</v-btn>
        </div>
      </v-img>
    </v-col>
    <v-col cols="12" md="6">
      <v-img src="/topSection/Radiology-Imaging.jpg">
        <div style="color:white; margin-left:-280px; margin-top:150px;">
          <h2>Radiology Imaging</h2>
          <v-btn v-on:click="viewMore" outlined style="color: white; margin-top: 10px" >View More</v-btn>
        </div>
      </v-img>
    </v-col>
    <v-col cols="12" md="4">
      <v-img src="/topSection/Surgical-Supply.jpg">
        <div style="color:white; margin-left:-180px; margin-top:150px;">
          <h3>Surgical Supply</h3>
          <v-btn v-on:click="viewMore" outlined style="color: white; margin-top: 10px" >View More</v-btn>
        </div>
      </v-img>
    </v-col>
    <v-col cols="12" md="4">
      <v-img  src="/topSection/Medical-Disposables.jpg">
        <div style="color:white; margin-left:-180px; margin-top:150px;">
          <h3>Medical Disposables</h3>
          <v-btn v-on:click="viewMore" outlined style="color: white; margin-top: 10px" >View More</v-btn>
        </div>
      </v-img>
    </v-col>
    <v-col cols="12" md="4">
      <v-img src="/topSection/Consumer-Goods.jpg">
        <div style="color:white; margin-left:-180px; margin-top:150px;">
          <h3>Consumer Goods</h3>
          <v-btn v-on:click="viewMore" outlined style="color: white; margin-top: 10px" >View More</v-btn>
        </div>
      </v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "topSection",
  methods:{
    viewMore(){
      this.$router.push('c/clinical-laboratory')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
