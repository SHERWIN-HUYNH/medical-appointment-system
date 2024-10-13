import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileRespository } from '@/repositories/profile'; 
import { Profile } from '@/types/interface';
import { profile } from 'console';
import { use } from 'react';
export async function POST(req: Request, context: any) {
    const {action,profile} : {action: string, profile: Profile} = await req.json();
    const {userId} = context.params
    if(!userId){
      return new Response(
        JSON.stringify({
          message: "NOT AUTHENTICATED",
          status: 404,
        })
      )
    }
    const profileId = profile?.id;
    
    // if(action == "create"){
      const newProfile = await ProfileRespository.createProfile({
        profileData: profile,
        userId
      });
    
      if (newProfile) {
        return new Response(
          JSON.stringify({
            message: "CREATE PROFILE SUCCESSFULLY",
            status: 200,
          })
        )
      } else{
        return new Response(
          JSON.stringify({
            message: "CREATE PROFILE FAILED",
            status: 400,
          })
        )
      }
    // } 
    // if (action == "update") {
      
    //   const checkprofile = await ProfileRespository.getListProfileByUserId(profileId);
    //   if(!checkprofile){
    //     return new Response(
    //       JSON.stringify({
    //         message: "NOT FOUND PROFILE",
    //         status: 404,
    //       })
    //     )
    //   }

    //   const updateProfile = await ProfileRespository.updateProfile({
    //     profileData: profile,
    //     userId: userId
    // })

    // if (updateProfile) {
    //   return new Response(JSON.stringify({
    //     message: "UPDATE PROFILE SUCCESSFULLY",
    //     status: 200,
    //   }))
    //   } else{
    //     return new Response(JSON.stringify({
    //       message: "UPDATE PROFILE FAILED",
    //       status: 400,
    //     }))
    //   }
    // }

    return new Response(JSON.stringify({
      message: "NOT FOUND ACTION",
      status: 404,
    }))
    
    if (action === "findMany") {
      const profiles = await ProfileService.getListProfileByUserId(userId);

      if (!profiles || profiles.length === 0) {
        return new Response(
          JSON.stringify({
            message: "NOT FOUND PROFILE",
            status: 404,
          })
        );
      }

      return new Response(
        JSON.stringify({
          message: "GET PROFILE SUCCESSFULLY",
          status: 200,
          profiles,
        })
      );
    }

    if (action === "delete") {
      try {
        const checkProfile = await ProfileService.getProfileById(profileId);
        if (!checkProfile) {
          return new Response(
            JSON.stringify({
              message: "NOT FOUND PROFILE",
              status: 404,
            }),
            { status: 404 }
          );
        }
        await ProfileService.deleteProfile({profileData: profile});
        return new Response(
          JSON.stringify({
            message: "Profile deleted successfully",
            status: 200,
          }),
          { status: 200 }
        );
    
      } catch (error: any) {
        console.error("Error deleting profile:", error.message || error);
        return new Response(
          JSON.stringify({
            message: "Failed to delete profile",
            error: error.message || error,
            status: 500,
          }),
          { status: 500 }
        );
      }
    }
    
    
}
  