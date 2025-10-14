import { NextRequest, NextResponse } from 'next/server';
import { listCards, createCard } from '@/app/lib/db';
export async function GET(){const cards=await listCards();return NextResponse.json({cards});}
export async function POST(req:NextRequest){const body=await req.json();for(const r of ['player','sport']){if(!body[r])return NextResponse.json({error:`Missing ${r}`},{status:400});}
const card=await createCard({player:body.player,sport:body.sport,year:body.year??null,brand:body.brand??null,set_name:body.set_name??null,card_number:body.card_number??null,parallel:body.parallel??null,serial_numbered:body.serial_numbered??null,grade:body.grade??null,purchase_price:body.purchase_price??null,list_price:body.list_price??null,market_value:body.market_value??null,status:body.status??'inventory',image_url:body.image_url??null});
return NextResponse.json({card});}
