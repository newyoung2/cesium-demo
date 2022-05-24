export interface ILineOption{  //河流折线可配置项
    color:string  //颜色
    width:number  //线宽
}


export interface Ioption{
    speed?:number
    lineOption?:ILineOption
}

export interface IdataStruct{
    text?:string
    position:any[]
}
