import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu {
  @Prop () 
  client: string;

  @Prop() 
  starters: string;

  @Prop()
  entrees: string;

  @Prop() 
  sideDishes: string;

  @Prop() 
  quantity: string;

  @Prop()
  prices: number;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);