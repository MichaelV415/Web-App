function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var getAllRecords = function () {
  $.getJSON(
    "https://api.airtable.com/v0/appdpDvvzIVvKMarS/Imported%20table?api_key=keyV7BhS0Jzg72Awe",
    function (airtable) {
      var html = [];
      $.each(airtable.records, function (index, record) {
        var id = record.id;
        var images = record.fields["Images"];
        var title = record.fields["Title"];
        var address = record.fields["Address"];
        html.push(
          listView(id, images, title, address));
      });
      $("#item-container").append(html);
    }
  );
};

var getOneRecord = function (id) {
  $.getJSON(
    `https://api.airtable.com/v0/appdpDvvzIVvKMarS/Imported%20table/${id}?api_key=keyV7BhS0Jzg72Awe`,
    function (record) {
      var html = [];
      var images = record.fields["Images"];
      var title = record.fields["Title"];
      var distDay = record.fields["Distribution Day"];
      var startTime = record.fields["Start Time"];
      var endTime = record.fields["End Time"];
      var zipCodes = record.fields["Zip Codes Served"];
      var languages = record.fields["Languages Spoken"];
      var access = record.fields["Wheelchair Accessible"];
      var lat = record.fields["Latitude"];
      var long = record.fields["Longitude"];
      var address = record.fields["Address"];

      html.push(
        detailView(
          images,
          title,
          distDay,
          startTime,
          endTime,
          zipCodes,
          languages,
          access,
          lat,
          long,
          address
        )
      );
      $(".detail-view").append(html);
    }
  );
};

var listView = function (id, images, title, address) {
  return `<div class="col-sm-4 cardImageText">
    <div class="card" style="width: 18rem; height: 26rem;">
      ${images ? `<img class="card-img-top" src="${images[0].url}">` : ``}
      <div class="card-body">
        <a href="index.html?id=${id}">
        <h5 class="card-text card-key">${title}</h5></a>
        <h5>${address}</h5>
      </div>
      </div>
    </div>
    `;
};

var detailView = function (
  images,
  title,
  distDay,
  startTime,
  endTime,
  zipCodes,
  languages,
  access,
  lat,
  long,
  address
) {
  return `
  <div class="content">
    <div class="row">
      <div class="column">
    <div class="card text-center" style="width: 120%; height: 40rem; background-color: #e9ecef;">
    <div class="card-body">
    <div class="picture">
    ${images ? `<img class="card-img" src="${images[0].url}">` : ``}
      </div>
      </div>
      </div>
    </div>
    <div class="column">
      <div class="info">
      <div class="column">
      <div class="card" style="width: 18rem; margin-left: 22%;">
      <div class="card-body">
      <h5 class="card-title"><b>${title}</b></h5>
      <p class="card-text"><b>Distribution Day</b>: ${distDay}</p>
      <p class="card-text"><b>Start Time</b>: ${startTime}</p>
      <p class="card-text"><b>End Time</b>: ${endTime}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><b>Zip Codes Served</b>: ${zipCodes}</li>
      <li class="list-group-item"><b>Languages Spoken</b>: ${languages}</li>
      <li class="list-group-item"><b>Wheelchair Accessible?</b> ${access}</li>
    </ul>
  </div>
  </div>
  <div class="map">
  <a href="https://www.google.com/maps/search/${title} ${address}" target="_blank">
    ${lat && long ? `<img class="img-fluid" alt="Map of Location" src="https://api.mapbox.com/v4/mapbox.streets/${long},${lat},15/600x200.jpg?access_token=pk.eyJ1IjoibWljaGFlbHY0MTUiLCJhIjoiY2szN3lpdWk3MDN4dzNoa3p6dXRkeW4ydCJ9.9rm5xeVs6edEYqXKANfE-Q"/>` : `Map of Location`}
  </a>
  <h5>${address}<h5>
  </div>
  </div>
    </div>
  </div>
  </div>
<button type="button" class="btn btn-outline-dark" style="margin-left: 50%; margin-top: 5%;"><a href="index.html">Back</button></a>

`;
};

var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}

function searchFunction() {
  var input, filter, cardimagetext, i, x;
  input = document.getElementById('myinput');
  filter = input.value.toUpperCase();
  cardimagetext = document.getElementsByClassName('cardImageText');

  for (x = 0; x < cardimagetext.length; x++) {
    i = cardimagetext[x].getElementsByClassName('card-key')[0];
    if (i.innerHTML.toUpperCase().indexOf(filter) > -1) {
      cardimagetext[x].style.display = '';
    }
    else {
      cardimagetext[x].style.display = 'none';
    }
  }
}