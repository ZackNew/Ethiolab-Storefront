// export default async ({ app, $vsf }) => {
//   try {
//    const auth =  await $vsf.$vendure.api.getMe();
//    if(auth.data != undefined){
//       app.context.redirect('/')
//    }

//   //  if(auth.data?.me?.__typename !== "CurrentUser"){
//   //   app.context.redirect('/signin');
//   //  }
//   } catch (error) {
//     if (error)app.context.redirect('/');
//   }
// };
