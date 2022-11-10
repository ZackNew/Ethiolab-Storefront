<template>
<div class="signup text-secondary ">
    <h1>Sign In or Create an Online Account</h1>
    
    <div class="grid grid-cols-12 gap-4">

    <div class="left col-span-6 mt-10">
            <p>*Required</p>
            <div class="field">
                <h4 class="px-10 py-6 uppercase font-bold">Returning Customers</h4 >
                    <p1 class="px-10 py-4">Please Sign UP</p1>
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

                   
                    
                  
     </div>
    <div class="col-span-6 mt-16"> 
            <div class="right">
                <h4 class="px-10 py-6 uppercase font-bold">Why Register?</h4 >
                    <h4 class="px-10 ">Register today and enjoy these benefits</h4>

                    <ul class="mx-16 my-4">
                        <li>Full account records, order history, invoices & tracking</li>
                        <li>Wishlist organized saved items to order later</li>
                        <li>Create & track quotes</li>
                        <li>Keep a record of payment transactions</li>
                        <li>Discounts & special packages</li>
                        <li>Register page</li>


                    </ul>
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
</style>