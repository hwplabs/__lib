<!DOCTYPE html>
<html lang="en">
<head>  
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
  <title>Postman API Tests (Offline)</title>
  <!-- <link href="./favicon.png" type="image/png" sizes="32x32" rel="icon" />
  <link href="./css/layout.css" type="text/css" rel="stylesheet" /> -->
</head>
<body>
<output></output>

<script src="../../jquery-3.6.0.min.js" type="text/javascript"></script>
<script type="text/javascript">
$(function() {
  var $uri = 'http://localhost/luigi/api/users';
  var $uri = 'http://127.0.0.1:8000/api/persons';
  var $req = { surname: 'doe', other_names: 'jane' };
  var $output = $('output:first');

  $.ajax({
    type: 'GET',
    url: $uri,
    success: function(res) {
      // $output.text(JSON.stringify(res));
      console.log(this.type, this.url, res); 
    },
    error: function() {
      // alert('404');
    }
  });

  $.ajax({
    type: 'POST',
    url: $uri,
    contentType: 'application/json',
    data: $req,
    success: function(res) {
      console.log(this.type, this.url, res); 
    },
    error: function() {
      // alert('404');
    }
  });

  $.ajax({
    type: 'GET',
    url: `${$uri}/1`,
    success: function(res) {
      console.log(this.type, this.url, res); 
    },
    error: function() {
      // alert('404');
    }
  });

  $.ajax({
    type: 'PUT',
    url: `${$uri}/1`,
    data: $req,
    success: function(res) {
      console.log(this.type, this.url, res); 
    },
    error: function() {
      // alert('404');
    }
  });

  $.ajax({
    type: 'DELETE',
    url: `${$uri}/1`,
    success: function(res) {
      console.log(this.type, this.url, res); 
    },
    error: function() {
      // alert('404');
    }
  });

  $.ajax({
    type: 'GET',
    url: `${$uri}/search/O`,
    success: function(res) {
      console.log(this.type, this.url, res); 
    },
    error: function() {
      // alert('404');
    }
  });


});
</script>  
</body>
</html>

