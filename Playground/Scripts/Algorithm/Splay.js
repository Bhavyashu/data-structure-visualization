


/*

Copyright 2020 Anoop Singh, Graphical Structure

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.



*/


var newroot=0;



async function splayrightRotate(x)  
{  

    await hilight(x ,  "red");
    
   await hilight(x);

   // node *y = x->left;  
    let y = tree[x+"treeleft"]
   // x->left = y->right;
    tree[x+"treeleft"] = tree[y+"treeright"]  
   // y->right = x;  
    tree[y+"treeright"] = x;

    let nodeheightx = 1 + Math.max(height(tree[`${x}treeleft`]), height(tree[`${x}treeright`]));
    $(`#${x}height`).text(nodeheightx)

    let nodeheighty = 1 + Math.max(height(tree[`${y}treeleft`]), height(tree[`${y}treeright`]));
    $(`#${y}height`).text(nodeheighty)

    balancenodes(y)

    await waitforme(speed+100);

    return y;  
}  
  
// A utility function to left  
// rotate subtree rooted with x  
// See the diagram given above.  
async function splayleftRotate(x)  
{  

    await hilight(x ,  "red");
    
    await hilight(x);

  //  node *y = x->right;
    let y = tree[x+"treeright"]  
   // x->right = y->left;  
    tree[x+"treeright"] = tree[y+"treeleft"]  
    //y->left = x;
    tree[y+"treeleft"] = x;  


    let nodeheightx = 1 + Math.max(height(tree[`${x}treeleft`]), height(tree[`${x}treeright`]));
    $(`#${x}height`).text(nodeheightx)

    let nodeheighty = 1 + Math.max(height(tree[`${y}treeleft`]), height(tree[`${y}treeright`]));
    $(`#${y}height`).text(nodeheighty)

    balancenodes(y)

    await waitforme(speed+100);

    return y;  
}  
  
// This function brings the key at 
// root if key is present in tree.  
// If key is not present, then it 
// brings the last accessed item at  
// root. This function modifies the 
// tree and returns the new root  
async function splay(node_,  key)  
{  
    // Base cases: node_ is NULL or 
    // key is present at node_  
    if (node_ == "null" || parseInt( $("#"+node_+"treeval").text(),10) == key)  return node_;  
  

    // Key lies in left subtree  
    if (parseInt( $("#"+node_+"treeval").text(),10) > key)  
    {  
        // Key is not in tree, we are done  
        if (tree[node_+"treeleft"] == "null") return node_;  
  
        // Zig-Zig (Left Left)  
        if ( parseInt( $("#"+tree[node_+"treeleft"]+"treeval").text(),10) > key)  
        {  
            // First recursively bring the 
            // key as node_ of left-left  
           let left = tree[node_+"treeleft"];
           
           tree[left+"treeleft"] = await splay(tree[left+"treeleft"], key);  
  
            // Do first rotation for node_,  
            // second rotation is done after else  
            node_ = await splayrightRotate(node_);  
        }  
        else if (parseInt( $("#"+tree[node_+"treeleft"]+"treeval").text(),10) < key) // Zig-Zag (Left Right)  
        {  
            // First recursively bring 
            // the key as node_ of left-right
            let left = tree[node_+"treeleft"];

            tree[left+"treeright"] = await splay(tree[left+"treeright"], key);  
  
            // Do first rotation for node_->left  
            if (tree[left+"treeright"] != "null")  
               tree[node_+"treeleft"] = await splayleftRotate(tree[node_+"treeleft"]);  
        }  
  
        
        // Do second rotation for node_  
        return (tree[node_+"treeleft"] == "null")? node_: await splayrightRotate(node_);  
    }  
    else // Key lies in right subtree  
    {  
        // Key is not in tree, we are done 
        let right = tree[node_+"treeright"];

        if (right == "null") return node_;  
  
        // Zag-Zig (Right Left)  
        if ( parseInt( $("#"+right+"treeval").text(),10) > key)  
        {  
            // Bring the key as node_ of right-left  
            tree[right+"treeleft"] = await splay(tree[right+"treeleft"], key);  
  
            // Do first rotation for node_->right  
            if (tree[right+"treeleft"] != "null")  
            tree[node_+"treeright"] = await splayrightRotate(tree[node_+"treeright"]);  
        }  
        else if (parseInt( $("#"+right+"treeval").text(),10) < key)// Zag-Zag (Right Right)  
        {  
            // Bring the key as node_ of  
            // right-right and do first rotation  
            tree[right+"treeright"] = await splay(tree[right+"treeright"] , key);  
            node_ = await splayleftRotate(node_);  
        }  
  

        // Do second rotation for node_  
        return (tree[node_+"treeright"] == "null")? node_: await splayleftRotate(node_);  
    }  



}  





async function redrawsplay  ()  {

    mySVG.Splaylines();
    
   
   }
   
   

