import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string='lWxf4Ur35WLAtLHgS6Vc7qsWUPFWqI2Q';
  private _historial:string[]=[];
  private serivicioUrl: string='https://api.giphy.com/v1/gifs'
  public resultados:Gif[]=[]

  get historial(){
  
    return [...this._historial];
  }

constructor(private http:HttpClient){

  this._historial= JSON.parse(localStorage.getItem('historial')!) || [];
  //if(localStorage.getItem('historial')){
    //this._historial= JSON.parse(localStorage.getItem('historial')!);
  //}
  this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];

}

  buscarGifs(query: string){
    query=query.trim().toLocaleLowerCase()
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._historial))
    }
    
  const params= new HttpParams()
  .set('apiKey',this.apiKey)
  .set('limit','10')
  .set('q',query);

    this.http.get<SearchGifResponse>(`${this.serivicioUrl}/search`,{params})
      .subscribe( resp=>{
        this.resultados=resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados))
      });

  }

}
