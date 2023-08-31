import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(
    private prisma: PrismaService
  ){}

  async getBookmarks(userId: number){
    return this.prisma.bookmark.findMany({
      where: {userId}
    })
  }

  async getBookmarkById(userId: number, bookmarkId: number){
    return this.prisma.bookmark.findFirst({
      where: {userId, id: bookmarkId}
    })
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto){
    const bookmark = await this.prisma.bookmark.create({
      data: {userId, ...dto}
    })

    return bookmark;
  }

  async editBookmarkById(userId: number,bookmarkId: number, dto: EditBookmarkDto){
    // get bookmar
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {id: bookmarkId}
    })

    // check if present or this not the user's
    if(!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException("Access to resource denied");

    return this.prisma.bookmark.update({
      where: {id: bookmark.id},
      data: {...dto}
    })
  }

  async deleteBookmarkById(userId: number, bookmarkId: number){
    // get bookmar
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {id: bookmarkId}
    })

    // check if present or this not the user's
    if(!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException("Access to resource denied");

    await this.prisma.bookmark.delete({
      where: {id: userId}
    })
  }
}
