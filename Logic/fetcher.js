import { PubSub } from "./PubSub.js";

export async function fetcher( rqst ) {
   
   try {
      const response = await fetch( rqst );
      if( response.ok ) {
         return await response.json();
      }


      const { message } = await response.json();

      PubSub.publish
      ({
         event: 'ERROR::ReachServer',
         detail: {
            response: response,
            message: message,
         },
      })
      

   } catch (error) {

      PubSub.publish
      ({
         event: 'ERROR::fetcher',
         detail: error,
      });

   }
}