import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileRespository } from '@/repositories/profile'; 
import { Profile } from '@/types/interface';
import { badRequestResponse, internalServerErrorResponse, notFoundResponse, successResponse, unauthorizedResponse } from '@/helpers/response';
import internal from 'stream';
export async function POST(req: Request, context: any) {
    const {profile} : { profile: Profile} = await req.json();
    const {userId} = context.params
    if(!userId){
      return unauthorizedResponse("UNAUTHENTICATED")
    }
    const profileId = profile?.id;
    const newProfile = await ProfileRespository.createProfile({
        profileData: profile,
        userId
      });
    
      if (newProfile) {
        return successResponse("CREATE PROFILE SUCCESSFULLY")
      } else{
        return badRequestResponse("FAIL TO CREATE PROFILE")
      }
    }
export async function PUT(req: Request, context: any)  {
  const {profile} : { profile: Profile} = await req.json();
  const {userId} = context.params
    const checkprofile = await ProfileRespository.getListProfileByUserId(profile.id);
    if(!checkprofile){
      return notFoundResponse("NOT FOUND PROFILE")
    }
    const updateProfile = await ProfileRespository.updateProfile({
      profileData: profile,
      userId: userId
  })

  if (updateProfile) {
    return successResponse("UPDATE PROFILE SUCCESSFULLY")
    } else{
      return badRequestResponse("FAIL TO UPDATE PROFILE")
    }
      
}
    
export async function GET(req: Request, context: any){
  const {profileValues} : { profileValues: Profile} = await req.json();
  const {userId} = context.params
  const profiles = await ProfileRespository.getListProfileByUserId(userId);

      if (!profiles || profiles.length === 0) {
        return notFoundResponse("NOT FOUND PROFILE");
      }
      return successResponse(profiles);
    
}
export async function DELETE(req: Request, context: any){
  const {profileValues} : { profileValues: Profile} = await req.json();
  const {userId} = context.params
    try {
      const checkProfile = await ProfileRespository.getProfileById(profileValues.id);
      if (!checkProfile) {
        return notFoundResponse("NOT FOUND PROFILE");
      }
      await ProfileRespository.deleteProfile({profileData: profileValues});
      return successResponse("DELETE PROFILE SUCCESSFULLY");
  
    } catch (error: any) {
      console.error("Error deleting profile:", error.message || error);
      return internalServerErrorResponse("FAIL TO DELETE PROFILE");
    }
} 
    
    

  