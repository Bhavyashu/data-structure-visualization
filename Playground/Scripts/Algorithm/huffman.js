var lefthand = 500;

var countedchars = {}


var heapsize =0;

async function swapphuff(vala,valb,cc)  {

    if (stats == 1  ) await pauser();

    if (vala == valb) {
      return;
    }
  
    if (vala > valb) {
  
      [vala ,valb] = [valb,vala]
  
    }
  
  
  
    let ele1 ,ele2;
  
    ele1 = document.getElementById("aitemval"+cc+vala);
    ele2 = document.getElementById("aitemval"+cc+valb);
    let text1 = ele1.innerHTML;
    let text2 = ele2.innerHTML;
  
  
    ele1.style.transition = speed+"ms";
    ele2.style.transition = speed+"ms";

    let elem1topdef =  ele1.style.top;
    let elem2topdef =  ele2.style.top;
    let elem1leftdef = ele1.style.left;
    let elem2leftdef = ele2.style.left;




    ele1.style.color = "black";
    ele1.style.top = "100px";
    ele2.style.color = "black";
    ele2.style.top = "-100px";
  
    await waitforme(speed+30)
  
    ele1.style.transition = speed+"ms";
    ele2.style.transition = speed+"ms";
    
     ele1.style.left =  94*(valb-vala)+"px";
     ele2.style.left = -94*(valb-vala)+"px";
  
    await waitforme(speed+30)
  
    ele1.style.transition = speed+"ms";
    ele2.style.transition = speed+"ms";
    ele1.style.top ="0px";
    ele1.style.color = "white";
    ele2.style.top ="0px";
    ele2.style.color = "white";
    
    await waitforme(speed+30)
  
    ele1.style.transition = "0ms";
    ele2.style.transition = "0ms";
  
    ele1.style.top = elem1topdef;
    ele1.style.left = elem1leftdef;
    ele2.style.top = elem2topdef;
    ele2.style.left = elem2leftdef;
  
    ele2.innerHTML = text1
    ele1.innerHTML = text2
  
  
  await waitforme(speed+50)
  
  if (stats == 1  ) await pauser();
  
  }
  

async function minheapify( len,  ind) 
{ 
    ind = Math.floor(ind)
    var smallest = ind; // Initialize smallest as root 
    var l = 2*ind + 1; // left = 2*i + 1 
    var r = 2*ind + 2; // right = 2*i + 2 
  
    
    // If left child is larger than root 
    if (l < len && storedarray[l] < storedarray[smallest]) 
        smallest = l; 
  
    // If right child is larger than smallest so far 
    if (r < len && storedarray[r] < storedarray[smallest]) 
        smallest = r; 
  
    // If smallest is not root 
    if (smallest != ind) 
    { 

        var te = storedarray[ind];
        storedarray[ind] = storedarray[smallest];
        storedarray[smallest] = te;


      swapphuff(ind,smallest,"c")
     await swapphuff(ind,smallest,"f")

        // Recursively heapify the affected sub-tree 
    await    minheapify(len, smallest); 
    } 
} 

async function minHEAPIFY2( n,  i) 
{ 
    
    let parent = Math.floor( (i - 1) / 2); 
  
    if (storedarray[parent] > 0) { 
        // For Max-Heap 
        // If current node is greater than its parent 
        // Swap both of them and call heapify again 
        // for the parent 
        if (storedarray[i] < storedarray[parent] && i!=parent) { 
         //   swap(arr[i], arr[parent]);
            let tt = storedarray[i]
            storedarray[i] = storedarray[parent];
            storedarray[parent] = tt;
        
              swapphuff(parent, i,"c")
             await swapphuff(parent, i,"f")

            // Recursively heapify the parent node 
            await minHEAPIFY2( n, parent); 

        } 


    } 

    
} 


