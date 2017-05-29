
const items = [
  ["ATL", "Hartsfield–Jackson Atlanta International Airport", "Atlanta"],
  ["LAX", "Los Angeles International Airport", "LosAngeles"],
  ["ORD", "O'Hare International Airport", "Chicago"],
  ["DFW", "Dallas/Fort Worth International Airport", "Dallas"],
  ["JFK", "John F. Kennedy International Airport", "NewYork"],
  ["DEN", "Denver International Airport", "Denver"],
  ["SFO", "San Francisco International Airport", "SanFrancisco"],
  ["CLT", "Charlotte Douglas International Airport", "Charlotte"],
  ["LAS", "McCarran International Airport", "LasVegas"],
  ["PHX", "Phoenix Sky Harbor International Airport", "Phoenix"],
  ["MIA", "Miami International Airport", "Miami"],
  ["IAH", "George Bush Intercontinental Airport", "Houston"],
  ["SEA", "Seattle–Tacoma International Airport", "Seattle"],
  ["MCO", "Orlando International Airport", "Orlando"],
  ["EWR", "Newark Liberty International Airport", "Newark"],
  ["MSP", "Minneapolis–Saint Paul International Airport", "Minneapolis"],
  ["BOS", "Logan International Airport", "Boston"],
  ["DTW", "Detroit Metropolitan Airport", "Detroit"],
  ["PHL", "Philadelphia International Airport","Philadelphia"],
  ["LGA", "LaGuardia Airport", "NYC"],
  ["FLL", "Fort Lauderdale–Hollywood International Airport", "FortLauderdale"],
  ["BWI", "Baltimore–Washington International Airport", "Baltimore"],
  ["DCA", "Ronald Reagan Washington National Airport", "DC"],
  ["MDW", "Chicago Midway International Airport", "Chicago"],
  ["SLC", "Salt Lake City International Airport", "SaltLakeCity"],
  ["IAD", "Washington Dulles International Airport", "Dulles"],
  ["SAN", "San Diego International Airport", "SanDiego"],
  ["HNL", "Honolulu International Airport", "Honolulu"],
  ["TPA", "Tampa International Airport", "Tampa"],
  ["PDX", "Portland International Airport", "Portland"],
  ];
  
  
function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  } else {
   callback(null, "Geolocation is not supported by this browser.")
 }
}









function main() {
  $('.newimg').on('click', function() {
    $(this).toggleClass('beautiful');
    
    setTimeout(function() {
      $(".newimg").toggleClass('beautiful');
    }, 400);
    
    $.valHooks.textarea = {
      get: function( elem ) {
        return elem.value.replace( /\r?\n/g, "\r\n" );
      } };
      
      var message = $("#newmessage").val();
      $("#newmessage").val('');

      //seperate the string by every space it sees and put each word into
      //its own spot in the array and then loop over the array which we then check to 
      //see if it matches any of our destinations which we then abbreviate
      $('.container').append(`<div class="userbubble">
		<p class="user">User: ${message}</p>
	</div>`);
		
      
      var res = message.split(" ");
      
      for(var j = 0; j < res.length; j++){
			for(var k = 0; k < 29; k++){
					if(res[j] === items[k][2]){
						var des = items[k][0];
	
					}			
			}      
      }
      
      for(var j = 0; j < res.length; j++){
			var isAlpha = function(str){
				return /^[a-zA-Z]+$/.test(str);;
			}
			if(!isAlpha(res[j])) {
				var dateString = res[j];
				
			} 
      }
      
      
      
      
      getLocation(function (position) {
       var lat = position.coords.latitude;
       var lng = position.coords.longitude;
       var baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=16000&keyword=airport&key=AIzaSyBcitbuYoSFELyS-8oRmZUAV0ez1JzzMys";
       
       
       $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/' + baseUrl,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('origin', 'null');
        },
        success: function (data) { renderData(data) },
        error: function (data) { alert("nope", data)},
      });
       	
//data.results[0].name
//and whatever else you want to pull out of it	
//Now just add the data you want to the page using Jquery

		


});
      
      
      var abbr = undefined;
      var blue;
      
      function shorten(data) {

for(var i = 0; i < 30; i++){
    if(items[i][1]=== data){
     
      abbr = items[i][0];
      console.log(des);	
      console.log(dateString);
      console.log(abbr);
      
    

      
      var FlightRequest = {
      "request": {
        "slice": [
          {
            "origin": abbr,
            "destination": des,
            "date": "2017-0"+dateString.substring(0,1)+"-"+dateString.substring(2,4),
          }
        ],
        "passengers": {
          "adultCount": 1,
          "infantInLapCount": 0,
          "infantInSeatCount": 0,
          "childCount": 0,
          "seniorCount": 0
        },
        "solutions": 1,
        "refundable": false
      }
    };
      
      
      


 $.ajax({
     type: "POST",
     //Set up your request URL and API Key.
     url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCff4W_s2g5LzehoBkgeKNqxb18pvmcBDo", 
     contentType: 'application/json', // Set Content-type: application/json
     dataType: 'json',
     // The query we want from Google QPX, This will be the variable we created in the beginning
     data: JSON.stringify(FlightRequest),
     success: function (data) {
     rendering(data) 
      //Once we get the result you can either send it to console or use it anywhere you like.
    },
      error: function(){
       //Error Handling for our request
       alert("Access to Google QPX Failed.");
     }
    });
      
      
      
      
      
      
      
      
     return abbr;
     break;

   }
   
   }
}
	
      
      function renderData(data){
	
	var a = data.results[0].name;
	shorten(a);	
  

 }

function rendering(data){
	console.log(data);
	
	var planeType = data.trips.data.aircraft[0].name;
	var company = data.trips.data.carrier[0].name;
	var cost = data.trips.tripOption[0].pricing[0].saleTotal;
	var cost = cost.substring(3);
	
	console.log(planeType);	
	console.log(company);	
	console.log(cost);	
  
  $('.container').append(`<div class="chatbotbubble">
		<p class="chatbot">FlyBot: The least costly and most quality flight we were able to find for you was an ${planeType}. This was made possible by our good friends at ${company} for the mere cost of $${cost}\.</p>
	</div>`);	

	


      
     
  
      
   } });
  
}

$(document).ready(main);
