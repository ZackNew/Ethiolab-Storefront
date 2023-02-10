export default async ({ app, $vsf }) => {
  try {
    await $vsf.$vendure.api.getMe();
  } catch (error) {
    if (error) app.context.redirect('/');
  }
};

// export default async ({ app, $vsf }) => {
//   try {
//    const auth =  await $vsf.$vendure.api.getMe();

//    if(auth.data?.me?.__typename !== "CurrentUser"){
//     app.context.redirect('/signin');
//    }
//   } catch (error) {
//     if (error){

//        app.context.redirect('/');
//     }
//   }
// };
