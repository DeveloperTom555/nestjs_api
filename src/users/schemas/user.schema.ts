import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Define the UserDocument type
export type UserDocument = HydratedDocument<Users>;

// Define the schema name
export const UserSchemaName = 'Users';

// Define the Users schema
@Schema({ timestamps: true })
export class Users {
  @Prop({ type: String, default: null })
  first_name: string;

  @Prop({ type: String, default: null, trim: true })
  last_name: string;

  @Prop({ type: Number, default: null })
  mobile: number;

  @Prop({ type: String, required: true, index: true, unique: true })
  email: string;

  @Prop({ type: String, default: null })
  password: string;
}

// Create the schema using SchemaFactory
export const UserSchema = SchemaFactory.createForClass(Users);
