<template>
<div class="signup text-secondary ">
    <h1 class="ml-[25%]">Sign In </h1>
    
    <div class="grid grid-cols-12 gap-4">

     <div class="left col-span-6 mt-10">
            <!-- <p>*Required</p> -->
            <div class="field">
                <h4 class="px-10 py-6 uppercase font-bold">Returning Customers</h4 >
                    <p1 class="px-10 py-4">Please Sign In</p1>
                    <div class="m-8">
                        <label class="block text-dark_gray text-sm font-bold mb-2" for="username">
                            *EMAIL ADDRESS/USER ID
                        </label>
                        <input class="shadow appearance-none border border-primary  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" >
                     </div>

                     <div class="m-8">
                        <label class="block text-dark_gray text-sm font-bold mb-2" for="username">
                            *PASSWORD
                        </label>
                        <input class="shadow appearance-none border border-primary  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" >
                     </div>

                     <div class=" justify-center flex">
                            <button class="bg-secondary text-white w-1/3 h-16 font-bold mb-8 but"> SIGN IN</button>    
                            <!-- <span class="ml-4 text-large"> Forgot Password?</span> -->
                        </div>
                    
                        <div class=" justify-center flex ">
                            <nuxt-link to="#"> 
                            <span class="text-secondary w-1/3 h-16  mb-8 ml-16 "> forgot password?</span>    

                            </nuxt-link>
                            <!-- <span class="ml-4 text-large"> Forgot Password?</span> -->
                        </div>
                  
     </div>


    </div>
       <div class="col-span-6 mt-10"> 
            <div class="right">
                <h4 class="px-10 py-6 uppercase font-bold">Why Register?</h4 >
                    <h4 class="px-10 ">Register today and enjoy these benefits</h4>

                    <ul class="mx-16 my-4">
                        <li>Full account records, order history, invoices & tracking</li>
                        <li>Wishlist organized saved items to order later</li>
                        <li>Create & track quotes</li>
                        <li>Keep a record of payment transactions</li>
                        <li>Discounts & special packages</li>


                    </ul>

                    <h4 class="px-16 pt-10">Don't hava an account?</h4>
                    <div class="mx-16">
                        <nuxt-link to="/signup"> 
                            <button class="bg-secondary text-white w-1/3 h-16 font-bold mb-8 but"> REGISTER</button>    

                        </nuxt-link>
                            <!-- <span class="ml-4 text-large"> Forgot Password?</span> -->
                        </div>

            </div>
        </div>

    </div>
</div>
</template>

<style scoped lang="scss">
.signup{
    min-height: 100vh;
    margin-top: 50px !important;
    font-weight: 500; 


    @include for-desktop {
    max-width: 1250px !important;
    margin: auto;

   
  }
}

// .left{
// float:left;
// width: 50%;
// }

// .right{
//     float: left;

// }

.field{
    min-height: 500px;
    background-color: white;
}

.right{
    min-height: 400px;
    background-color: white;
    font-size: large;
    top: 0px;
    position: sticky;
}
.register{
    background-color: rgb(81, 180, 16);
}

ul li::before {
  content: "✅";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
  color: red; /* Change the color */
  font-weight: bold; /* If you want it to be bold */
  display: inline-block; /* Needed to add space between the bullet and the text */
  width: 1em; /* Also needed for space (tweak if needed) */
  margin-right: 1em; /* Also needed for space (tweak if needed) */
}
.but{
    position:relative;
    -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.but:after {
  content: "";
  background: #ffffff;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px!important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.but:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}
</style>