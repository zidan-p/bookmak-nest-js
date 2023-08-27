import { Module } from "@nestjs/common/decorators";



// use @module decorator to tell nest if this class is a module.
// the term module in nestjs is a thing that connected acrross nestjs app.
// so rather than plain class, function or anything, a module is declared to
// make nestjs work with it. (why should nestjs work with it? of course to make work 
// with app easier, that's the point of using netsjs in this app)
@Module({})
export class authModule {}