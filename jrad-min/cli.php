<?php 
include_once 'php/autoload.php';
include_once 'php/master.php';
include_once 'php/mysql.php';
include_once 'php/widget.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>  
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
  <title>$cli</title>
  <link href="favicon.png" type="image/png" sizes="32x32" rel="icon" />
  <link href="file-name.css" type="text/css" rel="stylesheet" />
  <script src="file-name.js" type="text/javascript"></script>
  <script type="text/javascript">
    
  </script>
</head>
<body>    
<?php
  $li = Lists::ERROR; 
  $e = '';
  $buf = '';
  $arr = [];
  foreach ($li as $i => $e) {
    $e = str_replace(' of..','',$e);
    $e = str_replace('\'','&#700;',$e);
    $arr[$i] = $e;
    //echo $e.'<br/>';
  }
  //var_dump(json_encode($arr));

  $li = range(1,31);
  $e = '';
  $buf = '';
  $arr = [];
  foreach ($li as $i => $e) {
    //$buf .= $e.', ';
    $buf .= $e < 10? sprintf('\'0%d\', ',$e): sprintf('\'%d\', ',$e);
  }
  //echo $buf;

  $db = 'ade_flight_db'; 
  $db = 'ade_vehicle_db';
  $tb = 'user';
  $tb = 'admin';
  $conn = connect_db('root','', $db);
  $rows = sql_select_all($conn, $tb);
  echo json_encode($rows);

?>
<script type="text/javascript">

</script>  
</body>
</html>

