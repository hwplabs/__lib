<?PHP
# STOP WARNING ERRORS
error_reporting(E_ALL ^ E_DEPRECATED);
set_error_handler(function () {});

# STOP CACHE MEMORY
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

# EXTEND VAR_DUMP
ini_set('xdebug.var_display_max_children', -1);
ini_set('xdebug.var_display_max_data', -1);
ini_set('xdebug.var_display_max_depth', -1);

$dir = 'C:\Users\User\Downloads\Movies\@TUTORIALS';
$rgx = '-(480p)';

function directory_sanitize($dir = './', $rgx = 'yt5s.com-', &$results = array())
{
    $files = scandir($dir);
    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path) && strpos($path, $rgx)) {
            rename($path, str_replace($rgx, '', $path));
            $results[] = $path;
        } else {
            if ($value != "." && $value != "..") {
                directory_sanitize($path, $rgx, $results);
            }
        }
    }
    return $results;
}

var_dump(directory_sanitize($dir, $rgx));
