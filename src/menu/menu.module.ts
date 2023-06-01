import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuService } from './menu.service';
import { MenuSchema } from './menu.model';
import { MenuController } from './menu.controller';
 
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'menu_tbl',
        useFactory: () => {
          const schema = MenuSchema;
          schema.pre("save",()=>{
            console.log("Saving menu table ...!!");
          })
          return schema;
        }, 
      },
    ]),
  ],

  providers: [MenuService],

  controllers: [MenuController],
})
export class MenuModule {}
