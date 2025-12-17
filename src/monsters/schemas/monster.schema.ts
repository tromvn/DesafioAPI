import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Monster extends Document {
  @Prop({ required: true, unique: true })
  apiId: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  level: number;

  @Prop()
  hp: number;

  @Prop()
  baseExp: number;

  @Prop()
  jobExp: number;

  @Prop({ type: [{ itemName: String, chance: Number }] })
  drops: { itemName: string; chance: number }[];
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
