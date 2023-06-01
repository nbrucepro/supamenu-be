import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDto } from './menu.dto';

@ApiTags('menu-apis')
@Controller('api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async createMenu(@Body() menu: MenuDto) {
    return this.menuService.createMenu(menu);
  }

  @Get()
  async getMenu() {
    return this.menuService.getMenu();
  }

  @Put()
  async updateMenu(@Param('id') id: string, menu: MenuDto) {
    return this.menuService.updateMenu(id, menu);
  }

  @Delete()
  async deleteMenu(@Param('id') id:string){
    return this.menuService.deleteMenu(id);
  }

}
