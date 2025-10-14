import { NextRequest, NextResponse } from 'next/server';
import { getCard, updateCard, deleteCard } from '../../../lib/db'
export async function GET(_:NextRequest,{params}:{params:{id:string}}){const card=await getCard(params.id);if(!card)return NextResponse.json({error:'Not found'},{status:404});return NextResponse.json({card});}
export async function PATCH(req:NextRequest,{params}:{params:{id:string}}){const body=await req.json();const card=await updateCard(params.id,body);return NextResponse.json({card});}
export async function DELETE(_:NextRequest,{params}:{params:{id:string}}){await deleteCard(params.id);return NextResponse.json({ok:true});}
