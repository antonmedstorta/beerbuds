function populateFeed() {

	var firebaseName = document.getElementById("activeUsers");
	firebaseName.innerHTML = ""

	var ref = firebase.database().ref("users/");
	ref.orderByChild("isActive").equalTo(true).on("child_added", function(snapshot) {
		snapshot.forEach(testfunc(snapshot));

	});

}

function testfunc(snapshot) {
	
	var lat = snapshot.child('position').val().lat;
	var lng = snapshot.child('position').val().lng;
	var firebaseName = document.getElementById("activeUsers");
	firebaseName.innerHTML += '<div onclick="showPos(' + lat + ',' + lng + ')" class="row" targetpage="page3" id="flex" style="border: 1px solid black; border-radius: 5px;"><div class="col-4"><img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/15128952_10207573719443039_6551904099240725029_o.jpg?oh=3fb5df0585953f3bb5f5b8b42d67460a&oe=59B936A6" id="profilepic" width="100px" height="100px"></img></div><div class="col-8" style="font-size: 10pt"><b>' + snapshot.child("name").val() + '</b> wants to get his drink on <i><br/>near Östermalmstorg</i><br/><br/>Swipe right to start chatting ></div></div>'

}

function showPos(lat, lng) {

	var map = new google.maps.Map(document.getElementById('map'), {
		center: ({lat:lat, lng:lng}),
		zoom: 17,
		disableDefaultUI: true
	});
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(markerwrap);
		
	currentpage = "#page2"
		$('.row').click(function(){
		var targetpage = $('#'+$(this).attr('targetpage'));
		show(targetpage);
	});
		var show = function(targetpage){
		$(currentpage).hide()
		targetpage.show();
		currentpage = targetpage;
  }
}