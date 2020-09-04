// when .modal-wide opened, set content-body height based on browser height; 200 is appx height of modal padding, modal title and button bar

$(".modal-wide").on("show.bs.modal", function() {
  var height = $(window).height() - 200;
  $(this).find(".modal-body").css("max-height", height);
});

/* Initial Scripts of the page Custon_Questions */

// Function updates page through the button Refresh :::
function Refresh(){window.location.reload();}

// Disable the second button add:
function remove_BtnTwo(){document.getElementById("btn-s").disabled = false;}

// Function what generates the fields :::
$(document).ready(function(){
 $(document).on('click', '.add', function() {
  var html = '';
  html += '<tr>';
  html += '<td><select name="select" id="test" class="form-control item_unit"><option value="">Homem</option><option value="">Mulher</option><option value="">Idoso</option></td>';
  html += '<td><input type="text" name="item_quantity[]" class="form-control item_quantity"/></td>';
  html += '<td><select name="item_unit[1]" id="testes" onchange="validateSelect()" class="form-control item_unit"><option value=""selected disabled>Tipos</option><option value="Text">Text</option><option value="Radio">Rádio</option><option value="CheckBox">CheckBox</option><option value="Select">Select</option><option value="Box_Text">Box Text</option><?php echo fill_unit_select_box($connect); ?></select></td>';

  // Disable button to prevent more than one question from being entered :::  
  document.getElementById("btn-s").disabled = true;
  // Finish Disabled Button 

  html += '<td></td></tr>';
  $('#item_table').append(html);
 });

 $(document).on('click', '.remove', function(){
  $(this).closest('tr').remove();
 });
 
 $('#insert_form').on('submit', function(event){
  event.preventDefault();
  var error = '';
  $('.item_name').each(function(){
   var count = 1;
   if($(this).val() == '')
   {
    error += "<p>Enter Item Name at "+count+" Row</p>";
    return false;
   }
   count = count + 1;
  });

  var form_data = $(this).serialize();
  if(error == '')
  {
   $.ajax({
    url:"insert.php",
    method:"POST",
    data:form_data,
    success:function(data)
    {
     if(data == 'ok')
     {
      $('#item_table').find("tr:gt(0)").remove();
      $('#error').html('<div class="alert alert-success">Item Details Saved</div>');
     }
    }
   });
  }
  else
  {
   $('#error').html('<div class="alert alert-danger">'+error+'</div>');
  }
 });
});
// Finish Function what generates the fields :::

  var cont = 0; 
// This function generate the secondary fields one by one :::
 function displayDialog(e) {
   	var html = '';
        html += '<tr id="del">';
        html += '<td><input type="text" name="item_quantity[]" class="form-control item_quantity"/></td>';
        html += '<td><button type="button" name="remove" class="btn btn-danger btn-sm remove"><span class="glyphicon glyphicon-minus"></span></button></td></tr>';$('#table_check').append(html);
        cont = cont +1;
} // Finish function displayDialog :::


 //This function handles select
function validateSelect() {

        var clickButton = null;

          document.getElementById("btn-s").disabled = false;
          document.getElementById("btn-ss").disabled = false; 

              var result = document.getElementById("testes").value;  

                    if(result == ('Text') || (result == ('Box_Text'))){

                             document.getElementById("btn-s").disabled = true;
                             document.getElementById("btn-ss").disabled = true;

                             while(cont > 0){
                             $( "#del" ).remove();
                             cont = cont - 1;
                         	}

                    }else if(result == ('')){

                            document.getElementById("btn-s").disabled = true;
                            document.getElementById("btn-ss").disabled = true;

                    }else if (result == ('Radio')){

                            document.getElementById("btn-s").disabled = true;

                            clickButton = document.querySelector("#btn-ss");
                            clickButton.addEventListener('click', displayDialog, false);

                            	//testes.getAttribute("Radio")
                                //testes.setAttribute("disabled", "disabled");

                    }else if (result == ("CheckBox")){

                            document.getElementById("btn-s").disabled = true;

                           clickButton = document.querySelector("#btn-ss");
                           clickButton.addEventListener('click', displayDialog, false);

                           		//testes.getAttribute("Radio")
                               // testes.setAttribute("disabled", "disabled");


                    }else if (result == ("Select")){

                           document.getElementById("btn-s").disabled = true;

                            clickButton = document.querySelector("#btn-ss");
                            clickButton.addEventListener('click', displayDialog, false);

                            	//testes.getAttribute("Radio")
                                //testes.setAttribute("disabled", "disabled");
                    }else{

                           document.getElementById("btn-s").disabled = false;

                    }
    
     } //Finish function ValidateSelect