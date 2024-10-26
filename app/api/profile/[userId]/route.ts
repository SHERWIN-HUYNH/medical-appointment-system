import type { NextApiRequest, NextApiResponse } from "next";
import { ProfileRespository } from "@/repositories/profile";
import { Profile } from "@/types/interface";

export async function POST(req: Request, context: any) {
  try {
    const { action, profile }: { action: string; profile: Profile } =
      await req.json();
    const { userId } = context.params;

    if (!userId) {
      return new Response(
        JSON.stringify({
          message: "NOT AUTHENTICATED",
          status: 401,
        }),
        { status: 401 }
      );
    }

    const profileId = profile?.id;

    // Handle create profile
    if (action === "create") {
      const newProfile = await ProfileRespository.createProfile({
        profileData: profile,
        userId,
      });

      if (newProfile) {
        return new Response(
          JSON.stringify({
            message: "CREATE PROFILE SUCCESSFULLY",
            status: 200,
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            message: "CREATE PROFILE FAILED",
            status: 400,
          }),
          { status: 400 }
        );
      }
    }
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

    // return new Response(JSON.stringify({
    //   message: "NOT FOUND ACTION",
    //   status: 404,
    // }))

    // Handle findMany
    if (action === "findMany") {
      const profiles = await ProfileRespository.getListProfileByUserId(userId);

      if (!profiles || profiles.length === 0) {
        return new Response(
          JSON.stringify({
            message: "NOT FOUND PROFILE",
            status: 404,
          }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({
          message: "GET PROFILE SUCCESSFULLY",
          status: 200,
          profiles,
        }),
        { status: 200 }
      );
    }

    // Handle delete profile
    if (action === "delete") {
      const checkProfile = await ProfileRespository.getProfileById(profileId);

      if (!checkProfile) {
        return new Response(
          JSON.stringify({
            message: "NOT FOUND PROFILE",
            status: 404,
          }),
          { status: 404 }
        );
      }

      await ProfileRespository.deleteProfile({ profileData: profile });
      return new Response(
        JSON.stringify({
          message: "Profile deleted successfully",
          status: 200,
        }),
        { status: 200 }
      );
    }

    // Handle unknown actions
    return new Response(
      JSON.stringify({
        message: "NOT FOUND ACTION",
        status: 400,
      }),
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error in profile handling:", error.message || error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        status: 500,
        error: error.message || error,
      }),
      { status: 500 }
    );
  }
}