function splaynode(element) {

    newnode = '<div id="'+count+'" style="transition:200ms;transform:scale(.8,.8);left:1250px;top:150px;"  class="dragg" > <div class="treenode" id="'+ count+"treetop" +'" style="margin-left:35px;"></div>  <div class="treenode" id="'+ count+"treeleft" +'" style="margin-left:18px; margin-top:70px;"></div>   <div class="treenode" id="'+ count+"treeright" +'" style="margin-left:54px; margin-top:70px;"></div> <p  style="position:absolute;color:coral; font-size:70%; left:20px;" id="'+ count+"bottom" +'">'+count +'</p>   <div style="position:absolute; text-align:center; top:65px; left:38px;height:1px; width:20px;"><p  style="color:white; font-size:70%; " id="'+ count+"height" +'">'+"1" +'</p></div>   <p  id="'+ count+"treeval" +'" class="t">'+element+'</p>   </div>';


   $("body").prepend(newnode)
   
   $("#"+count).draggable({
    drag: function(event, ui){mySVG.Splaylines();}
  });

   tree[count+"treeleft"] = "null"
   tree[count+"treeright"] = "null"

   divbyelement[element] = count

   count = count +1;
   counttreenodes = counttreenodes + 1;

return count;
 }




 function calcheight( _root)
 {
     // Base case: empty tree has height 0
     if ($("#"+_root).length ==0)
         return 0;
  
     // recur for left and right subtree and consider maximum depth
     let heightpernode =  1 + Math.max(calcheight(tree[_root+"treeleft"]), calcheight(tree[_root+"treeright"]));
     $(`#${_root}height`).text(heightpernode)
     
     return heightpernode;
 }
  
  
// The search function for Splay tree.  
// Note that this function returns the  
// new node_ of Splay Tree. If key is  
// present in tree then, it is moved to node_. 

async function Splays( key)  
{  
  newroot = await splay(newroot, key);  

    mySVG.Splaylines();

    return newroot;
}  


async function Splayi( k)  
{  

   
    // Simple Case: If tree is empty  
    if ($("#"+newroot).length ==0)  {
        
       newroot = splaynode(k)-1; 
       $("#"+newroot).css({"left":"1900px"})
       $(document).scrollLeft(1200)
       $(document).scrollTop(0)
       return newroot;

    }
  
    // Bring the closest leaf node to newroot  
    newroot = await splay(newroot, k);  

   
    // If key is already present, then return  
    if ( parseInt( $("#"+newroot+"treeval").text(),10) == k) return newroot;  
  
    // Otherwise allocate memory for new node  
    let newsplaynode = splaynode(k) -1;  
  
    // If newroot's key is greater, make  
    // newroot as right child of newsplaynode  
    // and copy the left child of newroot to newsplaynode  
    if (parseInt( $("#"+newroot+"treeval").text(),10) > k)  
    {  
        console.log(newsplaynode);

        tree[newsplaynode+"treeright"] = newroot;  
        tree[newsplaynode+"treeleft"] = tree[newroot+"treeleft"] 
        tree[newroot+"treeleft"]  = "null";  

    }  
  
    // If newroot's key is smaller, make  
    // newroot as left child of newsplaynode  
    // and copy the right child of newroot to newsplaynode  
    else
    {  
        tree[newsplaynode+"treeleft"] = newroot;  
        tree[newsplaynode+"treeright"] = tree[newroot+"treeright"]   
        tree[newroot+"treeright"]  = "null";  
    }  
  
   
    newroot = newsplaynode; // newnode becomes new root  


    return newroot
} 


async function  Splaysearch(key)  {

     redrawevent= setInterval(redrawsplay , 50);



    await Splays(key);

   
    AVLpostleft[newroot] = 1900;
    AVLposttop[newroot] = 150;

    $(`#${newroot}`).offset({"top" : `${150}` , "left" : `${ 1900 }` })

    $(".dragg").css("transition" , speed+"ms linear");

   await balancenodes(newroot);

   await waitforme (speed+100);

    clearInterval(redrawevent)


}

async function Splayinsert (key)  {


    redrawevent= setInterval(redrawsplay , 50);


    await Splayi(key);


    AVLpostleft[newroot] = 1900;
    AVLposttop[newroot] = 150;

    $(`#${newroot}`).offset({"top" : `${150}` , "left" : `${ 1900 }` })

    $(".dragg").css("transition" , speed+"ms linear");

    await balancenodes(newroot);

   await waitforme (3000);

    clearInterval(redrawevent)



}


  

mySVG.connect()

/*
splaynode(100)//0
splaynode(50)//1
splaynode(200)//2
splaynode(40)//3
splaynode(30)//4
splaynode(20)//5
splaynode(300)//2
splaynode(400)//2
s
tree["0treeleft"] = 1;
tree["0treeright"] = 2;
tree["1treeleft"] = 3;
tree["4treeleft"] = 5;
tree["3treeleft"] = 4;
tree["2treeright"] = 6;
tree["6treeright"] = 7;

doalign();
mySVG.Splaylines();

*/
//+917561817149