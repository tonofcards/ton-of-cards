'use server';
import { put } from '@vercel/blob';
export async function uploadImage(formData:FormData){const file=formData.get('image') as File|null;if(!file){return{url:null,error:'No file received'};}const {url}=await put(`card-images/${Date.now()}-${file.name}`,file,{access:'public'});return{url};}