function heapleaf(element) {

  

    newnode = '<div id="'+count+'" style="transform:scale(.7,.7);transition:'+ speed+ 'ms linear; left:0px; left:0px;top:150px;"  class="dragg" > <div class="treenode" id="'+ count+"treetop" +'" style="margin-left:35px;"></div>  <div class="treenode" id="'+ count+"treeleft" +'" style="margin-left:18px; margin-top:70px;"></div>   <div class="treenode" id="'+ count+"treeright" +'" style="margin-left:54px; margin-top:70px;"></div> <p  style="position:absolute;color:coral; font-size:70%; left:20px;" id="'+ count+"bottom" +'">'+count +'</p>  <p  style="color:white;margin-top:-2px;margin-left:-15px; font-size:50%;display:none;" id="'+ count+"height" +'">'+"1" +'</p>  <p  id="'+ count+"treeval" +'" class="t">'+element+'</p>   </div>';


   $("body").prepend(newnode)
   $("#"+count).draggable();

   tree[count+"treeleft"] = "null"
   tree[count+"treeright"] = "null"

   divbyelement[element] = count

   count = count +1;
   counttreenodes = counttreenodes + 1;


   return count-1;
 }



async function deleteminheap() { 

    let frequency = storedarray[0];
    let character = document.getElementById("aitemvalc0").innerHTML
    let refference;
    // Get the last element 
    let lastElement = storedarray[heapsize-1]; 
  
    // Replace root with first element 
    storedarray[0] = lastElement; 
   
   
      swapphuff(0,heapsize-1,"c")
      await swapphuff(0,heapsize-1,"f")

      if (character == "sp") { refference =  heapleaf("sp");}
   else  if (character >= 'A' && character <= 'Z' ) { refference =  heapleaf(character);}
     else refference = character;

     document.getElementById("aitemvalf"+(heapsize-1)).innerHTML = "";
     document.getElementById("aitemvalc"+(heapsize-1)).innerHTML = "";

     document.getElementById("aitem"+(heapsize-1)).style.visibility = "hidden";

     mySVG.redrawLines();
  
 
     heapsize = heapsize - 1; 
  
    // heapify the root node 
  await  minheapify(heapsize, 0); 

  return  {refference,frequency};

} 

async function insertminheap(value)   {

    storedarray[heapsize] = value;

  let refference =  heapleaf(value)


 
    document.getElementById("aitemvalf"+(heapsize)).innerHTML = value;
     document.getElementById("aitemvalc"+(heapsize)).innerHTML = refference;
    
 document.getElementById("aitem"+heapsize).style.visibility = "visible";

 await waitforme(speed)


await minHEAPIFY2(heapsize+1, heapsize)

heapsize +=1;

return refference;

}





