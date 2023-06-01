import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuDocument } from './menu.model';
import { MenuDto } from './menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel('menu_tbl')
    private readonly menuModel: Model<MenuDocument>,
  ) {}

  async createMenu(menu: MenuDto): Promise<any> {
    const created = new this.menuModel(menu);
    return created.save();
  }

  async getMenu(): Promise<any> {
    const menu = await this.menuModel.find();
   return menu;
  }

  async updateMenu(id: string, updateMenu: MenuDto): Promise<any> {
    const isthere = await this.menuModel.findById(id);

    if (isthere === null) {
      return 'Menu not found';
    }
    else{      
      const updated = await this.menuModel.findByIdAndUpdate(id, updateMenu, {
        new: true,
      });
      return updated;
    }
  }

  async deleteMenu(id: string): Promise<any> {
    const isthere = await this.menuModel.findById(id);

    if (isthere === null) {
      return 'Menu not found';
    }
    else{

      if (this.menuModel.findByIdAndDelete(id)) {
        return 'Menu delete successfully!';
      }
    }
  }
}
