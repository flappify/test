var colors = ["#000","#808000","#CD5C5C","#F08080","#FA8072","#E9967A","#FFA07A","#B6C115","#15BCC1","#151DC1","#F5102C","#33F510"];

$( "#colorform" ).submit(function( event ){
    document.querySelector(".colorlistboxdetails").style.display="none";
    var range=colors.length;
    var num=document.getElementById("num").value;
    event.preventDefault();
    var err=validateFormOnSubmit(colorform);
    if(err===true)
    {
        document.querySelector(".colorlist").style.display="flex";
        var colornum = [];
        while(colornum.length < num){
            var r = Math.floor(Math.random() * range-1) + 1;
            if(colornum.indexOf(r) === -1) colornum.push(r);
        }
        var node= document.querySelector(".colorlist");
        node.querySelectorAll('*').forEach(n => n.remove());
        for(var i=0;i<num;i++)
        {
                console.log(colornum);
                var colorchosen=colornum[i];
                var innerDiv = document.createElement('div');
                innerDiv.className = 'color color'+i;
                console.log(colors[colorchosen]);
                innerDiv.style.backgroundColor=colors[colorchosen];
                // The variable iDiv is still good... Just append to it.
                document.querySelector(".colorlist").appendChild(innerDiv);
        }
        for(var i=0;i<num;i++)
        {
            $(".color"+i).on('click',function(e){
                function rgb2hex(rgb) {
                    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    function hex(x) {
                        return ("0" + parseInt(x).toString(16)).slice(-2);
                    }
                    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                }
                document.querySelector(".selectedColor").style.display="block";
                document.querySelector(".selectedColor").style.backgroundColor=$(e.target).css("backgroundColor");
                document.querySelector(".color-hex").innerHTML=rgb2hex($(e.target).css("backgroundColor"));
                document.querySelector(".color-hex").style.color=rgb2hex($(e.target).css("backgroundColor"));
            })
        }
    }
});

function validateFormOnSubmit(colorform) {
    var error=0;
    error += validateNumber(colorform.num);
    if (error > 0) {
    return false;
    }
    else {
    return true;
    }
}

function validateNumber(number){
    var error=0;
    var stripped = number.value.replace(/[\(\)\.\-\ ]/g, '');
      if (number.value == "") {
          error = error + 1;
          document.getElementById('num-error').innerHTML = "Input is empty";
          number.style.outline = "2px solid #ff9f9f";
          setTimeout(function(){
            document.getElementById('num-error').innerHTML = "";
            number.style.outline = "none";
          },2000);
      }
      else if (isNaN(parseInt(stripped))) {
        error = error + 1;
        document.getElementById('num-error').innerHTML = "The number contains illegal characters.";
          number.style.outline = "2px solid #ff9f9f";
          setTimeout(function(){
            document.getElementById('num-error').innerHTML = "";
            number.style.outline = "none";
          },2000);
      }
      if(number.value>colors.length)
      {
        error = error + 1;
        document.getElementById('num-error').innerHTML = "Max is "+colors.length;
        number.style.outline = "2px solid #ff9f9f";
        setTimeout(function(){
            document.getElementById('num-error').innerHTML = "";
            number.style.outline = "none";
        },2000);
      }
      else{
          error=0;
      }
      return error;
}


$(".clear").on('click',function(e){
    $("#colorform").trigger("reset");
    document.querySelector(".selectedColor").style.display="none";
    document.querySelector(".color-hex").innerHTML="";
    document.querySelector(".colorlist").style.display="none";
})