async function huffcode(getstring)  {


  var regex = /^[A-Za-z0-9 ]+$/
 
  //Validate TextBox value against the Regex.
  var isValid = regex.test(getstring);

  if (!isValid) {
    Log("enter a valid string");
    return;
} 

  window.scrollTo(0,0)
getstring = String(getstring).toUpperCase();

let stringelement = document.getElementById("stringholder");

stringelement.innerHTML= "";

for (let letsgo = 0 ; letsgo < getstring.length ; letsgo++) {


let spanchar = `<span id="str${letsgo}">${getstring[letsgo]}</span>`;

countedchars[getstring[letsgo]] =0;

stringelement.innerHTML += spanchar;

spanchar= ``;


}


await waitforme(speed);


for (let letsgo = 0 ; letsgo < getstring.length ; letsgo++) {


    let charbychar = document.getElementById("str"+letsgo);

    charbychar.style.transition= speed+"ms linear";
    charbychar.style.color = "red";

    countedchars[getstring[letsgo]] += 1;

    if (getstring[letsgo] == " ") {

        Log(`space = ${countedchars[getstring[letsgo]]}`)
    }
else
    Log(`${getstring[letsgo]} = ${countedchars[getstring[letsgo]]}`)

    await waitforme(speed+100);

    charbychar.style.transition= speed+"ms linear";
    charbychar.style.color = "black";

}



await waitforme(speed);



arr = '<table id="t1" style=" z-index: 1;position:absolute;border-collapse: collapse; top:505px; left:150px; text-align:center; transition-duration : 100ms;table-layout: fixed;" ></table>'

document.body.insertAdjacentHTML("afterbegin",arr);


let tablelement = document.getElementById("t1")


$("#t1").draggable();
let i=0;

for (let keys in countedchars)  {

 tabledata = document.createElement("td");
 
 tabledata.style.cssText = "text-align:center; min-width:70px";

 tabledata.id= "aitem"+i;

 tabledata.className = "arrayd";

 if (keys == " ") {

tabledata.innerHTML += '<div id="aitemdiv'+ i+'"  style="text-align:center; position:absolute; z-index:1">         <p id="aitemindex'+i +'" style="position:absolute; color:coral; margin-top:67px; margin-left:35px; font-size:37%";>'+i+'</p>             <p id= "aitemvalc'+i +'" class="arrayitem" >'+ "sp"+'</p>   </div>  <div style="text-align:center; position:absolute; z-index:1;left:50px;"><p id= "aitemvalf'+i +'" class="arrayitem" >'+(countedchars[keys]) +'</p></div>'

 }

 else
 tabledata.innerHTML += '<div id="aitemdiv'+ i+'"  style="text-align:center; position:absolute; z-index:1">         <p id="aitemindex'+i +'" style="position:absolute; color:coral; margin-top:67px; margin-left:35px; font-size:37%";>'+i+'</p>             <p id= "aitemvalc'+i +'" class="arrayitem" >'+ keys+'</p>   </div>  <div style="text-align:center; position:absolute; z-index:1;left:50px;"><p id= "aitemvalf'+i +'" class="arrayitem" >'+(countedchars[keys]) +'</p></div>'


 tablelement.appendChild(tabledata);

 storedarray.push(countedchars[keys])

 ++i;

}

heapsize= Object.keys(countedchars).length


tableobj = $("#t1")

ipointer.style.display = "";
jpointer.style.display = "";
kpointer.style.display = "";


mainarray = document.getElementById("t1")

stringelement.style.display="none"

Log("Sorting the array using Selection Sort");

await waitforme(speed);

ipointer.style.display = "";
      jpointer.style.display = "";
      kpointer.style.display = "";
  
      var lene = storedarray.length;
      
      $("#iindex").text("j")
      $("#jindex").text("j+1")
  
      for (let i=0; i < storedarray.length-1; i++){
          for (let j=0; j < storedarray.length-i-1; j++){
            await ij(j , j+1);
            await display('Comparing index j=' + (j) + ' and j+1=' + (j+1) ) 
            hilight("aitem"+(j) , "red" , "1000ms" , 1100)  
                await hilight("aitem"+(j+1), "red" , "1000ms" , 1100) 
              if (storedarray[j] > storedarray[j+1]){
                var temp = storedarray[j];
                storedarray[j] = storedarray[j+1];
                storedarray[j+1] = temp;
                await display('Element array['+ (j) +'] > array[' + (j+1)+ '] , Swapping')
                
                swapphuff(j,j+1,"f")
               await swapphuff(j,j+1,"c")
               
              }
              
              else {
                await display('Element array['+ (j) +'] < array[' + (j+1)+ '] , Skip')  
              }
              hilight("aitem"+(j) , defaultcolor, '1s' , 900)  
               hilight("aitem"+(j+1) ,defaultcolor,'1s' , 900)
  
               
                
                
          }
  
         
      }
  
      $("#iindex").text("i").hide()
      $("#jindex").text("j").hide()


Log("Treat array as Min-Heap");


if (stats ==1) await pauser();


redrawevent= requestAnimationFrame(redraw)


while(heapsize >0) {


  let leftelem =  await deleteminheap()
 
  let rightelem =  await deleteminheap()

  

  let sum = parseInt(leftelem.frequency)+parseInt(rightelem.frequency);


  await waitforme(speed)


 let summed =   await  insertminheap(sum)


   treefy(summed+"treeleft",leftelem.refference , "coral","0" )
   treefy(summed+"treeright",rightelem.refference ,"coral", "1" )



   AVLpostleft[summed] = lefthand;
   AVLposttop[summed] = 150;

   document.getElementById(summed).style.top = 150+"px";
   document.getElementById(summed).style.left = lefthand+"px";


   lefthand = lefthand + 130;

   calcheight(summed)
 
  BalanceAll(summed);




}


AVLpostleft[summed] = 700;
AVLposttop[summed] = 150;

document.getElementById(summed).style.top = 150+"px";
document.getElementById(summed).style.left = 700+"px";

calcheight(summed)

BalanceAll(summed);




cancelAnimationFrame(redrawevent)


}

//huffcode('bcaadddccacacac')