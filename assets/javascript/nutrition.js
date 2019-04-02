
function showNutrition(){
    $("#nutritionPage").show();
    $("#workoutPage").hide();
}

console.log("nutrition loaded")

var APPID = 'a140ced0';

var APPKEY = 'a9dfddddf58d190c766af7c2dd0f143c';

//var queryURL = "https://api.nutritionix.com/v1_1/searchappId="+APPID+"&appKey="+APPKEY;
var search = "chicken%20breast";

var searchParams =""
var searchType = 'basic';
var servingSize = '';

if (searchType === 'basic')
{
    searchParams = "nf_total_fat,nf_total_carbohydrate,nf_protein,nf_serving_size_unit,nf_serving_size_qty,nf_serving_weight_grams,brand_name"
}


var caloriesToAdd;
var fatToAdd;
var carbsToAdd;
var proteinToAdd;

var itemsInDiet = 0;

var foodObjects = [];

var userCalories = 0;
var userFat = 0;
var userCarbs = 0;
var userProtein = 0;

function myFunction() {

    $("#servingContainer").show();
    event.preventDefault();

    var input = $("#foodInput").val();
    search = input.replace(" ", "%20");
    var queryURL = "https://api.nutritionix.com/v1_1/search/"+search+"?results=0:20&fields=item_name,brand_name,item_id,"+searchParams+"&appId=a140ced0&appKey=a9dfddddf58d190c766af7c2dd0f143c"

    
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {


        console.log(response);


        for(i = 0; i<10; i++)
        {
            var item_id = response.hits[i].fields.item_id;

            var nameDiv = "#name"+i;
            $(nameDiv).text(response.hits[i].fields.item_name+" - "+response.hits[i].fields.brand_name);
            $(nameDiv).show();

            foodObjects[i] = new Object;
    
            foodObjects[i].item_name = response.hits[i].fields.item_name;
            foodObjects[i].brand_name = response.hits[i].fields.brand_name;
            foodObjects[i].serving_size_unit = response.hits[i].fields.nf_serving_size_unit;
            foodObjects[i].serving_size = response.hits[i].fields.nf_serving_size_qty;
            foodObjects[i].serving_weight = response.hits[i].fields.nf_serving_weight_grams;
            foodObjects[i].item_name = response.hits[i].fields.item_name;
            foodObjects[i].total_fat = response.hits[i].fields.nf_total_fat;
            foodObjects[i].total_carbohydrate = response.hits[i].fields.nf_total_carbohydrate;
            foodObjects[i].total_protein = response.hits[i].fields.nf_protein;
            
            var calories = (foodObjects[i].total_fat*9)+(foodObjects[i].total_carbohydrate*4)+(foodObjects[i].total_protein*4);
            foodObjects[i].total_calories = calories;

            var labelDiv = "#response"+i;
            $(labelDiv).empty();
            $(labelDiv).append(foodObjects[i].item_name+"<br>");
            $(labelDiv).append(foodObjects[i].brand_name+"<br>");
            $(labelDiv).append("Seving: "+foodObjects[i].serving_size+foodObjects[i].serving_size_unit+" - "+foodObjects[i].serving_weight+"g <br>");
            $(labelDiv).append("Calories: "+foodObjects[i].total_calories+"kcal <br>");
            $(labelDiv).append("Fat: "+foodObjects[i].total_fat+"g <br>");
            $(labelDiv).append("Carbs: "+foodObjects[i].total_carbohydrate+"g <br>");
            $(labelDiv).append("Protein: "+foodObjects[i].total_protein+"g <br>");
                   
            var r=$('<input/>').attr({
                type: "button",
                onclick: "addToDiet(this.id)",
                class: "btn btn-success",
                id: i,
                value: 'Add to Diet Plan'
            });
   
            $(labelDiv).append(r); 
        }
        
    });
}




var lastButton = '';
$('a[data-toggle="list"]').on('shown.bs.tab', function (e) {
    e.target // newly activated tab
    e.relatedTarget // previous active tab
  })


$('#myList a').on('click', function (e) {
    
    $(lastButton).css("background-color", "white");
    
    lastButton = this;
    $(this).css("background-color", "rgb(224, 75, 30)");
    e.preventDefault()
    $(this).tab('show')
    console.log(this);
  })


