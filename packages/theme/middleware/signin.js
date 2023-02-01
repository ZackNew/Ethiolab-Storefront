// export default async ({ app, $vsf }) => {
//   try {
//    const auth =  await $vsf.$vendure.api.getMe();
//    console.log("auth value is ", auth.data)
//    if(auth.data != undefined){
//       app.context.redirect('/')
//    }
//   //  console.log("auth detail is  ", auth.data.me.__typename)

//   //  if(auth.data?.me?.__typename !== "CurrentUser"){
//   //   app.context.redirect('/signin');
//   //  }
//   } catch (error) {
//     if (error)app.context.redirect('/');
//   }
// };