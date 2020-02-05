export class Utils {

}


export function RandHexColor()
{
  var h1,h2,h3;
  h1 = Math.floor(Math.random()*255);
  h2 = Math.floor(Math.random()*255);
  h3 = Math.floor(Math.random()*255);


  return 'rgb('+h1+','+h2+','+h3+')';
}

export function RandInt(_rangeMax,_rangeMin)
{
    return Math.floor(Math.random()*_rangeMax+_rangeMin);
}