function macroSubmit(){
    

    userFat = $("#fatInput").val()
    userCarbs = $("#carbsInput").val()
    userProtein = $("#proteinInput").val()

    userCalories = (userFat*9)+(userCarbs*4)+(userProtein*4)




    $("#macros").show()
    $("#foodOutput").show()

    $("#calories").html("<h3>Calories:Daily Totals</h2>")
    $("#calories").html("<h3>"+userCalories+" - Calories</h2>")
    $("#fat").html("<h3>"+userFat+" - Fat</h2>")
    $("#carbs").html("<h3>"+userCarbs+"- Carbs</h2>")
    $("#protein").html("<h3>"+userProtein+" - Protein</h2>")

}
var totalCalories = 0;
var totalFat = 0;
var totalCarbs = 0;
var totalProtein = 0;
var favoriteObjects = [];

function addToDiet(id)
{
    console.log(foodObjects);
    
    itemsInDiet++;

    var servingSize = $('#servingSize').val();


    var div = 'diet'+itemsInDiet
    var name = foodObjects[id].item_name;
    var trimmedName = name.substring(0, 18);

    $('#dietContainer').append('<div class="col-lg-2" id ='+div+'>'+trimmedName+'</div>');
    
    console.log(servingSize);
    

    var calories = (foodObjects[id].total_calories * servingSize).toFixed(1);
    var fat = (foodObjects[id].total_fat * servingSize).toFixed(1);
    var carbs = (foodObjects[id].total_carbohydrate * servingSize).toFixed(1);
    var protein = (foodObjects[id].total_protein * servingSize).toFixed(1);

    $('#'+div).append('<br>'+foodObjects[id].serving_size+" "+foodObjects[id].serving_size_unit+" x " +servingSize);
    $('#'+div).append('<br>'+calories+"kcal");
    $('#'+div).append('<br>'+fat+"g");
    $('#'+div).append('<br>'+carbs+"g");
    $('#'+div).append('<br>'+protein+"g");

    favoriteObjects[itemsInDiet] = new Object;
    favoriteObjects[itemsInDiet].calories = calories;
    favoriteObjects[itemsInDiet].fat = fat;
    favoriteObjects[itemsInDiet].carbs = carbs;
    favoriteObjects[itemsInDiet].protein = protein;

    var r=$('<input/>').attr({
        type: "button",
        onclick: "removeFromDiet(this.id)",
        class: "btn btn-danger",
        id: 'diet'+itemsInDiet,
        value: 'x'
    });
    $('#'+div).append(r);
    addToTotal(calories, fat, carbs, protein)

    console.log(favoriteObjects);
}

function addToTotal(calories, fat, carbs, protein)
{   

    totalCalories = (parseFloat(totalCalories) + parseFloat(calories)).toFixed(1);
    totalFat = (parseFloat(totalFat) + parseFloat(fat)).toFixed(1);
    totalCarbs = (parseFloat(totalCarbs) + parseFloat(carbs)).toFixed(1);
    totalProtein = (parseFloat(totalProtein) + parseFloat(protein)).toFixed(1);

 

    $('#total').remove();
    
 
    $('#dietContainer').append('<div class="col-lg-2" id = "total">Daily</div>');
    $('#total').append('<br> Expenditures');
    $('#total').append('<br>'+totalCalories+"kcal / "+userCalories);
    $('#total').append('<br>'+totalFat+"g / "+userFat);
    $('#total').append('<br>'+totalCarbs+"g / "+userCarbs);
    $('#total').append('<br>'+totalProtein+"g / "+userProtein);

}

function removeFromDiet(id)
{
    console.log(id);
   $("#"+id).remove();
   var ret = id.replace('diet','');

   totalCalories = (totalCalories - favoriteObjects[ret].calories).toFixed(1);
   totalFat = (totalFat - favoriteObjects[ret].fat).toFixed(1);
   totalCarbs = (totalCarbs - favoriteObjects[ret].carbs).toFixed(1);
   totalProtein = (totalProtein - favoriteObjects[ret].protein).toFixed(1);

   $('#total').remove();
    
   $('#dietContainer').append('<div class="col-lg-2" id = "total">Total</div>');
   $('#total').append('<br> Expenditures');
   $('#total').append('<br>'+totalCalories+"kcal / "+userCalories);
   $('#total').append('<br>'+totalFat+"g / "+userFat);
   $('#total').append('<br>'+totalCarbs+"g / "+userCarbs);
   $('#total').append('<br>'+totalProtein+"g / "+userProtein);

}

